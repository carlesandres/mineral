import listReducer from '../app/es6/reducers/list';

jest.unmock('../app/es6/reducers/list');

describe('ListReducer', () => {
  it('returns the same state for an unknown action', () => {
    const initialState = {};
    const action = { type: 'WHATEVER' };
    const newState = listReducer(initialState, action);
    expect(newState).toBe(initialState);
  });

  it('it\'s default "activeView" is "INBOX" ', () => {
    const newState = listReducer();
    expect(newState.activeView).toBe('INBOX');
  });
});
