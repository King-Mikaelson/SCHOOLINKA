'use client'

import React, { type FC, useState, useEffect, useRef } from 'react'
import { Button } from '../@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../@/components/ui/popover'
import { Calendar } from '../@/components/ui/calendar'
import { DateInput } from '../@/components/ui/date-input'
import { Label } from '../@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../@/components/ui/select'
import { Switch } from '../@/components/ui/switch'
import { ChevronUpIcon, ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons'
import { cn } from '../@/lib/utils'
import AppContext from '../../Context/AppContext'
import { useContext } from 'react'

export interface DateRangePickerProps {
  /** Click handler for applying the updates from DateRangePicker. */
  onUpdate?: (values: { range: DateRange, rangeCompare?: DateRange }) => void
  /** Initial value for start date */
  initialDateFrom?: Date | string
  /** Initial value for end date */
  initialDateTo?: Date | string
  /** Initial value for start date for compare */
  initialCompareFrom?: Date | string
  /** Initial value for end date for compare */
  initialCompareTo?: Date | string
  /** Alignment of popover */
  align?: 'start' | 'center' | 'end'
  /** Option for locale */
  locale?: string
  /** Option for showing compare feature */
  showCompare?: boolean
}



const formatDate = (date: Date, locale: string = 'en-us'): string => {
  return date.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

interface DateRange {
  from: Date
  to: Date | undefined
}

interface Preset {
  name: string
  label: string
}

// Define presets
const PRESETS: Preset[] = [
  { name: 'today', label: 'Today' },
  { name: 'yesterday', label: 'Yesterday' },
  { name: 'last7', label: 'Last 7 days' },
  { name: 'last14', label: 'Last 14 days' },
  { name: 'last30', label: 'Last 30 days' },
  { name: 'thisWeek', label: 'This Week' },
  { name: 'lastWeek', label: 'Last Week' },
  { name: 'thisMonth', label: 'This Month' },
  { name: 'lastMonth', label: 'Last Month' }
]

/** The DateRangePicker component allows a user to select a range of dates */
export const DateRangePicker: FC<DateRangePickerProps> & {
  filePath: string
} = ({
  initialDateFrom = new Date((new Date()).setHours(0, 0, 0, 0)),
  initialDateTo,
  initialCompareFrom,
  initialCompareTo,
  onUpdate,
  align = 'end',
  locale = 'en-US',
  showCompare = true
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const [range, setRange] = useState<DateRange>({
    from: new Date((new Date(initialDateFrom)).setHours(0, 0, 0, 0)),
    to: initialDateTo ? new Date((new Date(initialDateTo)).setHours(0, 0, 0, 0)) : new Date((new Date(initialDateFrom)).setHours(0, 0, 0, 0))
  })
  const [rangeCompare, setRangeCompare] = useState<DateRange | undefined>(
    initialCompareFrom
      ? {
          from: new Date((new Date(initialCompareFrom)).setHours(0, 0, 0, 0)),
          to: initialCompareTo
            ? new Date((new Date(initialCompareTo)).setHours(0, 0, 0, 0))
            : new Date((new Date(initialCompareFrom)).setHours(0, 0, 0, 0))
        }
      : undefined
  )

  // Refs to store the values of range and rangeCompare when the date picker is opened
  const openedRangeRef = useRef<DateRange | undefined>();
  const openedRangeCompareRef = useRef<DateRange | undefined>();

  const [selectedPreset, setSelectedPreset] = useState<string | undefined>(undefined)
  const {date,setDate} = useContext(AppContext)



  const getPresetRange = (presetName: string): DateRange => {
    const preset = PRESETS.find(({ name }) => name === presetName)
    if (!preset) throw new Error(`Unknown date range preset: ${presetName}`)
    const from = new Date()
    const to = new Date()
    const first = from.getDate() - from.getDay()

    switch (preset.name) {
      case 'today':
        from.setHours(0, 0, 0, 0)
        to.setHours(23, 59, 59, 999)
        break
      case 'yesterday':
        from.setDate(from.getDate() - 1)
        from.setHours(0, 0, 0, 0)
        to.setDate(to.getDate() - 1)
        to.setHours(23, 59, 59, 999)
        break
      case 'last7':
        from.setDate(from.getDate() - 6)
        from.setHours(0, 0, 0, 0)
        to.setHours(23, 59, 59, 999)
        break
      case 'last14':
        from.setDate(from.getDate() - 13)
        from.setHours(0, 0, 0, 0)
        to.setHours(23, 59, 59, 999)
        break
      case 'last30':
        from.setDate(from.getDate() - 29)
        from.setHours(0, 0, 0, 0)
        to.setHours(23, 59, 59, 999)
        break
      case 'thisWeek':
        from.setDate(first)
        from.setHours(0, 0, 0, 0)
        to.setHours(23, 59, 59, 999)
        break
      case 'lastWeek':
        from.setDate(from.getDate() - 7 - from.getDay())
        to.setDate(to.getDate() - to.getDay() - 1)
        from.setHours(0, 0, 0, 0)
        to.setHours(23, 59, 59, 999)
        break
      case 'thisMonth':
        from.setDate(1)
        from.setHours(0, 0, 0, 0)
        to.setHours(23, 59, 59, 999)
        break
      case 'lastMonth':
        from.setMonth(from.getMonth() - 1)
        from.setDate(1)
        from.setHours(0, 0, 0, 0)
        to.setDate(0)
        to.setHours(23, 59, 59, 999)
        break
    }

    return { from, to }
  }

  const setPreset = (preset: string): void => {
    const range = getPresetRange(preset)
    setRange(range)
    if (rangeCompare) {
      const rangeCompare = {
        from: new Date(
          range.from.getFullYear() - 1,
          range.from.getMonth(),
          range.from.getDate()
        ),
        to: range.to
          ? new Date(
            range.to.getFullYear() - 1,
            range.to.getMonth(),
            range.to.getDate()
          )
          : undefined
      }
      setRangeCompare(rangeCompare)
    }
  }

  const checkPreset = (): void => {
    for (const preset of PRESETS) {
      const presetRange = getPresetRange(preset.name)

      const normalizedRangeFrom = new Date(range.from.setHours(0, 0, 0, 0))
      const normalizedPresetFrom = new Date(
        presetRange.from.setHours(0, 0, 0, 0)
      )

      const normalizedRangeTo = new Date(range.to?.setHours(0, 0, 0, 0) ?? 0)
      const normalizedPresetTo = new Date(
        presetRange.to?.setHours(0, 0, 0, 0) ?? 0
      )

      if (
        normalizedRangeFrom.getTime() === normalizedPresetFrom.getTime() &&
        normalizedRangeTo.getTime() === normalizedPresetTo.getTime()
      ) {
        setSelectedPreset(preset.name)
        return
      }
    }

    setSelectedPreset(undefined)
  }

  const resetValues = (): void => {
    setRange({
      from: typeof initialDateFrom === 'string' ? new Date(initialDateFrom) : initialDateFrom,
      to: initialDateTo ? (typeof initialDateTo === 'string' ? new Date(initialDateTo) : initialDateTo) : (typeof initialDateFrom === 'string' ? new Date(initialDateFrom) : initialDateFrom)
    })
    setRangeCompare(
      initialCompareFrom
        ? {
            from: typeof initialCompareFrom === 'string' ? new Date(initialCompareFrom) : initialCompareFrom,
            to: initialCompareTo
              ? (typeof initialCompareTo === 'string' ? new Date(initialCompareTo) : initialCompareTo)
              : (typeof initialCompareFrom === 'string' ? new Date(initialCompareFrom) : initialCompareFrom)
          }
        : undefined
    )
  }

  useEffect(() => {
    checkPreset()
  }, [range])

  const PresetButton = ({
    preset,
    label,
    isSelected
  }: {
    preset: string
    label: string
    isSelected: boolean
  }): JSX.Element => (
    <Button
      className={cn(isSelected && 'pointer-events-none')}
      variant="ghost"
      onClick={() => { setPreset(preset) }}
    >
      <>
        <span className={cn('pr-2 opacity-0', isSelected && 'opacity-70')}>
          <CheckIcon width={18} height={18} />
        </span>
        {label}
      </>
    </Button>
  )

  // Helper function to check if two date ranges are equal
  const areRangesEqual = (a?: DateRange, b?: DateRange) => {
    if (!a || !b) return a === b; // If either is undefined, return true if both are undefined
    return (
      a.from.getTime() === b.from.getTime() &&
      (!a.to || !b.to || a.to.getTime() === b.to.getTime())
    );
  };

  useEffect(() => {
    if (isOpen) {
      openedRangeRef.current = range;
      openedRangeCompareRef.current = rangeCompare;
    }
  }, [isOpen]);

  return (
        <div className=" border border-red-100 solid h-full grid grid-cols-1">
        <div className="flex py-2 w-full">
          <div className="">
            <div className="w-full">
              <div className="flex flex-col lg:flex-row gap-2 px-3 justify-end items-center pb-4 lg:pb-0">
                <div className="flex items-center space-x-2 pr-4 py-1">
                
                  {/* <Label htmlFor="compare-mode">Compare</Label> */}
                </div>
                {/* <div className="flex flex-col gap-2 items-center">
                  <div className="flex gap-3 items-center">
                  <Button variant={'outline'} className=" justify-start">
                    {date ? formatDate(date, "PPP"): " "}
                  </Button>
                    <Select defaultValue={selectedPreset} onValueChange={(value: string) => { setPreset(value) }}>
                  <SelectTrigger className="w-[180px] mx-auto">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {PRESETS.map((preset) => (
                      <SelectItem key={preset.name} value={preset.name}>{preset.label}</SelectItem>
                    ))}

                  </SelectContent>
                </Select>
                  </div>
                </div> */}
              </div>
              <div className=''>
                <Calendar
                className="flex border border-blue-950 solid"
                  mode="single"
                  selected={date}
                onSelect={setDate}
                  numberOfMonths={1}
                  defaultMonth={
                    new Date(new Date().setMonth(new Date().getMonth() - (1)))
                  }
                />
              </div>
            </div>
          </div>
          
        </div>
        </div>
  )
}

DateRangePicker.displayName = 'DateRangePicker'
DateRangePicker.filePath =
  'libs/shared/ui-kit/src/lib/date-range-picker/date-range-picker.tsx'