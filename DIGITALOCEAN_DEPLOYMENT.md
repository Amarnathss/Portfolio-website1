# DigitalOcean Deployment Guide

## 🚀 Deploy to DigitalOcean - Multiple Options

### **Option 1: App Platform (Recommended)**

#### **Static Site Deployment (Free Tier Available)**

1. **Go to DigitalOcean Dashboard**
   - Visit [cloud.digitalocean.com](https://cloud.digitalocean.com)
   - Navigate to "Apps" → "Create App"

2. **Connect GitHub Repository**
   - Choose "GitHub" as source
   - Connect your account and select `Portfolio-website1` repository
   - Select `main` branch

3. **Configure Build Settings**
   ```yaml
   Build Command: npm run build:do
   Output Directory: dist/public
   HTTP Routes: / (catch all)
   Environment Variables:
     NODE_VERSION: 18
     NODE_ENV: production
   ```

4. **Deploy**
   - Review settings and click "Create Resources"
   - Your site will be available at: `https://your-app-name.ondigitalocean.app`

#### **Cost**: Free for static sites (3 static sites free forever)

---

### **Option 2: Droplet with Nginx (Full Control)**

#### **Step 1: Create Droplet**
```bash
# Choose Ubuntu 22.04 LTS
# Basic plan: $4/month (512MB RAM)
# Add SSH key for security
```

#### **Step 2: Server Setup Script**
```bash
#!/bin/bash
# Save this as deploy.sh and run on your droplet

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx

# Install PM2 for process management
sudo npm install -g pm2

# Install Git
sudo apt install git -y

# Clone repository
cd /var/www
sudo git clone https://github.com/Amarnathss/Portfolio-website1.git
sudo chown -R $USER:$USER /var/www/Portfolio-website1
cd Portfolio-website1

# Install dependencies and build
npm install
npm run build:do

# Create Nginx configuration
sudo tee /etc/nginx/sites-available/portfolio << 'EOF'
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/Portfolio-website1/dist/public;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

# Setup firewall
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw --force enable

echo "Deployment complete! Visit http://your-droplet-ip"
```

#### **Step 3: SSL Certificate (Optional)**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

### **Option 3: DigitalOcean Spaces + CDN (Static Hosting)**

#### **Step 1: Create Spaces Bucket**
1. Go to "Spaces" in DO dashboard
2. Create new Space with CDN enabled
3. Note the endpoint URL

#### **Step 2: Install and Configure s3cmd**
```bash
# Install s3cmd
pip install s3cmd

# Configure (use your Spaces keys)
s3cmd --configure
```

#### **Step 3: Deploy Script**
```bash
#!/bin/bash
# deploy-spaces.sh

# Build the project
npm run build:do

# Sync to Spaces
s3cmd sync dist/public/ s3://your-space-name/ --acl-public --delete-removed

# Purge CDN cache
curl -X DELETE "https://api.digitalocean.com/v2/cdn/endpoints/your-cdn-id/cache" \
  -H "Authorization: Bearer your-do-token" \
  -H "Content-Type: application/json" \
  -d '{"files": ["*"]}'

echo "Deployed to https://your-space-name.your-region.cdn.digitaloceanspaces.com"
```

---

## 📋 **Deployment Checklist**

### **Before Deployment:**
- [ ] Remove any sensitive data from code
- [ ] Test build locally: `npm run build:do`
- [ ] Ensure all environment variables are configured
- [ ] Update social media links in contact section

### **App Platform Deployment:**
- [ ] GitHub repository connected
- [ ] Build command: `npm run build:do`
- [ ] Output directory: `dist/public`
- [ ] Environment variables set

### **Droplet Deployment:**
- [ ] SSH key added to droplet
- [ ] Domain name configured (optional)
- [ ] SSL certificate installed
- [ ] Firewall configured

---

## 💰 **Cost Comparison**

| Option | Cost | Best For |
|--------|------|----------|
| **App Platform (Static)** | Free (3 sites) | Simple portfolios |
| **App Platform (Web Service)** | $5/month | Dynamic features |
| **Basic Droplet** | $4/month | Full control |
| **Spaces + CDN** | $5/month | Global distribution |

---

## 🔧 **Recommended Setup: App Platform**

For your portfolio, I recommend **App Platform Static Site** because:
- ✅ **Free forever** (for static sites)
- ✅ **Automatic deployments** from GitHub
- ✅ **Built-in CDN**
- ✅ **SSL certificate** included
- ✅ **Easy rollbacks**
- ✅ **No server management**

---

## 🚀 **Quick Start: App Platform**

1. **Push your code** (already done ✅)
2. **Go to DigitalOcean Apps**
3. **Create App from GitHub**
4. **Configure build settings**:
   - Build: `npm run build:do`
   - Output: `dist/public`
5. **Deploy!**

Your portfolio will be live at: `https://your-app-name.ondigitalocean.app`

---

## 📞 **Support**

If you need help:
- DigitalOcean Community tutorials
- Their support chat
- Documentation: docs.digitalocean.com
