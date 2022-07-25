/* eslint-disable prettier/prettier */
import { createMachine, sendParent, assign, send } from 'xstate';

export const ActionMachine = createMachine({
    id: 'ActionMachine',
    context: { username: null, password: null, tokenMachineRef: null, errorMsg: null },
    entry: [
        'tokenMachine',
    ],
    initial: 'AUTH',
    states: {
        IDLE: {},
        AUTH: {
            actions: (),
            on: {

            }
        },
        LOGIN: {
            on: {
                CHANGE_USERNAME: { actions: 'changeUsernameAction' },
                CHANGE_PASSWORD: { actions: 'changePasswordAction' },
                SUBMIT_LOGIN: [
                    {
                        cond: 'checkAccountGuard',
                        actions: sendParent('SUCCESS_LOGIN'),
                    },
                    {
                        actions: assign({
                            errorMsg: 'Username tidak diizinkan',
                        }),
                    },
                ],
                // SUBMIT_LOGIN: {
                //     actions: 'submitLoginAction',
                // },
            },
        },
    },
}, {
    actions: {
        getTokenActions: send({type: 'GET_TOKEN'}, {to: 'tokenMachine'}),
        changeUsernameAction: assign({ username: (_, event) => event.value, errorMsg: null }),
        changePasswordAction: assign({ password: (_, event) => event.value, errorMsg: null }),
        submitLoginAction: send((context, event) => ({type: 'LOGIN', username: context.username, password: context.password}), {to: 'tokenMachine'})
    },
    guards: {
        checkAccountGuard: (context, _) => {
            return context.username === 'pian';
        },
    },
});
