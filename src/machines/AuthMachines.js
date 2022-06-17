/* eslint-disable prettier/prettier */
import { createMachine, sendParent, assign, send } from 'xstate';

const getToken = () => new Promise((res, rej) => res('tokenjwt'));
const validateUser = (context, event) => new Promise((res, rej) => console.log(event.name));

export const AuthMachine = createMachine({
    id: 'AuthMachine',
    context: { username: null, password: null, tokenMachineRef: null, tokenAuthMachine: null },
    entry: [
        'createTokenMachine',
    ],
    on: {
        CHANGE_USERNAME: {
            actions: assign({
                username: (_, event) => event.value,
            }),
        },
        CHANGE_PASSWORD: {
            actions: assign({
                password: (_, event) => event.value,
            }),
        },
        SUBMIT_LOGIN: {
            // actions: (context, event) => console.log('SUBMIT_LOGIN SUCCESS'),
            actions: (context, event) => send({ type: 'LOGIN', username: context.username, password: context.password }, { to: 'tokenMachine' }),
        },
    },
    initial: 'IDLE',
    states: {
        IDLE: {

        },
        LOGIN: {
            on: {
                CHANGE_USERNAME: {
                    actions: assign({
                        username: (_, event) => event.value,
                    }),
                },
                CHANGE_PASSWORD: {
                    actions: assign({
                        password: (_, event) => event.value,
                    }),
                },
                SUBMIT: {

                },
            },
        },
        SUBMIT: {
            // actions: (context, event) =>  console.log(context.username),
            // actions: (context, event) => send({ type: 'AUTH', name: context.username }, { to: 'tokenMachine' }),
            actions: (context, event) => console.log('context, event', context, event),
        },
        LOADING: {
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
        },
        // fetchingToken: {
        //     invoke: {
        //         src: () => getToken(),
        //     },
        // },
        AUTHENTICATION: {
            // invoke: {
            //     src: 'validateUser',
            // },
            // entry: sendParent('SUCCESS_LOGIN'),
            // entry: (context, event) => console.log(context, event),
        },
    },
}, {
    services: {
        loginUser: (context, event) => {
            sendParent('SUCCESS_LOGIN');
            console.log(context, event.type);
        },
    },
    guards: {
        userAuthentication: (_, event) => {
            console.log(event.name);
            return true;
        },
    },
});
