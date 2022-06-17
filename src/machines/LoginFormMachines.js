/* eslint-disable prettier/prettier */
import { createMachine, assign } from 'xstate';

export const LoginFormMachine = createMachine({
    id: 'createMachine',
    initial: 'dataEntry',
    context: {
        username: '',
        password: '',
    },
    states: {
        dataEntry: {
            on: {
                ENTER_USERNAME: {
                    actions: [
                        (context) => console.log('context', JSON.stringify(context)),
                        (_, event) => console.log('event', JSON.stringify(event)),
                        assign({ username: (_, event) => event.value }),
                    ],
                },
                // ENTER_PASSWORD: {},
                SUBMIT: {
                    // actions
                },
            },
        },
    },
});
