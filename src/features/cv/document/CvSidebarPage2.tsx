import type { Locale } from '../../../domain/cv-schema'
import type { CourseCategory, UiLabels } from './cv-document-types'
import { CourseItem } from '../components/blocks'
import { localize } from '../../../shared/locale-utils'

type Props = {
  locale: Locale
  labels: UiLabels
  courseCategories: CourseCategory[]
  onOpenCourseModal: () => void
  onEditCourse: (categoryIndex: number, itemIndex: number) => void
}

export function CvSidebarPage2({
  locale,
  labels,
  courseCategories,
  onOpenCourseModal,
  onEditCourse,
}: Props) {
  return (
    <aside className="cv-sidebar cv-sidebar--p2">
      <section className="editable-section courses-sidebar-p2">
        <div className="section-header">
          <h3 className="sidebar-section-title">{labels.courses}</h3>
          <button type="button" className="section-plus no-print" onClick={onOpenCourseModal}>
            +
          </button>
        </div>
        {courseCategories.map((category, categoryIndex) => (
          <div key={category.name.es} className="course-category">
            <h4 className="course-category-title">{localize(locale, category.name)}</h4>
            {category.items.map((course, itemIndex) => (
              <CourseItem
                key={course.title}
                title={course.title}
                durationLabel={labels.duration}
                length={course.length}
                author={course.author}
                onEdit={() => onEditCourse(categoryIndex, itemIndex)}
              />
            ))}
          </div>
        ))}
      </section>
    </aside>
  )
}
