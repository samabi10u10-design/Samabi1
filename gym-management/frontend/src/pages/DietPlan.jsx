import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dietService } from '../services/dietService';
import { 
  CakeIcon, 
  PlusIcon, 
  ArrowPathIcon,
  ClockIcon,
  ScaleIcon,
  FireIcon
} from '@heroicons/react/24/outline';

const DietPlan = () => {
  const { user } = useAuth();
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchDietPlan();
  }, []);

  const fetchDietPlan = async () => {
    try {
      setLoading(true);
      const plan = await dietService.getDietPlan();
      setDietPlan(plan);
    } catch (error) {
      console.error('Error fetching diet plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateDietPlan = async () => {
    try {
      setGenerating(true);
      const plan = await dietService.generateDietPlan();
      setDietPlan(plan);
    } catch (error) {
      console.error('Error generating diet plan:', error);
    } finally {
      setGenerating(false);
    }
  };

  const getMealIcon = (mealType) => {
    switch (mealType) {
      case 'breakfast':
        return '🌅';
      case 'lunch':
        return '☀️';
      case 'dinner':
        return '🌙';
      case 'snacks':
        return '🍎';
      default:
        return '🍽️';
    }
  };

  const getMealColor = (mealType) => {
    switch (mealType) {
      case 'breakfast':
        return 'bg-yellow-100 text-yellow-800';
      case 'lunch':
        return 'bg-orange-100 text-orange-800';
      case 'dinner':
        return 'bg-purple-100 text-purple-800';
      case 'snacks':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
            <h1 className="text-2xl font-bold text-gray-900">Diet Plan</h1>
            <p className="text-gray-600">
              Personalized nutrition based on your fitness goal: {user?.fitnessGoal?.replace('_', ' ')}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              generateDietPlan();
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

      {!dietPlan ? (
        /* No Plan State */
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <CakeIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Diet Plan Found</h3>
          <p className="text-gray-600 mb-6">
            Generate a personalized diet plan based on your fitness goals and nutritional needs.
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              generateDietPlan();
            }}
            disabled={generating}
            className="btn-primary"
          >
            {generating ? 'Generating...' : 'Generate Diet Plan'}
          </button>
        </div>
      ) : (
        /* Diet Plan Display */
        <div className="space-y-6">
          {/* Nutrition Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <FireIcon className="h-8 w-8 text-red-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Calories</p>
                  <p className="text-2xl font-bold text-gray-900">{dietPlan.totalCalories}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <ScaleIcon className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Protein</p>
                  <p className="text-2xl font-bold text-gray-900">{dietPlan.totalProtein}g</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <CakeIcon className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Carbs</p>
                  <p className="text-2xl font-bold text-gray-900">{dietPlan.totalCarbs}g</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <ClockIcon className="h-8 w-8 text-yellow-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Fats</p>
                  <p className="text-2xl font-bold text-gray-900">{dietPlan.totalFats}g</p>
                </div>
              </div>
            </div>
          </div>

          {/* Meals */}
          <div className="space-y-6">
            {/* Breakfast */}
            {dietPlan.breakfast && (
              <div className="bg-white rounded-lg shadow-md">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getMealIcon('breakfast')}</span>
                    <h2 className="text-lg font-semibold text-gray-900">Breakfast</h2>
                    <span className={`ml-auto inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMealColor('breakfast')}`}>
                      {dietPlan.breakfast.calories} cal
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{dietPlan.breakfast.name}</h3>
                  <p className="text-gray-600 mb-4">{dietPlan.breakfast.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Nutrition</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Protein:</span>
                          <span className="font-medium">{dietPlan.breakfast.protein}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Carbs:</span>
                          <span className="font-medium">{dietPlan.breakfast.carbs}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fats:</span>
                          <span className="font-medium">{dietPlan.breakfast.fats}g</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Ingredients</h4>
                      <ul className="space-y-1">
                        {dietPlan.breakfast.ingredients?.map((ingredient, index) => (
                          <li key={index} className="text-gray-600">• {ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {dietPlan.breakfast.instructions && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Instructions</h4>
                      <p className="text-gray-600">{dietPlan.breakfast.instructions}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Lunch */}
            {dietPlan.lunch && (
              <div className="bg-white rounded-lg shadow-md">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getMealIcon('lunch')}</span>
                    <h2 className="text-lg font-semibold text-gray-900">Lunch</h2>
                    <span className={`ml-auto inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMealColor('lunch')}`}>
                      {dietPlan.lunch.calories} cal
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{dietPlan.lunch.name}</h3>
                  <p className="text-gray-600 mb-4">{dietPlan.lunch.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Nutrition</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Protein:</span>
                          <span className="font-medium">{dietPlan.lunch.protein}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Carbs:</span>
                          <span className="font-medium">{dietPlan.lunch.carbs}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fats:</span>
                          <span className="font-medium">{dietPlan.lunch.fats}g</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Ingredients</h4>
                      <ul className="space-y-1">
                        {dietPlan.lunch.ingredients?.map((ingredient, index) => (
                          <li key={index} className="text-gray-600">• {ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {dietPlan.lunch.instructions && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Instructions</h4>
                      <p className="text-gray-600">{dietPlan.lunch.instructions}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Dinner */}
            {dietPlan.dinner && (
              <div className="bg-white rounded-lg shadow-md">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getMealIcon('dinner')}</span>
                    <h2 className="text-lg font-semibold text-gray-900">Dinner</h2>
                    <span className={`ml-auto inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMealColor('dinner')}`}>
                      {dietPlan.dinner.calories} cal
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{dietPlan.dinner.name}</h3>
                  <p className="text-gray-600 mb-4">{dietPlan.dinner.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Nutrition</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Protein:</span>
                          <span className="font-medium">{dietPlan.dinner.protein}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Carbs:</span>
                          <span className="font-medium">{dietPlan.dinner.carbs}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fats:</span>
                          <span className="font-medium">{dietPlan.dinner.fats}g</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Ingredients</h4>
                      <ul className="space-y-1">
                        {dietPlan.dinner.ingredients?.map((ingredient, index) => (
                          <li key={index} className="text-gray-600">• {ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {dietPlan.dinner.instructions && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Instructions</h4>
                      <p className="text-gray-600">{dietPlan.dinner.instructions}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Snacks */}
            {dietPlan.snacks && dietPlan.snacks.length > 0 && (
              <div className="bg-white rounded-lg shadow-md">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getMealIcon('snacks')}</span>
                    <h2 className="text-lg font-semibold text-gray-900">Snacks</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {dietPlan.snacks.map((snack, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{snack.name}</h3>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMealColor('snacks')}`}>
                            {snack.calories} cal
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{snack.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Nutrition</h4>
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Protein:</span>
                                <span className="font-medium">{snack.protein}g</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Carbs:</span>
                                <span className="font-medium">{snack.carbs}g</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Fats:</span>
                                <span className="font-medium">{snack.fats}g</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Ingredients</h4>
                            <ul className="space-y-1">
                              {snack.ingredients?.map((ingredient, idx) => (
                                <li key={idx} className="text-gray-600">• {ingredient}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        {snack.instructions && (
                          <div className="mt-3">
                            <h4 className="font-medium text-gray-900 mb-1">Instructions</h4>
                            <p className="text-gray-600 text-sm">{snack.instructions}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Nutrition Tips */}
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">Nutrition Tips</h3>
            <ul className="space-y-2 text-green-800">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Stay hydrated by drinking at least 8 glasses of water daily
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Eat slowly and mindfully to better recognize hunger cues
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Include a variety of colorful fruits and vegetables
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Plan your meals ahead to avoid unhealthy choices
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Listen to your body and adjust portions as needed
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietPlan;
