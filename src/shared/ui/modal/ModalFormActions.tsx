type ModalFormActionsProps = {
  saveLabel: string
  cancelLabel: string
  onCancel: () => void
}

export function ModalFormActions({ saveLabel, cancelLabel, onCancel }: ModalFormActionsProps) {
  return (
    <div className="modal-actions">
      <button type="submit">{saveLabel}</button>
      <button type="button" onClick={onCancel}>
        {cancelLabel}
      </button>
    </div>
  )
}
