const DietPlan = require('../models/DietPlan');
const User = require('../models/User');

// @desc    Generate personalized diet plan
// @route   POST /api/diet/generate
// @access  Private
const generateDietPlan = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate BMR using Harris-Benedict equation
    let bmr;
    if (user.gender === 'male') {
      bmr = 88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * user.age);
    } else {
      bmr = 447.593 + (9.247 * user.weight) + (3.098 * user.height) - (4.330 * user.age);
    }

    // Calculate daily calorie needs based on fitness goal
    let dailyCalories;
    let proteinRatio, carbsRatio, fatsRatio;

    switch (user.fitnessGoal) {
      case 'weight_loss':
        dailyCalories = bmr * 0.85; // 15% deficit
        proteinRatio = 0.35; // 35% protein
        carbsRatio = 0.35; // 35% carbs
        fatsRatio = 0.30; // 30% fats
        break;
      case 'muscle_gain':
        dailyCalories = bmr * 1.15; // 15% surplus
        proteinRatio = 0.30; // 30% protein
        carbsRatio = 0.45; // 45% carbs
        fatsRatio = 0.25; // 25% fats
        break;
      case 'fitness':
        dailyCalories = bmr * 1.05; // 5% surplus
        proteinRatio = 0.25; // 25% protein
        carbsRatio = 0.50; // 50% carbs
        fatsRatio = 0.25; // 25% fats
        break;
      case 'maintenance':
        dailyCalories = bmr;
        proteinRatio = 0.20; // 20% protein
        carbsRatio = 0.55; // 55% carbs
        fatsRatio = 0.25; // 25% fats
        break;
      default:
        dailyCalories = bmr;
        proteinRatio = 0.25;
        carbsRatio = 0.50;
        fatsRatio = 0.25;
    }

    // Calculate macronutrients
    const totalProtein = Math.round((dailyCalories * proteinRatio) / 4); // 4 calories per gram
    const totalCarbs = Math.round((dailyCalories * carbsRatio) / 4); // 4 calories per gram
    const totalFats = Math.round((dailyCalories * fatsRatio) / 9); // 9 calories per gram

    // Generate meals based on fitness goal and BMI
    const breakfast = generateBreakfast(user.fitnessGoal, user.bmiCategory, dailyCalories * 0.25);
    const lunch = generateLunch(user.fitnessGoal, user.bmiCategory, dailyCalories * 0.35);
    const dinner = generateDinner(user.fitnessGoal, user.bmiCategory, dailyCalories * 0.30);
    const snacks = generateSnacks(user.fitnessGoal, user.bmiCategory, dailyCalories * 0.10);

    // Create or update diet plan
    const dietPlanData = {
      user: user._id,
      fitnessGoal: user.fitnessGoal,
      bmiCategory: user.bmiCategory,
      totalCalories: Math.round(dailyCalories),
      totalProtein,
      totalCarbs,
      totalFats,
      breakfast,
      lunch,
      dinner,
      snacks,
      createdBy: req.user._id
    };

    // Check if user already has a diet plan
    let dietPlan = await DietPlan.findOne({ user: user._id, isActive: true });
    
    if (dietPlan) {
      // Update existing plan
      dietPlan = await DietPlan.findByIdAndUpdate(
        dietPlan._id,
        dietPlanData,
        { new: true }
      );
    } else {
      // Create new plan
      dietPlan = await DietPlan.create(dietPlanData);
    }

    res.status(201).json(dietPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's diet plan
// @route   GET /api/diet/plan
// @access  Private
const getDietPlan = async (req, res) => {
  try {
    const dietPlan = await DietPlan.findOne({ 
      user: req.user._id, 
      isActive: true 
    }).populate('user', 'name email');

    if (!dietPlan) {
      return res.status(404).json({ message: 'No diet plan found' });
    }

    res.json(dietPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update diet plan
// @route   PUT /api/diet/plan/:id
// @access  Private
const updateDietPlan = async (req, res) => {
  try {
    const dietPlan = await DietPlan.findById(req.params.id);

    if (!dietPlan) {
      return res.status(404).json({ message: 'Diet plan not found' });
    }

    // Check if user owns the plan or is admin
    if (dietPlan.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedPlan = await DietPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper functions to generate meals
const generateBreakfast = (fitnessGoal, bmiCategory, calories) => {
  const meals = {
    weight_loss: {
      name: 'Protein-Rich Breakfast Bowl',
      description: 'A nutritious breakfast to kickstart your metabolism',
      calories: Math.round(calories),
      protein: Math.round(calories * 0.4 / 4),
      carbs: Math.round(calories * 0.3 / 4),
      fats: Math.round(calories * 0.3 / 9),
      ingredients: ['Greek yogurt', 'Berries', 'Nuts', 'Honey'],
      instructions: 'Mix Greek yogurt with berries, top with nuts and drizzle honey.'
    },
    muscle_gain: {
      name: 'Power Protein Breakfast',
      description: 'High-protein breakfast for muscle building',
      calories: Math.round(calories),
      protein: Math.round(calories * 0.35 / 4),
      carbs: Math.round(calories * 0.45 / 4),
      fats: Math.round(calories * 0.2 / 9),
      ingredients: ['Eggs', 'Oatmeal', 'Banana', 'Peanut butter'],
      instructions: 'Scramble eggs, cook oatmeal, add banana and peanut butter.'
    },
    fitness: {
      name: 'Balanced Fitness Breakfast',
      description: 'Well-rounded breakfast for overall fitness',
      calories: Math.round(calories),
      protein: Math.round(calories * 0.25 / 4),
      carbs: Math.round(calories * 0.55 / 4),
      fats: Math.round(calories * 0.2 / 9),
      ingredients: ['Whole grain bread', 'Avocado', 'Eggs', 'Spinach'],
      instructions: 'Toast bread, spread avocado, add poached eggs and spinach.'
    },
    maintenance: {
      name: 'Healthy Maintenance Breakfast',
      description: 'Sustaining breakfast for weight maintenance',
      calories: Math.round(calories),
      protein: Math.round(calories * 0.2 / 4),
      carbs: Math.round(calories * 0.6 / 4),
      fats: Math.round(calories * 0.2 / 9),
      ingredients: ['Cereal', 'Milk', 'Fruits', 'Nuts'],
      instructions: 'Mix cereal with milk, add fresh fruits and nuts.'
    }
  };

  return meals[fitnessGoal] || meals.maintenance;
};

const generateLunch = (fitnessGoal, bmiCategory, calories) => {
  const meals = {
    weight_loss: {
      name: 'Lean Protein Salad',
      description: 'Light and nutritious lunch for weight loss',
      calories: Math.round(calories),
      protein: Math.round(calories * 0.4 / 4),
      carbs: Math.round(calories * 0.25 / 4),
      fats: Math.round(calories * 0.35 / 9),
      ingredients: ['Grilled chicken', 'Mixed greens', 'Vegetables', 'Olive oil'],
      instructions: 'Grill chicken, mix with greens and vegetables, drizzle with olive oil.'
    },
    muscle_gain: {
      name: 'Muscle Building Bowl',
      description: 'Protein and carb-rich lunch for muscle growth',
      calories: Math.round(calories),
      protein: Math.round(calories * 0.3 / 4),
      carbs: Math.round(calories * 0.5 / 4),
      fats: Math.round(calories * 0.2 / 9),
      ingredients: ['Brown rice', 'Salmon', 'Broccoli', 'Sweet potato'],
      instructions: 'Cook brown rice, grill salmon, steam broccoli and sweet potato.'
    },
    fitness: {
      name: 'Fitness Fuel Lunch',
      description: 'Balanced lunch for active lifestyle',
      calories: Math.round(calories),
      protein: Math.round(calories * 0.25 / 4),
      carbs: Math.round(calories * 0.55 / 4),
      fats: Math.round(calories * 0.2 / 9),
      ingredients: ['Quinoa', 'Tuna', 'Mixed vegetables', 'Olive oil'],
      instructions: 'Cook quinoa, mix with tuna and vegetables, drizzle with olive oil.'
    },
    maintenance: {
      name: 'Maintenance Lunch',
      description: 'Satisfying lunch for weight maintenance',
      calories: Math.round(calories),
      protein: Math.round(calories * 0.2 / 4),
      carbs: Math.round(calories * 0.6 / 4),
      fats: Math.round(calories * 0.2 / 9),
      ingredients: ['Pasta', 'Lean meat', 'Tomato sauce', 'Vegetables'],
      instructions: 'Cook pasta, add lean meat and tomato sauce, serve with vegetables.'
    }
  };

  return meals[fitnessGoal] || meals.maintenance;
};

const generateDinner = (fitnessGoal, bmiCategory, calories) => {
  const meals = {
    weight_loss: {
      name: 'Light Protein Dinner',
      description: 'Light dinner to support weight loss',
      calories: Math.round(calories),
      protein: Math.round(calories * 0.45 / 4),
      carbs: Math.round(calories * 0.2 / 4),
      fats: Math.round(calories * 0.35 / 9),
      ingredients: ['Fish', 'Asparagus', 'Cauliflower rice', 'Lemon'],
      instructions: 'Grill fish, steam asparagus, prepare cauliflower rice, squeeze lemon.'
    },
    muscle_gain: {
      name: 'Recovery Dinner',
      description: 'Nutrient-rich dinner for muscle recovery',
      calories: Math.round(calories),
      protein: Math.round(calories * 0.3 / 4),
      carbs: Math.round(calories * 0.45 / 4),
      fats: Math.round(calories * 0.25 / 9),
      ingredients: ['Lean beef', 'Potatoes', 'Green beans', 'Herbs'],
      instructions: 'Grill lean beef, bake potatoes, steam green beans, add herbs.'
    },
    fitness: {
      name: 'Fitness Dinner',
      description: 'Balanced dinner for fitness enthusiasts',
      calories: Math.round(calories),
      protein: Math.round(calories * 0.25 / 4),
      carbs: Math.round(calories * 0.5 / 4),
      fats: Math.round(calories * 0.25 / 9),
      ingredients: ['Chicken breast', 'Wild rice', 'Mixed vegetables', 'Herbs'],
      instructions: 'Grill chicken breast, cook wild rice, steam vegetables, add herbs.'
    },
    maintenance: {
      name: 'Comfort Dinner',
      description: 'Satisfying dinner for maintenance',
      calories: Math.round(calories),
      protein: Math.round(calories * 0.2 / 4),
      carbs: Math.round(calories * 0.55 / 4),
      fats: Math.round(calories * 0.25 / 9),
      ingredients: ['Pork tenderloin', 'Mashed potatoes', 'Carrots', 'Gravy'],
      instructions: 'Roast pork tenderloin, prepare mashed potatoes, cook carrots, make gravy.'
    }
  };

  return meals[fitnessGoal] || meals.maintenance;
};

const generateSnacks = (fitnessGoal, bmiCategory, calories) => {
  const snacks = {
    weight_loss: [
      {
        name: 'Protein Smoothie',
        description: 'Low-calorie protein boost',
        calories: Math.round(calories * 0.5),
        protein: Math.round(calories * 0.5 * 0.5 / 4),
        carbs: Math.round(calories * 0.5 * 0.3 / 4),
        fats: Math.round(calories * 0.5 * 0.2 / 9),
        ingredients: ['Protein powder', 'Almond milk', 'Berries'],
        instructions: 'Blend protein powder with almond milk and berries.'
      }
    ],
    muscle_gain: [
      {
        name: 'Protein Bar',
        description: 'High-protein snack for muscle building',
        calories: Math.round(calories * 0.6),
        protein: Math.round(calories * 0.6 * 0.4 / 4),
        carbs: Math.round(calories * 0.6 * 0.4 / 4),
        fats: Math.round(calories * 0.6 * 0.2 / 9),
        ingredients: ['Protein bar', 'Nuts', 'Dried fruits'],
        instructions: 'Eat protein bar with nuts and dried fruits.'
      }
    ],
    fitness: [
      {
        name: 'Energy Balls',
        description: 'Natural energy boost',
        calories: Math.round(calories * 0.5),
        protein: Math.round(calories * 0.5 * 0.2 / 4),
        carbs: Math.round(calories * 0.5 * 0.6 / 4),
        fats: Math.round(calories * 0.5 * 0.2 / 9),
        ingredients: ['Dates', 'Nuts', 'Oats', 'Honey'],
        instructions: 'Blend dates, nuts, oats, and honey, roll into balls.'
      }
    ],
    maintenance: [
      {
        name: 'Mixed Nuts',
        description: 'Healthy snack for maintenance',
        calories: Math.round(calories * 0.5),
        protein: Math.round(calories * 0.5 * 0.15 / 4),
        carbs: Math.round(calories * 0.5 * 0.25 / 4),
        fats: Math.round(calories * 0.5 * 0.6 / 9),
        ingredients: ['Almonds', 'Walnuts', 'Cashews'],
        instructions: 'Mix almonds, walnuts, and cashews.'
      }
    ]
  };

  return snacks[fitnessGoal] || snacks.maintenance;
};

module.exports = {
  generateDietPlan,
  getDietPlan,
  updateDietPlan
};
