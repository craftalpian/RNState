/* eslint-disable prettier/prettier */
import { useSelector, useInterpret } from '@xstate/react';
import { ScreenMachine } from './';

export const Machine = () => {
    const screenMachine = useInterpret(ScreenMachine);
    const screenMachineState = useSelector(screenMachine, state => state);
    const credentialMachine = useSelector(screenMachine, state => state.children.CredentialMachineId);

    return {
        screenMachine,
        screenMachineState,
        credentialMachine,
    };
};
