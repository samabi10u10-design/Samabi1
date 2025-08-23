import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { dietService } from '../services/dietService';
import { workoutService } from '../services/workoutService';
import { 
  ChartBarIcon, 
  FireIcon, 
  CakeIcon, 
  UserIcon,
  HeartIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dietPlan, setDietPlan] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dietData, workoutData] = await Promise.all([
          dietService.getDietPlan().catch(() => null),
          workoutService.getWorkoutPlan().catch(() => null)
        ]);
        
        setDietPlan(dietData);
        setWorkoutPlan(workoutData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getBMIColor = (bmi) => {
    if (bmi < 18.5) return 'text-blue-600';
    if (bmi < 25) return 'text-green-600';
    if (bmi < 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBMIBadgeColor = (bmi) => {
    if (bmi < 18.5) return 'bg-blue-100 text-blue-800';
    if (bmi < 25) return 'bg-green-100 text-green-800';
    if (bmi < 30) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  // Sample progress data for charts
  const progressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Weight (kg)',
        data: [user?.weight || 70, 69.5, 69, 68.5],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const macroData = {
    labels: ['Protein', 'Carbs', 'Fats'],
    datasets: [
      {
        data: [
          dietPlan?.totalProtein || 0,
          dietPlan?.totalCarbs || 0,
          dietPlan?.totalFats || 0,
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
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
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-primary-100 p-3 rounded-full">
            <UserIcon className="h-8 w-8 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600">
              Let's track your fitness journey and achieve your goals.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* BMI Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <ScaleIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">BMI</p>
              <p className={`text-2xl font-bold ${getBMIColor(user?.bmi)}`}>
                {user?.bmi || 'N/A'}
              </p>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getBMIBadgeColor(user?.bmi)}`}>
                {user?.bmiCategory || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Weight Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <HeartIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Current Weight</p>
              <p className="text-2xl font-bold text-gray-900">
                {user?.weight || 'N/A'} kg
              </p>
              <p className="text-sm text-gray-500">
                Height: {user?.height || 'N/A'} cm
              </p>
            </div>
          </div>
        </div>

        {/* Fitness Goal Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <FireIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Fitness Goal</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">
                {user?.fitnessGoal?.replace('_', ' ') || 'N/A'}
              </p>
              <p className="text-sm text-gray-500">
                Age: {user?.age || 'N/A'} years
              </p>
            </div>
          </div>
        </div>

        {/* Workout Duration Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-full">
              <ChartBarIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Workout Duration</p>
              <p className="text-2xl font-bold text-gray-900">
                {workoutPlan?.duration || 'N/A'} min
              </p>
              <p className="text-sm text-gray-500">
                {workoutPlan?.exercises?.length || 0} exercises
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight Progress</h3>
          <div className="h-64">
            <Line
              data={progressData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: false,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Macronutrients Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Macronutrients</h3>
          <div className="h-64">
            <Doughnut
              data={macroData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
          {dietPlan && (
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Protein</p>
                <p className="text-lg font-semibold text-blue-600">{dietPlan.totalProtein}g</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Carbs</p>
                <p className="text-lg font-semibold text-green-600">{dietPlan.totalCarbs}g</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fats</p>
                <p className="text-lg font-semibold text-yellow-600">{dietPlan.totalFats}g</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate('/workout');
            }}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FireIcon className="h-8 w-8 text-orange-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">View Workout Plan</p>
              <p className="text-sm text-gray-600">Check your personalized exercises</p>
            </div>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              navigate('/diet');
            }}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <CakeIcon className="h-8 w-8 text-green-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">View Diet Plan</p>
              <p className="text-sm text-gray-600">Check your meal recommendations</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
