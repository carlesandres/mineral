import React from 'react';
import { render } from '@testing-library/react';

import ListView from 'components/ListView';
import ListItem from 'components/ListItem';
import files from './mockFiles.json';

jest.unmock('components/ListView');
jest.unmock('./mockFiles.json');

describe('<ListView />', () => {
  it('renders 3 .list-group-item elements', () => {
    const wrapper = render(
      <ListView
        onBinFile={jest.fn()}
        onUnbinFile={jest.fn()}
        shownFiles={files.files}
      />
    );
    expect(wrapper.find(ListItem).length).toBe(3);
  });
});
