import { formatGameTime, formatShortDate, getUserTimezone } from "@/utils/format-date"

interface FormattedDatetimeProps {
  datetime: string
  variant?: "short" | "long"
  className?: string
}

function FormattedDatetime({ datetime, className = "" }: FormattedDatetimeProps) {
  const userTimezone = getUserTimezone()
  return (
    <time dateTime={datetime} className={className}>
      {formatShortDate(datetime, userTimezone)} at {formatGameTime(datetime, userTimezone)}
    </time>
  )
}

export default FormattedDatetime
