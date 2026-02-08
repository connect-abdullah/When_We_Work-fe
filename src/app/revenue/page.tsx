"use client";

import React from "react";
import { Card, MetricCard, PageHeader } from "@/components/ui";
import { Banknote, Calendar, TrendingUp } from "lucide-react";

export default function RevenuePage() {
  return (
    <div className="flex flex-col w-full h-full pt-4 px-2 sm:px-4 overflow-y-auto">
      <PageHeader
        title="Revenue"
        description="Your revenue and earnings overview"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-2 sm:px-4 mb-4">
        <MetricCard
          icon={Banknote}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
          label="Total Revenue"
          value="$0"
        />
        <MetricCard
          icon={Calendar}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
          label="This Month"
          value="$0"
        />
        <MetricCard
          icon={TrendingUp}
          iconBgColor="bg-violet-50"
          iconColor="text-violet-600"
          label="Last Month"
          value="$0"
        />
      </div>

      <div className="px-2 sm:px-4 pb-4">
        <Card className="p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            Overview
          </h2>
          <p className="text-sm text-gray-600">
            Revenue data will appear here once you have completed jobs and
            payments are recorded.
          </p>
        </Card>
      </div>
    </div>
  );
}
