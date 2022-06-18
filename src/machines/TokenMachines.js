/* eslint-disable prettier/prettier */
import { createMachine, respond, assign } from 'xstate';

export const TokenMachine = createMachine({
  id: 'TokenMachine',
  context: { myToken: null },
  on: (context, event) => console.log({context, event, 'test': true}),
  entry: (context, event) => console.log('TokenMachine.. READY', {context, event}),
  initial: 'IDLE',
  states: {
    IDLE: {
      on: {
        login: {
          actions: () => console.log('test')
          // actions: assign({
          //   tokenTokenMachine: (context, event) => 'alfianDATATOKEN',
          // }),
        },
      },
    },
  },
});
