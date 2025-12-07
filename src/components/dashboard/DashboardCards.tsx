import React from "react";
import { Calendar, DollarSign, Users, Workflow } from "lucide-react";
import Card from "@/components/ui/Card";
import { DASHBOARD_CARDS } from "@/constants/dashboard";

interface DashboardCardsProps {
  className?: string;
}

const iconMap = {
  DollarSign,
  Calendar,
  Users,
  Workflow,
};

const DashboardCards: React.FC<DashboardCardsProps> = ({ className }) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4 m-1 sm:m-2 ${className || ""}`}
    >
      {DASHBOARD_CARDS.map((item, index) => {
        const IconComponent = iconMap[item.iconName];

        return (
          <Card
            key={index}
            className={`w-full ${item.bgColor} shadow-md`}
            padding="lg"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-lg sm:text-xl font-medium text-[#1F384C]">
                {item.value}
              </h1>
              <IconComponent className={item.iconColor} size={20} />
            </div>
            <p className="text-xs text-[#1F384C] mt-2">{item.title}</p>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardCards;
