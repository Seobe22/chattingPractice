import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/screen/RootStack';
import {QueryClientProvider, QueryClient} from 'react-query';
import {Provider} from 'react-redux';
import {store} from './src/slices';
const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}
