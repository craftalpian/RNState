/* eslint-disable prettier/prettier */
import { createMachine } from 'xstate';

const getToken = () => new Promise((res, rej) => res('token123'));

export const TokenMachine = createMachine({
  id: 'TokenMachine',
  context: { tokenTokenMachine: null },
  on: {
    LOGIN: {
      onEntry: (context, event) => console.log('LOGIN ACTION', context, event),
    },
  },
  initial: 'GET_TOKEN',
  states: {
    GET_TOKEN: {
      on: {
        LOGIN: {
          onEntry: (context, event) => console.log('LOGIN ACTION', context, event),
        },
      },
    },
  },
});
