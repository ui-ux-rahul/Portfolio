/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Calendar, Clock, User, Mail, ChevronLeft, ChevronRight, 
  MessageSquare, CheckCircle, Sparkles, Globe, Download, Info 
} from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandName?: string;
}

export default function BookingModal({ isOpen, onClose, brandName = "Rahul" }: BookingModalProps) {
  const realToday = new Date();
  const currentRealMonth = realToday.getMonth();
  const currentRealYear = realToday.getFullYear();
  const currentRealDay = realToday.getDate();

  // Bounded Month State: Can only toggle between current real month and next month
  const [currentDate, setCurrentDate] = useState(() => {
    return new Date(currentRealYear, currentRealMonth, 1);
  });

  const getTodayString = () => {
    const y = realToday.getFullYear();
    const m = String(realToday.getMonth() + 1).padStart(2, "0");
    const d = String(realToday.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const [selectedDate, setSelectedDate] = useState<string>(getTodayString);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [isEmailShaking, setIsEmailShaking] = useState(false);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userTimeZone, setUserTimeZone] = useState("UTC");

  // Robust fake/throwaway/temporary email validation
  const isEmailValidAndReal = (emailStr: string): boolean => {
    const trimmed = emailStr.trim().toLowerCase();
    
    // Basic RFC email format verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return false;
    }
    
    const parts = trimmed.split("@");
    if (parts.length !== 2) return false;
    const localPart = parts[0];
    const domain = parts[1];

    // Block common temporary/disposable/burner email domains
    const blockedDomains = [
      "mailinator.com", "yopmail.com", "guerrillamail.com", "tempmail.com", "temp-mail.org",
      "sharklasers.com", "getairmail.com", "dispostable.com", "trashmail.com", "maildrop.cc",
      "10minutemail.com", "throwawaymail.com", "burnermail.io", "guerrillamailblock.com",
      "guerrillamail.net", "guerrillamail.org", "guerrillamail.biz", "guerrillamail.de",
      "pokemail.net", "grr.la", "scryptmail.com", "quickmail.com", "fakeinbox.com",
      "mailnesia.com", "mailcatch.com", "temp-mail.com", "generator.email", "discard.email",
      "mailtothis.com", "crazymailing.com", "boun.cr", "getnada.com", "disposable.com",
      "mailtrash.com", "temp-mail.net"
    ];
    if (blockedDomains.some(blocked => domain === blocked || domain.endsWith("." + blocked))) {
      return false;
    }

    // Block obviously dummy keywords in email localpart or domain (excluding legitimate test/demo words)
    const suspiciousKeywords = ["fake", "trash", "dummy", "spam", "garbage", "noreply", "disposable"];
    if (suspiciousKeywords.some(keyword => localPart.includes(keyword) || domain.includes(keyword))) {
      return false;
    }

    // Block keyboard mashing sequences
    const isMash = (str: string) => {
      if (str.length < 3) return false;
      const uniqueChars = new Set(str.split(""));
      if (uniqueChars.size <= 1) return true;
      
      const keyboardRuns = ["asdf", "qwer", "zxcv", "1234", "abcd", "qwert", "asdfg", "12345"];
      if (keyboardRuns.some(run => str.includes(run))) {
        return true;
      }
      return false;
    };
    if (isMash(localPart) || isMash(domain.split(".")[0])) {
      return false;
    }

    // Require valid TLD length
    const domainParts = domain.split(".");
    const tld = domainParts[domainParts.length - 1];
    if (tld.length < 2) return false;

    return true;
  };

  const modalRef = useRef<HTMLDivElement>(null);

  // Auto-detect localized time zone on load
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) setUserTimeZone(tz);
    } catch (e) {
      console.warn("Could not detect time zone", e);
    }
  }, []);

  // Shake effect when user types a blocked/burner email address
  useEffect(() => {
    if (emailDirty && email.length > 0 && !isEmailValidAndReal(email)) {
      setIsEmailShaking(true);
      const timer = setTimeout(() => setIsEmailShaking(false), 500);
      return () => clearTimeout(timer);
    }
  }, [email, emailDirty]);

  // Keyboard Trap & Escape Listener
  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement as HTMLElement;
    const focusableElementsString = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    const timeoutId = setTimeout(() => {
      const focusableElements = modalRef.current?.querySelectorAll(focusableElementsString) || [];
      const firstFocusableElement = focusableElements[0] as HTMLElement;
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll(focusableElementsString) || [];
        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstFocusableElement = focusableElements[0] as HTMLElement;
        const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        const activeEl = document.activeElement;

        if (e.shiftKey) {
          if (activeEl === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (activeEl === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("keydown", handleKeyDown);
      if (previousActiveElement) {
        previousActiveElement.focus();
      }
    };
  }, [isOpen, onClose, success]);

  // Available Time Slots List
  const timeSlots = ["10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"];

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  // Navigation limits: only current month and next month allowed (handles year boundaries seamlessly)
  const maxAllowedDate = new Date(currentRealYear, currentRealMonth + 1, 1);
  const isCurrentMonth = month === currentRealMonth && year === currentRealYear;
  const isNextMonth = (year > maxAllowedDate.getFullYear()) || 
                      (year === maxAllowedDate.getFullYear() && month >= maxAllowedDate.getMonth());

  const handlePrevMonth = () => {
    if (isCurrentMonth) return; // Prevent going to past months
    const prevDate = new Date(year, month - 1, 1);
    setCurrentDate(prevDate);
    if (prevDate.getMonth() === currentRealMonth && prevDate.getFullYear() === currentRealYear) {
      setSelectedDate(getTodayString());
    } else {
      const pMonth = String(prevDate.getMonth() + 1).padStart(2, "0");
      setSelectedDate(`${prevDate.getFullYear()}-${pMonth}-01`);
    }
  };

  const handleNextMonth = () => {
    if (isNextMonth) return; // Prevent going beyond next month
    const nextDate = new Date(year, month + 1, 1);
    setCurrentDate(nextDate);
    const nMonth = String(nextDate.getMonth() + 1).padStart(2, "0");
    setSelectedDate(`${nextDate.getFullYear()}-${nMonth}-01`);
  };

  const handleDateSelect = (day: number) => {
    if (isDatePast(day)) return; // Disable past dates click

    const formattedMonth = String(month + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    setSelectedDate(`${year}-${formattedMonth}-${formattedDay}`);
  };

  // Helper to check if a specific day is in the past relative to today
  const isDatePast = (day: number) => {
    const targetDate = new Date(year, month, day);
    const comparisonToday = new Date(currentRealYear, currentRealMonth, currentRealDay);
    return targetDate < comparisonToday;
  };

  // Check if a time slot is in the past (only relevant for today's date selection)
  const isSlotInPast = (slot: string, dateStr: string) => {
    const today = new Date();
    const selected = new Date(dateStr);
    
    // If selected date is not today, the slot is in the future
    if (selected.toDateString() !== today.toDateString()) {
      return false;
    }
    
    const match = slot.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return false;
    
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const ampm = match[3].toUpperCase();
    
    if (ampm === "PM" && hours < 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;
    
    const slotDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
    return slotDate.getTime() <= today.getTime();
  };

  // Automatically select the first available future slot when the selected date or month shifts
  useEffect(() => {
    const activeSlots = timeSlots.filter(slot => !isSlotInPast(slot, selectedDate));
    if (activeSlots.length > 0) {
      if (!activeSlots.includes(selectedTimeSlot)) {
        setSelectedTimeSlot(activeSlots[0]);
      }
    } else {
      setSelectedTimeSlot("");
    }
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !selectedDate || !selectedTimeSlot) return;

    setLoading(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          notes,
        }),
      });

      if (response.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to calculate total active/available slots for the selected date
  const availableSlotsTodayCount = timeSlots.filter(slot => !isSlotInPast(slot, selectedDate)).length;

  // Generate and Download standard .ics file for calendar export
  const downloadIcsFile = () => {
    try {
      const dateParts = selectedDate.split("-");
      const yearNum = dateParts[0];
      const monthNum = dateParts[1];
      const dayNum = dateParts[2];
      
      const timeMatch = selectedTimeSlot.match(/(\d+):(\d+)\s*(AM|PM)/i);
      let hourNum = 10;
      let minNum = 0;
      if (timeMatch) {
        hourNum = parseInt(timeMatch[1], 10);
        minNum = parseInt(timeMatch[2], 10);
        const ampm = timeMatch[3].toUpperCase();
        if (ampm === "PM" && hourNum < 12) hourNum += 12;
        if (ampm === "AM" && hourNum === 12) hourNum = 0;
      }

      const pad = (n: number) => String(n).padStart(2, "0");
      const startDateStr = `${yearNum}${monthNum}${dayNum}T${pad(hourNum)}${pad(minNum)}00`;
      // End date is 45 minutes later
      const endMin = (minNum + 45) % 60;
      const endHour = hourNum + Math.floor((minNum + 45) / 60);
      const endDateStr = `${yearNum}${monthNum}${dayNum}T${pad(endHour)}${pad(endMin)}00`;

      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Rahul Consulting//NONSGML v1.0//EN",
        "BEGIN:VEVENT",
        `UID:${Date.now()}@rahulconsulting.com`,
        `DTSTAMP:${startDateStr}`,
        `DTSTART:${startDateStr}`,
        `DTEND:${endDateStr}`,
        `SUMMARY:Consultation Session with ${brandName}`,
        `DESCRIPTION:Discussion notes: ${notes || "General Consultation Slot"}`,
        "LOCATION:Google Meet (Invite pending)",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Consultation_${selectedDate}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Failed to generate .ics invitation", e);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
          {/* Backdrop Blur with fade-in */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal / Bottom Drawer Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 120, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 120, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="relative bg-white/95 dark:bg-[#0E0D0C]/95 backdrop-blur-2xl border border-zinc-200/60 dark:border-zinc-800/60 rounded-t-[32px] sm:rounded-[32px] w-full max-w-4xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col z-10 max-h-[92vh] sm:max-h-[90vh] transition-all"
          >
            {/* Mobile Touch Drag Indicator Bar */}
            <div className="w-full flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-12 h-1 rounded-full bg-gray-300 dark:bg-zinc-800" />
            </div>

            {/* Header */}
            <div className="px-6 py-5 sm:p-6 border-b border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-black dark:text-white flex items-center gap-2">
                  Book a Consultation Session
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
                  Secure an exclusive, high-priority slot directly with {brandName}.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Top Interactive Progress Indicator Line */}
            <div className="w-full h-[3px] bg-zinc-100 dark:bg-zinc-900/50 relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-zinc-300 dark:bg-zinc-800"
                animate={{ 
                  width: success 
                    ? "100%" 
                    : (fullName && email) 
                    ? "75%" 
                    : selectedTimeSlot 
                    ? "50%" 
                    : "25%" 
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 md:p-8">
              {success ? (
                /* Immersive Premium Success Screen (100% Client-side state integration) */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="flex flex-col items-center justify-center text-center py-10 sm:py-16 space-y-6"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full scale-125 animate-pulse" />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 relative z-10" strokeWidth={1.5} />
                    </motion.div>
                  </div>

                  <div className="space-y-2.5 max-w-md">
                    <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white">
                      Consultation Slot Secured!
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                      Your high-priority briefing is officially confirmed and locked on the calendar for:
                    </p>
                  </div>

                  {/* Summary Details Badge */}
                  <div className="w-full max-w-md p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/60 flex flex-col items-center justify-center gap-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-black dark:text-white" />
                      <span className="text-xs font-bold font-mono text-zinc-800 dark:text-zinc-200">{selectedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-black dark:text-white" />
                      <span className="text-xs font-bold font-mono text-zinc-800 dark:text-zinc-200">{selectedTimeSlot}</span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1">
                      A calendar dispatch and video link has been forwarded to: <br/>
                      <strong className="text-black dark:text-white text-[12px]">{email}</strong>
                    </div>
                  </div>

                  {/* Calendar Download Helper & Done Button */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={downloadIcsFile}
                      className="w-full sm:w-1/2 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-800 text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Export Calendar (.ics)
                    </motion.button>

                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSuccess(false);
                        setFullName("");
                        setEmail("");
                        setNotes("");
                        onClose();
                      }}
                      className="w-full sm:w-1/2 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xs hover:opacity-90 transition-all cursor-pointer shadow-md"
                    >
                      Done / Close
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                /* Main Interactive Bounded Scheduler Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Left Side: Calendar Picker (Col 7) */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 pb-3">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                            Select a Date
                          </h4>
                          {availableSlotsTodayCount > 0 && (
                            <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 font-mono text-[9px] font-semibold animate-pulse">
                              ● {availableSlotsTodayCount} spots left
                            </span>
                          )}
                        </div>

                        {/* Month Navigation Panel */}
                        <div className="flex items-center gap-1.5">
                          {/* Left Arrow Button (ChevronLeft) */}
                          <button
                            type="button"
                            onClick={handlePrevMonth}
                            disabled={isCurrentMonth}
                            className={`p-1.5 rounded-full border transition-all ${
                              isCurrentMonth
                                ? "border-zinc-100 dark:border-zinc-900 text-zinc-300 dark:text-zinc-800 opacity-30 cursor-not-allowed"
                                : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 cursor-pointer"
                            }`}
                            title="Previous Month"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>

                          <span className="text-xs font-bold font-mono text-black dark:text-white min-w-[105px] text-center">
                            {monthNames[month]} {year}
                          </span>

                          {/* Right Arrow Button (ChevronRight) */}
                          <button
                            type="button"
                            onClick={handleNextMonth}
                            disabled={isNextMonth}
                            className={`p-1.5 rounded-full border transition-all ${
                              isNextMonth
                                ? "border-zinc-100 dark:border-zinc-900 text-zinc-300 dark:text-zinc-800 opacity-30 cursor-not-allowed"
                                : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 cursor-pointer"
                            }`}
                            title="Next Month"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Calendar Grid Container */}
                      <div className="bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/80 rounded-[24px] p-4">
                        {/* Weekday headers */}
                        <div className="grid grid-cols-7 text-center gap-y-2 mb-2">
                          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, idx) => {
                            const isSelectedDayOfWeek = realToday.getDay() === idx;
                            return (
                              <div key={day} className="flex flex-col items-center justify-center">
                                <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 font-mono">
                                  {day}
                                </span>
                                {isSelectedDayOfWeek && (
                                  <div className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500 mt-0.5" />
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Day numbers */}
                        <div className="grid grid-cols-7 gap-1">
                          {/* Empty pads before first day */}
                          {Array.from({ length: firstDayIndex }).map((_, index) => (
                            <div key={`pad-${index}`} className="aspect-square" />
                          ))}

                          {/* Actual day buttons */}
                          {Array.from({ length: daysInMonth }).map((_, i) => {
                            const dayNum = i + 1;
                            const formattedMonth = String(month + 1).padStart(2, "0");
                            const formattedDay = String(dayNum).padStart(2, "0");
                            const dateString = `${year}-${formattedMonth}-${formattedDay}`;
                            const isSelected = selectedDate === dateString;
                            const isToday = currentRealDay === dayNum && month === currentRealMonth && year === currentRealYear;
                            const isPast = isDatePast(dayNum);

                            return (
                              <motion.button
                                key={`day-${dayNum}`}
                                type="button"
                                disabled={isPast}
                                whileHover={!isPast ? { scale: 1.1 } : {}}
                                whileTap={!isPast ? { scale: 0.93 } : {}}
                                onClick={() => handleDateSelect(dayNum)}
                                className={`aspect-square rounded-full text-xs font-semibold flex flex-col items-center justify-center relative transition-all ${
                                  isPast
                                    ? "text-zinc-300 dark:text-zinc-800 opacity-25 cursor-not-allowed"
                                    : isSelected
                                    ? "bg-white text-black border border-zinc-300 dark:border-zinc-700 font-extrabold shadow-md z-10 scale-105"
                                    : isToday
                                    ? "border-2 border-[#4285F4] dark:border-[#4285F4] text-[#4285F4] font-extrabold shadow-sm bg-[#4285F4]/5"
                                    : "hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 text-zinc-800 dark:text-zinc-300"
                                }`}
                              >
                                <span>{dayNum}</span>
                                {isToday && !isSelected && (
                                  <span className="absolute bottom-1 text-[7px] font-mono tracking-tight uppercase scale-90 text-zinc-500 dark:text-zinc-300">
                                    TODAY
                                  </span>
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Info and Time Zone Disclaimer Row */}
                      <div className="bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200/30 dark:border-zinc-800/40 rounded-xl p-3 flex items-start gap-2.5">
                        <Globe className="w-4 h-4 text-zinc-500 mt-0.5 animate-spin-slow" />
                        <div className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-normal">
                          Displaying localized booking times adjusted for <strong className="text-zinc-800 dark:text-zinc-200 font-mono">{userTimeZone}</strong>. All scheduling operates transparently under standard Eastern UTC hours.
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Slots & Details Form (Col 5) */}
                    <div className="lg:col-span-5 space-y-6">
                      {/* Time Slots Selector */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 pb-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                            Select Available Slot
                          </h4>
                          {selectedTimeSlot ? (
                            <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-300 font-semibold bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-200/60 dark:border-zinc-800/60">
                              {selectedTimeSlot}
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-red-500">
                              No slots left
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((slot) => {
                            const isSelected = selectedTimeSlot === slot;
                            const isPastSlot = isSlotInPast(slot, selectedDate);
                            return (
                              <motion.button
                                key={slot}
                                type="button"
                                disabled={isPastSlot}
                                whileHover={!isPastSlot ? { y: -1 } : {}}
                                whileTap={!isPastSlot ? { scale: 0.95 } : {}}
                                onClick={() => setSelectedTimeSlot(slot)}
                                className={`py-2.5 rounded-full text-[10px] font-bold font-mono transition-all text-center border ${
                                  isPastSlot
                                    ? "bg-zinc-100/40 dark:bg-zinc-900/10 border-zinc-100 dark:border-zinc-900/40 text-zinc-300 dark:text-zinc-800 opacity-25 cursor-not-allowed"
                                    : isSelected
                                    ? "bg-black dark:bg-white text-white dark:text-black border-transparent shadow-sm z-10"
                                    : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200/60 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer"
                                }`}
                              >
                                {slot}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Booking Details Input Fields */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 pb-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                            Your Details
                          </h4>
                          <span className="text-[9px] text-zinc-400 font-mono">STEP 2 OF 2</span>
                        </div>

                        <div className="space-y-3.5">
                          {/* Full Name Input */}
                          <div className="relative group">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
                            <input
                              type="text"
                              required
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="Full Name"
                              className="w-full pl-10 pr-4 py-3 rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-xs text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-zinc-700 focus:bg-white dark:focus:bg-[#0E0D0C] transition-all"
                            />
                            {fullName.length >= 3 && (
                              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-500 text-[10px] font-mono">✓</span>
                            )}
                          </div>

                          {/* Email Address Input */}
                          <motion.div 
                            className="relative group"
                            animate={isEmailShaking ? { x: [-6, 6, -6, 6, -3, 3, 0] } : {}}
                            transition={{ duration: 0.4 }}
                          >
                            <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                              email.length > 0 && !isEmailValidAndReal(email)
                                ? "text-red-500"
                                : "text-zinc-400 group-focus-within:text-black dark:group-focus-within:text-white"
                            }`} />
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailDirty(true);
                              }}
                              onBlur={() => setEmailDirty(true)}
                              placeholder="Email Address"
                              className={`w-full pl-10 pr-10 py-3 rounded-full border text-xs text-black dark:text-white focus:outline-none focus:bg-white dark:focus:bg-[#0E0D0C] transition-all ${
                                emailDirty && email.length > 0 && !isEmailValidAndReal(email)
                                  ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 bg-red-500/5 dark:bg-red-500/5 font-semibold text-red-600 dark:text-red-400"
                                  : "border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 focus:border-black dark:focus:border-zinc-700"
                              }`}
                            />
                            {email.length > 0 && isEmailValidAndReal(email) && (
                              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-500 text-[10px] font-mono">✓</span>
                            )}
                            {emailDirty && email.length > 0 && !isEmailValidAndReal(email) && (
                              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-red-500 text-xs font-bold">!</span>
                            )}
                          </motion.div>
                          {emailDirty && email.length > 0 && !isEmailValidAndReal(email) && (
                            <p className="text-[10px] text-red-500 mt-1 pl-4 font-semibold leading-snug">
                              Please provide a valid, professional email address. Temporary/fake email addresses are strictly blocked.
                            </p>
                          )}

                          {/* Consultation Notes Textarea */}
                          <div className="relative group">
                            <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
                            <textarea
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              placeholder="Add notes (e.g. Fintech Project Redesign)"
                              rows={2}
                              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-xs text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-zinc-700 focus:bg-white dark:focus:bg-[#0E0D0C] transition-all resize-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Submit Button with Dynamic States */}
                      <motion.button
                        type="submit"
                        disabled={loading || !selectedTimeSlot || !fullName || !email || !isEmailValidAndReal(email)}
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-xs font-extrabold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-30 disabled:pointer-events-none border border-transparent cursor-pointer"
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                            <span>Locking Your Slot...</span>
                          </div>
                        ) : (
                          <span>Secure My Slot Now</span>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
