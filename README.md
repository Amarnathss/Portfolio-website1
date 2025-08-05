# Amarnath S S - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS featuring a unique chalkboard design aesthetic.

## 🚀 Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Chalkboard Theme**: Unique educational aesthetic with chalk-style animations
- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **UI Components**: Shadcn/ui component library for consistent design
- **Contact Form**: Integrated contact functionality
- **Project Showcase**: Dynamic project gallery
- **Skills Section**: Comprehensive skills display
- **Performance Optimized**: Fast loading with Vite bundling

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **Build Tool**: Vite
- **Deployment**: Netlify

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Amarnathss/Portfolio-website1.git
   cd Portfolio-website1
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build:netlify
   ```

## 🌐 Deployment on Netlify

### Method 1: GitHub Integration (Recommended)

1. **Connect to Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Sign up/Login with your GitHub account
   - Click "New site from Git"
   - Choose GitHub and select your repository

2. **Configure Build Settings**:
   - **Build command**: `npm run build:netlify`
   - **Publish directory**: `dist/public`
   - **Node version**: `18` (set in Environment variables)

3. **Deploy**:
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site
   - You'll get a unique URL like `https://amazing-site-name.netlify.app`

### Method 2: Manual Deploy

1. **Build locally**:
   ```bash
   npm run build:netlify
   ```

2. **Deploy to Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Drag and drop the `dist/public` folder to the deploy area

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility libraries
│   │   └── pages/          # Page components
│   └── index.html          # Main HTML template
├── server/                 # Backend Express server (for full-stack features)
├── shared/                 # Shared types and utilities
├── netlify.toml           # Netlify configuration
├── package.json           # Dependencies and scripts
└── vite.config.ts         # Vite configuration
```

## 🎨 Customization

- **Colors**: Modify `tailwind.config.ts` for color scheme
- **Content**: Update personal information in component files
- **Styling**: Customize CSS in component files or `src/index.css`
- **Images**: Replace assets in `client/src/assets/`

## 📧 Contact Form

The contact form is ready for integration with:
- Netlify Forms (add `netlify` attribute to form)
- External services like Formspree, EmailJS
- Custom backend implementation

## 🔧 Environment Variables

For full functionality, you may need to set up:
```
# Add to Netlify Environment Variables if using backend features
MONGODB_URI=your_mongodb_connection_string
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Amarnath S S**
- Computer Science Student
- Full-Stack Developer
- MERN Stack Specialist

---

⭐ If you found this project helpful, please give it a star!
