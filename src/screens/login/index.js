/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import { useInterpret, useSelector } from '@xstate/react';
import React, { useEffect } from 'react';
import { StatusBar, TextInput, View, Text, Button } from 'react-native';
import { interpret } from 'xstate';
import { Machine } from '../../machines/machine';

const Login = () => {

  const { screenMachineState, credentialMachine } = Machine();

  // const CredentialMachine = useInterpret(credentialMachine);
  const CredentialSelector = useSelector(credentialMachine, state => state);

  useEffect(() => {
    credentialMachine.send({ type: 'Typing' })
    // CredentialMachine.start()
    // CredentialMachine.send("Typing")
    // screenMachineState.children.CredentialMachineId.send('Typing');
    // console.log(CredentialMachine)
    // console.log("screenMachineState", screenMachineState)
    // console.log("CredentialSelector", CredentialSelector)
    // console.log('screenMachineState.children', screenMachineState.children);
  }, []);

  return (
    <View
      style={{ flex: 1, backgroundColor: '#FAFAFA', justifyContent: 'center' }}>
      <StatusBar backgroundColor={'#FAFAFA'} barStyle={'dark-content'} />
      <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>Login</Text>

      <View style={{ marginHorizontal: 16, marginTop: 14 }}>
        <Text style={{ fontSize: 12, textAlign: 'left', textDecorationLine: 'underline' }}>Username:</Text>
        <TextInput
          placeholder={'Masukkan username Anda'}
          style={{
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: 8,
          }}
        />
      </View>

      <View style={{ marginHorizontal: 14, marginTop: 24 }}>
        <Button title={'Simpan'} />
      </View>
    </View>
  );
};

export default Login;
