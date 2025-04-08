
import React from "react";
import ModuleCard from "@/components/dashboard/ModuleCard";
import StatCard from "@/components/dashboard/StatCard";
import { 
  Search, 
  Palette, 
  ShieldCheck, 
  Store, 
  MessageSquare, 
  BarChart3, 
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-3xl">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to Print Genius Suite. Manage your POD business efficiently.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Revenue" 
          value="$12,458"
          change={{ value: 12, trend: "up" }}
          icon={<DollarSign className="h-5 w-5" />}
        />
        <StatCard 
          title="Total Sales" 
          value="834"
          change={{ value: 8, trend: "up" }}
          icon={<ShoppingCart className="h-5 w-5" />}
        />
        <StatCard 
          title="Active Designs" 
          value="287"
          change={{ value: 23, trend: "up" }}
          icon={<Palette className="h-5 w-5" />}
        />
        <StatCard 
          title="Customers" 
          value="1,493"
          change={{ value: 4, trend: "up" }}
          icon={<Users className="h-5 w-5" />}
        />
      </div>

      <div>
        <h2 className="font-semibold text-xl mb-4">POD Business Modules</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ModuleCard 
            title="Niche Research" 
            description="Find profitable niches and analyze competition across major POD platforms" 
            icon={<Search className="h-6 w-6" />}
            path="/niche-research"
          />
          <ModuleCard 
            title="Design Generator" 
            description="Create and edit POD-ready designs with AI assistance and templates" 
            icon={<Palette className="h-6 w-6" />}
            path="/design"
          />
          <ModuleCard 
            title="Copyright Checker" 
            description="Check your designs for potential copyright and trademark issues" 
            icon={<ShieldCheck className="h-6 w-6" />}
            path="/copyright-checker"
          />
          <ModuleCard 
            title="Platform Dashboard" 
            description="Manage listings across multiple POD platforms in one place" 
            icon={<Store className="h-6 w-6" />}
            path="/platforms"
          />
          <ModuleCard 
            title="Marketing Planner" 
            description="Create marketing plans with mockups and social media content" 
            icon={<MessageSquare className="h-6 w-6" />}
            path="/marketing"
          />
          <ModuleCard 
            title="Analytics Dashboard" 
            description="Track performance metrics and sales across all your POD platforms" 
            icon={<BarChart3 className="h-6 w-6" />}
            path="/analytics"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
