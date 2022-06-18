/* eslint-disable prettier/prettier */
import { createMachine, respond, assign, actions } from 'xstate';

export const TokenMachine = createMachine({
  id: 'TokenMachine',
  context: { myToken: null },
  on: {
    login: {
      actions: actions.log((context, event) => {context, event}),
      // actions: assign({
      //   tokenTokenMachine: (context, event) => 'alfianDATATOKEN',
      // }),
    },
  },
  entry: (context, event) => console.log('TokenMachine.. READY', {context, event}),
  initial: 'IDLE',
  states: {
    IDLE: {
      on: {
        login: {
          actions: actions.log((context, event) => {context, event}),
          // actions: assign({
          //   tokenTokenMachine: (context, event) => 'alfianDATATOKEN',
          // }),
        },
      },
    },
  },
});
