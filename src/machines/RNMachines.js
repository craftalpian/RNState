/* eslint-disable prettier/prettier */
import { createMachine, assign, spawn, send } from 'xstate';

// Screens Flow
export const RNMachine = createMachine({
    id: 'RNMachine',
    context: { message: null, authMachineRef: null, loginFormMachineRef: null, tokenRNMachine: null },
    entry: [
        'createAuth',
    ],
    initial: 'SPLASH',
    states: {
        SPLASH: {
            // SPLASH (screen) - wait until 3 second before move to LOGIN
            after: {
                3000: {
                    target: 'LOGIN',
                },
            },
        },
        LOGIN: {
            // LOGIN (screen)
            invoke: {
                src: (context, _) => context.authMachineRef,
            },
            on: {
                SUCCESS_LOGIN: {
                    target: 'HOME',
                },
                FAILED_LOGIN: {
                    // target: 'HOME',
                },
            },
            // on: {
            //     // CHANGE_USERNAME: {
            //     //     actions: assign({
            //     //         username: (context, event) => event.value,
            //     //     }),
            //     // },
            //     // SUBMIT: {
            //     //     // actions: (context, event) =>  console.log(context.username),
            //     //     actions: (context, event) =>  send({type: 'AUTH', name: context.username}, {to: 'authMachine'}),
            //     // },
            //     SUCCESS_LOGIN: {
            //         target: 'home',
            //         actions: (_, event) => console.log(event),
            //     },
            // },
        },
        HOME: {
            type: 'final',
        },
    },
});
