"use client";

import { useState } from "react";
import { Calendar, Clock, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useTranslation } from "@/lib/useTranslation";

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00",
];

const DAYS_TR = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const DAYS_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS_TR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export default function RandevuPage() {
  const { t, locale } = useTranslation();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const days = locale === "tr" ? DAYS_TR : DAYS_EN;
  const months = locale === "tr" ? MONTHS_TR : MONTHS_EN;

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return true;
    if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return true;
    return false;
  };

  const formatDate = (day: number) => {
    const d = String(day).padStart(2, "0");
    const m = String(currentMonth + 1).padStart(2, "0");
    return `${d}.${m}.${currentYear}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !selectedService || !name || !email) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          date: selectedDate,
          time: selectedTime,
          service: selectedService,
          message,
        }),
      });

      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError(locale === "tr"
        ? "Bir hata oluştu. Lütfen tekrar deneyin."
        : "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-6">
              <div className="rounded-full bg-[var(--success)]/10 p-6">
                <CheckCircle size={48} className="text-[var(--success)]" />
              </div>
              <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
                {locale === "tr" ? "Toplantı Talebiniz Alındı!" : "Meeting Request Received!"}
              </h1>
              <p className="text-lg text-[var(--text-secondary)]">
                {locale === "tr"
                  ? "En kısa sürede sizinle iletişime geçeceğiz. Toplantı detaylarınız e-posta ile onaylanacaktır."
                  : "We'll get back to you shortly. Your meeting details will be confirmed via email."}
              </p>
              <div className="mt-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6 text-left">
                <div className="grid gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">{locale === "tr" ? "Tarih" : "Date"}</span>
                    <span className="font-medium text-[var(--text-primary)]">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">{locale === "tr" ? "Saat" : "Time"}</span>
                    <span className="font-medium text-[var(--text-primary)]">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">{locale === "tr" ? "Hizmet" : "Service"}</span>
                    <span className="font-medium text-[var(--text-primary)]">{selectedService}</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
              {locale === "tr" ? "Toplantı Planlayın" : "Schedule a Meeting"}
            </h1>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              {locale === "tr"
                ? "Projenizi konuşmak için uygun bir tarih ve saat seçin."
                : "Choose a convenient date and time to discuss your project."}
            </p>
          </div>
        </ScrollReveal>

        <form onSubmit={handleSubmit} className="mt-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left: Calendar + Time */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="space-y-6">
                {/* Calendar */}
                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={prevMonth}
                      className="rounded-lg p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                      {months[currentMonth]} {currentYear}
                    </h3>
                    <button
                      type="button"
                      onClick={nextMonth}
                      className="rounded-lg p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {days.map((day) => (
                      <div key={day} className="py-2 text-center text-xs font-medium text-[var(--text-muted)]">
                        {day}
                      </div>
                    ))}

                    {Array.from({ length: firstDay }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const dateStr = formatDate(day);
                      const disabled = isDateDisabled(day);
                      const isSelected = selectedDate === dateStr;
                      const isToday =
                        day === today.getDate() &&
                        currentMonth === today.getMonth() &&
                        currentYear === today.getFullYear();

                      return (
                        <button
                          type="button"
                          key={day}
                          disabled={disabled}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`
                            relative rounded-lg py-2 text-sm font-medium transition-all
                            ${disabled
                              ? "cursor-not-allowed text-[var(--text-muted)]/40"
                              : isSelected
                                ? "bg-[var(--accent-primary)] text-[var(--bg-primary)]"
                                : "text-[var(--text-primary)] hover:bg-[var(--accent-primary)]/10"
                            }
                          `}
                        >
                          {day}
                          {isToday && !isSelected && (
                            <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--accent-primary)]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <Clock size={18} className="text-[var(--accent-primary)]" />
                      <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                        {locale === "tr" ? "Saat Seçin" : "Select Time"}
                      </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                      {TIME_SLOTS.map((time) => (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`
                            rounded-lg border px-3 py-2 text-sm font-medium transition-all
                            ${selectedTime === time
                              ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]"
                              : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/40 hover:text-[var(--text-primary)]"
                            }
                          `}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Right: Form */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6 lg:p-8">
                <div className="mb-6 flex items-center gap-2">
                  <Calendar size={18} className="text-[var(--accent-primary)]" />
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    {locale === "tr" ? "Bilgileriniz" : "Your Details"}
                  </h3>
                </div>

                <div className="space-y-5">
                  {/* Selected date/time summary */}
                  {(selectedDate || selectedTime) && (
                    <div className="flex flex-wrap gap-2">
                      {selectedDate && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--accent-primary)]">
                          <Calendar size={12} />
                          {selectedDate}
                        </span>
                      )}
                      {selectedTime && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--accent-primary)]">
                          <Clock size={12} />
                          {selectedTime}
                        </span>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                      {locale === "tr" ? "Ad Soyad" : "Full Name"} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                      placeholder={locale === "tr" ? "Adınız Soyadınız" : "Your Full Name"}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                      {locale === "tr" ? "E-posta" : "Email"} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                      {locale === "tr" ? "Telefon" : "Phone"}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                      placeholder="+90 5XX XXX XX XX"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                      {locale === "tr" ? "Hizmet" : "Service"} *
                    </label>
                    <select
                      required
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                    >
                      <option value="">{locale === "tr" ? "Hizmet seçiniz" : "Select a service"}</option>
                      {t.services.items.map((s) => (
                        <option key={s.title} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                      {locale === "tr" ? "Toplantı Notu" : "Meeting Note"}
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                      placeholder={locale === "tr" ? "Toplantıda konuşmak istediğiniz konular..." : "Topics you'd like to discuss..."}
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-[var(--error)]">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={!selectedDate || !selectedTime || !selectedService || !name || !email || loading}
                    className="w-full rounded-lg bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-[var(--bg-primary)] transition-all hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {loading
                      ? (locale === "tr" ? "Gönderiliyor..." : "Sending...")
                      : (locale === "tr" ? "Toplantı Oluştur" : "Schedule Meeting")
                    }
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </form>
      </div>
    </section>
  );
}
