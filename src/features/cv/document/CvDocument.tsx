import type { CvDocumentActions } from './cv-document-actions'
import { useCvStore } from '../../../stores/cv-store'
import { t } from '../../../shared/ui-labels'
import { CvA4Shell } from './CvA4Shell'
import { CvSidebarPage1 } from './CvSidebarPage1'
import { CvSidebarPage2 } from './CvSidebarPage2'
import { CvMainPage1 } from './CvMainPage1'
import { CvMainPage2 } from './CvMainPage2'
import { orderSecondPageExperiencesForPrint } from './cv-document-experience-order'

/** Main column: experiences after this index start on page 2 (orden en `cvData` sin cambios para el editor). */
const FIRST_PAGE_EXPERIENCE_COUNT = 2

/** Printable two-page A4 layout; reads `cvData` and `locale` from the CV store. */
export function CvDocument(props: CvDocumentActions) {
  const cvData = useCvStore((s) => s.cvData)
  const locale = useCvStore((s) => s.locale)
  const labels = t(locale)

  const firstPageExperiences = cvData.experiences.slice(0, FIRST_PAGE_EXPERIENCE_COUNT)
  const secondPageExperiences = orderSecondPageExperiencesForPrint(
    cvData.experiences.slice(FIRST_PAGE_EXPERIENCE_COUNT),
  )
  const allCourseCategories = cvData.courses

  const {
    printRef,
    photoSrc,
    linkedInQrPath,
    photoLoadError,
    qrLoadError,
    onPhotoError,
    onQrError,
  } = props

  return (
    <section className="paper-stack" ref={printRef}>
      <CvA4Shell pageLabel="1/2">
        <CvSidebarPage1
          cvData={cvData}
          locale={locale}
          labels={labels}
          photoSrc={photoSrc}
          linkedInQrPath={linkedInQrPath}
          photoLoadError={photoLoadError}
          qrLoadError={qrLoadError}
          onPhotoError={onPhotoError}
          onQrError={onQrError}
        />
        <CvMainPage1
          cvData={cvData}
          locale={locale}
          labels={labels}
          experiences={firstPageExperiences}
        />
      </CvA4Shell>

      <CvA4Shell pageLabel="2/2">
        <CvSidebarPage2
          locale={locale}
          labels={labels}
          courseCategories={allCourseCategories}
        />
        <CvMainPage2
          locale={locale}
          labels={labels}
          experiences={secondPageExperiences}
        />
      </CvA4Shell>
    </section>
  )
}
