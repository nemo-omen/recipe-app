import { createMachine, assign, interpret } from 'xstate';

const menuMachine = createMachine(
  {
    id: 'menu',
    initial: 'collapsed',
    context: {
      currentMenu: null,
    },
    states: {
      collapsed: {
        on: {
          CLICK: {
            actions: assign({
              currentMenu: (context, event) => (context.currentMenu = event?.key),
            }),
            target: 'expanded',
          },
          GO: {
            actions: assign({
              currentMenu: (context, event) => (context.currentMenu = event?.key),
            }),
            target: 'collapsed',
          },
        },
      },
      expanded: {
        on: {
          CLICK: [
            {
              target: 'collapsed',
              cond: 'isCurrent',
            },
            {
              target: 'expanded',
              cond: 'isNotCurrent',
              actions: assign({
                currentMenu: (context, event) => (context.currentMenu = event?.key),
              }),
            },
          ],
          GO: {
            actions: assign({
              currentMenu: (context, event) => (context.currentMenu = event?.key),
            }),
            target: 'collapsed',
          },
        },
      },
    },
  },
  {
    guards: {
      isCurrent: (context, event) => context.currentMenu === event?.key,
      isNotCurrent: (context, event) => context.currentMenu !== event?.key,
    },
  },
);

export const menuService = interpret(menuMachine).start();
