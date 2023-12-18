import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Stack, Tabs } from 'expo-router';

import React from 'react';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */


export default function TabLayout() {

  return (
     <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="facebook" options={{ headerShown: false }} />
        <Stack.Screen name="media" options={{ headerShown: false }} />
      </Stack>
  );
}
