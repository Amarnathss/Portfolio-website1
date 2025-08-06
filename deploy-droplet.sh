#!/bin/bash

# DigitalOcean Droplet Deployment Script
# Run this script on your Ubuntu droplet

set -e

echo "🚀 Starting DigitalOcean Droplet deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_error "Please don't run this script as root"
    exit 1
fi

print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

print_status "Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

print_status "Installing Nginx..."
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx

print_status "Installing PM2 and Git..."
sudo npm install -g pm2
sudo apt install git -y

print_status "Setting up project directory..."
sudo mkdir -p /var/www
cd /var/www

# Check if directory exists and remove if it does
if [ -d "Portfolio-website1" ]; then
    print_warning "Removing existing project directory..."
    sudo rm -rf Portfolio-website1
fi

print_status "Cloning repository..."
sudo git clone https://github.com/Amarnathss/Portfolio-website1.git
sudo chown -R $USER:$USER /var/www/Portfolio-website1
cd Portfolio-website1

print_status "Installing dependencies..."
npm install

print_status "Building project..."
npm run build:do

print_status "Configuring Nginx..."
sudo tee /etc/nginx/sites-available/portfolio << 'EOF'
server {
    listen 80;
    server_name _;
    root /var/www/Portfolio-website1/dist/public;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;

    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Pragma "public";
        add_header Vary "Accept-Encoding";
    }

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Hide nginx version
    server_tokens off;
}
EOF

print_status "Enabling Nginx site..."
sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

print_status "Testing Nginx configuration..."
sudo nginx -t

if [ $? -eq 0 ]; then
    print_status "Reloading Nginx..."
    sudo systemctl reload nginx
else
    print_error "Nginx configuration test failed!"
    exit 1
fi

print_status "Configuring firewall..."
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw --force enable

# Get the server IP
SERVER_IP=$(curl -s ifconfig.me)

print_status "Creating update script..."
cat > update.sh << 'EOF'
#!/bin/bash
cd /var/www/Portfolio-website1
git pull origin main
npm install
npm run build:do
sudo systemctl reload nginx
echo "✅ Portfolio updated successfully!"
EOF

chmod +x update.sh

print_status "Creating SSL setup script..."
cat > setup-ssl.sh << 'EOF'
#!/bin/bash
# Run this after pointing your domain to this server
echo "Installing Certbot..."
sudo apt install certbot python3-certbot-nginx -y

echo "Enter your domain name (e.g., portfolio.yourdomain.com):"
read domain

echo "Getting SSL certificate for $domain..."
sudo certbot --nginx -d $domain

echo "Setting up auto-renewal..."
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

echo "✅ SSL certificate installed successfully!"
echo "Your portfolio is now available at: https://$domain"
EOF

chmod +x setup-ssl.sh

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Your portfolio is available at: http://$SERVER_IP"
echo "2. To set up a custom domain and SSL:"
echo "   - Point your domain's A record to: $SERVER_IP"
echo "   - Run: ./setup-ssl.sh"
echo "3. To update your portfolio: ./update.sh"
echo ""
echo "📁 Project location: /var/www/Portfolio-website1"
echo "🔧 Nginx config: /etc/nginx/sites-available/portfolio"
echo "📊 Check status: sudo systemctl status nginx"
echo ""
print_status "Happy coding! 🚀"
