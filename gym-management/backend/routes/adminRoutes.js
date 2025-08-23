const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getDietPlans,
  getDietPlanById,
  updateDietPlan,
  getWorkoutPlans,
  getWorkoutPlanById,
  updateWorkoutPlan,
  getSubscriptions,
  getSubscriptionById,
  updateSubscription,
  getDashboardStats
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// All routes are protected and require admin access
router.use(protect);
router.use(admin);

// Dashboard
router.get('/dashboard', getDashboardStats);

// User management
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Diet plan management
router.get('/diet-plans', getDietPlans);
router.get('/diet-plans/:id', getDietPlanById);
router.put('/diet-plans/:id', updateDietPlan);

// Workout plan management
router.get('/workout-plans', getWorkoutPlans);
router.get('/workout-plans/:id', getWorkoutPlanById);
router.put('/workout-plans/:id', updateWorkoutPlan);

// Subscription management
router.get('/subscriptions', getSubscriptions);
router.get('/subscriptions/:id', getSubscriptionById);
router.put('/subscriptions/:id', updateSubscription);

module.exports = router;
