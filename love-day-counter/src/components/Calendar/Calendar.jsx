import React, { useState, useMemo } from 'react';
import { solarToLunar } from '../../utils/lunarCalendar';
import { getDaysInMonth, getFirstDayOfMonth } from '../../utils/dateUtils';
import { getHolidaysForDate } from '../../utils/holidays';
import AddEventModal from './AddEventModal';
import './Calendar.css';

const WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

export default function Calendar({ events, onAddEvent, onDeleteEvent, anniversary, userBirthday, partnerBirthday }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const today = new Date();
    const isToday = (day) =>
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

    const getEventsForDay = (day) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const result = [];

        // Check Vietnamese holidays
        const holidays = getHolidaysForDate(day, month + 1, year);
        holidays.forEach(h => {
            result.push({ title: h.name, icon: h.icon, type: h.type, isHoliday: true });
        });

        // Check custom events
        events.forEach(event => {
            const eventDate = new Date(event.date);
            if (event.yearly) {
                if (eventDate.getMonth() === month && eventDate.getDate() === day) {
                    result.push(event);
                }
            } else {
                if (event.date === dateStr) {
                    result.push(event);
                }
            }
        });

        // Check anniversary
        if (anniversary) {
            const annDate = new Date(anniversary);
            if (annDate.getMonth() === month && annDate.getDate() === day) {
                result.push({ title: 'Ngày yêu nhau', icon: '💕', type: 'special' });
            }
        }

        // Check birthdays
        if (userBirthday) {
            const bd = new Date(userBirthday);
            if (bd.getMonth() === month && bd.getDate() === day) {
                result.push({ title: 'Sinh nhật bạn', icon: '🎂', type: 'special' });
            }
        }
        if (partnerBirthday) {
            const bd = new Date(partnerBirthday);
            if (bd.getMonth() === month && bd.getDate() === day) {
                result.push({ title: 'Sinh nhật người yêu', icon: '🎂', type: 'special' });
            }
        }

        return result;
    };

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const handleDayClick = (day) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDate(dateStr);
        setShowAddEvent(true);
    };

    const monthNames = [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
        'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
        'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];

    const calendarDays = useMemo(() => {
        const days = [];
        // Blank cells for days before first day
        for (let i = 0; i < firstDay; i++) {
            days.push({ type: 'blank', key: `blank-${i}` });
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const lunar = solarToLunar(day, month + 1, year);
            const dayEvents = getEventsForDay(day);
            const hasHoliday = dayEvents.some(e => e.type === 'holiday');
            const hasSpecial = dayEvents.some(e => e.type === 'special');
            days.push({
                type: 'day',
                day,
                lunar,
                key: `day-${day}`,
                isToday: isToday(day),
                events: dayEvents,
                hasHoliday,
                hasSpecial,
            });
        }
        return days;
    }, [year, month, events, anniversary, userBirthday, partnerBirthday]);

    return (
        <div className="calendar-section">
            <div className="calendar-header">
                <h3 className="section-title">📅 Lịch</h3>
                <button className="add-event-header-btn" onClick={() => { setSelectedDate(null); setShowAddEvent(true); }}>
                    + Thêm ngày
                </button>
            </div>

            <div className="calendar-nav">
                <button className="nav-btn" onClick={prevMonth}>◀</button>
                <div className="nav-current">
                    <span className="nav-month">{monthNames[month]}</span>
                    <span className="nav-year">{year}</span>
                </div>
                <button className="nav-btn" onClick={nextMonth}>▶</button>
                <button className="nav-today-btn" onClick={goToToday}>Hôm nay</button>
            </div>

            <div className="calendar-grid">
                {WEEKDAYS.map((d, i) => (
                    <div key={d} className={`calendar-weekday ${i === 0 ? 'weekday-sun' : ''} ${i === 6 ? 'weekday-sat' : ''}`}>{d}</div>
                ))}
                {calendarDays.map(cell => {
                    if (cell.type === 'blank') {
                        return <div key={cell.key} className="calendar-cell blank" />;
                    }
                    const hasEvents = cell.events.length > 0;
                    return (
                        <div
                            key={cell.key}
                            className={`calendar-cell ${cell.isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''}`}
                            onClick={() => handleDayClick(cell.day)}
                        >
                            <span className={`cell-solar ${cell.hasHoliday ? 'holiday-text' : ''}`}>{cell.day}</span>
                            <span className="cell-lunar">{cell.lunar.day}</span>
                            {hasEvents && (
                                <div className="cell-dots">
                                    {cell.hasHoliday && <span className="event-dot holiday-dot" />}
                                    {cell.hasSpecial && <span className="event-dot special-dot" />}
                                    {!cell.hasHoliday && !cell.hasSpecial && <span className="event-dot" />}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Custom events list */}
            {events.length > 0 && (
                <div className="custom-events-list">
                    <h4 className="events-list-title">Sự kiện của bạn</h4>
                    {events.map((event, i) => (
                        <div key={i} className="event-item">
                            <span className="event-icon">{event.icon || '📌'}</span>
                            <div className="event-details">
                                <span className="event-name">{event.title}</span>
                                <span className="event-date">{new Date(event.date).toLocaleDateString('vi-VN')}{event.yearly ? ' (hàng năm)' : ''}</span>
                            </div>
                            <button className="event-delete" onClick={() => onDeleteEvent(i)} title="Xóa">✕</button>
                        </div>
                    ))}
                </div>
            )}

            {showAddEvent && (
                <AddEventModal
                    initialDate={selectedDate}
                    onAdd={(event) => {
                        onAddEvent(event);
                        setShowAddEvent(false);
                    }}
                    onClose={() => setShowAddEvent(false)}
                />
            )}
        </div>
    );
}
