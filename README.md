# 🚀 Saravanakumar's Portfolio

A modern, animated portfolio website built with React, Tailwind CSS, and Framer Motion. Features a sleek UI with dark mode, smooth animations, and responsive design.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38BDF8?logo=tailwindcss) ![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=nodedotjs)

## ✨ Features

- **Modern UI/UX** - Glassmorphism, gradient effects, and smooth animations
- **Dark/Light Mode** - Toggle between themes with animated transitions
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Interactive Sections** - Hero with typewriter effect, animated skill cards, project modals
- **Contact Form** - Functional contact form with backend integration
- **Framer Motion** - Smooth scroll animations and hover effects

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express.js** - Server framework
- **MongoDB** - Database
- **Nodemailer** - Email service

## 📂 Project Structure

```
Portfolio/
├── client/
│   └── portfolio/
│       ├── src/
│       │   ├── components/    # React components
│       │   ├── pages/         # Page components
│       │   ├── services/      # Service components
│       │   ├── hooks/         # Custom hooks
│       │   └── assets/        # Images and assets
│       └── public/
└── server/
    ├── controllers/           # Route controllers
    ├── models/               # MongoDB models
    ├── routes/               # API routes
    └── utils/                # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Saravanakumar-v-dev/Portfolio.git
   cd Portfolio
   ```

2. **Install frontend dependencies**
   ```bash
   cd client/portfolio
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../../server
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

5. **Run the application**

   Start the backend:
   ```bash
   cd server
   node server.js
   ```

   Start the frontend (in a new terminal):
   ```bash
   cd client/portfolio
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📸 Screenshots

| Light Mode | Dark Mode |
|------------|-----------|
| Hero Section | Animated Profile |
| Skills Grid | Projects Gallery |

## 📝 Sections

- **Hero** - Introduction with typewriter effect and animated profile
- **About** - Personal info with tech stack showcase
- **Services** - What I offer with detailed modals
- **Education** - Academic background with timeline
- **Skills** - Technical skills with animated cards
- **Projects** - Project showcase with filtering and modals
- **Contact** - Contact form with validation
- **Footer** - Social links and scroll-to-top

## 🎨 Customization

1. **Colors** - Edit `tailwind.config.js` for custom color palette
2. **Content** - Update component files in `src/components/`
3. **Projects** - Modify `src/data/sampleProjects.js`
4. **Profile** - Replace `src/assets/Sarava.jpg`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Connect

- **LinkedIn** - [Saravanakumar V](https://www.linkedin.com/in/saravanakumar-v-78912026a)
- **GitHub** - [Saravanakumar-v-dev](https://github.com/Saravanakumar-v-dev)
- **Email** - saravanakumarvsamy@gmail.com

---

<p align="center">Made with ❤️ by Saravanakumar</p>
