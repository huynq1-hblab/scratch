import React from 'react';
import { getUpcomingHolidays } from '../../utils/holidays';
import './UpcomingEvents.css';

export default function UpcomingEvents() {
    const upcoming = getUpcomingHolidays(5);

    if (upcoming.length === 0) return null;

    return (
        <div className="upcoming-section">
            <div className="upcoming-header">
                <span className="upcoming-dot holiday-dot" />
                <span className="legend-text">Ngày lễ</span>
                <span className="upcoming-dot special-dot" />
                <span className="legend-text">Ngày đặc biệt</span>
            </div>

            <h3 className="upcoming-title-main">SẮP TỚI</h3>

            <div className="upcoming-list">
                {upcoming.map((event, i) => (
                    <div key={i} className="upcoming-item">
                        <span className="upcoming-flag">🚩</span>
                        <div className="upcoming-info">
                            <span className="upcoming-name">{event.name}</span>
                        </div>
                        <div className="upcoming-countdown">
                            {event.daysUntil === 0 ? (
                                <span className="countdown-today">Hôm nay!</span>
                            ) : (
                                <>
                                    {event.type === 'holiday' && <span className="countdown-heart">💕</span>}
                                    <span className="countdown-days">{event.daysUntil} ngày</span>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
