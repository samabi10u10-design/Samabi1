const express = require('express');
const router = express.Router();
const {
  generateWorkoutPlan,
  getWorkoutPlan,
  updateWorkoutPlan
} = require('../controllers/workoutController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

router.post('/generate', generateWorkoutPlan);
router.get('/plan', getWorkoutPlan);
router.put('/plan/:id', updateWorkoutPlan);

module.exports = router;
