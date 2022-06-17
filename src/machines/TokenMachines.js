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
          actions: assign({
            tokenTokenMachine: (context, event) => 'alfianDATATOKEN',
          }),
        },
      },
    },
  },
});
