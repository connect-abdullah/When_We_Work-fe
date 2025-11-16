'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { DailyData, ChartTooltipProps } from './types';
import TimeframeSelector from './TimeframeSelector';

interface TotalOverviewChartProps {
    data: DailyData[];
    dailyAverage: number;
    percentageChange: number;
    timeframe: string;
    onTimeframeChange: (value: string) => void;
    timeframeOptions?: string[];
    onDownload?: () => void;
    className?: string;
}

const CustomTooltip = ({ active, payload }: ChartTooltipProps) => {
    if (!active || !payload?.length) return null;

    const data = payload[0]?.payload;
    const day = data?.day || '';
    const booked = data?.booked || 0;
    const revenue = data?.revenue || 0;

    return (
        <div className="bg-white p-1.5 rounded shadow-md border border-gray-200">
            <p className="text-[10px] font-medium text-gray-900 mb-1">
                {day}
            </p>
            <p className="text-[10px] text-gray-600" style={{ color: '#C4B5FD' }}>
                Booked: {booked} appointments
            </p>
            <p className="text-[10px] text-gray-600" style={{ color: '#60A5FA' }}>
                Revenue: ${revenue.toLocaleString()}
            </p>
        </div>
    );
};

const TotalOverviewChart: React.FC<TotalOverviewChartProps> = ({
    data,
    dailyAverage,
    percentageChange,
    timeframe,
    onTimeframeChange,
    timeframeOptions = ['Last 7 Days', 'Last 30 Days'],
    onDownload,
    className = '',
}) => {
    return (
        <Card className={`flex flex-col w-full p-2 ${className}`}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1">
                <h1 className="text-[10px] font-medium text-[#1F384C]">
                    Bookings & Revenue
                </h1>
                <div className="flex items-center gap-2 my-1 text-[9px] flex-wrap justify-end">
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#C4B5FD]" />
                    <span className="text-gray-600">Booked</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#60A5FA]" />
                    <span className="text-gray-600">Revenue</span>
                </div>
            </div>
            </div>

            {/* bottom margin */}
            <div className="mb-2"></div>
          
            {/* Chart */}
            <div className="mt-2 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 5, right: 25, left: 5, bottom: 5 }}
                        barCategoryGap="20%"
                    >
                        <CartesianGrid strokeDasharray="2 2" stroke="#E5E7EB" vertical={false} />
                        <XAxis
                            dataKey="day"
                            tick={{ fontSize: 7, fill: '#6B7280' }}
                            axisLine={{ stroke: '#E5E7EB' }}
                            tickLine={{ stroke: '#E5E7EB' }}
                            interval={0}
                        />
                        <YAxis
                            yAxisId="left"
                            tick={{ fontSize: 7, fill: '#6B7280' }}
                            axisLine={{ stroke: '#E5E7EB' }}
                            tickLine={{ stroke: '#E5E7EB' }}
                            label={{ value: 'Bookings', angle: -90, position: 'insideLeft', style: { fontSize: 8, fill: '#6B7280' } }}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            tick={{ fontSize: 7, fill: '#6B7280' }}
                            axisLine={{ stroke: '#E5E7EB' }}
                            tickLine={{ stroke: '#E5E7EB' }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                            label={{ value: 'Revenue', angle: 90, position: 'insideRight', style: { fontSize: 8, fill: '#6B7280' } }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                            yAxisId="left"
                            dataKey="booked"
                            fill="#C4B5FD"
                            radius={[2, 2, 0, 0]}
                            name="Booked"
                        />
                        <Bar
                            yAxisId="right"
                            dataKey="revenue"
                            fill="#60A5FA"
                            radius={[2, 2, 0, 0]}
                            opacity={0.7}
                            name="Revenue"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default TotalOverviewChart;

