import type { CvData, Locale } from '../../../domain/cv-schema'
import type { UiLabels } from './cv-document-types'
import { SkillProfileHighlights } from '../components/SkillProfileHighlights'
import { SidebarLeadingLabelItem } from '../components/SidebarLeadingLabelItem'
import { ContactRow } from '../components/ContactRow'
import { CvTitledSection } from '../components/CvTitledSection'
import { localize } from '../../../shared/locale-utils'
import { ProfilePhotoCard } from './ProfilePhotoCard'
import { publicAsset } from '../../../shared/public-asset'

const languageFlagPaths = [
  publicAsset('flags/gb.svg'),
  publicAsset('flags/es-valencia.svg'),
  publicAsset('flags/fr.svg'),
  publicAsset('flags/de.svg'),
]

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
    <aside className="cv-sidebar cv-sidebar--p1" aria-label={`${labels.sidebarContent} 1`}>
      <ProfilePhotoCard
        photoSrc={photoSrc}
        photoAlt={cvData.profile.name}
        photoLoadError={photoLoadError}
        onPhotoError={onPhotoError}
      />
      <CvTitledSection title={labels.professionalSummary} className="sidebar-summary">
        {cvData.profile.quotes.map((q) => (
          <p key={q.es} className="quote quote-summary-line">
            {localize(locale, q)}
          </p>
        ))}
      </CvTitledSection>
      <CvTitledSection title={labels.contactData}>
        <ul className="cv-sidebar-contact-list">
          <ContactRow icon="location">
            <span>{cvData.profile.city}</span>
          </ContactRow>
          <ContactRow icon="phone">
            <span>Tlf: {cvData.profile.phone}</span>
          </ContactRow>
          <ContactRow icon="mobile">
            <a
              href={`mailto:${cvData.profile.email}`}
              className="contact-link"
              aria-label={`${labels.sendEmailTo} ${cvData.profile.email}`}
            >
              {cvData.profile.email}
            </a>
          </ContactRow>
          <ContactRow icon="linkedin">
            <a
              href={`https://${cvData.profile.linkedin}`}
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${labels.openLinkedInProfile}: ${cvData.profile.linkedin}`}
            >
              {cvData.profile.linkedin}
            </a>
          </ContactRow>
        </ul>
      </CvTitledSection>
      <CvTitledSection title={labels.linkedInQr}>
        <div className="qr-wrap qr-wrap--tight">
          {!qrLoadError ? (
            <img src={linkedInQrPath} alt="LinkedIn QR" className="qr-image" onError={onQrError} />
          ) : (
            <div className="qr-placeholder">QR</div>
          )}
        </div>
      </CvTitledSection>
      <CvTitledSection title={labels.languages}>
        <ul className="cv-sidebar-contact-list">
          {cvData.profile.languages.map((item, idx) => (
            <SidebarLeadingLabelItem
              key={item.es}
              leading={
                <span className="language-flag-badge">
                  <img
                    className="language-flag-image"
                    src={languageFlagPaths[idx] ?? publicAsset('flags/gb.svg')}
                    alt=""
                    aria-hidden="true"
                  />
                </span>
              }
              label={localize(locale, item)}
            />
          ))}
        </ul>
      </CvTitledSection>
      {cvData.profile.skillProfile.length > 0 ? (
        <SkillProfileHighlights cvData={cvData} locale={locale} title={labels.coreExpertise} />
      ) : null}
    </aside>
  )
}
