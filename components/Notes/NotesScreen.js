import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Button,
  Text,
  StyleSheet,
  View,
  ToastAndroid,
  Alert,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import DeadlineFooter from '../Footer/Footer';
import getDate from '../../utils/dateTime';
import { Card } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { getNotes } from '../../modules/storage';
import ZeroNotesCard from './ZeroNotesCard';
import { useIsFocused } from '@react-navigation/native';
import { getBGFromPriorityLevel } from '../../utils/colors';
import { retrievePassword, comparePassword } from '../../modules/password';

export default function DeadlineNotesScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [unlocked, setUnlocked] = useState(true);
  const [password, setPassword] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {
    async function retrieveNotes() {
      const userNotes = await getNotes();
      setNotes(userNotes);
    }

    if (isFocused) retrieveNotes();
  }, [isFocused]);

  /*useEffect(() => {
    async function getPassword() {
      const userPassword = await retrievePassword();

      if (userPassword) setUnlocked(false);
      else setUnlocked(true);
    }

    getPassword();
  });*/

  return (
    <>
      <>
        {!unlocked && (
          <Card>
            <Text>
              Você bloqueou suas notas com senha. Insira-a abaixo para ter
              acesso a elas.
            </Text>
            <TextInput
              placeholder="Senha"
              value={password}
              onChangeText={(value) => setPassword(value)}
            />
            <Button
              title="Desbloquear"
              color="red"
              onPress={async () => {
                const isPasswordValid = await comparePassword(password);

                if (isPasswordValid) setUnlocked(true);
                else ToastAndroid.show('Senha incorreta!', ToastAndroid.SHORT);
              }}
            />
          </Card>
        )}
        {unlocked && (notes?.length == 0 || notes?.length == undefined) && (
          <ZeroNotesCard />
        )}
        {unlocked && notes?.length >= 1 && (
          <ScrollView>
            {notes?.reverse()?.map((note) => (
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
        )}
      </>
      {unlocked && <DeadlineFooter navigation={navigation} />}
    </>
  );
}

export const styles = StyleSheet.create({
  noteCard: {
    margin: 10,
    padding: 8,
    borderRadius: 10,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomColor: '#e0dcdc39',
    borderBottomWidth: 1,
  },
});
