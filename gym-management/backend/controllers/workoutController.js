const Workout = require('../models/Workout');
const User = require('../models/User');

// @desc    Generate personalized workout plan
// @route   POST /api/workout/generate
// @access  Private
const generateWorkoutPlan = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate exercises based on fitness goal
    const exercises = generateExercises(user.fitnessGoal, user.bmiCategory);
    
    // Calculate workout duration
    const duration = calculateWorkoutDuration(exercises);
    
    // Determine difficulty based on user profile
    const difficulty = determineDifficulty(user.age, user.fitnessGoal);

    // Create or update workout plan
    const workoutData = {
      user: user._id,
      fitnessGoal: user.fitnessGoal,
      difficulty,
      duration,
      exercises,
      createdBy: req.user._id
    };

    // Check if user already has a workout plan
    let workout = await Workout.findOne({ user: user._id, isActive: true });
    
    if (workout) {
      // Update existing plan
      workout = await Workout.findByIdAndUpdate(
        workout._id,
        workoutData,
        { new: true }
      );
    } else {
      // Create new plan
      workout = await Workout.create(workoutData);
    }

    res.status(201).json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's workout plan
// @route   GET /api/workout/plan
// @access  Private
const getWorkoutPlan = async (req, res) => {
  try {
    const workout = await Workout.findOne({ 
      user: req.user._id, 
      isActive: true 
    }).populate('user', 'name email');

    if (!workout) {
      return res.status(404).json({ message: 'No workout plan found' });
    }

    res.json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update workout plan
// @route   PUT /api/workout/plan/:id
// @access  Private
const updateWorkoutPlan = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    // Check if user owns the plan or is admin
    if (workout.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedWorkout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper functions
const generateExercises = (fitnessGoal, bmiCategory) => {
  const exerciseLibrary = {
    weight_loss: [
      {
        name: 'Jumping Jacks',
        description: 'Full body cardio exercise to burn calories',
        sets: 3,
        reps: 20,
        duration: 30,
        videoUrl: 'https://www.youtube.com/embed/iSSAk4XCsRA',
        muscleGroup: 'full_body',
        difficulty: 'beginner',
        equipment: 'bodyweight'
      },
      {
        name: 'Burpees',
        description: 'High-intensity exercise combining squat, push-up, and jump',
        sets: 3,
        reps: 10,
        duration: 45,
        videoUrl: 'https://www.youtube.com/embed/dZgVxmf6jkA',
        muscleGroup: 'full_body',
        difficulty: 'intermediate',
        equipment: 'bodyweight'
      },
      {
        name: 'Mountain Climbers',
        description: 'Dynamic core exercise that also works shoulders and legs',
        sets: 3,
        reps: 15,
        duration: 30,
        videoUrl: 'https://www.youtube.com/embed/nmwgirgXLYM',
        muscleGroup: 'core',
        difficulty: 'beginner',
        equipment: 'bodyweight'
      },
      {
        name: 'High Knees',
        description: 'Cardio exercise that targets legs and core',
        sets: 3,
        reps: 20,
        duration: 30,
        videoUrl: 'https://www.youtube.com/embed/oAPCPjnU1wA',
        muscleGroup: 'cardio',
        difficulty: 'beginner',
        equipment: 'bodyweight'
      },
      {
        name: 'Plank',
        description: 'Core strengthening exercise',
        sets: 3,
        reps: 1,
        duration: 60,
        videoUrl: 'https://www.youtube.com/embed/ASdvN_XEl_c',
        muscleGroup: 'core',
        difficulty: 'beginner',
        equipment: 'bodyweight'
      }
    ],
    muscle_gain: [
      {
        name: 'Push-ups',
        description: 'Upper body strength exercise targeting chest, shoulders, and triceps',
        sets: 4,
        reps: 15,
        duration: 0,
        videoUrl: 'https://www.youtube.com/embed/IODxDxX7oi4',
        muscleGroup: 'chest',
        difficulty: 'beginner',
        equipment: 'bodyweight'
      },
      {
        name: 'Squats',
        description: 'Lower body compound exercise for legs and glutes',
        sets: 4,
        reps: 20,
        duration: 0,
        videoUrl: 'https://www.youtube.com/embed/YaXPRqUwItQ',
        muscleGroup: 'legs',
        difficulty: 'beginner',
        equipment: 'bodyweight'
      },
      {
        name: 'Pull-ups',
        description: 'Upper body pulling exercise for back and biceps',
        sets: 3,
        reps: 8,
        duration: 0,
        videoUrl: 'https://www.youtube.com/embed/eGo4IYlbE5g',
        muscleGroup: 'back',
        difficulty: 'intermediate',
        equipment: 'bodyweight'
      },
      {
        name: 'Dips',
        description: 'Tricep and chest exercise using parallel bars',
        sets: 3,
        reps: 12,
        duration: 0,
        videoUrl: 'https://www.youtube.com/embed/2z8JmcrW-As',
        muscleGroup: 'arms',
        difficulty: 'intermediate',
        equipment: 'bodyweight'
      },
      {
        name: 'Lunges',
        description: 'Unilateral leg exercise for balance and strength',
        sets: 3,
        reps: 15,
        duration: 0,
        videoUrl: 'https://www.youtube.com/embed/3XDriUn0udo',
        muscleGroup: 'legs',
        difficulty: 'beginner',
        equipment: 'bodyweight'
      }
    ],
    fitness: [
      {
        name: 'Push-ups',
        description: 'Upper body strength exercise',
        sets: 3,
        reps: 12,
        duration: 0,
        videoUrl: 'https://www.youtube.com/embed/IODxDxX7oi4',
        muscleGroup: 'chest',
        difficulty: 'beginner',
        equipment: 'bodyweight'
      },
      {
        name: 'Squats',
        description: 'Lower body strength exercise',
        sets: 3,
        reps: 15,
        duration: 0,
        videoUrl: 'https://www.youtube.com/embed/YaXPRqUwItQ',
        muscleGroup: 'legs',
        difficulty: 'beginner',
        equipment: 'bodyweight'
      },
      {
        name: 'Plank',
        description: 'Core stability exercise',
        sets: 3,
        reps: 1,
        duration: 45,
        videoUrl: 'https://www.youtube.com/embed/ASdvN_XEl_c',
        muscleGroup: 'core',
        difficulty: 'beginner',
        equipment: 'bodyweight'
      },
      {
        name: 'Jumping Jacks',
        description: 'Cardio exercise for overall fitness',
        sets: 3,
        reps: 15,
        duration: 30,
        videoUrl: 'https://www.youtube.com/embed/iSSAk4XCsRA',
        muscleGroup: 'cardio',
        difficulty: 'beginner',
        equipment: 'bodyweight'
      },
      {
        name: 'Superman',
        description: 'Back strengthening exercise',
        sets: 3,
        reps: 12,
        duration: 0,
        videoUrl: 'https://www.youtube.com/embed/0nXmWqj7eVE',
        muscleGroup: 'back',
        difficulty: 'beginner',
        equipment: 'bodyweight'
      }
    ],
    maintenance: [
      {
        name: 'Walking',
        description: 'Low-impact cardio exercise',
        sets: 1,
        reps: 1,
        duration: 1800, // 30 minutes
        videoUrl: 'https://www.youtube.com/embed/example',
        muscleGroup: 'cardio',
        difficulty: 'beginner',
        equipment: 'bodyweight'
      },
      {
        name: 'Gentle Stretching',
        description: 'Flexibility and mobility exercises',
        sets: 1,
        reps: 1,
        duration: 600, // 10 minutes
        videoUrl: 'https://www.youtube.com/embed/example',
        muscleGroup: 'full_body',
        difficulty: 'beginner',
        equipment: 'bodyweight'
      },
      {
        name: 'Light Yoga',
        description: 'Mind-body exercise for flexibility and strength',
        sets: 1,
        reps: 1,
        duration: 900, // 15 minutes
        videoUrl: 'https://www.youtube.com/embed/example',
        muscleGroup: 'full_body',
        difficulty: 'beginner',
        equipment: 'bodyweight'
      }
    ]
  };

  return exerciseLibrary[fitnessGoal] || exerciseLibrary.fitness;
};

const calculateWorkoutDuration = (exercises) => {
  let totalDuration = 0;
  
  exercises.forEach(exercise => {
    if (exercise.duration > 0) {
      totalDuration += exercise.duration * exercise.sets;
    } else {
      // Estimate time for rep-based exercises (2 seconds per rep)
      totalDuration += (exercise.reps * 2 + 30) * exercise.sets; // 30 seconds rest between sets
    }
  });

  // Add warm-up and cool-down time
  totalDuration += 300; // 5 minutes warm-up
  totalDuration += 180; // 3 minutes cool-down

  return Math.round(totalDuration / 60); // Convert to minutes
};

const determineDifficulty = (age, fitnessGoal) => {
  if (age < 25) {
    return fitnessGoal === 'maintenance' ? 'beginner' : 'intermediate';
  } else if (age < 50) {
    return 'beginner';
  } else {
    return 'beginner';
  }
};

module.exports = {
  generateWorkoutPlan,
  getWorkoutPlan,
  updateWorkoutPlan
};
