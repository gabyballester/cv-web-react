import './profile-photo-card.css'

type Props = {
  photoSrc: string
  photoAlt: string
  onPhotoError: () => void
  photoLoadError: boolean
}

export function ProfilePhotoCard({
  photoSrc,
  photoAlt,
  onPhotoError,
  photoLoadError,
}: Props) {
  return (
    <div className="sidebar-profile-card profile-style-soft">
      <div className="sidebar-cover" />
      <div className="photo-wrap">
        {!photoLoadError ? (
          <img src={photoSrc} alt={photoAlt} className="profile-photo" onError={onPhotoError} />
        ) : (
          <div className="photo-placeholder">GB</div>
        )}
      </div>
    </div>
  )
}
