# 🏋️‍♂️ Gym Management System

A comprehensive full-stack web application for gym management with personalized fitness plans, diet recommendations, and user management.

## ✨ Features

### 🔐 User Authentication
- Secure JWT-based authentication
- User registration with comprehensive profile data
- Password hashing with bcrypt
- Role-based access control (User/Admin)

### 📊 BMI Calculator
- Automatic BMI calculation and categorization
- Real-time BMI updates based on user data
- Visual BMI status indicators

### 🥗 Personalized Diet Plans
- AI-generated meal plans based on fitness goals
- Comprehensive nutrition information
- Detailed meal breakdowns (breakfast, lunch, dinner, snacks)
- Ingredient lists and cooking instructions

### 💪 Workout Plans
- Personalized exercise routines
- Video demonstrations for each exercise
- Exercise categorization by muscle group and difficulty
- Sets, reps, and duration tracking

### 📈 User Dashboard
- BMI tracking and progress visualization
- Interactive charts using Chart.js
- Quick access to diet and workout plans
- Progress tracking and statistics

### 👨‍💼 Admin Panel
- Complete user management system
- Diet and workout plan management
- System statistics and analytics
- Subscription and payment tracking

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **CORS**: Cross-origin resource sharing

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Charts**: Chart.js with react-chartjs-2
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: React Context API

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd gym-management/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/gym-management
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRE=30d
   NODE_ENV=development
   ```

4. Start MongoDB service

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Seed the database with sample data:
   ```bash
   npm run seed
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd gym-management/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## 👥 Sample Users

After running the seed script, you'll have access to these accounts:

### Admin User
- **Email**: admin@gym.com
- **Password**: admin123

### Sample Users
- **John Doe** (Muscle Gain): john@example.com / password123
- **Jane Smith** (Weight Loss): jane@example.com / password123
- **Mike Johnson** (Fitness): mike@example.com / password123
- **Sarah Wilson** (Maintenance): sarah@example.com / password123

## 📁 Project Structure

```
gym-management/
├── backend/                 # Node.js/Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── server.js           # Main server file
│   ├── seedData.js         # Database seeding
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main app component
│   │   └── index.css       # Global styles
│   ├── tailwind.config.js  # Tailwind configuration
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/calculate-bmi` - Calculate BMI

### Diet Plans
- `POST /api/diet/generate` - Generate personalized diet plan
- `GET /api/diet/plan` - Get user's diet plan
- `PUT /api/diet/plan/:id` - Update diet plan

### Workout Plans
- `POST /api/workout/generate` - Generate personalized workout plan
- `GET /api/workout/plan` - Get user's workout plan
- `PUT /api/workout/plan/:id` - Update workout plan

### Admin Routes
- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/diet-plans` - Get all diet plans
- `GET /api/admin/workout-plans` - Get all workout plans
- `GET /api/admin/subscriptions` - Get all subscriptions

## 🎨 Features in Detail

### BMI Calculation
The system automatically calculates BMI using the formula: `BMI = weight(kg) / (height(m)²)`

**BMI Categories:**
- Underweight: < 18.5
- Normal: 18.5 - 24.9
- Overweight: 25.0 - 29.9
- Obese: ≥ 30.0

### Diet Plan Generation
Diet plans are generated based on:
- User's fitness goal (weight loss, muscle gain, fitness, maintenance)
- BMI category
- Age, gender, height, and weight
- BMR calculation using Harris-Benedict equation

### Workout Plan Generation
Workout plans include:
- Exercise selection based on fitness goals
- Video demonstrations for each exercise
- Sets, reps, and duration specifications
- Difficulty level assessment
- Muscle group targeting

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Middleware for route protection
- **Input Validation**: Comprehensive form validation
- **CORS Configuration**: Cross-origin resource sharing setup
- **Error Handling**: Proper error responses and logging

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes and orientations

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables for production
2. Configure MongoDB connection
3. Deploy to platforms like Heroku, Railway, or AWS

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to platforms like:
   - Vercel
   - Netlify
   - AWS S3
   - GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add proper documentation
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
1. Check the documentation in each directory
2. Review the API endpoints
3. Check the console for error messages
4. Ensure all dependencies are installed

## 🔮 Future Enhancements

- [ ] Real-time notifications
- [ ] Social features and sharing
- [ ] Advanced analytics and reporting
- [ ] Mobile app development
- [ ] Integration with fitness trackers
- [ ] Payment processing
- [ ] Video upload functionality
- [ ] Advanced workout scheduling

---

**Built with ❤️ using the MERN stack**
