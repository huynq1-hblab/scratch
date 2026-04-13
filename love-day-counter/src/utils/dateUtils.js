import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  addYears,
  addMonths,
  format,
} from 'date-fns';

export function calculateDuration(startDate) {
  const now = new Date();
  const start = new Date(startDate);

  let years = differenceInYears(now, start);
  let tempDate = addYears(start, years);

  let months = differenceInMonths(now, tempDate);
  tempDate = addMonths(tempDate, months);

  let days = differenceInDays(now, tempDate);
  let totalHours = differenceInHours(now, start);
  let totalMinutes = differenceInMinutes(now, start);
  let totalSeconds = differenceInSeconds(now, start);

  let hours = totalHours % 24;
  let minutes = totalMinutes % 60;
  let seconds = totalSeconds % 60;

  return { years, months, days, hours, minutes, seconds };
}

export function calculateTotalDays(startDate) {
  const now = new Date();
  const start = new Date(startDate);
  return differenceInDays(now, start);
}

export function formatVietnameseDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const monthNames = [
    'tháng 01', 'tháng 02', 'tháng 03', 'tháng 04',
    'tháng 05', 'tháng 06', 'tháng 07', 'tháng 08',
    'tháng 09', 'tháng 10', 'tháng 11', 'tháng 12',
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}

export function calculateAge(birthday) {
  if (!birthday) return '';
  return differenceInYears(new Date(), new Date(birthday));
}

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
