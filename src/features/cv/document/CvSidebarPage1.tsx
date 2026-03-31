import type { CvData, Locale } from '../../../domain/cv-schema'
import type { UiLabels } from './cv-document-types'
import { SkillProfileHighlights } from '../components/SkillProfileHighlights'
import { SidebarPairListItem } from '../components/SidebarPairListItem'
import { ContactRow } from '../components/ContactRow'
import { localize } from '../../../shared/locale-utils'
import { ProfilePhotoCard } from './ProfilePhotoCard'

const languageFlagPaths = ['/flags/gb.svg', '/flags/es-valencia.svg', '/flags/fr.svg', '/flags/de.svg']

type Props = {
  cvData: CvData
  locale: Locale
  labels: UiLabels
  photoSrc: string
  linkedInQrPath: string
  photoLoadError: boolean
  qrLoadError: boolean
  onPhotoError: () => void
  onQrError: () => void
}

export function CvSidebarPage1({
  cvData,
  locale,
  labels,
  photoSrc,
  linkedInQrPath,
  photoLoadError,
  qrLoadError,
  onPhotoError,
  onQrError,
}: Props) {
  return (
    <aside className="cv-sidebar cv-sidebar--p1">
      <ProfilePhotoCard
        photoSrc={photoSrc}
        photoAlt={cvData.profile.name}
        photoLoadError={photoLoadError}
        onPhotoError={onPhotoError}
      />
      <div className="sidebar-summary">
        <h3 className="sidebar-section-title">{labels.professionalSummary}</h3>
        {cvData.profile.quotes.map((q) => (
          <p key={q.es} className="quote quote-summary-line">
            {localize(locale, q)}
          </p>
        ))}
      </div>
      <section className="sidebar-pair-section" aria-label={labels.contactData}>
        <h3 className="sidebar-section-title">{labels.contactData}</h3>
        <ul className="cv-sidebar-contact-list">
          <ContactRow icon="location">
            <span>{cvData.profile.city}</span>
          </ContactRow>
          <ContactRow icon="phone">
            <span>Tlf: {cvData.profile.phone}</span>
          </ContactRow>
          <ContactRow icon="mobile">
            <a href={`mailto:${cvData.profile.email}`} className="contact-link">
              {cvData.profile.email}
            </a>
          </ContactRow>
          <ContactRow icon="linkedin">
            <a href={`https://${cvData.profile.linkedin}`} className="contact-link">
              {cvData.profile.linkedin}
            </a>
          </ContactRow>
        </ul>
      </section>
      <h3 className="sidebar-section-title">LinkedIn QR</h3>
      <div className="qr-wrap qr-wrap--tight">
        {!qrLoadError ? (
          <img
            src={linkedInQrPath}
            alt="LinkedIn QR"
            className="qr-image"
            onError={onQrError}
          />
        ) : (
          <div className="qr-placeholder">QR</div>
        )}
      </div>
      <section className="sidebar-pair-section" aria-label={labels.languages}>
        <h3 className="sidebar-section-title">{labels.languages}</h3>
        <ul className="cv-sidebar-contact-list">
          {cvData.profile.languages.map((item, idx) => (
            <SidebarPairListItem
              key={item.es}
              main={
                <span className="cv-sidebar-pair-main-inline">
                  <span className="language-flag-badge">
                    <img
                      className="language-flag-image"
                      src={languageFlagPaths[idx] ?? '/flags/gb.svg'}
                      alt=""
                      aria-hidden="true"
                    />
                  </span>
                  <span className="cv-sidebar-pair-label">{localize(locale, item)}</span>
                </span>
              }
            />
          ))}
        </ul>
      </section>
      {cvData.profile.skillProfile.length > 0 ? (
        <SkillProfileHighlights
          cvData={cvData}
          locale={locale}
          title={labels.coreExpertise}
        />
      ) : null}
    </aside>
  )
}
