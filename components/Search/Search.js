import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  Button,
  ScrollView,
  Pressable,
} from 'react-native';
import { getNotes } from '../../modules/storage';
import searchItems from '../../modules/search';
import { Card } from 'react-native-paper';
import { getBGFromPriorityLevel } from '../../utils/colors';
import { styles } from '../Notes/NotesScreen';
import DeadlineFooter from '../Footer/Footer';
import { useIsFocused } from '@react-navigation/native';

export default function DeadlineSearch({ navigation }) {
  const [query, setQuery] = useState('');
  const [dataset, setDataset] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function getAllNotes() {
      const notes = await getNotes();
      setDataset(notes);
    }

    if(isFocused) getAllNotes();
  }, [isFocused]);

  useEffect(() => {
    const items = searchItems(dataset, query);
    setFoundItems(items);
  }, [query, dataset]);

  return (
    <>
      <View>
        <TextInput
          style={{
            margin: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#e0dcdc',
            borderBottomStyle: 'solid',
          }}
          placeholder="Insira algo aqui para pesquisar..."
          onChangeText={(value) => setQuery(value)}
          value={query}
        />
      </View>
      <View>
        {foundItems.length > 0 ? (
          <ScrollView>
            {foundItems?.reverse()?.map((note) => (
              <Pressable
                onPress={() =>
                  navigation.navigate('Editor', {
                    mode: 'edit',
                    item: note,
                  })
                }>
                <Card
                  style={{
                    ...styles.noteCard,
                    backgroundColor: getBGFromPriorityLevel(note?.priority),
                  }}>
                  <Text style={styles.noteTitle}>{note.title}</Text>
                  <Text
                    style={{
                      marginTop: 10,
                    }}>
                    {note.content.length > 150
                      ? note.content.substring(0, 150) + '...'
                      : note.content}
                  </Text>
                  <Text
                    style={{
                      fontStyle: 'italic',
                      marginTop: 10,
                    }}>
                    {note.date}
                  </Text>
                </Card>
              </Pressable>
            ))}
          </ScrollView>
        ) : (
          <></>
        )}
      </View>
    </>
  );
}
