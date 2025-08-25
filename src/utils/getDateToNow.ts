import { formatDistanceToNow } from "date-fns";

export const formatDateToNow = (dateString: string) => {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch {
    return "Recently";
  }
};
