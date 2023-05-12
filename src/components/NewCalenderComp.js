import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function CommonlyUsedComponents(props) {
  const { date1_label, time1_label, date2_label, time2_label} = props;
  const [regStartDate, setRegStartDate] = React.useState(null);
  const [regEndDate, setRegEndDate] = React.useState(null);

  const handleStartDateChange = (date) => {
    console.log(`Registration start date: ${date.toLocaleString()}`);
    setRegStartDate(date);
  };

  const handleEndDateChange = (date) => {
    console.log(`Registration end date: ${date.toLocaleString()}`);
    setRegEndDate(date);
  };
  
  const handleStartTimeChange = (date) => {
    console.log(`Registration start time: ${date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`);
  };

  const handleEndTimeChange = (date) => {
    console.log(`Registration end time: ${date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <DatePicker label={date1_label} onChange={handleStartDateChange} />
          </div>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <DatePicker label={date2_label} onChange={handleEndDateChange} />
          </div>
        </div>

        <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <TimePicker label={time1_label} onChange={handleStartTimeChange} />
          </div>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <TimePicker label={time2_label} onChange={handleEndTimeChange} />
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export { CommonlyUsedComponents };
