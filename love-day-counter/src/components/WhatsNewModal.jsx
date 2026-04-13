import React from 'react';
import './WhatsNewModal.css';

const CHANGELOG = [
    {
        version: 'v4.1',
        date: '2025',
        changes: [
            '🔔 Hỗ trợ thông báo đẩy cho các cột mốc',
            '🛡️ Cải thiện bảo mật dữ liệu',
            '🐛 Sửa lỗi hiển thị trên một số thiết bị',
        ],
    },
    {
        version: 'v4.0',
        date: '2025',
        changes: [
            '📅 Thêm tính năng lịch với sự kiện',
            '🌙 Hiển thị âm lịch trên lịch',
            '🎯 Cột mốc tình yêu với thanh tiến trình',
            '🎨 Giao diện mới hoàn toàn',
        ],
    },
    {
        version: 'v3.0',
        date: '2024',
        changes: [
            '👤 Hỗ trợ avatar cho cả hai người',
            '♈ Tự động nhận diện cung hoàng đạo',
            '💾 Lưu dữ liệu trên trình duyệt',
        ],
    },
];

export default function WhatsNewModal({ onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content whats-new-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>🎉 Có gì mới?</h2>
                    <button className="modal-close-btn" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body">
                    {CHANGELOG.map(entry => (
                        <div key={entry.version} className="changelog-entry">
                            <div className="changelog-version">
                                <span className="version-badge">{entry.version}</span>
                                <span className="version-date">{entry.date}</span>
                            </div>
                            <ul className="changelog-list">
                                {entry.changes.map((change, i) => (
                                    <li key={i}>{change}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="modal-footer">
                    <button className="btn-primary" onClick={onClose}>Đã hiểu!</button>
                </div>
            </div>
        </div>
    );
}
