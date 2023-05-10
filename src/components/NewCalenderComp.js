import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// function Label({ componentName, valueType, isProOnly }) {
//     const content = (
//         <span>
//           <strong>{componentName}</strong> 
//         </span>
//       );

//   if (isProOnly) {
//     return (
//       <Stack direction="row" spacing={0.5} component="span">
//         <Tooltip title="Included on Pro package">
//           <a href="/x/introduction/licensing/#pro-plan">
//             <span className="plan-pro" />
//           </a>
//         </Tooltip>
//         {content}
//       </Stack>
//     );
//   }

//   return content;
// }

// Label.propTypes = {
//   componentName: PropTypes.string.isRequired,
//   isProOnly: PropTypes.bool,
//   valueType: PropTypes.string.isRequired,
// };

export default function CommonlyUsedComponents(props) {
  const { date1_label, time1_label, date2_label, time2_label} = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale={"en-gb"}>
      <div style={{ display: 'flex', justifyContent: 'center' }} > 
        <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <DatePicker label={date1_label} />
          </div>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <DatePicker label={date2_label} />
          </div>
        </div>

        <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <TimePicker label={time1_label} />
          </div>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <TimePicker label={time2_label} />
          </div>
        </div> 
      </div>
    </LocalizationProvider>
  );
}
