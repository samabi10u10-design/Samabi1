const User = require('../models/User');
const DietPlan = require('../models/DietPlan');
const Workout = require('../models/Workout');
const Subscription = require('../models/Subscription');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all diet plans
// @route   GET /api/admin/diet-plans
// @access  Private/Admin
const getDietPlans = async (req, res) => {
  try {
    const dietPlans = await DietPlan.find({})
      .populate('user', 'name email')
      .populate('createdBy', 'name');
    
    res.json(dietPlans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get diet plan by ID
// @route   GET /api/admin/diet-plans/:id
// @access  Private/Admin
const getDietPlanById = async (req, res) => {
  try {
    const dietPlan = await DietPlan.findById(req.params.id)
      .populate('user', 'name email')
      .populate('createdBy', 'name');

    if (!dietPlan) {
      return res.status(404).json({ message: 'Diet plan not found' });
    }

    res.json(dietPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update diet plan
// @route   PUT /api/admin/diet-plans/:id
// @access  Private/Admin
const updateDietPlan = async (req, res) => {
  try {
    const dietPlan = await DietPlan.findById(req.params.id);

    if (!dietPlan) {
      return res.status(404).json({ message: 'Diet plan not found' });
    }

    const updatedPlan = await DietPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('user', 'name email');

    res.json(updatedPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all workout plans
// @route   GET /api/admin/workout-plans
// @access  Private/Admin
const getWorkoutPlans = async (req, res) => {
  try {
    const workoutPlans = await Workout.find({})
      .populate('user', 'name email')
      .populate('createdBy', 'name');
    
    res.json(workoutPlans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get workout plan by ID
// @route   GET /api/admin/workout-plans/:id
// @access  Private/Admin
const getWorkoutPlanById = async (req, res) => {
  try {
    const workoutPlan = await Workout.findById(req.params.id)
      .populate('user', 'name email')
      .populate('createdBy', 'name');

    if (!workoutPlan) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    res.json(workoutPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update workout plan
// @route   PUT /api/admin/workout-plans/:id
// @access  Private/Admin
const updateWorkoutPlan = async (req, res) => {
  try {
    const workoutPlan = await Workout.findById(req.params.id);

    if (!workoutPlan) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    const updatedPlan = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('user', 'name email');

    res.json(updatedPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all subscriptions
// @route   GET /api/admin/subscriptions
// @access  Private/Admin
const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({})
      .populate('user', 'name email');
    
    res.json(subscriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get subscription by ID
// @route   GET /api/admin/subscriptions/:id
// @access  Private/Admin
const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id)
      .populate('user', 'name email');

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update subscription
// @route   PUT /api/admin/subscriptions/:id
// @access  Private/Admin
const updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('user', 'name email');

    res.json(updatedSubscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const activeUsers = await User.countDocuments({ isActive: true });
    const totalDietPlans = await DietPlan.countDocuments({});
    const totalWorkoutPlans = await Workout.countDocuments({});
    const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });

    // Get recent users
    const recentUsers = await User.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email createdAt');

    // Get recent subscriptions
    const recentSubscriptions = await Subscription.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');

    res.json({
      stats: {
        totalUsers,
        activeUsers,
        totalDietPlans,
        totalWorkoutPlans,
        activeSubscriptions
      },
      recentUsers,
      recentSubscriptions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
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
};
