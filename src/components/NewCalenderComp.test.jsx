import { render, screen } from '@testing-library/react';
import { CommonlyUsedComponents } from './NewCalenderComp';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Import AdapterDayjs
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

test('renders start date picker', () => {
  render(<CommonlyUsedComponents date1_label="Start Date" />);
  const datePicker = screen.getByLabelText('Start Date');
  expect(datePicker).toBeInTheDocument();
});
test('renders end time picker', () => {
    render(<CommonlyUsedComponents time2_label="End Time" />);
    const timePicker = screen.getByLabelText('End Time');
    expect(timePicker).toBeInTheDocument();

});