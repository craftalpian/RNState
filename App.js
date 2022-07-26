/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-native/no-inline-styles */
// import React from 'react';
// import {
//   Text,
//   View,
//   TextInput,
//   TouchableHighlight,
//   StatusBar,
// } from 'react-native';
// import {useInterpret, useSelector} from '@xstate/react';
// import {assign, createMachine, sendParent, spawn} from 'xstate';
// import {RNMachine, ActionMachine, TokenMachine} from './src/machines';

// const SplashScreen = props => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <StatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />
//       <Text style={{fontSize: 22, color: 'gray'}}>Splash Screen</Text>
//     </View>
//   );
// };

// const CredentialMachine =
//   /** @xstate-layout N4IgpgJg5mDOIC5QGEBOkwDsAuBLAhgDYCSEAxMgBb6YwAEACpQPaZh0ByArgLYBGYVIlAAHZrFx5WwkAA9EAFgBMAGhABPRAE4ADADothwwGZjO3eYBsAX1trMzCHBloMOAiQh6mrdt36CdABqgrgAZppIIGISUpgy8ghKAKxaeik6mZZKAOwKycYAHDlqkQCMOgp6CkZaqZaVZYWWNtZqrk7uRKQyMZK40lGJTaWIrbZAA */
//   createMachine({
//     context: {phoneNumber: ''},
//     type: 'parallel',
//     on: {
//       'Change Phone Number': {
//         actions: assign((_, event) => {
//           return {
//             phoneNumber: event.data,
//           }
//         }),
//         target: '.Phone Number Verify',
//       },
//     },
//     states: {
//       'Phone Number Verify': {
//         entry: sendParent('FINISH'),
//       },
//     },
//     id: 'CredentialId',
//   });

// const ParentMachine = createMachine({
//   initial: 'Credential',
//   states: {
//     Credential: {
//       invoke: {
//         src: CredentialMachine,
//         id: 'CredentialMachineId',
//       },
//     },
//   },
//   id: 'ParentId',
// });

// const App = props => {
//   const parent = useInterpret(ParentMachine);

//   const parentState = useSelector(parent, state =>
//     state.children.CredentialMachineId.getSnapshot(),
//   );

//   // const credentialMachine = useInterpret(parentState);

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <TextInput
//         onChangeText={val =>
//           credentialMachine.send({type: 'Change Phone Number', data: val})
//         }
//       />
//     </View>
//   );
// };

// export default App;

import React, {createContext, useContext, useEffect} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMachine} from 'xstate';
import {useInterpret, useSelector} from '@xstate/react';

const Stack = createNativeStackNavigator();
const ScreenAuthMachineContext = createContext(null);

export const phoneNumberMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAUAWB7AdmABAOQFcBbAIzACccBZAQwGNUBLbAOjS10NIpwDFGANgMgBiAMoESRRgBdEoAA7pYsxlnkgAHogDMARgBsLAKwAGAEwGAnKZ06DADh0O9AGhABPRAeMtbxgwB2ABYHY2MHQNNA8wBfWPd2bHxiMkpaBmYwEQBhVBpMGBwkzlSKDSUVGTVMDW0EJxYdUz0bPUC9YL09c2Djdy8EAFpzUz8evRbLQKszTp14hJBMdAg4DRKU7nT6JlZNrjS+QWEICuVVdSQtRBimywcrSONu42dzAcQIkx0An2MrOYQoEDDpgvFEhhkoceBk9mA2FDStscABJWA4ABqNAEjDO10ql1q13qwVCLCsBlMwVM1PMrRpDk+CG+bwCMQMwTseicvwhIAOZR2mWw5yqNTqiHJOgeT0CLz0bwcH08iCGk18U0mnNmzgsekWsSAA */
  createMachine({
    on: {
      'Change Phone Number': {
        target: '.Phone Number Filled',
      },
    },
    initial: 'Phone Number Filled',
    states: {
      'Phone Number Filled': {
        on: {
          Submit: {
            target: 'Phone Number Is Valid',
          },
        },
      },
      'Phone Number Is Valid': {},
    },
    id: 'Phone Number Machine',
  });

export const testMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBU4BcAEBZAhgYwAsBLAOzADoBJEotInAGwwGU0c0wBiWAgewHdEoAA69YtIrxJCQAD0QAmAIwAWcgDYArAA5tSgOwqtAZhXbjxgDQgAnonX7yKgJyvn+7eoAMxpV6XqAL7B1iS8EHAyqLCYuISkFNQSjCxsHDKi4nRSMvIIxurWdgjqSuReFZVenl7qxl6aKiEg0bH4xGTkzHz8GACCDGAATmgZYhI5SHKIxsrk2u7aCg7qq3Wa+kX2XuRurir6xp5LB02B1q3Y7QljWZLSU3lKZXtu5harzla2iAC0SgpylU6s4vApjPp9MFgkA */
  createMachine({
    initial: 'Initial State',
    states: {
      'Initial State': {
        on: {
          show: {
            target: 'Show Alert',
          },
        },
      },
      'Show Alert': {
        entry: 'Show Alert If Entered This Machine',
      },
    },
    id: 'Test Machine',
  });

export const credentialMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGEBOkwDsAuBLAhgDYAEAsvgMYAWumYAdAApUD2dxAcgK4C2ARmFQBiZmzCdeA1MQBqRXBESgADi1i48bJSAAeiAIwA2Q-QCsh0wHYADFYDMp-ZYAch5wBoQAT0QAWS-QAnMHBhgBMgYaWlsb6pgC+iZ6YLBBw2mgYOAQk5NS0DKLs3PyC2qrqmpjaeggAtA70lvphboGmYTaBYWGmnj4IhtZBIcGuhna+TvpJIJlp2URklDR09ADKrADuxACChILY5WoauFpIun7WvvT61oHWhoFGE9Yx-YhDI6Pjk9Oz8yweCWeVWYGOlTO1QutTqpkCTRabQ6XR6fW8iDqvXo1lxuOedmMUWs+mciUSQA */
  createMachine(
    {
      initial: 'Phone Number',
      states: {
        'Phone Number': {
          invoke: {
            src: testMachine,
            id: 'testMachineId',
          },
          on: {
            'Phone Number Valid': {
              // actions: 'Credential Machine Invoked',
              target: 'Show Alert',
            },
          },
        },
        'Show Alert': {},
      },
      id: 'Credential Machine',
    },
    {
      actions: {
        'Credential Machine Invoked': () => console.log('TEST TEST TEST'),
      },
    },
  );

export const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGUDGAnMYB2ACAsgIaoAWAltmAHTIAOANobCbmpjgMQCCArgC4kcfMqkJ9IiULQD2sMsOnZJIAB6IAjAE4ALFU06ArACYAbAGYjB9UbMB2EwBoQAT0TaTVdSfVmDADj8rPyNLdQBfMKc2LDwiUgpqAAlpAFswVgwYjgAhYgBrZRk5BSUkVUQbIypvIwAGbTq7Wv97J1cEdXVbKibtMz9a7xrgiMiQbGkIOGVonAJickoaBiYWWdKpWXkyRWU1BABaXVrNMxNtQfV3I3UBgzbEM01q7zPa03PNE7MIqMy5uKLJKpdLrQpbEp7R4GXS2SwhHRnbT2bQPBBPF4+Aw6bTaYLqd6-EDrebxSjg4o7DblQ5GPxUb7nS7XW7NNEHMxmHr9ExWTkmWq1CzhUZAA */
  createMachine({
    initial: 'Splash Screen',
    states: {
      'Splash Screen': {
        invoke: {
          src: testMachine,
          id: 'testMachineId',
        },
        on: {
          Authenticated: {
            target: 'Home Screen',
          },
        },
      },
      'Home Screen': {
        invoke: {
          src: credentialMachine,
          id: 'credentialId',
        },
        on: {
          Back: {
            target: 'Splash Screen',
          },
        },
      },
    },
    id: 'Screen Machine',
  });

const HomeScreen = () => {
  const useMachine = useContext(ScreenAuthMachineContext);
  const useMachineState = useSelector(useMachine, state => state);
  const credentialMachineState = useSelector(
    useMachine,
    state => state.children.credentialId,
  );
  const childrenMachine = useSelector(
    useMachine,
    state => state.children.testMachineId,
  );

  console.log(useMachineState.value);
  console.log(credentialMachineState);

  const useChildrenMachien = useInterpret(childrenMachine, {
    actions: {
      'Show Alert If Entered This Machine': () => console.log('ENTERED NIH'),
    },
  });
  useEffect(() => {
    useChildrenMachien.send('show');
  }, []);

  // if (useMachineState.matches('Home Screen')) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // let credentialMachineConst = useInterpret(credentialMachineState);
  // credentialMachineConst.send('Phone Number Valid');
  // }

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'blue',
      }}>
      <Text>Home Screen</Text>
      <TextInput
        placeholder={'Isi di sini'}
        style={{backgroundColor: 'white'}}
      />
      <Button
        title="Authenticated"
        onPress={() => useMachine.send('Authenticated')}
      />
    </View>
  );
};

const SplashScreen = ({navigation}) => {
  const useMachine = useContext(ScreenAuthMachineContext);
  const useMachineState = useSelector(useMachine, state => state);

  useEffect(() => {
    const subs = useMachine.subscribe(state => {
      if (useMachineState.matches('Splash Screen')) {
        // useMachine.send({ type: 'Authenticated' })
        navigation.navigate('Home');
      }
    });

    return subs.unsubscribe;
  }, [navigation, useMachine]);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'red',
      }}>
      <Text>Splash Screen</Text>
    </View>
  );
};

const App = () => {
  const screenMachine = useInterpret(machine, {});

  return (
    <ScreenAuthMachineContext.Provider value={screenMachine}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={'Splash'} component={SplashScreen} />
          <Stack.Screen name={'Home'} component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ScreenAuthMachineContext.Provider>
  );
};

export default App;
