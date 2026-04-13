import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import FloatingHearts from './components/FloatingHearts';
import WhatsNewModal from './components/WhatsNewModal';
import OnboardingFlow from './components/Onboarding/OnboardingFlow';
import Dashboard from './components/Dashboard/Dashboard';
import UpcomingEvents from './components/Dashboard/UpcomingEvents';
import Calendar from './components/Calendar/Calendar';
import ActionBar from './components/ActionBar';
import EditModal from './components/EditModal';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [coupleData, setCoupleData] = useLocalStorage('loveday-data', null);
  const [events, setEvents] = useLocalStorage('loveday-events', []);
  const [hasSeenWhatsNew, setHasSeenWhatsNew] = useLocalStorage('loveday-whatsnew-v41', false);
  const [notificationsEnabled, setNotificationsEnabled] = useLocalStorage('loveday-notifications', false);
  const [showWhatsNew, setShowWhatsNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (coupleData && !hasSeenWhatsNew) {
      const timer = setTimeout(() => {
        setShowWhatsNew(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [coupleData, hasSeenWhatsNew]);

  const handleOnboardingComplete = (data) => {
    setCoupleData(data);
  };

  const handleDeleteConfirm = () => {
    setCoupleData(null);
    setEvents([]);
    setHasSeenWhatsNew(false);
    setNotificationsEnabled(false);
    setShowConfirmDelete(false);
  };

  const handleAddEvent = (event) => {
    setEvents([...events, event]);
  };

  const handleDeleteEvent = (index) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const handleCloseWhatsNew = () => {
    setShowWhatsNew(false);
    setHasSeenWhatsNew(true);
  };

  const handleEditSave = (newData) => {
    setCoupleData(newData);
    setShowEdit(false);
  };

  return (
    <div className="app-container">
      <FloatingHearts />

      <div className="app-content">
        {!coupleData ? (
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        ) : (
          <>
            <Dashboard data={coupleData} />

            <div className="dashboard-container" style={{ marginTop: '-16px' }}>
              <div className="dashboard-card">
                <Calendar
                  events={events}
                  onAddEvent={handleAddEvent}
                  onDeleteEvent={handleDeleteEvent}
                  anniversary={coupleData.anniversary}
                  userBirthday={coupleData.user.birthday}
                  partnerBirthday={coupleData.partner.birthday}
                />
              </div>

              <div className="dashboard-card">
                <UpcomingEvents />
              </div>
            </div>

            <ActionBar
              onEdit={() => setShowEdit(true)}
              onDelete={() => setShowConfirmDelete(true)}
              notificationsEnabled={notificationsEnabled}
              onToggleNotifications={setNotificationsEnabled}
            />

            <Footer />
          </>
        )}
      </div>

      {showWhatsNew && <WhatsNewModal onClose={handleCloseWhatsNew} />}
      {showEdit && (
        <EditModal
          data={coupleData}
          onSave={handleEditSave}
          onClose={() => setShowEdit(false)}
        />
      )}
      {showConfirmDelete && (
        <div className="modal-overlay" onClick={() => setShowConfirmDelete(false)}>
          <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>⚠️ Xác nhận xóa</h2>
            </div>
            <div className="modal-body">
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', margin: '8px 0 0' }}>
                Bạn có chắc muốn xóa tất cả dữ liệu?<br />
                <strong style={{ color: 'var(--primary)' }}>Hành động này không thể hoàn tác.</strong>
              </p>
            </div>
            <div className="modal-footer" style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-secondary" onClick={() => setShowConfirmDelete(false)}>Hủy</button>
              <button className="btn-primary" onClick={handleDeleteConfirm} style={{ background: '#ef4444', borderColor: '#ef4444' }}>
                🗑️ Xóa tất cả
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
