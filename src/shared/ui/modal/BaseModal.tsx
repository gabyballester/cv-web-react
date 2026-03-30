import type { ReactNode } from 'react'

type BaseModalProps = {
  title: string
  closeLabel: string
  onClose: () => void
  children: ReactNode
}

export function BaseModal({ title, closeLabel, onClose, children }: BaseModalProps) {
  return (
    <div className="modal-overlay no-print" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <h3>{title}</h3>
          <button type="button" onClick={onClose}>
            {closeLabel}
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
