import React from 'react';
//import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme'
import { Routes } from './src/routes'


import { ActivityIndicator, StatusBar } from 'react-native';
import { AuthProvider } from './src/hooks/auth';



export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });


  if (!fontsLoaded) {
    return (
      <ActivityIndicator
        color={theme.colors.primary}
        size='large'
      />
    )
  }

  return (
    <ThemeProvider theme={theme}>

      <StatusBar barStyle="light-content" />
      <AuthProvider>
        <Routes />
      </AuthProvider>

    </ThemeProvider>
  );
}


