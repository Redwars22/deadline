import * as React from 'react';
import { Text, View, StyleSheet, TextInput, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DeadlineSettings from './components/Settings/Settings';
import DeadlineFooter from './components/Footer/Footer';
import DeadlineEditor from './components/Editor/Editor';
import DeadlineNotesScreen from './components/Notes/NotesScreen';
import DeadlineSearch from './components/Search/Search';
import { Card } from 'react-native-paper';
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar StatusBarStyle="light-content" />
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={DeadlineNotesScreen}
              options={{
                title: 'DEADLINE',
                headerTintColor: 'grey',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 25,
                },
              }}
            />
            <Stack.Screen
              name="Editor"
              component={DeadlineEditor}
              options={{ title: 'Editor de Nota', mode: 'create', item: null }}
            />
            <Stack.Screen
              name="Settings"
              component={DeadlineSettings}
              options={{
                title: 'Configurações',
              }}
            />
            <Stack.Screen
              name="Search"
              component={DeadlineSearch}
              options={{
                title: 'Pesquisar Notas',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ecf0f1',
  },
});
