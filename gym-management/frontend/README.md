# Gym Management Frontend

A modern, responsive React frontend for the Gym Management System built with Vite, React, and Tailwind CSS.

## Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **User Authentication**: Login/register with JWT token management
- **Dashboard**: BMI tracking, progress charts, and quick actions
- **Workout Plans**: Personalized exercises with video demonstrations
- **Diet Plans**: Comprehensive meal plans with nutrition information
- **Admin Panel**: User management and system overview
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Charts**: Chart.js with react-chartjs-2
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: React Context API

## Installation

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

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation component
│   ├── ProtectedRoute.jsx  # Route protection
│   └── AdminRoute.jsx  # Admin route protection
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication context
├── pages/              # Page components
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   ├── Dashboard.jsx   # User dashboard
│   ├── WorkoutPlan.jsx # Workout plan page
│   ├── DietPlan.jsx    # Diet plan page
│   └── AdminPanel.jsx  # Admin panel
├── services/           # API services
│   ├── authService.js  # Authentication API calls
│   ├── dietService.js  # Diet plan API calls
│   └── workoutService.js # Workout plan API calls
├── utils/              # Utility functions
├── App.jsx             # Main app component
└── index.css           # Global styles
```

## Key Features

### Authentication
- Secure login/register forms with validation
- JWT token management
- Protected routes
- User profile management

### Dashboard
- BMI calculation and categorization
- Progress tracking with charts
- Quick access to workout and diet plans
- User statistics overview

### Workout Plans
- Personalized exercise routines
- Video demonstrations for each exercise
- Exercise details (sets, reps, duration)
- Difficulty and muscle group categorization

### Diet Plans
- Comprehensive meal plans
- Nutritional information (calories, protein, carbs, fats)
- Ingredient lists and cooking instructions
- Meal categorization (breakfast, lunch, dinner, snacks)

### Admin Panel
- User management overview
- System statistics
- Quick actions for common tasks
- Recent activity feed

## API Integration

The frontend communicates with the backend API through service modules:

- **authService.js**: Handles user authentication and profile management
- **dietService.js**: Manages diet plan generation and retrieval
- **workoutService.js**: Handles workout plan operations

All API calls include automatic token management and error handling.

## Styling

The application uses Tailwind CSS for styling with:
- Custom color palette (primary, secondary)
- Responsive design utilities
- Component-based styling approach
- Dark/light mode support ready

## Development

- **Development server**: `npm run dev` (runs on port 5173)
- **Build for production**: `npm run build`
- **Preview build**: `npm run preview`

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Fast development with Vite
- Optimized production builds
- Lazy loading for better performance
- Efficient state management

## Security

- JWT token authentication
- Protected routes
- Input validation
- XSS protection
- CSRF protection ready

## Contributing

1. Follow the existing code style
2. Use meaningful component and variable names
3. Add proper error handling
4. Test on multiple screen sizes
5. Update documentation as needed

## Deployment

The application can be deployed to any static hosting service:

1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables for production
4. Update API endpoints for production backend

## Troubleshooting

### Common Issues

1. **API Connection Errors**: Ensure the backend server is running on port 5000
2. **Authentication Issues**: Check JWT token storage and API endpoints
3. **Styling Issues**: Verify Tailwind CSS is properly configured
4. **Build Errors**: Clear node_modules and reinstall dependencies

### Development Tips

- Use React Developer Tools for debugging
- Check browser console for API errors
- Test responsive design on different screen sizes
- Validate forms before submission
