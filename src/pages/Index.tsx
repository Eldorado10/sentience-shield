import { Users, Activity, Calendar, AlertTriangle } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { CrisisAlert } from "@/components/dashboard/CrisisAlert";
import { MoodTrendChart } from "@/components/dashboard/MoodTrendChart";
import { AIAnalysisChart } from "@/components/dashboard/AIAnalysisChart";
import { SessionsChart } from "@/components/dashboard/SessionsChart";
import { UsersTable } from "@/components/dashboard/UsersTable";
import { CounselorsTable } from "@/components/dashboard/CounselorsTable";

const Index = () => {
  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Overview Dashboard</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Users"
            value="1,284"
            icon={Users}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatsCard
            title="Active Sessions"
            value="47"
            icon={Calendar}
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatsCard
            title="Avg. Mood Score"
            value="7.2/10"
            icon={Activity}
            variant="success"
          />
          <StatsCard
            title="Crisis Alerts"
            value="2"
            icon={AlertTriangle}
            variant="destructive"
          />
        </div>
      </section>

      {/* Crisis Alerts & Charts */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <CrisisAlert />
        </div>
        <div className="lg:col-span-2">
          <MoodTrendChart />
        </div>
      </section>

      {/* AI Analysis & Sessions */}
      <section className="grid gap-6 lg:grid-cols-2">
        <AIAnalysisChart />
        <SessionsChart />
      </section>

      {/* Users Table */}
      <section>
        <UsersTable />
      </section>

      {/* Counselors Table */}
      <section>
        <CounselorsTable />
      </section>
    </div>
  );
};

export default Index;
