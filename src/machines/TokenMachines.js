/* eslint-disable prettier/prettier */
import { createMachine, respond } from 'xstate';

const getToken = () => new Promise((res, rej) => res('token123'));

export const TokenMachine = createMachine({
  id: 'TokenMachine',
  context: { tokenTokenMachine: null },
  initial: 'GET_TOKEN',
  states: {
    GET_TOKEN: {
      on: {
        LOGIN: {
          actions: (context, event) => alert(JSON.stringify('eve')),
        },
      },
    },
  },
});
