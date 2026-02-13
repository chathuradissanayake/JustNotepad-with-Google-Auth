<div align="center">
  <img src="frontend/public/justnotepad.svg" alt="Just Notepad Logo" width="120" height="120">
  
  # Just Notepad
  
  ### 📝 A Modern, Secure Note-Taking Application
  
  [![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://justnotepad.chatd.dev)
  [![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
  
  *Simple notes, beautifully organized*
  
  [Live Demo](https://justnotepad.chatd.dev) · [Report Bug](mailto:chatd.dev@gmail.com) · [Request Feature](mailto:chatd.dev@gmail.com)
  
</div>

---

## ✨ Overview

**Just Notepad** is a sleek, web-based notepad application designed for fast, secure, and personalized note-taking. Built with modern technologies and a focus on user experience, it provides a distraction-free environment for capturing and organizing your thoughts.

## 🚀 Key Features

- **🔐 Google Authentication** - Sign in quickly and securely using your Google account
- **🔒 Private & Secure** - Each user has their own private notepad; your notes are visible only to you
- **✏️ Full CRUD Operations** - Create, read, update, and delete notes with ease
- **👤 User Profile Integration** - See your Google profile picture and name while using the app
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **🛡️ JWT Authentication** - Your session is protected with modern security standards
- **⚡ Lightning Fast** - Built with Vite for optimal performance
- **🎨 Beautiful UI** - Modern interface designed with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React OAuth Google** - Google authentication

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Token-based authentication
- **Google OAuth 2.0** - Authentication provider

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Web server and reverse proxy
- **GitHub Actions** - CI/CD pipeline
- **Let's Encrypt** - SSL/TLS certificates


## 🚦 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- MongoDB instance
- Google OAuth credentials
- Docker & Docker Compose (for containerized deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/chathuradissanayake/JustNotepad-with-Google-Auth.git
   cd justnotepad
   ```

2. **Set up environment variables**

   Create `.env` files in both `backend/` and `frontend/` directories:

   **Backend (.env)**
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/justnotepad
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   ```

   **Frontend (.env)**
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

3. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

4. **Run the application**
   ```bash
   # Backend (from backend directory)
   npm start

   # Frontend (from frontend directory)
   npm run dev
   ```

5. **Access the application**
   
   Open [http://localhost:5173](http://localhost:5173) in your browser

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build -d

# Access the application
# Frontend: http://localhost
# Backend: http://localhost:5000
```

## 🔒 Security Features

- **JWT Token Authentication** - Secure session management
- **Password Encryption** - Using industry-standard algorithms
- **HTTPS Support** - SSL/TLS encryption in production
- **Environment Variables** - Sensitive data protection
- **CORS Configuration** - Controlled cross-origin requests
- **Input Validation** - Server-side validation for all inputs

## 🌐 Live Demo

Experience Just Notepad in action: **[https://justnotepad.chatd.dev](https://justnotepad.chatd.dev)**


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Chathura** - [chatd.dev@gmail.com](mailto:chatd.dev@gmail.com)

**Project Link** - [https://github.com/chathuradissanayake/JustNotepad-with-Google-Auth](https://github.com/chathuradissanayake/JustNotepad-with-Google-Auth)

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Google OAuth](https://developers.google.com/identity/protocols/oauth2)

---

<div align="center">
  Made with ❤️ by Chathura
  
  ⭐ Star this repository if you find it helpful!
</div>

