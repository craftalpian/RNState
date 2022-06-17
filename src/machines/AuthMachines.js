/* eslint-disable prettier/prettier */
import { createMachine, sendParent, assign, send } from 'xstate';

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
                    actions: (context, _) => send({type: 'LOGIN', username: context.username, password: context.password}, {to: context.tokenMachineRef}),
                },
            },
        },
        // LOADING: {
        // on: {
        //     CHANGE_USERNAME: {
        //         actions: assign({
        //             username: (context, event) => event.value,
        //         }),
        //     },
        // },
        // type: 'final',
        // after: {
        //     500000: {
        //         target: 'AUTHENTICATION',
        //     },
        // },
        // },
        // fetchingToken: {
        //     invoke: {
        //         src: () => getToken(),
        //     },
        // },
        // AUTHENTICATION: {
        // invoke: {
        //     src: 'validateUser',
        // },
        // entry: sendParent('SUCCESS_LOGIN'),
        // entry: (context, event) => console.log(context, event),
        // },
    },
}, {
    actions: {
        changeUsernameAction: assign({ username: (_, event) => event.value, errorMsg: null }),
        changePasswordAction: assign({ password: (_, event) => event.value, errorMsg: null }),
    },
    guards: {
        checkAccountGuard: (context, _) => {
            return context.username === 'pian';
        },
    },
});
