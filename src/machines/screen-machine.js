/* eslint-disable prettier/prettier */
import { createMachine } from 'xstate';
import { CredentialMachine } from './credential-machine';

export const ScreenMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QGUDGAnMYB2ACAsgIaoAWAltmLgJIQB0AMgPZQW5qY4DEAggK4AXEjgFlUhAZESgADk1hlRTbNJAAPRACZNANjoAOAAzHDARgDMOgCwBOAKz67mgDQgAnolNXDB839MA7OaaAaH6OpoAvpGuHFh4RKQUVLR0ABJMALZUcdwAwpgSVAAK8gK4AEKCAsq4eQA2YgDWUkggcgpKKm0aCHY6ejYRdlbmQwFmmlauHghe5nR+-kEhYTrRsRjxBMTklDT0GdnsW9wVxE2qHYpkyqq9mjY+OiaG5lYO4TOINpq+-hYzKZDFZdBsQLkErtkgc6AUwEVcKVYOVIVxzqhLm1rl17ogAoE6Dp9AE7G9bJp+gEbN8EPZFktNPpgaZAiT1uDsEwIHBVJCdkl9qlmKw8JCrvIbnceohQbSnnQbEqlcEdPYguFwfzEnsUocsjlTt1ZJLcTKEOZqXRDKTjJTWToAt5zLTTCE6LYlfpvEy3u8ojEIUaBbrYfDEcjUUaJZ1bsb1IgjHpTMNSe87BMrPpXY9Fcr7NojPpzKYtcGdTDaDGpfHeqZs+5PPpotEgA */
    createMachine({
  initial: 'Login Screen',
  states: {
    'Login Screen': {
      invoke: {
        src: CredentialMachine,
        id: 'CredentialMachineId',
      },
      on: {
        Authenticated: {
          target: 'Home Screen',
        },
      },
    },
    'Home Screen': {
      on: {
        'Create Post Button Clicked': {
          target: 'Create Post Screen',
        },
        Back: {
          target: 'Login Screen',
        },
      },
    },
    'Create Post Screen': {
      on: {
        Back: {
          target: 'Home Screen',
        },
      },
    },
  },
  id: 'Screen Machine Id',
});
