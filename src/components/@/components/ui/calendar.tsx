import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { DayPicker } from "react-day-picker"

import { cn } from "../../lib/utils"
import { buttonVariants } from "../../components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }


































// import * as React from "react"
// import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
// import { DayPicker } from "react-day-picker"

// import { cn } from "../../lib/utils"
// import { Button, buttonVariants } from "../../components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
// import AppContext from "../../../../Context/AppContext"
// import { addDays, format } from "date-fns"

// export type CalendarProps = React.ComponentProps<typeof DayPicker>

// function Calendar({
//   className,
//   classNames,
//   showOutsideDays = true,
//   ...props
// }: CalendarProps) {


//   const formatDate = (date: Date, locale: string = 'en-us'): string => {
//     return date.toLocaleDateString(locale, {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     })
//   }

//   const [date, setDate] = React.useState<Date | undefined>(new Date())


//   return (
//     <DayPicker
//       showOutsideDays={showOutsideDays}
//       className={cn("w-full p-16", className)}
//       classNames={{
//         months: "flex flex-col sm:flex-row space-y-16 sm:space-x-16 sm:space-y-16 w-full",
//         month: "space-y-4",
//         caption: "flex justify-center pt-1 relative items-center",
//         caption_label: "text-sm font-medium",
//         nav: "space-x-1 flex items-center",
//         nav_button: cn(
//           buttonVariants({ variant: "outline" }),
//           "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
//         ),
//         nav_button_previous: "absolute left-1",
//         nav_button_next: "absolute right-1",
//         table: "w-full border-collapse space-y-1",
//         head_row: "flex",
//         head_cell:
//           "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
//         row: "flex w-full mt-2",
//         cell: cn(
//           "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
//           props.mode === "range"
//             ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
//             : "[&:has([aria-selected])]:rounded-md"
//         ),
//         day: cn(
//           buttonVariants({ variant: "ghost" }),
//           "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
//         ),
//         day_range_start: "day-range-start",
//         day_range_end: "day-range-end",
//         day_selected:
//           "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
//         day_today: "bg-accent text-accent-foreground",
//         day_outside: "text-muted-foreground opacity-50",
//         day_disabled: "text-muted-foreground opacity-50",
//         day_range_middle:
//           "aria-selected:bg-accent aria-selected:text-accent-foreground",
//         day_hidden: "invisible",
//         ...classNames,
//       }}
//       components={{
//         IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
//         IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
//         HeadRow: () => <div className="flex flex-col gap-2 items-center">
//         <div className="flex gap-3 items-center">
//         <Button variant={'outline'} className="flex w-full ">
//           {format(date!, "PPP")}
//         </Button>
//          <Select
//           onValueChange={(value) =>
//             setDate(addDays(new Date(), parseInt(value)))
//           }
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select" />
//           </SelectTrigger>
//           <SelectContent position="popper">
//             <SelectItem value="0">Today</SelectItem>
//             <SelectItem value="1">Tomorrow</SelectItem>
//             <SelectItem value="3">In 3 days</SelectItem>
//             <SelectItem value="7">In a week</SelectItem>
//           </SelectContent>
//         </Select>
//         </div>
//       </div>
//       }}
//       {...props}
//     />
//   )
// }
// Calendar.displayName = "Calendar"

// export { Calendar }
