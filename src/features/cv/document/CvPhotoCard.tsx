import './cv-photo-card.css'

type Props = {
  photoSrc: string
  photoAlt: string
  onPhotoError: () => void
  photoLoadError: boolean
}

export function CvPhotoCard({
  photoSrc,
  photoAlt,
  onPhotoError,
  photoLoadError,
}: Props) {
  return (
    <div className="sidebar-cv-photo-card">
      <div className="sidebar-cover" />
      <div className="photo-wrap">
        {!photoLoadError ? (
          <img src={photoSrc} alt={photoAlt} className="cv-photo" onError={onPhotoError} />
        ) : (
          <div className="photo-placeholder">GB</div>
        )}
      </div>
    </div>
  )
}
