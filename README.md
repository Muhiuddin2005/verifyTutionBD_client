# 🎓 verifyTutionBD — Premium Tuition Management System

[![Firebase Hosting](https://img.shields.io/badge/Hosted_on-Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)](https://verifytutionbd.web.app)
[![Vite](https://img.shields.io/badge/Vite-V8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![React](https://img.shields.io/badge/React-v19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-v5.0-FF4154?style=for-the-badge&logo=daisyui&logoColor=white)](https://daisyui.com)

A premium, state-of-the-art web application built to connect students and tutors seamlessly across Bangladesh. By integrating secure payments, dedicated role-based portals, interactive mapping, and comprehensive administration dashboards, **verifyTutionBD** automates the entire tutoring cycle from search to hire.

---

## 🔗 Project Links

| Resource | URL |
| :--- | :--- |
| **Frontend Live Site** | [https://verifytutionbd.web.app](https://verifytutionbd.web.app) |
| **Backend API Live** | [https://backend-chi-eight-81.vercel.app](https://backend-chi-eight-81.vercel.app) |
| **Backend Repository** | [https://github.com/Muhiuddin2005/verifyTutionBD_server](https://github.com/Muhiuddin2005/verifyTutionBD_server) |

---

## 🌟 Key Features

### 🔐 1. Authentication & Security
- **Multi-method Auth**: Complete credentials sign-in along with single-click Google Authentication powered by Firebase.
- **Secure Sessions**: Protected routes and private layouts validating both user login state and specialized roles before rendering.
- **Axios Interceptors**: Automatically attaches JWT tokens to outgoing requests for secure backend operations.

### 🎭 2. Dedicated Portals & Dashboards
#### 👑 Admin Panel
- **User Management**: Promoted/demoted roles, user blocking, and profile moderation.
- **Tuition Verification**: Moderate posted tuitions before they are published live.
- **Analytics & Financials**: Clean interactive line charts tracking platform revenue growth, registration trends, and categories distribution.

#### 🎓 Student Panel
- **Post Tuition**: Dynamic form setup with location, subjects, class/level, salary, and requirements.
- **Manage Posts**: Edit existing listings or delete them (if not yet filled).
- **Hire Tutors**: View matching applications, check tutor profiles, and proceed to Stripe payments for hiring.

#### 👨‍🏫 Tutor Panel
- **Apply to Jobs**: Filter by subjects and locations, and submit detailed applications.
- **Track Status**: Monitor pending, approved, or rejected applications.
- **Revenue tracking**: Review monthly earnings and transaction history.

### 💳 3. Payment Integration
- **Stripe Checkout**: Integrated checkout experience confirming booking payments.
- **Transaction Ledger**: Structured history showing receipt details, user roles, and payment logs.

### 🗺️ 4. Interactive Geolocation
- **Interactive Maps**: Embedded Leaflet maps displaying tuition locations to simplify commute planning.

---

## 🛠️ Technology Stack

### Frontend Architecture
- **Framework**: `React 19` (Vite SPA)
- **Styling**: `Tailwind CSS v4.2` + `DaisyUI v5.0`
- **Routing**: `React Router v7`
- **State & Data Fetching**: `@tanstack/react-query` (TanStack Query) for declarative client-side caching.
- **Animations**: `Framer Motion` & `Swiper`
- **Forms**: `React Hook Form` combined with `Zod` validation.
- **Interactive Map**: `Leaflet` & `React Leaflet`

### Backend Infrastructure
- **Runtime**: `Node.js` with `Express.js`
- **Database**: `MongoDB` (aggregation pipelines for analytics)
- **Auth SDK**: `Firebase Admin SDK` for backend token verification.
- **Payments**: `Stripe Node SDK`

---

## 🚀 Local Installation & Setup

Follow these steps to run the frontend client locally:

### 1. Prerequisites
Ensure you have the following installed:
- `Node.js` (v18.0.0 or higher)
- `npm` (v9.0.0 or higher)

### 2. Clone the Repository
```bash
git clone https://github.com/Muhiuddin2005/verifyTutionBD_client.git
cd verifyTutionBD_client
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Setup Environment Variables
Create a `.env.local` file in the root of the frontend folder and supply the credentials:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 5. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` to view the application.

---

## 📂 Project Directory Structure

```text
frontend/
├── src/
│   ├── assets/          # Static assets & images
│   ├── components/      # Reusable UI components (Logo, Cards, Modals)
│   ├── contexts/        # Auth context provider
│   ├── hooks/           # Custom React hooks (useAuth, useRole, useAxiosSecure)
│   ├── layouts/         # RootLayout, AuthLayout, DashboardLayout
│   ├── pages/           # Page views grouped by route modules
│   │   ├── Auth/        # Login & Register pages
│   │   ├── Dashboard/   # Admin, Student, and Tutor sub-views
│   │   ├── Home/        # Splash page view
│   │   └── Tuitions/    # Tuition search and details
│   ├── routes/          # Router definitions & PrivateRoute wrapper
│   ├── utils/           # Utility functions & API configurations
│   ├── App.css          # Core layouts stylesheet
│   ├── index.css        # Global CSS, themes, and design system variables
│   └── main.jsx         # App bootstrapping entrypoint
├── firebase.json        # Firebase hosting specifications
├── index.html           # SPA entry template
└── package.json         # Scripts and package manifests
```

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
