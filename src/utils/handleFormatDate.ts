import { format } from "date-fns";

export function handleFormatDate(dateString: string) {
  const date = new Date(dateString);
  const formattedDate = format(date, "MMMM, d yyyy");

  return formattedDate;
}

export function handleFormatDateTime(dateString: string) {
  const date = new Date(dateString);
  const formattedDate = format(date, "h:mm a");

  return formattedDate;
}
