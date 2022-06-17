/* eslint-disable prettier/prettier */
import { createMachine, sendParent, assign, send } from 'xstate';

export const AuthMachine = createMachine({
    id: 'AuthMachine',
    context: { username: null, password: null, tokenMachineRef: null },
    entry: [
        'tokenMachine',
    ],
    initial: 'LOGIN',
    states: {
        IDLE: {},
        LOGIN: {
            on: {
                CHANGE_USERNAME: { actions: 'changeUsername' },
                CHANGE_PASSWORD: { actions: 'changePassword' },
                SUBMIT_LOGIN: {
                    actions: (context, _) => send({ type: 'LOGIN', username: context.username, password: context.password }, { to: context.tokenMachineRef }),
                    // on:
                    // invoke: {
                    //     src: (context, _) => context.tokenMachineRef,
                    //     id: 'tokenMachines',
                    // },
                    // entry: (context, event) => send({ type: 'LOGIN', username: context.username, password: context.password }, { to: 'tokenMachines' }),
                    // on: {
                    //     SUCCESS: {

                    //     }
                    // }
                },
            },
        },
        // SUBMIT: {
        //     // actions: (context, event) =>  console.log(context.username),
        //     // actions: (context, event) => send({ type: 'AUTH', name: context.username }, { to: 'tokenMachine' }),
        //     actions: (context, event) => console.log('context, event', context, event),
        // },
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
        changeUsername: assign({ username: (_, event) => event.value }),
        changePassword: assign({ password: (_, event) => event.value }),
    },
});
