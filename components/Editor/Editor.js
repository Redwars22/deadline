import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Button,
  Text,
  StyleSheet,
  ToastAndroid,
  Alert,
  View,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import DeadlineFooter from '../Footer/Footer';
import { MaterialIcons } from '@expo/vector-icons';
import getDate from '../../utils/dateTime';
import { Card } from 'react-native-paper';
import { saveNotes, updateNote, deleteNote } from '../../modules/storage';
import { Picker } from '@react-native-picker/picker';
import { getBGFromPriorityLevel } from '../../utils/colors';
import { Feather } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

export default function DeadlineEditor({ navigation, route }) {
  const [note, setNote] = useState({
    title: '',
    content: '',
    date: '',
    priority: 'normal',
    previousTitle: '',
  });

  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.item) {
      const i = route?.params?.item;
      setNote((s) => ({
        title: i.title,
        content: i.content,
        date: i.date,
        priority: i.priority,
        previousTitle: i.title,
      }));
    }
  }, []);

  const handleSaveNotes = async () => {
    if (note.title === '') {
      ToastAndroid.show(
        'Por favor insira o título da nota',
        ToastAndroid.SHORT
      );
      return;
    }

    if (note.content === '') {
      ToastAndroid.show(
        'Por favor insira o conteúdo da nota',
        ToastAndroid.SHORT
      );
      return;
    }

    if (route?.params?.mode === 'edit') {
      await updateNote(note);
    } else await saveNotes(note);

    if(route?.params?.mode !== "edit"){
      navigation.navigate('Home');
    }
  };

  const handleDeleteNote = async () => {
    await deleteNote(note);
    navigation.navigate('Home');
  };

  useEffect(() => {
    setNote((s) => ({
      ...s,
      date: getDate(),
    }));
  }, []);

  useEffect(() => {
    async function save() {
      await handleSaveNotes();
    }

    if (route?.params?.mode === 'edit')
      if (note.title != '' && note.content != '') {
        save();
      }
  }, [note.title, note.content, note.priority]);

  return (
    <>
      <Card
        style={{
          ...styles.card,
          backgroundColor: getBGFromPriorityLevel(note.priority),
        }}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              style={{
                ...styles.input,
                ...styles.titleInput,
                color: note.priority != 'urgent' ? 'grey' : 'white',
                width: Dimensions.get('window').width - 100,
              }}
              onChangeText={(val) =>
                setNote((s) => ({
                  ...s,
                  title: val,
                }))
              }
              value={note.title}
              placeholder={'Insira o título da nota'}
            />
            {route?.params?.mode != 'edit' && (
              <Pressable
                onPress={async () => {
                  await handleSaveNotes();
                }}>
                <Feather name="save" size={24} color="grey" />
              </Pressable>
            )}
            {route?.params?.mode == 'edit' && (
              <Pressable onPress={async () => await handleDeleteNote()}>
                <MaterialIcons
                  name="delete-outline"
                  size={24}
                  color={note.priority != 'urgent' ? 'red' : 'white'}
                />
              </Pressable>
            )}
          </View>
          <Text>Prioridade da Nota</Text>
          <Picker
            selectedValue={note.priority}
            onValueChange={(itemValue, itemIndex) =>
              setNote((s) => ({
                ...s,
                priority: itemValue,
              }))
            }>
            <Picker.Item label="Normal" value="normal" />
            <Picker.Item label="Atenção" value="warning" />
            <Picker.Item label="Urgente" value="urgent" />
          </Picker>
          <Text>Editado pela última vez em: {note.date}</Text>
          <TextInput
            style={{
              ...styles.input,
              ...styles.contentInput,
              color: note.priority != 'urgent' ? 'grey' : 'white',
            }}
            onChangeText={(val) =>
              setNote((s) => ({
                ...s,
                content: val,
              }))
            }
            value={note.content}
            multiline={true}
            placeholder={'Insira o conteúdo da nota aqui'}
          />
        </ScrollView>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0dcdc39',
    borderBottomStyle: 'solid',
  },
  titleInput: {
    fontSize: 22,
  },
  contentInput: {
    textAlign: 'left',
    verticalAlign: 'top',
  },
  card: {
    margin: 5,
    padding: 8,
    borderRadius: 12,
  },
});
