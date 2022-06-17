/* eslint-disable prettier/prettier */
import { createMachine, respond, assign } from 'xstate';

const getToken = () => new Promise((res, rej) => res('token123'));

export const TokenMachine = createMachine({
  id: 'TokenMachine',
  context: { tokenTokenMachine: null },
  initial: 'IDLE',
  states: {
    IDLE: {
      on: {
        LOGIN: {
          actions: (context, event) => console.log('LOGIN TOKEN', context, event),
          // actions: assign({
          //   tokenTokenMachine: (context, event) => 'alfianDATATOKEN',
          // }),
        },
      },
    },
  },
});
