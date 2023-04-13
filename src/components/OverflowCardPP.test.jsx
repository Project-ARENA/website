import React from 'react';
import { render,fireEvent,shallow } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import OverflowCardPP from './OverflowCardPP';

describe('OverflowCardPP', () => {
  it('renders without crashing', () => {
    render(<OverflowCardPP />);
  });

  it('displays the correct image', () => {
    const image = 'https://example.com/image.jpg';
    const { getByAltText } = render(<OverflowCardPP image={image} />);
    expect(getByAltText('')).toHaveAttribute('src', image);
  });

  it('displays the correct title', () => {
    const title = 'Example Title';
    const { getByText } = render(<OverflowCardPP title={title} />);
    expect(getByText(title)).toBeInTheDocument();
  });

  it('displays the correct description when not registered', () => {
    const description = 'Example Description';
    const { getByText } = render(<OverflowCardPP description={description} isRegistered={false} />);
    expect(getByText(description)).toBeInTheDocument();
  });

  it('displays the correct button text when not registered', () => {
    const { getByText } = render(<OverflowCardPP isRegistered={false} />);
    expect(getByText('Register Now')).toBeInTheDocument();
  });

  it('displays the correct button text when already registered', () => {
    const { getByText } = render(<OverflowCardPP isRegistered={true} />);
    expect(getByText('Leave')).toBeInTheDocument();
  });

});