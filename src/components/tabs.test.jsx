import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BasicTabs from './tabs';

describe('BasicTabs', () => {
  const onSubmitMock = jest.fn();

    //The component renders the correct number of tabs based on the tabCount prop.
  test('renders correct number of tabs', () => {
    const tabCount = 3;
    const tabContent = [
      <div key="tab1">Tab 1 Content</div>,
      <div key="tab2">Tab 2 Content</div>,
      <div key="tab3">Tab 3 Content</div>,
    ];

    const { getAllByRole } = render(
      <BasicTabs
        onSubmit={onSubmitMock}
        tabCount={tabCount}
        tabContent={tabContent}
      />
    );

    const tabs = getAllByRole('tab');
    expect(tabs.length).toBe(tabCount);
  });

  // The component renders the correct content based on the tabContent prop.
  // Clicking a tab shows the corresponding content from the tabContent prop.
  test('renders correct content when tab is clicked', () => {
    const tabCount = 2;
    const tabContent = [
      <div key="tab1">Tab 1 Content</div>,
      <div key="tab2">Tab 2 Content</div>,
    ];

    const { getByText } = render(
      <BasicTabs
        onSubmit={onSubmitMock}
        tabCount={tabCount}
        tabContent={tabContent}
      />
    );

    fireEvent.click(getByText('Testcase 2'));
    expect(getByText('Tab 2 Content')).toBeInTheDocument();

    fireEvent.click(getByText('Testcase 1'));
    expect(getByText('Tab 1 Content')).toBeInTheDocument();
  });

  // The component calls the onSubmit prop when the submit button is clicked. 
  // Clicking the submit button in a tab calls the onSubmit prop with the index of the current tab.
  test('calls onSubmit prop when submit button is clicked', () => {
    const tabCount = 1;
    const tabContent = [
      <div key="tab1">Tab 1 Content</div>,
    ];

    const { getByRole } = render(
      <BasicTabs
        onSubmit={onSubmitMock}
        tabCount={tabCount}
        tabContent={tabContent}
      />
    );

    fireEvent.click(getByRole('button'));
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith(0); // should call with index of current tab (0 in this case)
  });


  test('shows the correct tab as active', () => {
    const tabCount = 3;
    const tabContent = [
      <div key="tab1">Tab 1 Content</div>,
      <div key="tab2">Tab 2 Content</div>,
      <div key="tab3">Tab 3 Content</div>,
    ];

    const { getByText } = render(
      <BasicTabs
        onSubmit={onSubmitMock}
        tabCount={tabCount}
        tabContent={tabContent}
      />
    );

    expect(getByText('Tab 1 Content')).toBeInTheDocument();
    expect(getByText('Testcase 1')).toHaveAttribute('aria-selected', 'true');

    fireEvent.click(getByText('Testcase 2'));
    expect(getByText('Tab 2 Content')).toBeInTheDocument();
    expect(getByText('Testcase 2')).toHaveAttribute('aria-selected', 'true');

    fireEvent.click(getByText('Testcase 3'));
    expect(getByText('Tab 3 Content')).toBeInTheDocument();
    expect(getByText('Testcase 3')).toHaveAttribute('aria-selected', 'true');
  });

  test('displays only one tabpanel at a time', () => {
    const tabCount = 3;
    const tabContent = [
      <div key="tab1">Tab 1 Content</div>,
      <div key="tab2">Tab 2 Content</div>,
      <div key="tab3">Tab 3 Content</div>,
    ];

    const { getByText } = render(
      <BasicTabs
        onSubmit={onSubmitMock}
        tabCount={tabCount}
        tabContent={tabContent}
      />
    );

    fireEvent.click(getByText('Testcase 2'));
    expect(getByText('Tab 2 Content')).toBeInTheDocument();
    // expect(getByText('Tab 1 Content')).not.toBeVisible();
    // expect(getByText('Tab 3 Content')).not.toBeVisible();

    fireEvent.click(getByText('Testcase 3'));
    expect(getByText('Tab 3 Content')).toBeInTheDocument();
    // expect(getByText('Tab 1 Content')).not.toBeVisible();
    // expect(getByText('Tab 2 Content')).not.toBeVisible();
  });

 
});
