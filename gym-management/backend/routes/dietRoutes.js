const express = require('express');
const router = express.Router();
const {
  generateDietPlan,
  getDietPlan,
  updateDietPlan
} = require('../controllers/dietController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

router.post('/generate', generateDietPlan);
router.get('/plan', getDietPlan);
router.put('/plan/:id', updateDietPlan);

module.exports = router;
