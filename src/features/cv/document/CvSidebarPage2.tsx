import type { Locale } from '../../../domain/cv-schema'
import type { CourseCategory, UiLabels } from './cv-document-types'
import { CourseItem } from '../components/blocks'
import { CvTitledSection } from '../components/CvTitledSection'
import { localize } from '../../../shared/locale-utils'
import '../styles/courses.css'

type Props = {
  locale: Locale
  labels: UiLabels
  courseCategories: CourseCategory[]
}

export function CvSidebarPage2({
  locale,
  labels,
  courseCategories,
}: Props) {
  return (
    <aside className="cv-sidebar cv-sidebar--p2" aria-label={`${labels.sidebarContent} 2`}>
      <CvTitledSection title={labels.courses} className="courses-sidebar-p2">
        {courseCategories.map((category) => (
          <div key={category.name.es} className="course-category">
            <h4 className="cv-section-title cv-section-title--category">
              {localize(locale, category.name)}
            </h4>
            {category.items.map((course) => (
              <CourseItem
                key={course.title}
                title={course.title}
                durationLabel={labels.duration}
                length={course.length}
                author={course.author}
              />
            ))}
          </div>
        ))}
      </CvTitledSection>
    </aside>
  )
}
