# Nexora Frontend

A state-of-the-art, fully responsive React-based frontend for Nexora, combining secure authentication, AI-driven personalization, interactive dashboards, 3D/VR components, and enterprise-grade UX/UI.

## 🚀 Features

### ✅ Completed Features

- **Modern Tech Stack**: React 18 + TypeScript, Tailwind CSS, Redux Toolkit
- **Authentication System**: JWT-based auth with protected routes
- **Responsive Design**: Mobile-first approach with modern UI components
- **State Management**: Redux Toolkit + React Context for auth and AI state
- **Form Validation**: Formik + Yup with password strength indicators
- **Error Handling**: Global error boundary and toast notifications
- **Routing**: React Router v6 with lazy loading and code splitting

### 🔧 In Development

- **AI-Powered Features**: Chatbot, personalization, recommendations
- **3D/VR Components**: Three.js integration for immersive experiences
- **Dashboard**: Role-based dashboards with KPI widgets
- **Advanced Pages**: Service selector, case studies, interactive blog
- **PWA Support**: Offline-first experience with service workers

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + Custom SCSS
- **State Management**: Redux Toolkit + React Context
- **Routing**: React Router v6
- **Forms**: Formik + Yup validation
- **HTTP Client**: Axios with interceptors
- **3D Graphics**: Three.js + React Three Fiber
- **AI Integration**: TensorFlow.js + OpenAI API
- **Charts**: Recharts + D3.js
- **Notifications**: React Hot Toast
- **Icons**: Heroicons

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nexora-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

## 🎯 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── DashboardWidgets/ # Dashboard-specific widgets
│   ├── Navbar.tsx       # Navigation component
│   ├── Footer.tsx       # Footer component
│   └── ...
├── pages/               # Page components
│   ├── Home.tsx         # Landing page
│   ├── Login.tsx        # Authentication pages
│   ├── Dashboard.tsx    # Protected dashboard
│   └── ...
├── context/             # React contexts
│   └── AuthContext.tsx  # Authentication context
├── store/               # Redux store
│   ├── slices/          # Redux slices
│   └── index.ts         # Store configuration
├── utils/               # Utility functions
│   ├── api.ts           # API client
│   └── auth.ts          # Auth utilities
├── types/               # TypeScript types
├── hooks/               # Custom React hooks
└── services/            # External service integrations
```

## 🔐 Authentication Flow

1. **Registration**: Email validation with 6-digit verification code
2. **Login**: JWT token storage with remember me option
3. **Email Verification**: Time-limited code with resend functionality
4. **Password Reset**: Secure reset flow with validation
5. **Protected Routes**: Role-based access control

## 🎨 Design System

- **Colors**: Primary (Blue), Secondary (Cyan), Accent (Purple)
- **Typography**: Inter font family with responsive scaling
- **Spacing**: Tailwind's spacing scale (4px base unit)
- **Animations**: Smooth transitions with Framer Motion
- **Dark Mode**: System preference with manual toggle

## 🚀 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm run lint` - Lint code with ESLint
- `npm run format` - Format code with Prettier

## 🌐 Environment Variables

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ENABLE_AI_FEATURES=true
REACT_APP_ENABLE_3D_COMPONENTS=true
REACT_APP_GOOGLE_MAPS_API_KEY=your_key
```

## 📱 PWA Features (Coming Soon)

- Offline functionality
- Push notifications
- App-like experience
- Background sync
- Caching strategies

## 🤖 AI Features (Coming Soon)

- Intelligent chatbot for user assistance
- Personalized content recommendations
- Predictive analytics
- Auto-completion and suggestions
- Voice commands

## 🎮 3D/VR Features (Coming Soon)

- Interactive 3D hero sections
- VR project showcases
- Immersive service demonstrations
- 3D data visualizations

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for all new components
- Follow React functional components with hooks
- Use Tailwind classes for styling
- Implement error boundaries for robustness

### State Management
- Use Redux for global application state
- Use React Context for authentication state
- Use local state for component-specific data

### Performance
- Lazy load components and routes
- Optimize images and assets
- Use React.memo for expensive components
- Implement virtual scrolling for large lists

## 🚀 Deployment

The application is configured for deployment on:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Docker containers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: support@nexora.com
- Documentation: [docs.nexora.com](https://docs.nexora.com)
- Issues: GitHub Issues page

---

Built with ❤️ by the Nexora team