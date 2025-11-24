import React from "react";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab, className }) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]?.id);

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={cn("w-full", className)}>
      {/* Tab Headers */}
      <div className="flex border-b border-[#C8CBD9] mb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-3 py-1.5 text-[10px] font-medium transition-colors border-b-2",
              activeTab === tab.id
                ? "text-[#5A6ACF] border-[#5A6ACF] bg-[#F1F2F7]"
                : "text-[#5A6ACF]/70 border-transparent hover:text-[#5A6ACF] hover:border-[#5A6ACF]/30",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full">{activeTabContent}</div>
    </div>
  );
};

export default Tabs;
