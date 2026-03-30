type ModalFieldErrorProps = {
  message?: string
}

export function ModalFieldError({ message }: ModalFieldErrorProps) {
  if (!message) return null

  return (
    <p className="modal-field-error" role="alert">
      {message}
    </p>
  )
}
