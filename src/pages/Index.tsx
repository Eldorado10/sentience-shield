import { Users, Activity, Calendar, AlertTriangle, Brain, Heart } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { CrisisAlert } from "@/components/dashboard/CrisisAlert";
import { MoodTrendChart } from "@/components/dashboard/MoodTrendChart";
import { AIAnalysisChart } from "@/components/dashboard/AIAnalysisChart";
import { SessionsChart } from "@/components/dashboard/SessionsChart";
import { UsersTable } from "@/components/dashboard/UsersTable";
import { CounselorsTable } from "@/components/dashboard/CounselorsTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  MindCare Admin
                </h1>
                <p className="text-sm text-muted-foreground">Mental Health Monitoring System</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-destructive animate-pulse" />
              <span className="text-sm font-medium">2 Active Crisis Alerts</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats Overview */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Overview Dashboard</h2>
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
      </main>
    </div>
  );
};

export default Index;
