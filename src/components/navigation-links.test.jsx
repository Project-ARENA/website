import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavigationLinks from './navigation-links';

describe('NavigationLinks', () => {
  it('should render navigation links with correct text', () => {
    const props = {
      text: 'Link 1',
      text1: 'Link 2',
      text2: 'Link 3',
      text3: 'Link 4',
      text4: 'Link 5',
    };
    const { getByText } = render(<NavigationLinks {...props} />);
    expect(getByText('Link 1')).toBeInTheDocument();
    expect(getByText('Link 2')).toBeInTheDocument();
    expect(getByText('Link 3')).toBeInTheDocument();
    expect(getByText('Link 4')).toBeInTheDocument();
    expect(getByText('Link 5')).toBeInTheDocument();
  });
});
