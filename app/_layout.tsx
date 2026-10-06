import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, usePathname, useRouter } from 'expo-router';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Drawer } from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Alert, Linking, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DRAWER_ITEMS = [
  { label: 'Home', path: '/', icon: 'home' },
  { label: 'Bar', path: '/bar', icon: 'bar-chart' },
  { label: 'Line', path: '/line', icon: 'show-chart' },
  { label: 'Pie', path: '/pie', icon: 'pie-chart' },
  { label: 'More', path: '/more', icon: 'apps' },
] as const;

const EXTERNAL_LINKS = [
  { label: 'npm', url: 'https://www.npmjs.com/package/react-native-gifted-charts', icon: 'logo-npm' },
  { label: 'Website', url: 'https://gifted-charts.web.app/', icon: 'document-text-outline' },
] as const;

function DrawerContent(props: any) {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
    <DrawerContentScrollView {...props}>
      {DRAWER_ITEMS.map(item => (
        <DrawerItem
          key={item.path}
          label={item.label}
          focused={pathname === item.path}
          activeTintColor="white"
          inactiveTintColor="#9d9ba0"
          activeBackgroundColor="#3a383d"
          icon={({ color, size }) => (
            <MaterialIcons name={item.icon} color={color} size={size} />
          )}
          onPress={() => {
            router.navigate(item.path);
            props.navigation.closeDrawer();
          }}
        />
      ))}
    </DrawerContentScrollView>
    <View style={{ paddingBottom: insets.bottom + 8, borderTopWidth: 1, borderTopColor: '#3a383d' }}>
      {EXTERNAL_LINKS.map(link => (
        <DrawerItem
          key={link.label}
          label={link.label}
          inactiveTintColor="#9d9ba0"
          icon={({ color, size }) => (
            <Ionicons name={link.icon} color={color} size={size} />
          )}
          onPress={() => {
            Linking.openURL(link.url).catch(() =>
              Alert.alert('Error', 'Could not open the link.'),
            );
          }}
        />
      ))}
    </View>
    </View>
  );
}

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
      <Drawer
        drawerContent={DrawerContent}
        screenOptions={{
          drawerStyle: { width: 220, backgroundColor: '#27252a' },
          headerStyle: { backgroundColor: '#18171a' },
          headerTintColor: 'white',
          headerTitleStyle: { fontSize: 18, fontWeight: '600' },
          headerShadowVisible: false,
        }}>
        <Drawer.Screen name="(tabs)" options={{ title: 'Gifted Charts', headerRight: GithubLogo }}/>
      </Drawer>
      </GestureHandlerRootView>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
