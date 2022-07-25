/* eslint-disable prettier/prettier */
import {createMachine} from 'xstate';

export const child =
  /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgGEALASwBsIA6AZSKwHcACAGSykYDkBDAWzHxAAHLLBIAXElgwCAHogDMANnQBPRIoAMlAJy692gCwaA7IoCsZ08jQhi5CAOGiJU2YgCMAJlWIAtF+trIA */
  createMachine({
    initial: 'Show Log Name',
    states: {
      'Show Log Name': {
        entry: 'showLogName',
      },
    },
    id: 'Child',
  }, {
    actions: {
      showLogName: () => console.log('inside parent machine'),
    },
  });
