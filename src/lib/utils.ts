import { differenceInYears, format } from 'date-fns';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { ZodIssue } from 'zod';

export function calculateAge(dob:Date){
return differenceInYears( new Date(),dob)
}
export function handleFromServerErrors<TFieldValues extends FieldValues>(
errorResponse:{error:string|ZodIssue[]},
setError:UseFormSetError<TFieldValues>
){
    if (Array.isArray(errorResponse?.error)) {
        errorResponse?.error.forEach((e) => {
          const fieldName = e.path.join('.') as Path<TFieldValues>
          setError(fieldName, { message: e?.message })
        })
      } else {
        setError('root.serverError', { message: errorResponse?.error })
      }
}
export function formateShortDateTime(date:Date){
return format(date,'dd MM yy h:mm:a')
}