import React from 'react';
import { MILESTONES, getMilestoneProgress } from '../../utils/milestones';
import './Milestones.css';

export default function Milestones({ anniversary }) {
    const milestonesWithProgress = MILESTONES.map(m => ({
        ...m,
        progress: getMilestoneProgress(anniversary, m),
    }));

    const nextMilestone = milestonesWithProgress.find(m => !m.progress.isCompleted);
    const nextNextMilestone = nextMilestone
        ? milestonesWithProgress.find(m => !m.progress.isCompleted && m.id !== nextMilestone.id)
        : null;

    return (
        <div className="milestones-section">
            <h3 className="milestones-title">CỘT MỐC TÌNH YÊU</h3>

            <div className="milestone-chips">
                {milestonesWithProgress.map(m => (
                    <span
                        key={m.id}
                        className={`milestone-chip ${m.progress.isCompleted ? 'completed' : ''}`}
                    >
                        <span className="chip-icon">{m.icon}</span>
                        {m.label}
                    </span>
                ))}
            </div>

            {nextMilestone && (
                <div className="next-milestone-section">
                    <div className="section-heart-divider">💕</div>
                    <h4 className="next-milestone-title">
                        🏆 CỘT MỐC TIẾP THEO <span className="title-heart">💕</span>
                    </h4>

                    <div className="next-milestone-card">
                        <div className="next-milestone-header">
                            <div className="next-milestone-info">
                                <span className="next-milestone-icon">{nextMilestone.icon}</span>
                                <div>
                                    <p className="next-milestone-name">{nextMilestone.label}</p>
                                    <p className="next-milestone-sub">
                                        {nextMilestone.progress.totalDays} ngày
                                    </p>
                                </div>
                            </div>
                            <div className="next-milestone-countdown">
                                <span className="countdown-number">{nextMilestone.progress.daysRemaining}</span>
                                <span className="countdown-text">ngày nữa</span>
                            </div>
                        </div>
                        <div className="next-milestone-progress">
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${nextMilestone.progress.progress}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {nextNextMilestone && (
                        <div className="secondary-milestone">
                            <div className="secondary-info">
                                <span className="secondary-icon">{nextNextMilestone.icon}</span>
                                <span className="secondary-name">{nextNextMilestone.label}</span>
                            </div>
                            <span className="secondary-percent">
                                {Math.round(nextNextMilestone.progress.progress)}%
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
