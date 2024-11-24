import React from 'react';
import { render } from '@testing-library/react';

import Logo from '../components/Logo';
import Link from 'next/link';

jest.unmock('../components/Logo');

describe('<Logo />', () => {
  it('renders one <Link /> component', () => {
    const wrapper = render(<Logo />);
    expect(wrapper.find(Link).length).toBe(1);
  });

  xit('simulates click events', () => {
    const onClick = jest.fn();
    const wrapper = render(<Logo onClick={onClick} />);
    wrapper.find('.navbar-header').simulate('click');
    expect(onClick).toBeCalled();
  });
});
