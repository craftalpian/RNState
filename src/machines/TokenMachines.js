/* eslint-disable prettier/prettier */
import { createMachine, respond, assign, actions } from 'xstate';

const getTokenAPI = (username, password) => new Promise((res, rej) => {
  if (username === 'pian') {
    if (password === '1234') {
      const token = '12345677890TOKEN'
      res(token)
    } else {
      rej('Password salah')
    }
  } else {
    rej('Username tidak ditemukan')
  }
})

export const TokenMachine = createMachine({
  id: 'TokenMachine',
  context: { token: null, errorMsg: null },
  initial: 'IDLE',
  states: {
    IDLE: {
      on: {
        GET_TOKEN: {
          
          // actions: (_, event) => getTokenAPI(event.username, event.password),
          // invoke: {
          //   src: (_, event) => getTokenAPI(event.username, event.password),
          // },
          // on: {
            
          // }
        }
        // LOGIN: {
        //   actions: (context, event) => console.log('test', {context, event}),
        // },
      },
    },
  },
}, {
  actions: {
    validateAccountAction: assign({
      token:
    })
  }
});
