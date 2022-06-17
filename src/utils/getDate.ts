import dayjs from 'dayjs';

export function getDate(date: Date) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}
