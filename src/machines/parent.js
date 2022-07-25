/* eslint-disable prettier/prettier */
import {createMachine} from 'xstate';
import {child} from './child';

export const parent =
  /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgAcBDAJzAwBcA6AYwAsBLAGwgFkj6GMx8QCtYDCgywZeAD0QBaAIwAWAExUArAHZ5ygMwBONQDYZCgAwAOdAE9piqnrnajyuUdXa7Ck5uXI0fUuQq8-ILCohLSMnp6KupyWrqqBsZmIJYIsjLKNnYOTsYKyiZy3t5AA */
  createMachine({
    initial: 'childMachine',
    states: {
      childMachine: {
        invoke: {
          src: child,
          id: 'child',
        },
      },
    },
    id: 'parent',
  });

