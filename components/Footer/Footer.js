import React from 'react';
import { View, Text, Pressable, StyleSheet, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function DeadlineFooter({ navigation }) {
  return (
    <View style={styles.footer}>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <MaterialIcons name="notes" size={30} color="grey" />
      </Pressable>
      <Pressable
        onPress={() =>
          navigation.navigate('Search', { title: 'Adicionar Nova Nota' })
        }>
        <Ionicons name="ios-search-sharp" size={30} color="grey" />
      </Pressable>
      <Pressable
        onPress={() =>
          navigation.navigate('Editor', { title: 'Adicionar Nova Nota', mode: "create", item: null })
        }>
        <MaterialIcons name="add-circle" size={30} color="grey" />
      </Pressable>
      <Pressable
        onPress={() =>
          navigation.navigate('Settings', {
            title: 'Configurações',
            color: 'red',
          })
        }>
        <Ionicons name="settings" size={30} color="grey" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    justifyContent: 'space-around',
    marginTop: 'auto',
  },
});
