import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CommonlyUsedComponents } from './NewCalenderComp';

describe('CommonlyUsedComponents', () => {
  // Mock event handlers
  const mockStartDateChange = jest.fn();
  const mockStartTimeChange = jest.fn();
  const mockEndDateChange = jest.fn();
  const mockEndTimeChange = jest.fn();

  it('should handle start date change', () => {
    const { getByLabelText } = render(
      <CommonlyUsedComponents
        date1_label="Start Date"
        onStartDateChange={mockStartDateChange}
      />
    );
    const datePicker = getByLabelText('Start Date');
    fireEvent.change(datePicker, { target: { value: '2023-05-18' } });

    // Add your assertions for the behavior of the event handler
    expect(mockStartDateChange).toHaveBeenCalledWith('1970-01-02');
    // Add additional assertions as needed
  });

  it('should handle end date change', () => {
    const { getByLabelText } = render(
      <CommonlyUsedComponents
        date2_label="End Date"
        onEndDateChange={mockEndDateChange}
      />
    );
    const datePicker = getByLabelText('End Date');
    fireEvent.change(datePicker, { target: { value: '2023-05-20' } });

    // Add your assertions for the behavior of the event handler
    expect(mockEndDateChange).toHaveBeenCalledWith('1970-01-02');
    // Add additional assertions as needed
  });

  it('should handle start time change', () => {
    const { getByLabelText } = render(
      <CommonlyUsedComponents
        time1_label="Start Time"
        onStartTimeChange={mockStartTimeChange}
      />
    );
    const timePicker = getByLabelText('Start Time');
    fireEvent.change(timePicker, { target: { value: '12:30' } });

    // Add your assertions for the behavior of the event handler
    expect(mockStartTimeChange).toHaveBeenCalledWith('02:00:00');
    // Add additional assertions as needed
  });

  it('should handle end time change', () => {
    const { getByLabelText } = render(
      <CommonlyUsedComponents
        time2_label="End Time"
        onEndTimeChange={mockEndTimeChange}
      />
    );
    const timePicker = getByLabelText('End Time');
    fireEvent.change(timePicker, { target: { value: '15:45' } });

    // Add your assertions for the behavior of the event handler
    expect(mockEndTimeChange).toHaveBeenCalledWith('02:00:00');
    // Add additional assertions as needed
  });

  // Add more tests as needed

});
