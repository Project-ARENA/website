import React from 'react';
import { render } from '@testing-library/react';
import CircularIndeterminate from './loadingIcon';
import '@testing-library/jest-dom';

test('renders CircularIndeterminate without errors', () => {
  render(<CircularIndeterminate />);
  // No error means the test passed
});
test('displays the circular progress', () => {
    const { getByRole } = render(<CircularIndeterminate />);
    const circularProgress = getByRole('progressbar');
    expect(circularProgress).toBeInTheDocument();
  });
  test('has the correct styling', () => {
    const { container } = render(<CircularIndeterminate />);
    const boxElement = container.firstChild;
    expect(boxElement).toHaveStyle({ display: 'flex' });
  });