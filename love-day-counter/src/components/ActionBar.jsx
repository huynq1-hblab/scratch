import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import './ActionBar.css';

export default function ActionBar({ onEdit, onDelete, notificationsEnabled, onToggleNotifications }) {
    const [sharing, setSharing] = useState(false);
    const [exporting, setExporting] = useState(false);

    const handleShare = async () => {
        setSharing(true);
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Love Day 💕 - Đếm Ngày Yêu Nhau',
                    text: 'Xem ứng dụng đếm ngày yêu nhau của chúng mình! 💕',
                    url: window.location.href,
                });
            } else {
                // Fallback: copy link
                await navigator.clipboard.writeText(window.location.href);
                showToast('Đã sao chép liên kết! 📋');
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                await navigator.clipboard.writeText(window.location.href);
                showToast('Đã sao chép liên kết! 📋');
            }
        }
        setSharing(false);
    };

    const handleExport = async () => {
        setExporting(true);
        try {
            const appContent = document.querySelector('.app-content');
            if (!appContent) return;

            // Temporarily hide floating hearts for clean screenshot
            const hearts = document.querySelector('.floating-hearts');
            if (hearts) hearts.style.display = 'none';

            const canvas = await html2canvas(appContent, {
                backgroundColor: '#fff5f6',
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: false,
            });

            // Restore hearts
            if (hearts) hearts.style.display = '';

            // Convert to data URL and trigger download
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `love-day-${new Date().toISOString().split('T')[0]}.png`;
            link.href = dataUrl;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            // Remove after small delay to ensure download starts
            setTimeout(() => document.body.removeChild(link), 100);
            showToast('Đã xuất ảnh thành công! 📸');
        } catch (err) {
            console.error('Export failed:', err);
            showToast('Xuất ảnh thất bại 😢');
        }
        setExporting(false);
    };

    const handleToggleNotifications = async () => {
        if (!notificationsEnabled) {
            if ('Notification' in window) {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    onToggleNotifications(true);
                    showToast('Đã bật thông báo! 🔔');
                    // Show test notification
                    new Notification('Love Day 💕', {
                        body: 'Thông báo đã được bật thành công!',
                        icon: '💕',
                    });
                } else {
                    showToast('Trình duyệt đã từ chối thông báo 😢');
                }
            } else {
                showToast('Trình duyệt không hỗ trợ thông báo');
            }
        } else {
            onToggleNotifications(false);
            showToast('Đã tắt thông báo 🔕');
        }
    };

    const showToast = (message) => {
        const existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    };

    return (
        <div className="action-bar">
            <div className="action-buttons-row">
                <button className="action-btn primary" onClick={handleShare} disabled={sharing}>
                    <span className="action-icon">🔗</span>
                    <span className="action-label">Chia sẻ trang</span>
                </button>

                <button className="action-btn outline" onClick={handleExport} disabled={exporting}>
                    <span className="action-icon">📸</span>
                    <span className="action-label">{exporting ? 'Đang xuất...' : 'Xuất ảnh'}</span>
                </button>

                <button
                    className={`action-btn outline ${notificationsEnabled ? 'active' : ''}`}
                    onClick={handleToggleNotifications}
                >
                    <span className="action-icon">{notificationsEnabled ? '🔔' : '🔕'}</span>
                    <span className="action-label">
                        {notificationsEnabled ? 'Thông báo đang bật' : 'Thông báo đang tắt'}
                    </span>
                </button>

                <button className="action-btn outline" onClick={onEdit}>
                    <span className="action-icon">✏️</span>
                    <span className="action-label">Chỉnh sửa</span>
                </button>
            </div>

            <button className="delete-data-btn" onClick={onDelete}>
                <span>🗑️</span> Xóa dữ liệu
            </button>
        </div>
    );
}
