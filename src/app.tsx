import React from 'react';
import { Appearance, Platform, StatusBar, Text } from 'react-native';
import AppNavigation from './navigation/appNavigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import colors from './theme/colors/colors';

const App = () => {
  const colorScheme = Appearance.getColorScheme();

  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <StatusBar
            animated={true}
            backgroundColor={colors.AppTheme.Primary}
            barStyle={
              Platform.OS === 'ios'
                ? colorScheme === 'dark'
                  ? 'dark-content'
                  : null
                : null
            }
          />
          <RootSiblingParent>
            <AppNavigation />
          </RootSiblingParent>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
