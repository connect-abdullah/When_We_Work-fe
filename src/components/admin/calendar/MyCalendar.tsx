"use client";

// ============================================================================
// CALENDAR COMPONENT
// ============================================================================
// This is the main calendar component that displays the FullCalendar with:
// - Time grid view showing hourly slots
// - Staff members as resources (columns)
// - Events/appointments
// - Current time indicator (red line)
// - Auto-scroll to current time when "Today" is clicked

import { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { EventClickArg, EventContentArg } from "@fullcalendar/core";
import {
  CheckCircle,
  Clock,
  DollarSign,
  Instagram,
  Mail,
  MessageCircle,
} from "lucide-react";

// ============================================================================
// DATA CONFIGURATION
// ============================================================================
// Get today's date in YYYY-MM-DD format for dynamic event creation
const today = new Date().toISOString().split("T")[0];

// Sample events data with booking status, payment, and source info
const events = [
  // TODAY'S EVENTS (dynamically created with 15-minute precision)
  {
    id: "today1",
    title: "Sarah Johnson",
    service: "Haircut & Styling",
    start: `${today}T08:00:00`,
    end: `${today}T08:45:00`,
    backgroundColor: "#e0f2fe",
    borderColor: "#0ea5e9",
    textColor: "#0c4a6e",
    resourceId: "abril",
    extendedProps: {
      status: "confirmed",
      paid: true,
      source: "instagram",
      customer: "Sarah Johnson",
    },
  },
  {
    id: "today2",
    title: "Mike Chen",
    service: "Hair Coloring",
    start: `${today}T09:00:00`,
    end: `${today}T10:30:00`,
    backgroundColor: "#ddd6fe",
    borderColor: "#a78bfa",
    textColor: "#5b21b6",
    resourceId: "abril",
    extendedProps: {
      status: "confirmed",
      paid: true,
      source: "whatsapp",
      customer: "Mike Chen",
    },
  },
  {
    id: "today3",
    title: "Emma Wilson",
    service: "Balayage",
    start: `${today}T11:00:00`,
    end: `${today}T12:00:00`,
    backgroundColor: "#fce7f3",
    borderColor: "#f472b6",
    textColor: "#831843",
    resourceId: "abril",
    extendedProps: {
      status: "booked",
      paid: false,
      source: "messenger",
      customer: "Emma Wilson",
    },
  },
  {
    id: "today4",
    title: "John Davis",
    service: "Keratin Treatment",
    start: `${today}T13:00:00`,
    end: `${today}T14:15:00`,
    backgroundColor: "#fed7aa",
    borderColor: "#fb923c",
    textColor: "#7c2d12",
    resourceId: "abril",
    extendedProps: {
      status: "confirmed",
      paid: true,
      source: "instagram",
      customer: "John Davis",
    },
  },
  {
    id: "today5",
    title: "Lisa Brown",
    service: "Hair Styling",
    start: `${today}T15:00:00`,
    end: `${today}T15:45:00`,
    backgroundColor: "#e0f2fe",
    borderColor: "#0ea5e9",
    textColor: "#0c4a6e",
    resourceId: "abril",
    extendedProps: {
      status: "confirmed",
      paid: true,
      source: "sms",
      customer: "Lisa Brown",
    },
  },
  {
    id: "today6",
    title: "David Kim",
    service: "Deep Tissue Massage",
    start: `${today}T08:30:00`,
    end: `${today}T09:30:00`,
    backgroundColor: "#d1fae5",
    borderColor: "#34d399",
    textColor: "#064e3b",
    resourceId: "allan",
    extendedProps: {
      status: "confirmed",
      paid: true,
      source: "whatsapp",
      customer: "David Kim",
    },
  },
  {
    id: "today7",
    title: "Anna Martinez",
    service: "Swedish Massage",
    start: `${today}T10:00:00`,
    end: `${today}T10:45:00`,
    backgroundColor: "#ccfbf1",
    borderColor: "#2dd4bf",
    textColor: "#134e4a",
    resourceId: "allan",
    extendedProps: {
      status: "booked",
      paid: false,
      source: "instagram",
      customer: "Anna Martinez",
    },
  },
  {
    id: "today8",
    title: "Robert Lee",
    service: "Hot Stone Therapy",
    start: `${today}T11:15:00`,
    end: `${today}T12:30:00`,
    backgroundColor: "#ffedd5",
    borderColor: "#fb923c",
    textColor: "#7c2d12",
    resourceId: "allan",
    extendedProps: {
      status: "confirmed",
      paid: true,
      source: "messenger",
      customer: "Robert Lee",
    },
  },
  {
    id: "today9",
    title: "Jessica Taylor",
    service: "Sports Massage",
    start: `${today}T14:00:00`,
    end: `${today}T15:00:00`,
    backgroundColor: "#e0f2fe",
    borderColor: "#0ea5e9",
    textColor: "#0c4a6e",
    resourceId: "allan",
    extendedProps: {
      status: "confirmed",
      paid: true,
      source: "whatsapp",
      customer: "Jessica Taylor",
    },
  },
  {
    id: "today10",
    title: "Mark Thompson",
    service: "Relaxation Massage",
    start: `${today}T16:00:00`,
    end: `${today}T16:45:00`,
    backgroundColor: "#ddd6fe",
    borderColor: "#a78bfa",
    textColor: "#5b21b6",
    resourceId: "allan",
    extendedProps: {
      status: "booked",
      paid: false,
      source: "sms",
      customer: "Mark Thompson",
    },
  },
  {
    id: "today11",
    title: "Emily Rodriguez",
    service: "Facial Treatment",
    start: `${today}T08:00:00`,
    end: `${today}T09:00:00`,
    backgroundColor: "#fce7f3",
    borderColor: "#f472b6",
    textColor: "#831843",
    resourceId: "bianca",
    extendedProps: {
      status: "confirmed",
      paid: true,
      source: "instagram",
      customer: "Emily Rodriguez",
    },
  },
  {
    id: "today12",
    title: "Sophie Anderson",
    service: "Microdermabrasion",
    start: `${today}T09:30:00`,
    end: `${today}T10:15:00`,
    backgroundColor: "#e9d5ff",
    borderColor: "#c084fc",
    textColor: "#581c87",
    resourceId: "bianca",
    extendedProps: {
      status: "confirmed",
      paid: true,
      source: "whatsapp",
      customer: "Sophie Anderson",
    },
  },
  {
    id: "today13",
    title: "Rachel Green",
    service: "Chemical Peel",
    start: `${today}T10:45:00`,
    end: `${today}T11:35:00`,
    backgroundColor: "#dbeafe",
    borderColor: "#60a5fa",
    textColor: "#1e3a8a",
    resourceId: "bianca",
    extendedProps: {
      status: "booked",
      paid: false,
      source: "messenger",
      customer: "Rachel Green",
    },
  },
  {
    id: "today14",
    title: "Monica White",
    service: "Hydrafacial",
    start: `${today}T12:00:00`,
    end: `${today}T13:00:00`,
    backgroundColor: "#d1fae5",
    borderColor: "#34d399",
    textColor: "#064e3b",
    resourceId: "bianca",
    extendedProps: {
      status: "confirmed",
      paid: true,
      source: "instagram",
      customer: "Monica White",
    },
  },
  {
    id: "today15",
    title: "Phoebe Clark",
    service: "Anti-Aging Facial",
    start: `${today}T14:00:00`,
    end: `${today}T15:00:00`,
    backgroundColor: "#fce7f3",
    borderColor: "#f472b6",
    textColor: "#831843",
    resourceId: "bianca",
    extendedProps: {
      status: "confirmed",
      paid: true,
      source: "whatsapp",
      customer: "Phoebe Clark",
    },
  },
  {
    id: "today16",
    title: "Chandler Bing",
    service: "Gentleman's Facial",
    start: `${today}T15:30:00`,
    end: `${today}T16:30:00`,
    backgroundColor: "#e0f2fe",
    borderColor: "#0ea5e9",
    textColor: "#0c4a6e",
    resourceId: "bianca",
    extendedProps: {
      status: "booked",
      paid: false,
      source: "sms",
      customer: "Chandler Bing",
    },
  },
];

// ============================================================================
// INTERFACES
// ============================================================================
interface MyCalendarProps {
  filteredResources?: string[]; // Which staff members to show
  selectedDate?: Date; // Which date to display
}

// ============================================================================
// MAIN CALENDAR COMPONENT
// ============================================================================
export default function MyCalendar({
  filteredResources = ["abril", "allan", "bianca"],
  selectedDate = new Date(),
}: MyCalendarProps) {
  // Reference to the FullCalendar instance for API access
  const calendarRef = useRef<FullCalendar>(null);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handle event clicks - show event details
   * @param clickInfo - FullCalendar event click information
   */
  const handleEventClick = (clickInfo: EventClickArg) => {
    alert(`Event: ${clickInfo.event.title}`);
  };

  // ============================================================================
  // AUTO-SCROLL TO CURRENT TIME
  // ============================================================================

  /**
   * Auto-scroll to current time when date changes to today
   * This is triggered when the "Today" button is clicked
   */
  useEffect(() => {
    if (calendarRef.current) {
      const calendar = calendarRef.current.getApi();
      const today = new Date();

      // Only auto-scroll if we're viewing today's date
      if (selectedDate.toDateString() === today.toDateString()) {
        // Wait for calendar to render completely
        setTimeout(() => {
          const now = new Date();
          const timeStr = now.toTimeString().split(" ")[0]; // Get HH:MM:SS format

          // Step 1: Use FullCalendar's built-in scrollToTime method
          calendar.scrollToTime(timeStr); // true = smooth scrolling

          // Step 2: Fine-tune the scroll position to center the current time
          setTimeout(() => {
            const scrollContainer = document.querySelector(".fc-scroller");
            if (scrollContainer) {
              const containerHeight = scrollContainer.clientHeight;
              const currentHour = now.getHours();
              const currentMinute = now.getMinutes();

              // Calculate exact position of current time slot
              // Each 15-minute slot = 36px, so 4 slots per hour = 144px per hour
              // Each minute = 144/60 = 2.4px
              const currentTimePosition =
                currentHour * 144 + (currentMinute / 60) * 144;

              // Center the current time slot in the viewport
              const centerOffset = containerHeight / 2;
              const scrollPosition = Math.max(
                0,
                currentTimePosition - centerOffset,
              );

              // Debug logging for development
              // console.log("Centering current time slot:");
              // console.log("- Current hour:", currentHour);
              // console.log("- Current minute:", currentMinute);
              // console.log(
              //   "- Current time position:",
              //   currentTimePosition,
              //   "px",
              // );
              // console.log("- Container height:", containerHeight, "px");
              // console.log("- Center offset:", centerOffset, "px");
              // console.log("- Scroll position:", scrollPosition, "px");

              // Smooth scroll to center the current time slot
              scrollContainer.scrollTo({
                top: scrollPosition,
                behavior: "smooth",
              });
            }
          }, 400); // Wait 400ms for scrollToTime to complete
        }, 600); // Wait 600ms for calendar to render
      }
    }
  }, [selectedDate]); // Re-run when selectedDate changes

  // ============================================================================
  // EVENT RENDERING
  // ============================================================================

  /**
   * Custom event content renderer with booking info
   * Always shows customer name and service, other info at bottom
   */
  const renderEventContent = (eventInfo: EventContentArg) => {
    const { extendedProps } = eventInfo.event;
    const eventData = eventInfo.event._def.extendedProps;
    const startTime = eventInfo.event.start?.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const endTime = eventInfo.event.end?.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // Get source icon
    const getSourceIcon = () => {
      switch (extendedProps.source) {
        case "instagram":
          return <Instagram size={8} />;
        case "whatsapp":
          return <MessageCircle size={8} />;
        case "messenger":
          return <MessageCircle size={8} />;
        case "sms":
          return <Mail size={8} />;
        default:
          return null;
      }
    };

    // Get status icon
    const getStatusIcon = () => {
      if (extendedProps.status === "confirmed") {
        return <CheckCircle size={8} />;
      }
      return <Clock size={8} />;
    };

    // Get service from event
    const service = eventData.service || "";

    return (
      <div className="p-1 overflow-hidden h-full flex flex-col justify-between">
        {/* Top Section - Always visible */}
        <div className="shrink-0">
          {/* Customer Name */}
          <div className="font-semibold text-[10px] truncate leading-tight">
            {eventInfo.event.title}
          </div>

          {/* Service */}
          {service && (
            <div className="text-[9px] opacity-80 truncate leading-tight">
              {service}
            </div>
          )}
        </div>

        {/* Bottom Section - Icons and Time */}
        <div className="shrink-0 mt-auto">
          {/* Icons Row */}
          <div className="flex items-center gap-1 mb-0.5">
            {/* Status Icon */}
            <div className="flex items-center opacity-70">
              {getStatusIcon()}
            </div>

            {/* Payment Icon */}
            {extendedProps.paid && (
              <div className="flex items-center opacity-70">
                <DollarSign size={8} />
              </div>
            )}

            {/* Source Icon */}
            <div className="flex items-center opacity-70 ml-auto">
              {getSourceIcon()}
            </div>
          </div>

          {/* Time */}
          <div className="text-[7px] opacity-70 leading-tight">
            {startTime} - {endTime}
          </div>
        </div>
      </div>
    );
  };

  /**
   * Custom resource label renderer
   * Shows staff member name with minimal design
   */
  const renderResourceLabel = (resourceInfo: {
    resource: { title: string };
  }) => {
    return (
      <div className="flex items-center justify-center gap-2 py-1.5 px-2">
        <span className="text-[10px] font-medium text-[#1F384C]">
          {resourceInfo.resource.title}
        </span>
      </div>
    );
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-[calc(100vh-150px)]">
      <FullCalendar
        ref={calendarRef}
        // ====================================================================
        // PLUGINS & VIEW CONFIGURATION
        // ====================================================================
        plugins={[timeGridPlugin, interactionPlugin, resourceTimeGridPlugin]}
        initialView="resourceTimeGridDay"
        initialDate={selectedDate}
        key={selectedDate.toISOString()} // Force re-render when date changes
        // ====================================================================
        // RESOURCES (STAFF MEMBERS)
        // ====================================================================
        resources={[
          { id: "abril", title: "Abril Lewis" },
          { id: "allan", title: "Allan Hicks" },
          { id: "bianca", title: "Bianca West" },
        ].filter((resource) => filteredResources.includes(resource.id))}
        // ====================================================================
        // CALENDAR CONFIGURATION
        // ====================================================================
        headerToolbar={false} // We use our custom header
        slotMinTime="00:00:00" // Start at midnight
        slotMaxTime="24:00:00" // End at midnight (24-hour view)
        slotDuration="00:15:00" // 15-minute time slots
        slotLabelInterval="01:00:00" // Show labels every hour
        allDaySlot={false} // Hide all-day slot
        nowIndicator={true} // Show current time indicator (red line)
        nowIndicatorClassNames="now-indicator-line"
        // Current time indicator content (shows time badge)
        // nowIndicatorContent={() => {
        //   const now = new Date();
        //   return now.toLocaleTimeString('en-US', {
        //     hour: '2-digit',
        //     minute: '2-digit',
        //     hour12: false,
        //   });
        // }}
        // ====================================================================
        // INTERACTION SETTINGS
        // ====================================================================
        editable={true} // Allow event editing
        selectable={true} // Allow time slot selection
        selectMirror={true} // Show selection preview
        dayMaxEvents={false} // No limit on events per day
        snapDuration="00:15:00" // Snap to 15-minute intervals
        selectConstraint={{
          start: "00:00",
          end: "24:00",
        }}
        // ====================================================================
        // DISPLAY SETTINGS
        // ====================================================================
        height="100%" // Full height of container
        expandRows={true} // Expand rows to fill available space
        events={events} // Event data
        eventClick={handleEventClick} // Event click handler
        eventContent={renderEventContent} // Custom event renderer
        // ====================================================================
        // TIME FORMATTING
        // ====================================================================
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          hour12: true, // Show AM/PM
        }}
        // ====================================================================
        // RESOURCE AREA SETTINGS
        // ====================================================================
        resourceAreaWidth="200px" // Width of staff member column
        resourceLabelContent={renderResourceLabel} // Custom resource label with icon
        // ====================================================================
        // DATE FORMATTING
        // ====================================================================
        dayHeaderFormat={{
          weekday: "short",
          month: "short",
          day: "numeric",
        }}
        // ====================================================================
        // EVENT DISPLAY SETTINGS
        // ====================================================================
        eventDisplay="block" // Show events as blocks
        eventOverlap={true} // Don't allow event overlap
        eventConstraint={{
          start: "00:00",
          end: "24:00",
        }}
        slotMinWidth={120} // Minimum width for time slots
        // ====================================================================
        // SCROLL SETTINGS
        // ====================================================================
        scrollTime={new Date().toTimeString().split(" ")[0]} // Initial scroll position
        scrollTimeReset={false} // Don't reset scroll on date change
        aspectRatio={1.8} // Calendar aspect ratio
      />
    </div>
  );
}
