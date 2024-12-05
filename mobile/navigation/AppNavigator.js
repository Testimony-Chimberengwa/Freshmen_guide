import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import LandingPage from '../screens/LandingPage';
import LoginPage from '../screens/LoginPage';
import FreshmanDashboard from '../screens/FreshmanDashboard';
import AlumniDashboard from '../screens/AlumniDashboard';
import MentorshipAdvice from '../screens/MentorshipAdvice';
import FAQPage from '../screens/FAQPage';
import QuestionsPage from '../screens/QuestionsPage';
import MentorshipPage from '../screens/MentorshipPage';
import QuestionsAnswerPage from '../screens/QuestionsAnswerPage';
import HelpPage from '../screens/HelpPage'
import SignupPage from '../screens/SignupPage'

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Core Screens */}
        <Stack.Screen name="Landing" component={LandingPage} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="FreshmanDashboard" component={FreshmanDashboard} />
        <Stack.Screen name="AlumniDashboard" component={AlumniDashboard} />
        <Stack.Screen name="Help" component={HelpPage}/>
        <Stack.Screen name="Signup" component={SignupPage}/>

        {/* Freshman Dashboard Screens */}
        <Stack.Screen name="MentorshipAdvice" component={MentorshipAdvice} />
        <Stack.Screen name="FAQPage" component={FAQPage} />
        <Stack.Screen name="QuestionsPage" component={QuestionsPage} />

        {/* Alumni Dashboard Screens */}
        <Stack.Screen name="MentorshipPage" component={MentorshipPage} />
        <Stack.Screen name="QuestionsAnswerPage" component={QuestionsAnswerPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
