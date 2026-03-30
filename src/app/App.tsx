import { useMemo, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { EducationBlock, ExperienceBlock, CourseItem } from '../features/cv/components/blocks'
import { TopToolbar } from '../features/cv/components/TopToolbar'
import {
  AddSectionModal,
  CourseModal,
  EducationModal,
  ExperienceModal,
} from '../features/cv/modals/modals'
import { cvFixedConfig, initialCvData } from '../domain/cv-data'
import { t } from '../shared/ui-labels'
import { localize } from '../shared/locale-utils'
import type { CvData, Locale } from '../domain/cv-schema'
import './App.css'

function App() {
  const [locale, setLocale] = useState<Locale>('es')
  const [cvData, setCvData] = useState<CvData>(initialCvData)
  const [experienceModalMode, setExperienceModalMode] = useState<'add' | 'edit' | null>(null)
  const [educationModalMode, setEducationModalMode] = useState<'add' | 'edit' | null>(null)
  const [courseModalMode, setCourseModalMode] = useState<'add' | 'edit' | null>(null)
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false)
  const [photoLoadError, setPhotoLoadError] = useState(false)
  const [qrLoadError, setQrLoadError] = useState(false)
  const [editingExperienceIndex, setEditingExperienceIndex] = useState<number | null>(null)
  const [editingEducationIndex, setEditingEducationIndex] = useState<number | null>(null)
  const [editingCourseIndex, setEditingCourseIndex] = useState<{
    categoryIndex: number
    itemIndex: number
  } | null>(null)
  const [draftExperience, setDraftExperience] = useState({
    role: { es: '', en: '' },
    company: { es: '', en: '' },
    project: { es: '', en: '' },
    bullet: { es: '', en: '' },
    technologies: 'React, TypeScript',
    from: 'MM/YYYY',
    to: 'Present',
  })
  const [draftEducation, setDraftEducation] = useState({
    title: { es: '', en: '' },
    center: { es: '', en: '' },
    from: 'MM/YYYY',
    to: 'MM/YYYY',
  })
  const [draftCourse, setDraftCourse] = useState({
    categoryIndex: '0',
    categoryEs: '',
    categoryEn: '',
    title: '',
    length: '',
    author: '',
  })
  const printRef = useRef<HTMLDivElement>(null)
  const labels = t(locale)

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `cv-gabriel-ballester-${locale}`,
    pageStyle: '@page { size: A4; margin: 0; }',
  })

  const firstPageExperiences = useMemo(() => cvData.experiences.slice(0, 3), [cvData.experiences])
  const secondPageExperiences = useMemo(() => cvData.experiences.slice(3), [cvData.experiences])

  const openNewExperienceModal = () => {
    setEditingExperienceIndex(null)
    setDraftExperience({
      role: { es: '', en: '' },
      company: { es: '', en: '' },
      project: { es: '', en: '' },
      bullet: { es: '', en: '' },
      technologies: 'React, TypeScript',
      from: 'MM/YYYY',
      to: 'Present',
    })
    setExperienceModalMode('add')
  }

  const openNewEducationModal = () => {
    setEditingEducationIndex(null)
    setDraftEducation({
      title: { es: '', en: '' },
      center: { es: '', en: '' },
      from: 'MM/YYYY',
      to: 'MM/YYYY',
    })
    setEducationModalMode('add')
  }

  const openNewCourseModal = () => {
    setEditingCourseIndex(null)
    setDraftCourse({
      categoryIndex: '0',
      categoryEs: '',
      categoryEn: '',
      title: '',
      length: '',
      author: '',
    })
    setCourseModalMode('add')
  }

  const openEditExperienceModal = (index: number) => {
    const target = cvData.experiences[index]
    setEditingExperienceIndex(index)
    setDraftExperience({
      role: { ...target.role },
      company: { ...target.company },
      project: { ...target.project },
      bullet: {
        es: target.bullets[0]?.es ?? '',
        en: target.bullets[0]?.en ?? '',
      },
      technologies: target.technologies.join(', '),
      from: target.period.from,
      to: target.period.to,
    })
    setExperienceModalMode('edit')
  }

  const openEditEducationModal = (index: number) => {
    const target = cvData.education[index]
    setEditingEducationIndex(index)
    setDraftEducation({
      title: { ...target.title },
      center: { ...target.center },
      from: target.period.from,
      to: target.period.to,
    })
    setEducationModalMode('edit')
  }

  const openEditCourseModal = (categoryIndex: number, itemIndex: number) => {
    const category = cvData.courses[categoryIndex]
    const item = category.items[itemIndex]
    setEditingCourseIndex({ categoryIndex, itemIndex })
    setDraftCourse({
      categoryIndex: String(categoryIndex),
      categoryEs: category.name.es,
      categoryEn: category.name.en,
      title: item.title,
      length: item.length,
      author: item.author,
    })
    setCourseModalMode('edit')
  }

  const saveExperience = () => {
    if (!draftExperience.role.es.trim() || !draftExperience.role.en.trim()) return
    const normalized = {
      role: { ...draftExperience.role },
      company: { ...draftExperience.company },
      project: { ...draftExperience.project },
      period: { from: draftExperience.from, to: draftExperience.to },
      location: { es: 'España', en: 'Spain' },
      bullets: [
        {
          es: draftExperience.bullet.es || 'Descripcion pendiente.',
          en: draftExperience.bullet.en || 'Description pending.',
        },
      ],
      technologies: draftExperience.technologies
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    }

    setCvData((prev) => {
      if (editingExperienceIndex === null) {
        return { ...prev, experiences: [normalized, ...prev.experiences] }
      }

      return {
        ...prev,
        experiences: prev.experiences.map((item, idx) =>
          idx === editingExperienceIndex ? normalized : item,
        ),
      }
    })

    setExperienceModalMode(null)
  }

  const saveEducation = () => {
    if (!draftEducation.title.es.trim() || !draftEducation.title.en.trim()) return

    const normalized = {
      title: { ...draftEducation.title },
      center: { ...draftEducation.center },
      period: { from: draftEducation.from, to: draftEducation.to },
    }

    setCvData((prev) => {
      if (editingEducationIndex === null) {
        return { ...prev, education: [normalized, ...prev.education] }
      }
      return {
        ...prev,
        education: prev.education.map((item, idx) =>
          idx === editingEducationIndex ? normalized : item,
        ),
      }
    })
    setEducationModalMode(null)
  }

  const saveCourse = () => {
    if (!draftCourse.title.trim()) return
    const courseItem = {
      title: draftCourse.title,
      length: draftCourse.length,
      author: draftCourse.author,
    }

    setCvData((prev) => {
      const nextCourses = [...prev.courses]
      if (editingCourseIndex) {
        const { categoryIndex, itemIndex } = editingCourseIndex
        nextCourses[categoryIndex] = {
          ...nextCourses[categoryIndex],
          items: nextCourses[categoryIndex].items.map((item, idx) =>
            idx === itemIndex ? courseItem : item,
          ),
        }
        return { ...prev, courses: nextCourses }
      }

      if (draftCourse.categoryIndex === 'new') {
        nextCourses.push({
          name: {
            es: draftCourse.categoryEs || 'Nueva categoría',
            en: draftCourse.categoryEn || 'New category',
          },
          items: [courseItem],
        })
      } else {
        const index = Number(draftCourse.categoryIndex)
        nextCourses[index] = {
          ...nextCourses[index],
          items: [courseItem, ...nextCourses[index].items],
        }
      }

      return { ...prev, courses: nextCourses }
    })
    setCourseModalMode(null)
  }

  const openAddBySection = (section: 'experience' | 'education' | 'courses') => {
    setIsAddSectionModalOpen(false)
    if (section === 'experience') openNewExperienceModal()
    if (section === 'education') openNewEducationModal()
    if (section === 'courses') openNewCourseModal()
  }

  return (
    <div className="app">
      <TopToolbar locale={locale} onLocaleChange={setLocale} onPrint={handlePrint} />

      <main className="layout">
        <section className="paper-stack" ref={printRef}>
          <article className="a4-page">
            <div className="cv-grid">
              <aside className="cv-sidebar">
                <div className="photo-wrap">
                  {!photoLoadError ? (
                    <img
                      src={cvFixedConfig.profilePhotoPath}
                      alt="Gabriel Ballester"
                      className="profile-photo"
                      onError={() => setPhotoLoadError(true)}
                    />
                  ) : (
                    <div className="photo-placeholder">GB</div>
                  )}
                </div>
                <h3>{labels.profile}</h3>
                {cvData.profile.quotes.map((q) => (
                  <p key={q.es} className="quote">
                    "{localize(locale, q)}"
                  </p>
                ))}
                <ul className="contact">
                  <li>{cvData.profile.city}</li>
                  <li>{cvData.profile.phone}</li>
                  <li>{cvData.profile.email}</li>
                  <li>{cvData.profile.linkedin}</li>
                </ul>
                <h3>{labels.languages}</h3>
                <ul className="plain-list">
                  {cvData.profile.languages.map((item) => (
                    <li key={item.es}>{localize(locale, item)}</li>
                  ))}
                </ul>
                <h3>LinkedIn QR</h3>
                <div className="qr-wrap">
                  {!qrLoadError ? (
                    <img
                      src={cvFixedConfig.linkedInQrPath}
                      alt="LinkedIn QR"
                      className="qr-image"
                      onError={() => setQrLoadError(true)}
                    />
                  ) : (
                    <div className="qr-placeholder">QR</div>
                  )}
                </div>
              </aside>
              <section className="cv-content">
                <header className="hero">
                  <div className="hero-banner" />
                  <h1>{cvData.profile.name}</h1>
                  <p className="role-tag">{cvData.profile.roleTag}</p>
                </header>
                <section className="editable-section">
                  <div className="section-header">
                    <h2>{labels.education}</h2>
                    <button
                      type="button"
                      className="section-plus no-print"
                      onClick={openNewEducationModal}
                    >
                      +
                    </button>
                  </div>
                  {cvData.education.map((item) => (
                    <EducationBlock
                      key={item.title.es}
                      item={item}
                      locale={locale}
                      onEdit={() => openEditEducationModal(cvData.education.indexOf(item))}
                    />
                  ))}
                </section>
                <section className="editable-section">
                  <div className="section-header">
                    <h2>{labels.experience}</h2>
                    <button
                      type="button"
                      className="section-plus no-print"
                      onClick={openNewExperienceModal}
                    >
                      +
                    </button>
                  </div>
                  {firstPageExperiences.map((exp) => (
                    <ExperienceBlock
                      key={`${exp.company.es}-${exp.period.from}`}
                      exp={exp}
                      locale={locale}
                      technologiesLabel={labels.technologies}
                      onEdit={() => openEditExperienceModal(cvData.experiences.indexOf(exp))}
                    />
                  ))}
                </section>
                <div className="no-print section-actions">
                  <button type="button" onClick={() => setIsAddSectionModalOpen(true)}>
                    + {labels.addContent}
                  </button>
                </div>
              </section>
            </div>
          </article>

          <article className="a4-page">
            <div className="cv-grid">
              <aside className="cv-sidebar editable-section">
                <div className="section-header">
                  <h3>{labels.courses}</h3>
                  <button
                    type="button"
                    className="section-plus no-print"
                    onClick={openNewCourseModal}
                  >
                    +
                  </button>
                </div>
                {cvData.courses.map((category) => (
                  <div key={category.name.es} className="course-category">
                    <strong>{localize(locale, category.name)}</strong>
                    {category.items.map((course, itemIndex) => (
                      <CourseItem
                        key={course.title}
                        title={course.title}
                        durationLabel={labels.duration}
                        length={course.length}
                        author={course.author}
                        onEdit={() =>
                          openEditCourseModal(cvData.courses.indexOf(category), itemIndex)
                        }
                      />
                    ))}
                  </div>
                ))}
              </aside>
              <section className="cv-content">
                <section>
                  <h2>{labels.experience}</h2>
                  {secondPageExperiences.map((exp) => (
                    <ExperienceBlock
                      key={`${exp.company.es}-${exp.period.from}`}
                      exp={exp}
                      locale={locale}
                      technologiesLabel={labels.technologies}
                      onEdit={() => openEditExperienceModal(cvData.experiences.indexOf(exp))}
                    />
                  ))}
                </section>
              </section>
            </div>
          </article>
        </section>
      </main>

      {experienceModalMode ? (
        <ExperienceModal
          locale={locale}
          title={experienceModalMode === 'add' ? labels.addExperience : labels.manageExperiences}
          draft={draftExperience}
          onDraftChange={setDraftExperience}
          onClose={() => setExperienceModalMode(null)}
          onSave={saveExperience}
          saveLabel={experienceModalMode === 'add' ? labels.addExperience : labels.save}
        />
      ) : null}

      {educationModalMode ? (
        <EducationModal
          locale={locale}
          title={educationModalMode === 'add' ? labels.addEducation : labels.manageEducation}
          draft={draftEducation}
          onDraftChange={setDraftEducation}
          onSave={saveEducation}
          onClose={() => setEducationModalMode(null)}
          saveLabel={educationModalMode === 'add' ? labels.addEducation : labels.save}
        />
      ) : null}

      {courseModalMode ? (
        <CourseModal
          locale={locale}
          title={courseModalMode === 'add' ? labels.addCourse : labels.manageCourses}
          courses={cvData.courses}
          draft={draftCourse}
          onDraftChange={setDraftCourse}
          onSave={saveCourse}
          onClose={() => setCourseModalMode(null)}
          saveLabel={courseModalMode === 'add' ? labels.addCourse : labels.save}
        />
      ) : null}

      {isAddSectionModalOpen ? (
        <AddSectionModal
          locale={locale}
          onClose={() => setIsAddSectionModalOpen(false)}
          onSelect={openAddBySection}
        />
      ) : null}
    </div>
  )
}

export default App
