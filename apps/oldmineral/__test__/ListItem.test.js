import React from 'react';
import { render } from '@testing-library/react';

/* jest.unmock('../app/es6/components/ListItem.js'); */

import ListItem from 'components/ListItem.js';
import { Link } from 'react-router-dom';

describe('<ListItem />', () => {
  const props = {
    fileId: 3,
    title: 'some title',
    updatedAt: 333333,
    text: 'ze text',
    link: '/whatever',
    color: 'blue',
    action: jest.fn(),
  };

  it('renders one <Link /> component', () => {
    const wrapper = render(<ListItem {...props} />);
    expect(wrapper.find(Link).length).toBe(1);
  });

  it('has an "action" callback prop', () => {
    const wrapper = render(<ListItem {...props} />);
    wrapper.find('.icon').simulate('click');
    expect(props.action.mock.calls.length).toBe(1);
  });

  it('simulates click events', () => {
    const wrapper = render(<ListItem {...props} />);
    wrapper.find('.icon').simulate('click');
    expect(props.action.mock.calls[0][0]).toBe(3);
  });

  it('has the title "some title"', () => {
    const wrapper = render(<ListItem {...props} />);
    expect(wrapper.find('.title').text()).toBe('some title');
  });
});
