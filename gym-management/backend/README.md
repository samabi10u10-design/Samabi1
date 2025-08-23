# Gym Management Backend

A comprehensive backend API for a gym management system built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **BMI Calculator**: Automatic BMI calculation and categorization
- **Personalized Diet Plans**: AI-generated diet plans based on user goals and BMI
- **Workout Plans**: Customized workout routines with video demonstrations
- **Admin Panel**: Complete user and plan management system
- **Subscription Management**: Basic subscription and payment tracking

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **CORS**: Cross-origin resource sharing enabled

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd gym-management/backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/gym-management
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRE=30d
   NODE_ENV=development
   ```

5. Start MongoDB service

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Seed the database with sample data:
   ```bash
   npm run seed
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)
- `POST /api/auth/calculate-bmi` - Calculate BMI

### Diet Plans
- `POST /api/diet/generate` - Generate personalized diet plan (protected)
- `GET /api/diet/plan` - Get user's diet plan (protected)
- `PUT /api/diet/plan/:id` - Update diet plan (protected)

### Workout Plans
- `POST /api/workout/generate` - Generate personalized workout plan (protected)
- `GET /api/workout/plan` - Get user's workout plan (protected)
- `PUT /api/workout/plan/:id` - Update workout plan (protected)

### Admin Routes (Admin only)
- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/diet-plans` - Get all diet plans
- `PUT /api/admin/diet-plans/:id` - Update diet plan
- `GET /api/admin/workout-plans` - Get all workout plans
- `PUT /api/admin/workout-plans/:id` - Update workout plan
- `GET /api/admin/subscriptions` - Get all subscriptions
- `PUT /api/admin/subscriptions/:id` - Update subscription

## Sample Data

After running the seed script, you'll have:

**Admin User:**
- Email: admin@gym.com
- Password: admin123

**Sample Users:**
- john@example.com / password123 (Muscle Gain)
- jane@example.com / password123 (Weight Loss)
- mike@example.com / password123 (Fitness)
- sarah@example.com / password123 (Maintenance)

## Database Models

### User
- Personal information (name, age, gender, height, weight)
- Fitness goals
- BMI calculation
- Authentication data

### DietPlan
- Personalized meal plans
- Macronutrient breakdown
- Meal details (breakfast, lunch, dinner, snacks)

### Workout
- Exercise routines
- Video demonstrations
- Sets, reps, and duration
- Muscle group targeting

### Subscription
- Plan types and pricing
- Payment status
- Duration and renewal settings

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected routes with middleware
- Input validation and sanitization
- CORS configuration

## Development

- **Development server**: `npm run dev` (uses nodemon for auto-restart)
- **Production server**: `npm start`
- **Database seeding**: `npm run seed`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/gym-management |
| JWT_SECRET | JWT signing secret | your-super-secret-jwt-key-change-in-production |
| JWT_EXPIRE | JWT expiration time | 30d |
| NODE_ENV | Environment | development |

## Error Handling

The API includes comprehensive error handling:
- Validation errors
- Authentication errors
- Database errors
- General server errors

All errors return appropriate HTTP status codes and descriptive messages.
