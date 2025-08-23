import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { workoutService } from '../services/workoutService';
import { 
  PlayIcon, 
  FireIcon, 
  ClockIcon,
  UserGroupIcon,
  PlusIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const WorkoutPlan = () => {
  const { user } = useAuth();
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchWorkoutPlan();
  }, []);

  const fetchWorkoutPlan = async () => {
    try {
      setLoading(true);
      const plan = await workoutService.getWorkoutPlan();
      setWorkoutPlan(plan);
    } catch (error) {
      console.error('Error fetching workout plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateWorkoutPlan = async () => {
    try {
      setGenerating(true);
      const plan = await workoutService.generateWorkoutPlan();
      setWorkoutPlan(plan);
    } catch (error) {
      console.error('Error generating workout plan:', error);
    } finally {
      setGenerating(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMuscleGroupColor = (muscleGroup) => {
    const colors = {
      chest: 'bg-red-100 text-red-800',
      back: 'bg-blue-100 text-blue-800',
      shoulders: 'bg-purple-100 text-purple-800',
      arms: 'bg-pink-100 text-pink-800',
      legs: 'bg-green-100 text-green-800',
      core: 'bg-orange-100 text-orange-800',
      full_body: 'bg-indigo-100 text-indigo-800',
      cardio: 'bg-teal-100 text-teal-800'
    };
    return colors[muscleGroup] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Workout Plan</h1>
            <p className="text-gray-600">
              Personalized exercises based on your fitness goal: {user?.fitnessGoal?.replace('_', ' ')}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              generateWorkoutPlan();
            }}
            disabled={generating}
            className="btn-primary flex items-center"
          >
            {generating ? (
              <ArrowPathIcon className="h-5 w-5 animate-spin mr-2" />
            ) : (
              <PlusIcon className="h-5 w-5 mr-2" />
            )}
            {generating ? 'Generating...' : 'Generate New Plan'}
          </button>
        </div>
      </div>

      {!workoutPlan ? (
        /* No Plan State */
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <FireIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Workout Plan Found</h3>
          <p className="text-gray-600 mb-6">
            Generate a personalized workout plan based on your fitness goals and preferences.
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              generateWorkoutPlan();
            }}
            disabled={generating}
            className="btn-primary"
          >
            {generating ? 'Generating...' : 'Generate Workout Plan'}
          </button>
        </div>
      ) : (
        /* Workout Plan Display */
        <div className="space-y-6">
          {/* Plan Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <ClockIcon className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Duration</p>
                  <p className="text-2xl font-bold text-gray-900">{workoutPlan.duration} min</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <FireIcon className="h-8 w-8 text-orange-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Exercises</p>
                  <p className="text-2xl font-bold text-gray-900">{workoutPlan.exercises?.length || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <UserGroupIcon className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Difficulty</p>
                  <span className={`inline-flex px-2 py-1 text-sm font-semibold rounded-full ${getDifficultyColor(workoutPlan.difficulty)}`}>
                    {workoutPlan.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Exercises List */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Exercises</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {workoutPlan.exercises?.map((exercise, index) => (
                <div key={index} className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Exercise Number */}
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-600">{index + 1}</span>
                    </div>

                    {/* Exercise Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{exercise.name}</h3>
                        <div className="flex space-x-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(exercise.difficulty)}`}>
                            {exercise.difficulty}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMuscleGroupColor(exercise.muscleGroup)}`}>
                            {exercise.muscleGroup.replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-3">{exercise.description}</p>

                      {/* Exercise Details */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm font-medium text-gray-600">Sets</p>
                          <p className="text-lg font-semibold text-gray-900">{exercise.sets}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm font-medium text-gray-600">Reps</p>
                          <p className="text-lg font-semibold text-gray-900">{exercise.reps}</p>
                        </div>
                        {exercise.duration > 0 && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-sm font-medium text-gray-600">Duration</p>
                            <p className="text-lg font-semibold text-gray-900">{exercise.duration}s</p>
                          </div>
                        )}
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm font-medium text-gray-600">Equipment</p>
                          <p className="text-sm font-semibold text-gray-900 capitalize">{exercise.equipment.replace('_', ' ')}</p>
                        </div>
                      </div>

                      {/* Video Demo */}
                      <div className="bg-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-900">Exercise Demo</h4>
                          <PlayIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                          <iframe
                            src={exercise.videoUrl}
                            title={`${exercise.name} demo`}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workout Tips */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Workout Tips</h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Warm up for 5-10 minutes before starting your workout
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Maintain proper form throughout each exercise
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Take 30-60 seconds rest between sets
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Stay hydrated and listen to your body
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Cool down with stretching after your workout
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlan;
