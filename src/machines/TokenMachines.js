/* eslint-disable prettier/prettier */
import { createMachine } from 'xstate';

const getToken = () => new Promise((res, rej) => res('token123'));

export const TokenMachine = createMachine({
  id: 'TokenMachine',
  context: { tokenTokenMachine: null },
  on: {
    LOGIN: {
      actions: (context, event) => console.log('LOGIN ACTION', context, event),
    },
  },
  initial: 'GET_TOKEN',
  states: {
    GET_TOKEN: {
      // type: 'final'
      on: {
        LOGIN: {
          actions: (context, event) => console.log('LOGIN ACTION', context, event),
        },
      },
      // invoke: {
      //   src: (context, event) => console.log('context, GET_TOKEN', context, event),
      //   onDone: {
      //     (context, event) => console.
      //   },
      // }
    },
  },
});
