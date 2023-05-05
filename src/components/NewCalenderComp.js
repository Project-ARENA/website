import * as React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { CalenderComp } from './CalenderComp';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  startDate,
  endDate,
} from "../components/CalenderComp.js";
let regstrDate;
let regendDate;
let regTimeBegin;

function Label({ componentName, valueType, isProOnly }) {
    const content = (
        <span>
          <strong>{componentName}</strong> 
        </span>
      );

  if (isProOnly) {
    return (
      <Stack direction="row" spacing={0.5} component="span">
        <Tooltip title="Included on Pro package">
          <a href="/x/introduction/licensing/#pro-plan">
            <span className="plan-pro" />
          </a>
        </Tooltip>
        {content}
      </Stack>
    );
  }

  return content;
}

Label.propTypes = {
  componentName: PropTypes.string.isRequired,
  isProOnly: PropTypes.bool,
  valueType: PropTypes.string.isRequired,
};

export default function CommonlyUsedComponents() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DatePicker',
          'TimePicker',
          'DateTimePicker',
          'DateRangePicker',
        ]}
      >
          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>  
            <LocalizationProvider dateAdapter={AdapterDayjs}>
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ display: 'inline-block', marginRight: '60px' }}>
      <DatePicker label="Uncontrolled picker 1" />
    </div>
    <div style={{ display: 'inline-block' }}>
      <DatePicker label="Uncontrolled picker 2" />
    </div>
  </div>
</LocalizationProvider>
            
          </div>
        
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
      
     
    </Box>
          
        
        
        
          {/* <DateRangePicker
  localeText={{
    start: '',
    end: '',
  }}
  onChange={(value) => {
    if (value === null) {
      console.log('No date range selected');
    } else {
      regstrDate = value[0] ? value[0].format('YYYY-MM-DD') : null;
      regendDate = value[1] ? value[1].format('YYYY-MM-DD') : null;
      console.log('Selected date range:', "Reg begins ",regstrDate," and Reg end date is ",regendDate);
    }
  }}
/> */}
        

        <DemoItem label={<Label componentName="Registration Time Start" valueType="time" />}>
  <TimePicker
    value={regTimeBegin}
    onChange={(newValue) => {
      regTimeBegin = newValue.format('HH:mm:ss');
      console.log('Registration time start:', regTimeBegin);
    }}
  />
</DemoItem>

        <DemoItem label={<Label componentName="Registration Time End" valueType="time" />}>
          <TimePicker />
        </DemoItem>
        <label style={{ marginLeft: 6, marginBottom: 0.4, marginTop: 5 }}> Competition Date Duration</label>
        <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>  
            <LocalizationProvider dateAdapter={AdapterDayjs}>
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ display: 'inline-block', marginRight: '60px' }}>
      <DatePicker label="Uncontrolled picker 1" />
    </div>
    <div style={{ display: 'inline-block' }}>
      <DatePicker label="Uncontrolled picker 2" />
    </div>
  </div>
</LocalizationProvider>
            
          </div>
        <DemoItem label={<Label componentName="Competition Time Start" valueType="time" />}>
          <TimePicker />
        </DemoItem>
        <DemoItem label={<Label componentName="Competition Time End" valueType="time" />}>
          <TimePicker />
        </DemoItem>

      </DemoContainer>
    </LocalizationProvider>
  );
}
