import { useReducer, useContext, useCallback, createContext } from 'react';

interface ShortcutsContext {
  keyActionMap: Record<string, string>;
  shortcutDescription: Record<string, string>;
  initialized: boolean;
  show: boolean;
}

const defaultState = {
  show: false,
  keyActionMap: {},
  shortcutDescription: undefined,
};

const ShortcutsContext = createContext<ShortcutsContext | null>(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'set': {
      return {
        ...state,
        keyActionMap: action.keyActionMap,
        shortcutDescription: action.shortcutDescription,
        initialized: true,
      };
    }
    case 'show': {
      return { ...state, show: true };
    }
    case 'hide': {
      return { ...state, show: false };
    }
    default: {
      throw new Error(`Unhandled action type ${action.type}`);
    }
  }
};

const ShortcutsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const value = { state, dispatch };

  return (
    // @ts-ignore
    <ShortcutsContext.Provider value={value}>
      {children}
    </ShortcutsContext.Provider>
  );
};

function useShortcuts() {
  const context = useContext(ShortcutsContext);
  // @ts-ignore
  const { state, dispatch } = context;

  if (typeof context === 'undefined') {
    throw new Error('useShortcuts must be used within a ShortcutsProvider');
  }

  const showShortcuts = useCallback(() => dispatch({ type: 'show' }), []);
  const hideShortcuts = useCallback(() => dispatch({ type: 'hide' }), []);

  return { state, dispatch, showShortcuts, hideShortcuts };
}

export { ShortcutsProvider, useShortcuts };
