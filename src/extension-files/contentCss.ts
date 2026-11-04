// content.css - Styles for the floating HUD injected into flow.google.com

export const CONTENT_CSS_CODE = `
#flow-upscaler-hud {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 340px;
  max-width: 90vw;
  background: rgba(18, 18, 24, 0.96);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 14px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.08);
  color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  z-index: 9999999;
  overflow: hidden;
  transition: all 0.2s ease;
}

.fuh-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.fuh-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.fuh-2x-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  border: 1px solid rgba(147, 197, 253, 0.5);
  border-radius: 7px;
  color: #ffffff;
  font-weight: 900;
  font-size: 13px;
  letter-spacing: -0.5px;
  box-shadow: 0 0 12px rgba(37, 99, 235, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.4);
  flex-shrink: 0;
}

.fuh-title {
  font-weight: 700;
  font-size: 13px;
  letter-spacing: -0.2px;
  color: #ffffff;
}

.fuh-subtitle {
  font-size: 11px;
  color: #94a3b8;
}

.fuh-header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

#fuh-minimize-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  padding: 2px 7px;
  border-radius: 4px;
}

#fuh-minimize-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

#fuh-close-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  padding: 2px 7px;
  border-radius: 4px;
  transition: all 0.15s ease;
}

#fuh-close-btn:hover {
  background: rgba(239, 68, 68, 0.25);
  color: #f87171;
}

.fuh-body {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.fuh-status-badge {
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  background: #1e293b;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  letter-spacing: 0.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fuh-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.fuh-metric {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
}

.fuh-metric-label {
  font-size: 10px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.fuh-metric-val {
  font-size: 18px;
  font-weight: 700;
  color: #38bdf8;
}

.fuh-controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fuh-btn {
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.fuh-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.fuh-btn-primary {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #fff;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
}

.fuh-btn-primary:hover:not(:disabled) {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.fuh-btn-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.fuh-btn-secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #e2e8f0;
}

.fuh-btn-secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.15);
}

.fuh-btn-danger {
  background: rgba(239, 68, 68, 0.2);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.fuh-btn-danger:hover:not(:disabled) {
  background: rgba(239, 68, 68, 0.35);
}

.fuh-settings {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 11px;
}

.fuh-settings summary {
  cursor: pointer;
  font-weight: 600;
  color: #cbd5e1;
  user-select: none;
}

.fuh-setting-row {
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: #94a3b8;
}

.fuh-setting-row input[type="number"] {
  width: 55px;
  background: #0f172a;
  border: 1px solid #334155;
  color: #fff;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 11px;
}

.fuh-setting-row input[type="checkbox"] {
  margin-right: 6px;
  accent-color: #2563eb;
}

.fuh-logs-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fuh-logs-header {
  font-size: 10px;
  text-transform: uppercase;
  color: #64748b;
  letter-spacing: 0.5px;
}

.fuh-logs {
  background: #090d16;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  height: 90px;
  overflow-y: auto;
  padding: 6px 8px;
  font-family: monospace;
  font-size: 10px;
  line-height: 1.4;
}

.fuh-log-line {
  margin-bottom: 2px;
  color: #94a3b8;
  word-break: break-word;
}

.fuh-log-time {
  color: #475569;
}

.fuh-log-line.success {
  color: #4ade80;
}

.fuh-log-line.error {
  color: #f87171;
}
`;
