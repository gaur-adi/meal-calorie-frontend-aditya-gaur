# MealCalory - Meal Calorie Tracking Application

A modern, user-friendly web application for tracking meal calories and nutritional information, built with Next.js, Material UI, and Prisma.

![MealCalory App](/public/readme-header.png)

## Features

- **User Authentication**: Secure signup, login, and session management
- **Meal Tracking**: Log meals with portion sizes and calorie information
- **Meal History**: View and manage your logged meal history
- **Calorie Calculation**: Automatically calculate total calories based on servings
- **Responsive Design**: Optimized for both desktop and mobile devices

## Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: UI component library
- **Material UI 7**: Modern component library for styling
- **Zustand**: State management
- **React Hook Form**: Form handling with validation
- **Axios**: HTTP client for API requests

### Backend
- **Next.js API Routes**: Server-side functionality
- **Prisma 6**: ORM for database operations
- **MongoDB**: Database for storing user and meal data
- **JWT**: Authentication with JSON Web Tokens
- **Bcrypt**: Password hashing and security

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB database (local or cloud-hosted)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/meal-calory.git
   cd meal-calory
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables by creating a `.env.local` file:
   ```
   DATABASE_URL="your_mongodb_connection_string"
   JWT_SECRET="your_jwt_secret_key"
   ```

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── prisma/               # Database schema and migrations
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/              # Utility functions
│   ├── middleware.ts     # Next.js middleware for auth
│   ├── stores/           # Zustand state stores
│   └── types/            # TypeScript type definitions
├── .env.local            # Environment variables (create this)
└── package.json          # Project dependencies
```

## Main Features Explained

### Authentication

- Sign up with email, password, and profile details
- JWT-based authentication with secure cookie storage
- Protected routes and API endpoints

### Dashboard

The dashboard is the main interface where users can:
- Input meal information with the meal form
- See calculated calorie information in real-time
- View their meal history with filtering options

### Meal Tracking

- Add meals with dish name, servings, and calorie information
- Automatically calculate total calories
- Save meals to your history for future reference

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Next.js team for the amazing framework
- Material UI for the component library
- Prisma team for the ORM
- All contributors and users of this application
