import { useEffect, useRef, useState } from  'react'
import { DateRange } from 'react-date-range'
import format from 'date-fns/format'

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';


const CalenderComp = () => {
    const [calendar, setCalendar] = useState('')

    const [open, setOpen] = useState(false)
    const refOne = useRef(null)
    // date state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

useEffect (() => {
// set current date on component Load
setCalendar (format (new Date(), 'MM/dd/yyyy'))
document.addEventListener("keydown", hideOnEscape, true)
document.addEventListener("click", hideOnClickOutside, true)
}, []) 

const hideOnEscape = (e) => {
   console. log(e.key)
   if( e.key === "Escape" ) {
   setOpen(false)
   }
}

const hideOnClickOutside = (e) => {
  if( refOne.current && !refOne.current.contains(e.target))  {
setOpen(false)
  }
}

function handleSelect(date){
    console.log(`${format(range[0].startDate, "MM-dd-yyyy")} to ${format(range[0].endDate, "MM-dd-yyyy")}`)
    setCalendar(format(date, 'MM-dd-yyyy')); // native Date object
  };

    return(
        <div classname = "calenderwrap">
            <input
      value={range[0] ? `${format(range[0].startDate, "MM-dd-yyyy")} to ${format(range[0].endDate, "MM-dd-yyyy")}` : ""}
      readOnly
      className="inputBox"
      style={{ border: "1px solid black", width: 225 }}
      placeholder={!range[0] && "Click to Select a date"}
      onClick={() => setOpen(open => !open)}
    />
             
               
            {/* <DateRangePicker
            onChange={item => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
            />; */}
            <div ref={refOne}>
            {open &&
            <DateRange
            onChange={item => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction="horizontal"
            className="calendarElement"
          />
            }
            </div> 
            
            
           
            
        </div>
    )
}
export default CalenderComp