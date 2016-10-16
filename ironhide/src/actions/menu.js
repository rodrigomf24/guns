import { OPEN_MENU, CLOSE_MENU } from '../constants';

export function toggleMenu(open) {
  return {
    type: (open) ? OPEN_MENU : CLOSE_MENU,
    open
  };
};
