import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={{flex: 1}} />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

export default App;
