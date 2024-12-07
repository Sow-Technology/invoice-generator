import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const localizer = momentLocalizer(moment);

// Determine attendance status based on work hours
const determineAttendanceStatus = (record) => {
  // Convert moment durations to hours for precision
  const checkInTime = moment(record.checkIn);
  const checkOutTime = moment(record.checkOut);

  // Calculate total work hours
  const totalWorkHours = moment
    .duration(checkOutTime.diff(checkInTime))
    .asHours();

  if (!record.checkIn) return "absent";

  if (totalWorkHours >= 7) return "present";
  if (totalWorkHours < 7 && record.checkOut) return "Half Day";
  if (totalWorkHours > 0) return "checked in";

  return "absent";
};

export default function AttendanceCalendar({ attendance = [] }) {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Generate years array (current year ±10)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  // Status configurations
  const statusConfig = {
    present: {
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: CheckCircle2,
      label: "Full Day",
    },
    "checked in": {
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      icon: AlertTriangle,
      label: "Checked In",
    },
    "half day": {
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      icon: AlertTriangle,
      label: "Half Day",
    },
    partial: {
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      icon: AlertTriangle,
      label: "Partial Day",
    },
    absent: {
      color: "text-red-600",
      bgColor: "bg-red-50",
      icon: XCircle,
      label: "Absent",
    },
  };

  // Transform attendance data
  const events = attendance.map((day) => {
    const status = determineAttendanceStatus(day);
    console.log(status);

    return {
      start: new Date(day.date),
      end: new Date(day.date),
      title: statusConfig[status.toLowerCase()].label,
      status: status,
      ...day,
    };
  });

  // Custom toolbar
  const CustomToolbar = ({ label, onNavigate, onView }) => {
    const months = moment.months();

    const handleMonthChange = (newMonth) => {
      const newDate = moment(date).month(months.indexOf(newMonth));
      setDate(newDate.toDate());
    };

    const handleYearChange = (newYear) => {
      const newDate = moment(date).year(parseInt(newYear));
      setDate(newDate.toDate());
    };

    return (
      <div className="flex justify-between items-center mb-4 px-4">
        <div className="flex items-center space-x-2 justify-between w-full">
          <button
            onClick={() => onNavigate("PREV")}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex items-center space-x-2">
            <Select
              value={months[date.getMonth()]}
              onValueChange={handleMonthChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={date.getFullYear().toString()}
              onValueChange={handleYearChange}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            onClick={() => onNavigate("NEXT")}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    );
  };

  // Event style getter
  const eventStyleGetter = (event) => {
    console.log(event);
    console.log(statusConfig["half day"]);
    const { bgColor, color } = statusConfig[event.status] || {
      bgColor: "red",
      color: "white",
    };
    return {
      style: {
        backgroundColor: bgColor,
        color: color,
        borderRadius: "8px",
        border: "none",
        padding: "4px 8px",
        fontSize: "12px",
        textAlign: "center",
        marginTop: "auto",
        fontWeight: 600,
      },
    };
  };

  // Handle day click
  const handleDayClick = (event) => {
    setSelectedDate(event);
    setIsDialogOpen(true);
  };

  // Close dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedDate(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <Calendar
        localizer={localizer}
        date={date}
        onNavigate={(newDate) => setDate(newDate)}
        events={events}
        startAccessor="start"
        endAccessor="end"
        className="custom-calendar"
        style={{ height: "500px", padding: "16px" }}
        eventPropGetter={eventStyleGetter}
        views={["month"]}
        onSelectEvent={handleDayClick}
        components={{
          toolbar: CustomToolbar,
        }}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
          {selectedDate && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  {React.createElement(statusConfig[selectedDate.status].icon, {
                    className: `w-6 h-6 ${
                      statusConfig[selectedDate.status].color
                    }`,
                  })}
                  Attendance Details
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusConfig[selectedDate.status].bgColor
                  } ${statusConfig[selectedDate.status].color}`}
                >
                  {statusConfig[selectedDate.status].label}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="font-semibold text-gray-700">Date</span>
                  </div>
                  <span className="text-gray-600">
                    {moment(selectedDate.start).format("MMMM Do, YYYY")}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Check-In</span>
                    <span className="font-semibold text-gray-800">
                      {selectedDate.checkIn
                        ? moment(selectedDate.checkIn).format("hh:mm A")
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Check-Out</span>
                    <span className="font-semibold text-gray-800">
                      {selectedDate.checkOut
                        ? moment(selectedDate.checkOut).format("hh:mm A")
                        : "N/A"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Breaks</span>
                    <span className="font-semibold text-gray-800">
                      {selectedDate.breaks?.length || 0}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">
                      Total Work Time
                    </span>
                    <span className="font-semibold text-gray-800">
                      {selectedDate.checkIn && selectedDate.checkOut
                        ? `${moment
                            .duration(
                              moment(selectedDate.checkOut).diff(
                                moment(selectedDate.checkIn)
                              )
                            )
                            .asHours()
                            .toFixed(2)} hours`
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={closeDialog}
              >
                Close
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
