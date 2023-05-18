import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BasicTabs from './tabs';
import '@testing-library/jest-dom';

describe('BasicTabs', () => {
  const mockSubmit = jest.fn();
  const mockLabels = ['Tab 1', 'Tab 2', 'Tab 3'];
  const mockTabCount = 3;
  const mockTabContent = ['Content 1', 'Content 2', 'Content 3'];
  const mockTabContent2 = ['Content 1', 'Content 2', 'Content 3'];

  test('renders tabs with correct labels', () => {
    const { getByText } = render(
      <BasicTabs
        onSubmit={mockSubmit}
        labels={mockLabels}
        tabCount={mockTabCount}
        tabContent={mockTabContent}
        tabContent2={mockTabContent2}
      />
    );

    // Check that each label is rendered in the component
    mockLabels.forEach((label) => {
      expect(getByText(label)).toBeInTheDocument();
    });
  });

  test('calls onSubmit with correct index when button is clicked', () => {
    const { getByText } = render(
      <BasicTabs
        onSubmit={mockSubmit}
        labels={mockLabels}
        tabCount={mockTabCount}
        tabContent={mockTabContent}
        tabContent2={mockTabContent2}
      />
    );

    const button = getByText('Upload Solution');
    fireEvent.click(button);

    // Check that the onSubmit function is called with the correct index value
    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith(0); // Assuming the index value for the first tab is 0
  });

  test('updates value state when handleChange is called', () => {
    const { getAllByRole } = render(
      <BasicTabs
        onSubmit={mockSubmit}
        labels={mockLabels}
        tabCount={mockTabCount}
        tabContent={mockTabContent}
        tabContent2={mockTabContent2}
      />
    );

    const tabs = getAllByRole('tab'); // Get all the tab elements
    const secondTab = tabs[1]; // Assuming you want to test the second tab

    fireEvent.click(secondTab);

    // Check that the second tab has the expected attribute value
    expect(secondTab).toHaveAttribute('aria-selected', 'true');
  });
});
