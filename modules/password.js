import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

export const verifyPassword = (password) => {
  if (password.length >= 8) return true;

  ToastAndroid.show(
    'A senha precisa ter pelo menos 8 caracteres',
    ToastAndroid.SHORT
  );
  return false;
};

export const savePassword = async (password) => {
  if (verifyPassword(password)){
    await AsyncStorage.setItem('password', password).then(() =>
      ToastAndroid.show('Senha adicionada com sucesso!', ToastAndroid.SHORT)
    );

    return;
  }

  throw("invalid password");
};

export const retrievePassword = async () => {
  const password = AsyncStorage.getItem('password');
  return password;
};

export const comparePassword = async (password) => {
  const passwordInStorage = await retrievePassword();
  return Boolean(password == passwordInStorage);
};
