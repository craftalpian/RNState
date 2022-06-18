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
