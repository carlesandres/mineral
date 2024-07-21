import React from 'react';
import { render } from '@testing-library/react';

import HelpModal from '../app/es6/components/HelpModal';

jest.unmock('../app/es6/components/HelpModal');

xdescribe('<HelpModal />', () => {
  it('renders 1 p element', () => {
    const onClose = () => {};
    const wrapper = render(<HelpModal show onClose={onClose} />);
    expect(wrapper.find('p').length).toBe(1);
  });
});
