import React, { ReactElement } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';

const queryClient = new QueryClient();

function App(): ReactElement {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <View style={styles.container} />
        </SafeAreaView>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
