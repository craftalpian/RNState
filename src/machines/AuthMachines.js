/* eslint-disable prettier/prettier */
import { createMachine, sendParent, assign, send } from 'xstate';

const localMachine = createMachine({
    id: 'localMachine',
    on: {
        LOGIN: {
            actions: () => console.log('localmachine'),
        },
    },
});

export const AuthMachine = createMachine({
    id: 'AuthMachine',
    context: { username: null, password: null, tokenMachineRef: null, errorMsg: null },
    entry: [
        'tokenMachine',
    ],
    initial: 'LOGIN',
    states: {
        IDLE: {},
        LOGIN: {
            on: {
                CHANGE_USERNAME: { actions: 'changeUsernameAction' },
                CHANGE_PASSWORD: { actions: 'changePasswordAction' },
                // SUBMIT_LOGIN: [
                //     {
                //         cond: 'checkAccountGuard',
                //         actions: sendParent('SUCCESS_LOGIN'),
                //     },
                //     {
                //         actions: assign({
                //             errorMsg: 'Username tidak diizinkan',
                //         }),
                //     },
                // ],
                SUBMIT_LOGIN: {
                    actions: 'submitLoginAction',
                },
            },
        },
    },
}, {
    actions: {
        changeUsernameAction: assign({ username: (_, event) => event.value, errorMsg: null }),
        changePasswordAction: assign({ password: (_, event) => event.value, errorMsg: null }),
        submitLoginAction: (context, event) => send({type: 'login'}, {to: context.tokenMachineRef}),
    },
    guards: {
        checkAccountGuard: (context, _) => {
            return context.username === 'pian';
        },
    },
});
