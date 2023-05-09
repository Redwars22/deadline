import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Button,
  Linking,
  ToastAndroid,
  Alert,
  TextInput,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import DeadlineFooter from '../Footer/Footer';
import { deleteAll } from '../../modules/storage';
import { retrievePassword, savePassword } from '../../modules/password';

export default function DeadlineSettings({ navigation }) {
  const [password, setPassword] = useState('');
  const [showSetPassword, setShowSetPassword] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);

  useEffect(() => {
    async function checkIfThereIsPassword() {
      const password = await retrievePassword();
      if (password) setHasPassword(true);
    }

    checkIfThereIsPassword();
  });

  const handleDeleteNotes = () => {
    Alert.alert(
      'Atenção!',
      'Você está prestes a deletar todas as notas criadas. Tem certeza de que deseja continuar?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim, delete tudo!',
          onPress: () => {
            deleteAll();
            navigation.navigate('Home');
          },
        },
      ]
    );
  };

  return (
    <>
      <View
        style={{
          margin: 20,
        }}>
        <View
          style={{
            marginBottom: 25,
          }}>
          <View
            style={{
              marginBottom: 10,
            }}>
            <Button
              title={'Visite meu GitHub'}
              color={'grey'}
              onPress={() =>
                Linking.openURL('https://andrewnation.vercel.app/')
              }
            />
          </View>
          <View
            style={{
              marginBottom: 10,
            }}>
            <Button
              title={'Limpar todas as notas'}
              onPress={handleDeleteNotes}
              color={'grey'}
            />
          </View>
        </View>
        <Text
          style={{
            color: 'grey',
            textAlign: 'center',
          }}>
          Deadline, versão 1.0.1 Pré-Lançamento. Desenvolvido por AndrewNation
        </Text>
      </View>
    </>
  );
}

/*{!hasPassword && (
            <Button
              title={'Proteger com senha'}
              onPress={() => setShowSetPassword(true)}
              color={'grey'}
              style={{
                marginTop: 20,
              }}
            />
          )}
          {showSetPassword && (
            <View
              style={{
                padding: 20,
              }}>
              <Text>
                Para sua segurança a senha só pode ser definida uma única vez e
                não pode ser alterada. Caso você a esqueça, terá de reinstalar o
                aplicativo e perderá o acesso a todo o conteúdo armazenado nele.
              </Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#e0dcdc',
                  borderBottomStyle: 'solid',
                  fontSize: 20,
                  color: 'grey',
                  margin: 10,
                }}
                placeholder={'Insira a senha'}
                secureTextEntry
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                }}
              />
              <Button
                title="Adicionar Senha"
                color="red"
                onPress={async () => {
                  try {
                  await savePassword(password);
                  } catch(err) {
                    return;
                  }
                  setHasPassword(true);
                  setShowSetPassword(false);
                  navigation.navigate('Home');
                }}
              />
            </View>
          )}*/
