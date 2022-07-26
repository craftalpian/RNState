/* eslint-disable prettier/prettier */
import { createMachine } from 'xstate';

export const CredentialMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGEBOkwDsAuBLAhgDYAEAsvgMYAWumYxAkhAHQAqYAHto5gA4Cu3AHIB7bgFEAtr2wBPAMTjM+AEaF6AIUHYRmRKF4jYuPLv0gOiAKwBGACzMAHAGYA7FYBMABi83XzmwBOKwAaEFlEGytA5kC4wMcANgTExOcPRwBfTLC0DBwCEnJqWnomeVZZXlooc0NjUz0kC0Q7DzCIhCiY+JSUtIzsnJBMEQg4czzxgqIySho6RhZ2Lh4BYTFiKRlOgyMTXDNmywQMjyd3Lw8rO0d7P1cOyKtnWN7nR0C0ux+rbNz0NM8LNigsyiwAMr4ABumm0ui2yjUkDq+0a5hOqVczGcPl8gRsNhcbUcTy6Lze8Q+X2cPzsf2GUywwKK81KS2YUNhxC02B0mGIABFcLBVOoIKiGocmqATm0yYEvJS4rTAs4Aok7P8QEyZqySosmJKDkdZZFSeFEIlmHjbXafK4hpkgA */
  createMachine({
    initial: 'Save Button Disabled',
    context: {
      test: 123,
    },
    on: {
      Typing: {
        actions: () => console.log("Typing entered"),
        target: '.Text Input Not Empty',
      },
    },
    states: {
      'Text Input Not Empty': {
        on: {
          'Enable Button': {
            target: 'Save Button Enabled',
          },
        },
      },
      'Save Button Enabled': {
        entry: 'Show Alert',
      },
      'Save Button Disabled': {},
    },
    id: 'Credential Machine Id',
  });
