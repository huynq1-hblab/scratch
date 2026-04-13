import React, { useState } from 'react';
import './AddEventModal.css';

const EVENT_ICONS = [
    { icon: '💕', label: 'Tình yêu' },
    { icon: '🎂', label: 'Sinh nhật' },
    { icon: '✈️', label: 'Du lịch' },
    { icon: '🎁', label: 'Quà tặng' },
    { icon: '🍽️', label: 'Hẹn hò' },
    { icon: '🎬', label: 'Xem phim' },
    { icon: '📸', label: 'Kỷ niệm' },
    { icon: '⭐', label: 'Đặc biệt' },
];

export default function AddEventModal({ initialDate, onAdd, onClose }) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(initialDate || '');
    const [icon, setIcon] = useState('💕');
    const [yearly, setYearly] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !date) return;
        onAdd({ title: title.trim(), date, icon, yearly });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>📝 Thêm sự kiện</h2>
                    <button className="modal-close-btn" onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-body">
                    <div className="form-group">
                        <label className="form-label">Tên sự kiện</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="VD: Ngày hẹn hò đầu tiên"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Ngày</label>
                        <input
                            type="date"
                            className="form-input"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Biểu tượng</label>
                        <div className="icon-grid">
                            {EVENT_ICONS.map(item => (
                                <button
                                    key={item.icon}
                                    type="button"
                                    className={`icon-option ${icon === item.icon ? 'active' : ''}`}
                                    onClick={() => setIcon(item.icon)}
                                >
                                    <span className="icon-emoji">{item.icon}</span>
                                    <span className="icon-label">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group yearly-toggle">
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                checked={yearly}
                                onChange={e => setYearly(e.target.checked)}
                                className="toggle-checkbox"
                            />
                            <span className="toggle-switch" />
                            <span>Lặp lại hàng năm</span>
                        </label>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={!title.trim() || !date}
                        >
                            Thêm sự kiện
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
