/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import {useInterpret, useSelector} from '@xstate/react';
import {useForm, Controller} from 'react-hook-form';
import {assign, spawn} from 'xstate';
import {RNMachine, AuthMachine, TokenMachine} from './src/machines';
import axios from 'axios';

// const LoginPageHookForm = ({}) => {
//   const {
//     control,
//     handleSubmit,
//     formState: {errors},
//   } = useForm({
//     defaultValues: {
//       firstName: '',
//       lastName: '',
//     },
//   });
//   const onSubmit = data => console.log(data);

//   return (
//     <View>
//       <Controller
//         control={control}
//         rules={{
//           required: true,
//         }}
//         render={({field: {onChange, onBlur, value}}) => (
//           <TextInput
//             // style={styles.input}
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//             placeholder={'username'}
//           />
//         )}
//         name="firstName"
//       />
//       {errors.firstName && <Text>This is required.</Text>}

//       <Controller
//         control={control}
//         rules={{
//           maxLength: 100,
//         }}
//         render={({field: {onChange, onBlur, value}}) => (
//           <TextInput
//             // style={styles.input}
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//             placeholder={'password'}
//           />
//         )}
//         name="lastName"
//       />

//       <Button title="Submit" onPress={handleSubmit(onSubmit)} />
//     </View>
//   );
// };

const SplashScreen = props => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />
      <Text style={{fontSize: 22, color: 'gray'}}>Splash Screen</Text>
    </View>
  );
};

const LoginScreen = props => {
  return (
    <View
      style={{flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />
      <Text
        style={{
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 22,
          color: 'gray',
          marginBottom: 24,
        }}>
        Login Screen
      </Text>
      <Text style={{marginVertical: 8, alignSelf: 'center'}}>
        {props.errorMsg ?? null}
      </Text>
      <View style={{marginHorizontal: 14}}>
        <TextInput
          placeholder={'Username'}
          onChangeText={val => props.onChangeUsername(val)}
          style={{borderWidth: 1, borderRadius: 10, paddingHorizontal: 8}}
        />
        <View style={{marginTop: 8}} />
        <TextInput
          placeholder={'Password'}
          onChangeText={val => props.onChangePassword(val)}
          style={{borderWidth: 1, borderRadius: 10, paddingHorizontal: 8}}
        />
        <View style={{marginTop: 24}} />
        <TouchableHighlight onPress={props.loginButton}>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: 'gray',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 22, color: 'white'}}>Login</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const App = props => {
  // Main Service
  const RNMachineService = useInterpret(RNMachine, {
    actions: {
      createAuth: assign({
        authMachineRef: () =>
          spawn(
            AuthMachine.withConfig({
              actions: {
                tokenMachine: assign({
                  tokenMachineRef: () => spawn(TokenMachine, 'tokenMachine'),
                }),
              },
            }),
            'authMachine',
          ),
      }),
    },
  });

  // Get state from RNMachine
  const RNMachineState = useSelector(RNMachineService, state => state);

  // AuthMachine (Ref)
  const authMachineRef = useSelector(
    RNMachineService,
    state => state.context.authMachineRef,
  );

  // AuthMachine (State)
  const authState = useSelector(authMachineRef, state => state);

  // TokenMachine (Ref)
  const tokenMachineRef = useSelector(
    authMachineRef,
    state => state.context.tokenMachineRef,
  );

  // TokenMachine (State)
  const tokenState = useSelector(tokenMachineRef, state => state);

  // Change context inside AuthMachine
  const change = (type, value) => authMachineRef.send({type, value});

  // Logging
  console.log('=>', authState.context);

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      {RNMachineState.matches('SPLASH') && <SplashScreen />}
      {RNMachineState.matches('HOME') && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'blue',
            flex: 1,
          }}>
          <Text style={{fontSize: 22, color: '#FFFFFF'}}>Home screen</Text>
        </View>
      )}
      {RNMachineState.matches('LOGIN') && (
        <View style={{flex: 1}}>
          <LoginScreen
            onChangeUsername={val => change('CHANGE_USERNAME', val)}
            onChangePassword={val => change('CHANGE_PASSWORD', val)}
            loginButton={() => authMachineRef.send({type: 'SUBMIT_LOGIN'})}
            errorMsg={authState.context.errorMsg}
          />
        </View>
      )}
    </View>
  );
};

export default App;
