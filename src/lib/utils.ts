import { differenceInYears, format, formatDistance } from 'date-fns';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { ZodIssue } from 'zod';

export function calculateAge(dob: Date) {
  return differenceInYears(new Date(), dob)
}
export function handleFromServerErrors<TFieldValues extends FieldValues>(
  errorResponse: { error: string | ZodIssue[] },
  setError: UseFormSetError<TFieldValues>
) {
  if (Array.isArray(errorResponse?.error)) {
    errorResponse?.error.forEach((e) => {
      const fieldName = e.path.join('.') as Path<TFieldValues>
      setError(fieldName, { message: e?.message })
    })
  } else {
    setError('root.serverError', { message: errorResponse?.error })
  }
}
export function formateShortDateTime(date: Date) {
  return format(date, 'dd MM yy h:mm:a')
}
export function truncateString(text?: string | null, num = 50) {
  if (!text) return null
  if (text.length <= 50) {
    return text
  }
  return text.slice(0, num) + '...'
}

export function createChatId(a: string, b: string) {
  return a > b ? `${b}-${a}` : `${a}-${b}`
}

export function timeAgo(date: string) {
  let sendDate=new Date(date)
  if (isNaN(sendDate.getTime())) {
    return "Invalid date";
  }
  return formatDistance(sendDate,new Date());
}