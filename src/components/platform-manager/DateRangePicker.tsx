
import React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DateRangeFilter } from "./types";
import { useToast } from "@/hooks/use-toast";

interface DateRangePickerProps {
  dateRange: DateRangeFilter;
  onDateRangeChange: (dateRange: DateRangeFilter) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ dateRange, onDateRangeChange }) => {
  const { toast } = useToast();

  const resetDateFilters = () => {
    onDateRangeChange({ startDate: null, endDate: null });
    toast({
      title: "Filters Reset",
      description: "Date range filters have been cleared.",
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className={cn(
            "justify-start text-left font-normal",
            !dateRange.startDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange.startDate ? (
            dateRange.endDate ? (
              <>
                {format(dateRange.startDate, "MMM d")} - {format(dateRange.endDate, "MMM d")}
              </>
            ) : (
              format(dateRange.startDate, "MMM d, yyyy")
            )
          ) : (
            <span>Filter by date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={{
            from: dateRange.startDate || undefined,
            to: dateRange.endDate || undefined,
          }}
          onSelect={(range) => {
            onDateRangeChange({
              startDate: range?.from || null,
              endDate: range?.to || null,
            });
          }}
          initialFocus
          className="p-3 pointer-events-auto"
        />
        <div className="flex items-center justify-between p-3 border-t">
          <span className="text-sm text-muted-foreground">
            {dateRange.startDate && dateRange.endDate 
              ? `${format(dateRange.startDate, "PP")} - ${format(dateRange.endDate, "PP")}`
              : "Select a date range"}
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetDateFilters}
            disabled={!dateRange.startDate && !dateRange.endDate}
          >
            Reset
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
