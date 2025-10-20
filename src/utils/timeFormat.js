
import { parseISO, format } from 'date-fns';

export function dateConvertionBlogsPageBlogCard(isoDate) {
  if (!isoDate) return '';
  const parsedDate = parseISO(isoDate); // convert ISO string to Date object
  return format(parsedDate, 'dd/MM/yyyy'); // format as 29/07/2025
}

export function dateConvertionHomePageBlogCard(isoDate) {
  if (!isoDate) return '';
  const parsedDate = parseISO(isoDate); // convert ISO string to Date object
  return format(parsedDate, 'MMMM d, yyyy'); // Example: March 5, 2024
}
