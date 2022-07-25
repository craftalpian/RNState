/* eslint-disable prettier/prettier */
import { createMachine, assign, spawn, send } from 'xstate';

// Screens Flow
export const RNMachine = createMachine({
    id: 'RNMachine',
    context: { message: null, actionMachineRef: null, loginFormMachineRef: null, tokenRNMachine: null },
    entry: [
        'createAction',
    ],
    initial: 'SPLASH',
    states: {
        SPLASH: {
            // // SPLASH (screen) - wait until 3 second before move to LOGIN
            // invoke: {
            //     src: (context, _) => context.actionMachineRef,
            //     data: {
                    
            //     }
            // },
            // on: {
            //     TOKEN_FOUND: {
            //         target: 'HOME',
            //     },
            //     TOKEN_NOT_FOUND: {
            //         target: 'LOGIN',
            //     },
            //     TOKEN_INVALID: {
            //         target: 'LOGIN',
            //     },
            // }
            after: {
                3000: {
                    target: 'LOGIN',
                },
            },
        },
        LOGIN: {
            // LOGIN (screen)
            invoke: {
                src: (context, _) => context.actionMachineRef,
            },
            on: {
                SUCCESS_LOGIN: {
                    target: 'HOME',
                },
            },
        },
        HOME: {
            type: 'final',
        },
        REGISTER: {
            type: 'final',
        },
    },
});
