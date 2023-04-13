import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function TabPanel(props) {
  const { children, value, index, onSubmit, ...other } = props;

  const handleButtonClick = () => {
    onSubmit(index);
  };
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
          <Button variant="contained" color="primary" onClick={handleButtonClick}>
            Submit
          </Button>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ onSubmit, tabCount, tabContent }) { // Receive onSubmit, tabCount, and tabContent props
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {Array.from({ length: tabCount }, (_, index) => (
            <Tab
              key={index}
              label={`Testcase ${index + 1}`}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {Array.from({ length: tabCount }, (_, index) => (
        <TabPanel
          key={index}
          value={value}
          index={index}
          onSubmit={onSubmit}
        >
          {/* Render content for each tab from the tabContent prop */}
          {tabContent[index]}
        </TabPanel>
      ))}
    </Box>
  );
}
