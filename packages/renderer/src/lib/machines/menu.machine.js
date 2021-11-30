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
