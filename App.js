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
      <View style={{marginHorizontal: 14}}>
        <TextInput
          placeholder={'Username'}
          onChangeText={val => props.onChangeUsername(val)}
          style={{borderWidth: 1, borderRadius: 10}}
        />
        <View style={{marginTop: 8}} />
        <TextInput
          placeholder={'Password'}
          onChangeText={val => props.onChangePassword(val)}
          style={{borderWidth: 1, borderRadius: 10}}
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
  const RNMachineService = useInterpret(RNMachine, {
    actions: {
      createAuth: assign({
        authMachineRef: () =>
          spawn(
            AuthMachine.withConfig({
              actions: {
                createTokenMachine: assign({
                  tokenMachineRef: () => spawn(TokenMachine, 'tokenMachine'),
                }),
              },
            }),
            'authMachine',
          ),
      }),
    },
  });

  const RNMachineState = useSelector(RNMachineService, state => state);

  // console.log('state =>', state);
  // console.log('state.context.authMachineRef =>', state.context.authMachineRef);

  const authMachineRef = useSelector(
    RNMachineService,
    state => state.context.authMachineRef,
  );

  // console.log('authMachineRef =>', authMachineRef);
  const authState = useSelector(authMachineRef, state => state);

  // console.log('authState =>', authState);
  // console.log('authState =>', authState.value);

  const tokenMachineRef = useSelector(
    authMachineRef,
    state => state.context.tokenMachineRef,
  );

  const tokenState = useSelector(tokenMachineRef, state => state);

  // console.log('tokenState =>', tokenState.context);
  console.log('tokenMachineRef.context =>', tokenState.context);
  console.log('tokenMachineRef.value =>', tokenState.value);
  console.log('tokenMachineRef =>', tokenState);

  // const change = (type, value) => service.send({type, value});

  // console.log('service ==>', service)
  // console.log('tokenMachineRef ==>', tokenMachineRef)
  // console.log('authMachineRef', authState.value);
  // console.log('authState.context', authState.context);

  // console.log('RNMachineState.value', RNMachineState.value);
  // console.log('authState.value', authState.value);
  // console.log('authState.context', authState.context);

  const change = (type, value) => authMachineRef.send({type, value});

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      {RNMachineState.matches('SPLASH') && <SplashScreen />}
      {RNMachineState.matches('home') && (
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
      {/* {RNMachineState.matches('LOGIN') && (
        <View style={{flex: 1}}>
          {authState.matches('LOADING') && (
            <Text style={{fontSize: 20, backgroundColor: 'pink'}}>Loading</Text>
          )}
          <LoginPage
            onChangeUsername={val => change('CHANGE_USERNAME', val)}
            onChangePassword={val => change('CHANGE_USERNAME', val)}
          />
          <TouchableHighlight onPress={() => RNMachineService.send('SUBMIT')}>
            <Text style={{backgroundColor: 'yellow', fontSize: 24}}>MASUK</Text>
          </TouchableHighlight>
        </View>
      )} */}
      {RNMachineState.matches('LOGIN') && (
        <LoginScreen
          onChangeUsername={val => change('CHANGE_USERNAME', val)}
          onChangePassword={val => change('CHANGE_PASSWORD', val)}
          loginButton={() => authMachineRef.send({type: 'SUBMIT_LOGIN'})}
        />
      )}
    </View>
  );
};

export default App;
