export const DegreesToDirection = (degrees) => {
  const value = Math.floor((degrees / 22.5) + 0.5);
  return WindDirection[value % 16];
}

const date = new Date();

let Months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let Weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let WindDirection = ['N','NNE','NE', 'ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];

export const Month =  Months[date.getMonth()];
export const Weekday = Weekdays[date.getDay()];
export const Day = date.getDate();