import { useCallback, useMemo, useRef, useState } from 'react'
import { EducationBlock, ExperienceBlock, CourseItem } from '../features/cv/components/blocks'
import { SkillProfileWheel } from '../features/cv/components/SkillProfileWheel'
import { TopToolbar } from '../features/cv/components/TopToolbar'
import { CourseModal, EducationModal, ExperienceModal } from '../features/cv/modals'
import { cvFixedConfig, initialCvData } from '../domain/cv-data'
import { downloadCvPdf } from '../shared/cv-pdf-export'
import { t } from '../shared/ui-labels'
import { localize } from '../shared/locale-utils'
import { toDisplayPeriod, toMonthInputValue } from '../shared/date-utils'
import type { CvData, Locale } from '../domain/cv-schema'
import './App.css'

const languageFlagPaths = ['/flags/gb.svg', '/flags/es-valencia.svg', '/flags/fr.svg', '/flags/de.svg']

function App() {
  const [locale, setLocale] = useState<Locale>('es')
  const [cvData, setCvData] = useState<CvData>(initialCvData)
  const [experienceModalMode, setExperienceModalMode] = useState<'add' | 'edit' | null>(null)
  const [educationModalMode, setEducationModalMode] = useState<'add' | 'edit' | null>(null)
  const [courseModalMode, setCourseModalMode] = useState<'add' | 'edit' | null>(null)
  const [photoLoadError, setPhotoLoadError] = useState(false)
  const [qrLoadError, setQrLoadError] = useState(false)
  const [editingExperienceIndex, setEditingExperienceIndex] = useState<number | null>(null)
  const [editingExperiencePositionIndex, setEditingExperiencePositionIndex] = useState<number | null>(
    null,
  )
  const [editingEducationIndex, setEditingEducationIndex] = useState<number | null>(null)
  const [editingCourseIndex, setEditingCourseIndex] = useState<{
    categoryIndex: number
    itemIndex: number
  } | null>(null)
  const [draftExperience, setDraftExperience] = useState({
    role: { es: '', en: '' },
    company: { es: '', en: '' },
    project: { es: '', en: '' },
    bullets: [{ es: '', en: '' }],
    technologies: 'React, TypeScript',
    from: '',
    to: '',
  })
  const [draftEducation, setDraftEducation] = useState({
    title: { es: '', en: '' },
    center: { es: '', en: '' },
    from: '',
    to: '',
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
  const [pdfExporting, setPdfExporting] = useState(false)
  const pdfBusyRef = useRef(false)

  const handleDownloadPdf = useCallback(async () => {
    if (!printRef.current || pdfBusyRef.current) return
    pdfBusyRef.current = true
    setPdfExporting(true)
    try {
      await downloadCvPdf(printRef.current, `cv-gabriel-ballester-${locale}.pdf`)
    } finally {
      pdfBusyRef.current = false
      setPdfExporting(false)
    }
  }, [locale])

  const firstPageExperiences = useMemo(() => cvData.experiences.slice(0, 4), [cvData.experiences])
  const secondPageExperiences = useMemo(() => cvData.experiences.slice(4), [cvData.experiences])
  const firstPageCourseCategories = useMemo(() => cvData.courses.slice(0, 1), [cvData.courses])
  const secondPageCourseCategories = useMemo(() => cvData.courses.slice(1), [cvData.courses])

  const openNewExperienceModal = () => {
    setEditingExperienceIndex(null)
    setEditingExperiencePositionIndex(null)
    setDraftExperience({
      role: { es: '', en: '' },
      company: { es: '', en: '' },
      project: { es: '', en: '' },
      bullets: [{ es: '', en: '' }],
      technologies: 'React, TypeScript',
      from: '',
      to: '',
    })
    setExperienceModalMode('add')
  }

  const openNewEducationModal = () => {
    setEditingEducationIndex(null)
    setDraftEducation({
      title: { es: '', en: '' },
      center: { es: '', en: '' },
      from: '',
      to: '',
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
    if (target.kind === 'grouped') return
    setEditingExperiencePositionIndex(null)
    setEditingExperienceIndex(index)
    setDraftExperience({
      role: { ...target.role },
      company: { ...target.company },
      project: { ...target.project },
      bullets: target.bullets.length ? target.bullets.map((b) => ({ ...b })) : [{ es: '', en: '' }],
      technologies: target.technologies.join(', '),
      from: toMonthInputValue(target.period.from),
      to: toMonthInputValue(target.period.to),
    })
    setExperienceModalMode('edit')
  }

  const openEditGroupedExperiencePosition = (experienceIndex: number, positionIndex: number) => {
    const target = cvData.experiences[experienceIndex]
    if (target.kind !== 'grouped') return
    const pos = target.positions[positionIndex]
    setEditingExperienceIndex(experienceIndex)
    setEditingExperiencePositionIndex(positionIndex)
    setDraftExperience({
      role: { ...pos.role },
      company: { ...target.company },
      project: { ...pos.project },
      bullets: pos.bullets.length ? pos.bullets.map((b) => ({ ...b })) : [{ es: '', en: '' }],
      technologies: pos.technologies.join(', '),
      from: toMonthInputValue(pos.period.from),
      to: toMonthInputValue(pos.period.to),
    })
    setExperienceModalMode('edit')
  }

  const openEditEducationModal = (index: number) => {
    const target = cvData.education[index]
    setEditingEducationIndex(index)
    setDraftEducation({
      title: { ...target.title },
      center: { ...target.center },
      from: toMonthInputValue(target.period.from),
      to: toMonthInputValue(target.period.to),
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

  const saveExperience = (nextDraft: typeof draftExperience) => {
    const normalizedBullets = nextDraft.bullets
      .map((bullet) => ({ es: bullet.es.trim(), en: bullet.en.trim() }))
      .filter((bullet) => bullet.es || bullet.en)

    const positionUpdate = {
      role: { ...nextDraft.role },
      project: { ...nextDraft.project },
      period: {
        from: toDisplayPeriod(nextDraft.from),
        to: toDisplayPeriod(nextDraft.to),
      },
      bullets: normalizedBullets.length
        ? normalizedBullets
        : [{ es: 'Descripcion pendiente.', en: 'Description pending.' }],
      technologies: nextDraft.technologies
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    }

    const singleNormalized = {
      kind: 'single' as const,
      ...positionUpdate,
      company: { ...nextDraft.company },
      location: { es: 'España', en: 'Spain' },
    }

    setCvData((prev) => {
      if (editingExperienceIndex === null) {
        return { ...prev, experiences: [singleNormalized, ...prev.experiences] }
      }

      const current = prev.experiences[editingExperienceIndex]
      if (
        current.kind === 'grouped' &&
        editingExperiencePositionIndex !== null &&
        editingExperiencePositionIndex >= 0
      ) {
        const nextPositions = current.positions.map((p, i) =>
          i === editingExperiencePositionIndex ? { ...positionUpdate } : p,
        )
        return {
          ...prev,
          experiences: prev.experiences.map((item, idx) =>
            idx === editingExperienceIndex ? { ...current, positions: nextPositions } : item,
          ),
        }
      }

      return {
        ...prev,
        experiences: prev.experiences.map((item, idx) =>
          idx === editingExperienceIndex ? singleNormalized : item,
        ),
      }
    })

    setExperienceModalMode(null)
    setEditingExperiencePositionIndex(null)
  }

  const saveEducation = (nextDraft: typeof draftEducation) => {
    const normalized = {
      title: { ...nextDraft.title },
      center: { ...nextDraft.center },
      period: {
        from: toDisplayPeriod(nextDraft.from),
        to: toDisplayPeriod(nextDraft.to),
      },
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

  const appendCourseToPage2End = (item: Pick<typeof draftCourse, 'title' | 'length' | 'author'>) => {
    setCvData((prev) => {
      const nextCourses = [...prev.courses]
      const lastIdx = nextCourses.length - 1
      nextCourses[lastIdx] = {
        ...nextCourses[lastIdx],
        items: [...nextCourses[lastIdx].items, item],
      }
      return { ...prev, courses: nextCourses }
    })
    setCourseModalMode(null)
  }

  const saveCourse = (nextDraft: typeof draftCourse) => {
    if (editingCourseIndex == null) return

    const courseItem = {
      title: nextDraft.title,
      length: nextDraft.length,
      author: nextDraft.author,
    }

    setCvData((prev) => {
      const nextCourses = [...prev.courses]
      const { categoryIndex, itemIndex } = editingCourseIndex
      nextCourses[categoryIndex] = {
        ...nextCourses[categoryIndex],
        items: nextCourses[categoryIndex].items.map((item, idx) =>
          idx === itemIndex ? courseItem : item,
        ),
      }
      return { ...prev, courses: nextCourses }
    })
    setCourseModalMode(null)
  }

  return (
    <div className="app">
      <TopToolbar
        locale={locale}
        onLocaleChange={setLocale}
        onDownloadPdf={handleDownloadPdf}
        pdfExporting={pdfExporting}
      />

      <main className="layout">
        <section className="paper-stack" ref={printRef}>
          <article className="a4-page">
            <div className="cv-grid">
              <aside className="cv-sidebar">
                <div className="sidebar-profile-card profile-style-soft">
                  <div className="sidebar-cover" />
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
                </div>
                <div className="sidebar-summary">
                  <h3 className="sidebar-summary-title">{labels.professionalSummary}</h3>
                  {cvData.profile.quotes.map((q) => (
                    <p key={q.es} className="quote">
                      {localize(locale, q)}
                    </p>
                  ))}
                </div>
                <h3 className="sidebar-section-title">{labels.contactData}</h3>
                <ul className="contact">
                  <li>
                    <span>{cvData.profile.city}</span>
                    <span className="contact-icon contact-icon-location" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path d="M12 22s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12Zm0-9a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                      </svg>
                    </span>
                  </li>
                  <li>
                    <span>Tlf: {cvData.profile.phone}</span>
                    <span className="contact-icon contact-icon-phone" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.45.55 1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.85 22 2 13.15 2 2a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.36.56 3.45a1 1 0 0 1-.24 1l-2.2 2.35Z" />
                      </svg>
                    </span>
                  </li>
                  <li>
                    <a href={`mailto:${cvData.profile.email}`} className="contact-link">
                      {cvData.profile.email}
                    </a>
                    <span className="contact-icon contact-icon-mobile" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm5 18a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4ZM8 5v11h8V5H8Z" />
                      </svg>
                    </span>
                  </li>
                  <li>
                    <a href={`https://${cvData.profile.linkedin}`} className="contact-link">
                      {cvData.profile.linkedin}
                    </a>
                    <span className="contact-icon contact-icon-linkedin" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path d="M6.6 8.7A1.7 1.7 0 1 1 6.6 5.3a1.7 1.7 0 0 1 0 3.4ZM5.2 10h2.8v8.8H5.2V10Zm4.5 0h2.7v1.2h.04c.37-.7 1.3-1.4 2.67-1.4 2.86 0 3.39 1.82 3.39 4.2v4.8h-2.8v-4.25c0-1.01-.02-2.32-1.46-2.32-1.46 0-1.68 1.09-1.68 2.25v4.32H9.7V10Z" />
                      </svg>
                    </span>
                  </li>
                </ul>
                <h3 className="sidebar-section-title">LinkedIn QR</h3>
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
                <h3 className="sidebar-section-title">{labels.languages}</h3>
                <ul className="plain-list">
                  {cvData.profile.languages.map((item, idx) => (
                    <li key={item.es} className="language-item">
                      <span className="language-flag-badge">
                        <img
                          className="language-flag-image"
                          src={languageFlagPaths[idx] ?? '/flags/gb.svg'}
                          alt=""
                          aria-hidden="true"
                        />
                      </span>
                      <span>{localize(locale, item)}</span>
                    </li>
                  ))}
                </ul>
                {cvData.profile.skillProfile.length > 0 ? (
                  <SkillProfileWheel
                    items={cvData.profile.skillProfile}
                    locale={locale}
                    title={labels.coreExpertise}
                    footnote={labels.coreExpertiseFootnote}
                  />
                ) : null}
                <section className="editable-section courses-left">
                  <div className="section-header">
                    <h3>{labels.courses}</h3>
                    <button type="button" className="section-plus no-print" onClick={openNewCourseModal}>
                      +
                    </button>
                  </div>
                  {firstPageCourseCategories.map((category, categoryIndex) => (
                    <div key={category.name.es} className="course-category">
                      <h4 className="course-category-title">{localize(locale, category.name)}</h4>
                      {category.items.map((course, itemIndex) => (
                        <CourseItem
                          key={course.title}
                          title={course.title}
                          durationLabel={labels.duration}
                          length={course.length}
                          author={course.author}
                          onEdit={() => openEditCourseModal(categoryIndex, itemIndex)}
                        />
                      ))}
                    </div>
                  ))}
                </section>
              </aside>
              <section className="cv-content">
                <header className="hero">
                  <div className="hero-banner" />
                  <h1>{cvData.profile.name}</h1>
                  <p className="role-tag">{cvData.profile.roleTag}</p>
                </header>
                <section className="editable-section education-section">
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
                  {firstPageExperiences.map((exp, idx) => {
                    const globalIdx = idx
                    const blockKey =
                      exp.kind === 'grouped'
                        ? `grouped-${exp.company.es}`
                        : `single-${exp.company.es}-${exp.period.from}`
                    return (
                      <ExperienceBlock
                        key={blockKey}
                        exp={exp}
                        locale={locale}
                        technologiesLabel={labels.technologies}
                        onEdit={
                          exp.kind === 'single'
                            ? () => openEditExperienceModal(globalIdx)
                            : undefined
                        }
                        onEditGroupedPosition={
                          exp.kind === 'grouped'
                            ? (positionIndex) =>
                                openEditGroupedExperiencePosition(globalIdx, positionIndex)
                            : undefined
                        }
                      />
                    )
                  })}
                </section>
              </section>
            </div>
            <p className="page-index">1/2</p>
          </article>

          <article className="a4-page">
            <div className="cv-grid">
              <aside className="cv-sidebar">
                <h3 className="sidebar-section-title sidebar-courses-p2">{labels.courses}</h3>
                {secondPageCourseCategories.map((category, categoryIndex) => (
                  <div key={category.name.es} className="course-category">
                    <h4 className="course-category-title">{localize(locale, category.name)}</h4>
                    {category.items.map((course, itemIndex) => (
                      <CourseItem
                        key={course.title}
                        title={course.title}
                        durationLabel={labels.duration}
                        length={course.length}
                        author={course.author}
                        onEdit={() => openEditCourseModal(categoryIndex + 1, itemIndex)}
                      />
                    ))}
                  </div>
                ))}
              </aside>
              <section className="cv-content">
                <section className="experience-section-p2">
                  <h2>{labels.experience}</h2>
                  {secondPageExperiences.map((exp, idx) => {
                    const globalIdx = firstPageExperiences.length + idx
                    const blockKey =
                      exp.kind === 'grouped'
                        ? `grouped-${exp.company.es}-p2`
                        : `single-${exp.company.es}-${exp.period.from}`
                    return (
                      <ExperienceBlock
                        key={blockKey}
                        exp={exp}
                        locale={locale}
                        technologiesLabel={labels.technologies}
                        onEdit={
                          exp.kind === 'single'
                            ? () => openEditExperienceModal(globalIdx)
                            : undefined
                        }
                        onEditGroupedPosition={
                          exp.kind === 'grouped'
                            ? (positionIndex) =>
                                openEditGroupedExperiencePosition(globalIdx, positionIndex)
                            : undefined
                        }
                      />
                    )
                  })}
                </section>
              </section>
            </div>
            <p className="page-index">2/2</p>
          </article>
        </section>
      </main>

      {experienceModalMode ? (
        <ExperienceModal
          locale={locale}
          title={experienceModalMode === 'add' ? labels.addExperience : labels.manageExperiences}
          draft={draftExperience}
          onClose={() => {
            setExperienceModalMode(null)
            setEditingExperiencePositionIndex(null)
          }}
          onSave={saveExperience}
          saveLabel={experienceModalMode === 'add' ? labels.addExperience : labels.save}
        />
      ) : null}

      {educationModalMode ? (
        <EducationModal
          locale={locale}
          title={educationModalMode === 'add' ? labels.addEducation : labels.manageEducation}
          draft={draftEducation}
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
          mode={courseModalMode === 'add' ? 'add' : 'edit'}
          onSave={saveCourse}
          onAppendCourse={appendCourseToPage2End}
          onClose={() => setCourseModalMode(null)}
          saveLabel={courseModalMode === 'add' ? labels.addCourse : labels.save}
        />
      ) : null}

    </div>
  )
}

export default App
