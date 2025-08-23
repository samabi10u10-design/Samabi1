const User = require('./models/User');
const connectDB = require('./config/db');
require('dotenv').config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@gym.com',
      password: 'admin123',
      age: 30,
      gender: 'male',
      height: 175,
      weight: 70,
      fitnessGoal: 'fitness',
      role: 'admin'
    });

    // Create sample users
    const sampleUsers = await User.create([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        age: 25,
        gender: 'male',
        height: 180,
        weight: 75,
        fitnessGoal: 'muscle_gain'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        age: 28,
        gender: 'female',
        height: 165,
        weight: 60,
        fitnessGoal: 'weight_loss'
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: 'password123',
        age: 35,
        gender: 'male',
        height: 175,
        weight: 80,
        fitnessGoal: 'fitness'
      },
      {
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        password: 'password123',
        age: 32,
        gender: 'female',
        height: 160,
        weight: 55,
        fitnessGoal: 'maintenance'
      }
    ]);

    console.log('Seed data created successfully!');
    console.log('Admin user:', adminUser.email);
    console.log('Sample users created:', sampleUsers.length);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
