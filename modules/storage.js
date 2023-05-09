import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid, Alert } from 'react-native';

export const getNotes = async () => {
  try {
    const notes = await AsyncStorage.getItem('notes');
    if (notes !== null) {
      // value previously stored
      return JSON.parse(notes);
    }

    return [];
  } catch (e) {
    // error reading value
    return [];
  }
};

export const deleteAll = async () => {
  await AsyncStorage.removeItem('notes')
    .then(() => ToastAndroid.show('Deletado com sucesso', ToastAndroid.SHORT))
    .catch((error) => ToastAndroid.show(error, ToastAndroid.SHORT));
};

export const saveNotes = async (note) => {
  let notes = await getNotes();
  notes.push(note);

  await AsyncStorage.setItem('notes', JSON.stringify(notes))
    .catch((error) => {
      ToastAndroid.show(e, ToastAndroid.SHORT);
    });
};

export const updateNote = async (note) => {
  let notes = await getNotes();
  let currentIndex = 0;
  const currentNote = notes.find((i) => i.title === note.previousTitle);

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].title === note.previousTitle) {
      currentIndex = i;
      notes[i] = note;
    }
  }

  await AsyncStorage.setItem('notes', JSON.stringify(notes))
    .catch((error) => {
      ToastAndroid.show(e, ToastAndroid.SHORT);
    });
};


export const deleteNote = async (note) => {
  let notes = await getNotes();
  notes = notes.filter((i)=> i.title != note.title);

  await AsyncStorage.setItem('notes', JSON.stringify(notes))
    .then(() =>
      ToastAndroid.show('A nota foi deletada com sucesso!', ToastAndroid.SHORT)
    )
    .catch((error) => {
      ToastAndroid.show(e, ToastAndroid.SHORT);
    });
};
