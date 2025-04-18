import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Drawer } from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Alert, Linking, Text, View } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const openLink = (url:string) => {
    Linking.openURL(url).catch((err) => {
      console.error('An error occurred:', err);
      Alert.alert('Error', 'Could not open the link.');
    });
  };

  const GithubLogo = () => (
    <View style={{height:40,width:40,borderRadius:20,backgroundColor:'white',marginRight:20}}>
      <Ionicons name="logo-github" size={40} onPress={()=>openLink('https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts')} />
    </View>
  )

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack> */}
      <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen name="(tabs)" options={{drawerLabel:'Accounts Overview', headerRight:GithubLogo }}/>
        <Drawer.Screen name="+not-found" />
      </Drawer>
      </GestureHandlerRootView>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
