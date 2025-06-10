# ProPal AI: Intelligent Productivity Platform

**Empowering your AI applications with seamless authentication, robust user management, and intuitive UX.**


## 🚀 Live Demo

Experience the platform live: [https://pro-pal-ai.vercel.app/](https://pro-pal-ai.vercel.app/)

## ✨ Features

ProPal AI is built with a focus on delivering a high-performance, secure, and user-friendly experience. Key features include:

*   **Secure Authentication**:
    *   **Credentials (Email & Password)**: Robust login and signup flow with password hashing (bcryptjs) and validation.
    *   **Google OAuth**: Seamless one-click sign-in/signup using Google accounts via NextAuth.js.
    *   **Session Persistence**: Users remain logged in across sessions using JWT (JSON Web Tokens) for enhanced security and a smooth experience.
*   **Dynamic User Profiles**:
    *   **Avatar Management**: Users can upload custom profile images (integrated with AWS S3).
    *   **Intelligent Fallback**: If no profile image is uploaded, the avatar gracefully defaults to the first letter of the user's name, maintaining visual consistency.
*   **Intuitive User Interface**:
    *   **Dark/Light Mode**: Animated theme toggle for personalized viewing preference, powered by `next-themes` and Tailwind CSS.
    *   **Responsive Design**: A clean, modern, and fully responsive UI built with Tailwind CSS, ensuring optimal display on all devices.
    *   **Animated Toast Notifications**: Global, accessible toast system (Sonner) provides real-time feedback for actions (e.g., successful login, error messages, profile updates) with smooth animations.
*   **Protected Routes**:
    *   **Dashboard Security**: Sensitive routes (e.g., `/dashboard`, `/settings`, `/profile`) are protected using NextAuth.js middleware, ensuring only authenticated users can access them. Unauthorized attempts are gracefully redirected.
*   **Data Management**:
    *   **Prisma ORM**: Modern, type-safe database toolkit for interacting with PostgreSQL.
    *   **PostgreSQL Database**: Robust and scalable relational database for storing user data, authentication details, and application configurations.
*   **API Integration**: Seamless API routes for handling authentication, data updates, and future AI service integrations.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
*   **Database**: [PostgreSQL](https://www.postgresql.org/)
*   **ORM**: [Prisma](https://www.prisma.io/)
*   **Cloud Storage**: [AWS S3](https://aws.amazon.com/s3/) (for profile images)
*   **UI Components**: [Radix UI](https://www.radix-ui.com/) (headless components), Shadcn/ui (reusable components)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Toast Notifications**: [Sonner](https://sonner.emojicode.pizza/)
*   **Password Hashing**: [bcryptjs](https://www.npmjs.com/package/bcryptjs)

## 📸 Screenshots/GIFs

*Include high-quality screenshots or a short GIF demonstrating key features like:*
*   *Login and Signup pages*
*   *Dashboard overview (showing avatar, theme, protected route)*
*   *Settings page (showing profile image upload, theme toggle)*
*   *Toast notifications in action*

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

*   Node.js (v18.x or higher)
*   npm (v8.x or higher)
*   PostgreSQL database instance
*   (Optional) AWS S3 bucket for profile image uploads

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/propal-ai.git
    cd propal-ai
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and populate it with the required variables (see `.env Example` section below).

4.  **Database setup:**
    *   Ensure your PostgreSQL database is running and accessible via the `DATABASE_URL` in your `.env` file.
    *   Apply Prisma migrations and push the schema to your database:

        ```bash
        npx prisma db push
        ```
    *   Generate the Prisma client:

        ```bash
        npx prisma generate
        ```
    *   (Optional) Open Prisma Studio to view and manage your database:

        ```bash
        npx prisma studio
        ```

5.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📝 .env Example

Create a `.env` file in your project root with the following variables:

```dotenv
# Database (PostgreSQL with Prisma)
DATABASE_URL="postgresql://user:password@localhost:5432/propal?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET"
# Generate a secure secret using: openssl rand -base64 32

# Google OAuth Provider (for NextAuth.js)
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

# AWS S3 (for profile image uploads)
AWS_ACCESS_KEY_ID="YOUR_AWS_ACCESS_KEY_ID"
AWS_SECRET_ACCESS_KEY="YOUR_AWS_SECRET_ACCESS_KEY"
AWS_REGION="your-aws-region" # e.g., us-east-1
AWS_BUCKET_NAME="your-s3-bucket-name"

# Add any other environment variables your application might need.
```

## 📂 File Structure Overview

```
propal-ai/
├── app/                  # Next.js App Router: Main application routes and pages
│   ├── api/              # API routes (e.g., auth, STT config)
│   ├── dashboard/        # Protected dashboard pages
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   ├── layout.tsx        # Root layout (SessionProvider, ThemeProvider, ToastProvider)
│   └── page.tsx          # Home page
├── components/           # Reusable React components
│   ├── auth/             # Authentication-related components (AuthLayout, GoogleSignInButton, PasswordInput)
│   ├── dashboard/        # Dashboard-specific components (DashboardSidebar)
│   ├── providers/        # Context providers (SessionProvider, ThemeProvider, ToastProvider)
│   └── ui/               # Shadcn/ui components
├── lib/                  # Utility functions and core logic
│   ├── auth.ts           # NextAuth.js configuration and server-side session helpers
│   ├── prisma.ts         # Prisma client instance
│   └── utils.ts          # General utility functions (e.g., password validation)
├── prisma/               # Prisma schema and migrations
│   └── schema.prisma     # Database schema definition
├── public/               # Static assets (images, fonts, favicons)
├── types/                # Custom TypeScript type definitions
├── middleware.ts         # NextAuth.js middleware for route protection
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## 💡 How It Works

### Authentication Flow
The application uses **NextAuth.js** with both **Credentials Provider** (email/password) and **Google Provider** for authentication.
*   **Credentials**: Users sign up with an email and password. Passwords are securely hashed using `bcryptjs` before being stored in the PostgreSQL database via Prisma.
*   **Google OAuth**: Users can sign in effortlessly using their Google accounts. NextAuth.js handles the OAuth flow, and user information is stored in the database.
*   **Session Management**: A JWT (JSON Web Token) session strategy is employed, ensuring that authenticated users remain logged in across browser sessions without needing to re-authenticate repeatedly. Session data is accessible in both client and server components.

### Profile Image Logic
User profile images are stored on **AWS S3**. The URL to the image is saved in the PostgreSQL database (`profileImage` field in the `User` model).
*   When rendering the user's avatar in the sidebar or profile pages, the application first checks for the existence of `user.image` (for Google profiles) or `user.profileImage` (for self-uploaded).
*   If an image URL is present, it's displayed using Next.js's `Image` component with a subtle fade-in animation for a smooth loading experience.
*   If no image is found, a fallback is rendered: a circular avatar displaying the first letter of the user's name, styled with Tailwind CSS to match the application's aesthetic.

### Theme Switch Logic
The application supports a dark/light mode toggle for an enhanced user experience. This is implemented using `next-themes` library, which automatically manages the theme based on system preferences or user selection. Tailwind CSS is configured to apply styles dynamically based on the active theme, ensuring a consistent visual appeal.

### Protected Routes
Essential application sections, such as the dashboard (`/dashboard`), settings, and profile pages, are protected using **NextAuth.js middleware**.
*   The `middleware.ts` file acts as a gatekeeper, intercepting requests to specified routes.
*   It checks for an active authenticated session. If a user attempts to access a protected route without being logged in, they are redirected to the login page with an informative toast notification.

### Toast Notification System
A global, accessible toast notification system is integrated using **Sonner**. This provides immediate visual feedback for various user actions:
*   Successful logins and signups.
*   Authentication failures or network errors.
*   Profile updates and settings saves.
*   Confirmation of sign-out.
*   Warnings for unauthorized access attempts.
Toasts appear at the top-center of the screen, with smooth animations and distinct styling for success (green), error (red), warning, and info messages. They are dismissible by the user or auto-disappear after 3-5 seconds.

## 🤝 Contribution Guide

We welcome contributions to the ProPal AI project! If you'd like to extend this application, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b bugfix/issue-description`.
3.  Make your changes and ensure they adhere to the project's coding style (ESLint/Prettier are recommended).
4.  Write clear, concise commit messages.
5.  Push your branch to your forked repository.
6.  Open a pull request to the `main` branch of the original repository, describing your changes in detail.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
