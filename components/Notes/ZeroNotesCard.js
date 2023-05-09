import React, { useState } from 'react';
import {
  TextInput,
  Button,
  Text,
  StyleSheet,
  View,
  ToastAndroid,
} from 'react-native';
import DeadlineFooter from '../Footer/Footer';
import getDate from '../../utils/dateTime';
import { Card } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ZeroNotesCard(){
  return (
    <Card
        style={{
          margin: 20,
          padding: 20,
          borderRadius: 16,
        }}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: "center",
          }}>
          <FontAwesome5 name="sad-tear" size={94} color="grey" />
          <Text style={{
            textAlign: "center",
            marginTop: 16
          }}>
            Hm, parece que você ainda não criou nenhuma nota. Clique no botão
            com o ícone de + no rodapé para começar.
          </Text>
        </View>
      </Card>
  )
}