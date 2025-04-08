
import React from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Grid3X3, Package, LineChart } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import DateRangePicker from "@/components/platform-manager/DateRangePicker";
import { DateRangeFilter } from "@/components/platform-manager/types";

interface PlatformDashboardHeaderProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  dateRange: DateRangeFilter;
  onDateRangeChange: (dateRange: DateRangeFilter) => void;
  onShowTutorial: () => void;
  onShowAddPlatformDialog: () => void;
}

const PlatformDashboardHeader: React.FC<PlatformDashboardHeaderProps> = ({
  selectedTab,
  setSelectedTab,
  dateRange,
  onDateRangeChange,
  onShowTutorial,
  onShowAddPlatformDialog
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-2xl sm:text-3xl">Platform Dashboard</h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={onShowTutorial}>
                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View dashboard tutorial</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-muted-foreground">
            Manage your POD platforms and track performance in one place
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <TabsList className="grid grid-cols-4 p-1 gap-1 bg-muted/50 rounded-xl backdrop-blur-sm w-full max-w-md">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-1.5 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Home className="size-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="platforms" 
              className="flex items-center gap-1.5 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Grid3X3 className="size-4" />
              <span>Platforms</span>
            </TabsTrigger>
            <TabsTrigger 
              value="products" 
              className="flex items-center gap-1.5 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Package className="size-4" />
              <span>Products</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="flex items-center gap-1.5 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm transition-all duration-200"
            >
              <LineChart className="size-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>
        </div>
      </div>
        
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <DateRangePicker 
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
        />
          
        <Button 
          onClick={onShowAddPlatformDialog}
          className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 shadow-md"
        >
          <span className="mr-2">+</span> Add Platform
        </Button>
      </div>
    </>
  );
};

export default PlatformDashboardHeader;
