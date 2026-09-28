import React from 'react';

/**
 * Cyber Matrix Background
 * High-Tech Cyber Blueprint Grid with Telemetry Coordinate Crosshairs & Central Pulse
 */
export default function BaemonBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* Subtle Central Cyber Pulse */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[45rem] h-[35rem] bg-[#E11D2E]/10 dark:bg-[#E11D2E]/15 rounded-full blur-[150px] animate-pulse pointer-events-none"
        style={{ animationDuration: '6s' }}
      />
      {/* High-Tech Blueprint Matrix Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_95%)] pointer-events-none" />
      {/* Crosshair coordinate points */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(225,29,46,0.25)_1.5px,transparent_1.5px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_95%)] pointer-events-none" />
    </div>
  );
}
