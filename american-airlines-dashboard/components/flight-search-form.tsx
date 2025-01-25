"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function FlightSearchForm() {
  const [date, setDate] = useState<Date>()

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Find your flight</h2>
      <form>
        <RadioGroup defaultValue="roundtrip" className="flex mb-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="roundtrip" id="roundtrip" />
            <Label htmlFor="roundtrip">Round trip</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oneway" id="oneway" />
            <Label htmlFor="oneway">One way</Label>
          </div>
        </RadioGroup>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="from">From</Label>
              <Input id="from" placeholder="City or airport" />
            </div>
            <div>
              <Label htmlFor="to">To</Label>
              <Input id="to" placeholder="City or airport" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="depart">Depart</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="return">Return</Label>
              <Input id="return" type="date" />
            </div>
          </div>
          <Button className="w-full">Search Flights</Button>
        </div>
      </form>
    </div>
  )
}

