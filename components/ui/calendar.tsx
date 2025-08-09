"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker as ReactDayPicker, DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"



type ChevronProps = {
  className?: string
  size?: number
  disabled?: boolean
  orientation?: "left" | "right" | "up" | "down"
}

type CalendarBaseProps = {
  className?: string
  classNames?: Record<string, string>
  showOutsideDays?: boolean
  components?: {
    Chevron?: React.ComponentType<ChevronProps>
  }
}

type CalendarSingleProps = CalendarBaseProps & {
  mode?: "single"
  selected?: Date
  onSelect?: (date: Date | undefined) => void
}

type CalendarMultipleProps = CalendarBaseProps & {
  mode: "multiple"
  selected?: Date[]
  onSelect?: (dates: Date[] | undefined) => void
}


type CalendarRangeProps = CalendarBaseProps & {
  mode: 'range'
  selected?: DateRange
  onSelect?: (range: DateRange | undefined) => void
}


type CalendarProps =
  | CalendarSingleProps
  | CalendarMultipleProps
  | CalendarRangeProps

export type { CalendarProps }

function Calendar({
  className,
  classNames: propClassNames,
  showOutsideDays = true,
  components,
  ...props
}: CalendarProps) {
  const classNames = {
    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
    month: "space-y-4",
    caption: "flex justify-center pt-1 relative items-center",
    caption_label: "text-sm font-medium",
    nav: "space-x-1 flex items-center",
    nav_button: cn(
      buttonVariants({ variant: "outline" }),
      "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
    ),
    nav_button_previous: "!absolute !left-1",
    nav_button_next: "!absolute !right-1",
    table: "w-full border-collapse space-y-1",
    head_row: "flex",
    head_cell:
      "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
    row: "flex w-full mt-2",
    cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
    day: cn(
      buttonVariants({ variant: "ghost" }),
      "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    ),
    day_range_end: "day-range-end",
    day_selected:
      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
    day_today: "bg-accent text-accent-foreground",
    day_outside:
      "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
    day_disabled: "text-muted-foreground opacity-50",
    day_range_middle:
      "aria-selected:bg-accent aria-selected:text-accent-foreground",
    day_hidden: "invisible",
    ...propClassNames,
  }

  return (
    <div className={cn("p-3", className)}>
      {props.mode === "multiple" ? (
        <ReactDayPicker
          mode="multiple"
          selected={props.selected}
          onSelect={props.onSelect}
          showOutsideDays={showOutsideDays}
          classNames={classNames}
          components={{
            ...(components || {}),
            Chevron: ({
              className: chevronClassName,
              orientation = "left",
              ...rest
            }: ChevronProps) => {
              const Icon =
                orientation === "left" || orientation === "up"
                  ? ChevronLeft
                  : ChevronRight
              return (
                <Icon
                  className={cn("h-4 w-4", chevronClassName)}
                  {...rest}
                />
              )
            },
          }}
        />
      ) : props.mode === "range" ? (
        <ReactDayPicker
          mode="range"
          selected={props.selected}
          onSelect={props.onSelect}
          showOutsideDays={showOutsideDays}
          classNames={classNames}
          components={{
            ...(components || {}),
            Chevron: ({
              className: chevronClassName,
              orientation = "left",
              ...rest
            }: ChevronProps) => {
              const Icon =
                orientation === "left" || orientation === "up"
                  ? ChevronLeft
                  : ChevronRight
              return (
                <Icon
                  className={cn("h-4 w-4", chevronClassName)}
                  {...rest}
                />
              )
            },
          }}
        />
      ) : (
        <ReactDayPicker
          mode="single"
          selected={props.selected}
          onSelect={props.onSelect}
          showOutsideDays={showOutsideDays}
          classNames={classNames}
          components={{
            ...(components || {}),
            Chevron: ({
              className: chevronClassName,
              orientation = "left",
              ...rest
            }: ChevronProps) => {
              const Icon =
                orientation === "left" || orientation === "up"
                  ? ChevronLeft
                  : ChevronRight
              return (
                <Icon
                  className={cn("h-4 w-4", chevronClassName)}
                  {...rest}
                />
              )
            },
          }}
        />
      )}
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
