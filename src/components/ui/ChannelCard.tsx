"use client";
import React from "react";
import Card from "@/components/ui/Card";
import { getSourceIcon } from "@/lib/iconHelpers";

interface SourceChannel {
  name: string;
  customers: number;
  percentage: number;
  icon: string;
  color: string;
  bgColor: string;
}

interface ChannelCardProps {
  channels: SourceChannel[];
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channels }) => {
  return (
    <Card className="col-span-2 flex flex-col w-full p-2">
      <div className="grid grid-cols-2 gap-2">
        {channels.map((source, index) => (
          <div
            key={index}
            className={`${source.bgColor} p-2 rounded-lg flex items-center gap-2`}
          >
            <div className={`${source.color} shrink-0`}>
              {getSourceIcon(source.icon, 12, source.color)}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[8px] text-gray-600 truncate">{source.name}</p>
            </div>
            <div className="flex items-baseline gap-1">
              <p className="text-[10px] font-bold text-gray-900">
                {source.customers}
              </p>
              <span className="text-[8px] text-gray-500">
                ({source.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ChannelCard;
