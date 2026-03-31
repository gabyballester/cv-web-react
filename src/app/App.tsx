import { useCallback, useRef, useState } from 'react'
import { CvDocument } from '../features/cv/document/CvDocument'
import { TopToolbar } from '../features/cv/components/TopToolbar'
import { CourseModal, EducationModal, ExperienceModal } from '../features/cv/modals'
import { cvFixedConfig } from '../domain/cv-data'
import { useCvStore } from '../stores/cv-store'
import { downloadCvPdf } from '../shared/cv-pdf-export'
import { t } from '../shared/ui-labels'
import { toDisplayPeriod, toMonthInputValue } from '../shared/date-utils'
import './App.css'

function App() {
  const locale = useCvStore((s) => s.locale)
  const setLocale = useCvStore((s) => s.setLocale)
  const cvData = useCvStore((s) => s.cvData)
  const setCvData = useCvStore((s) => s.setCvData)
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
        <CvDocument
          printRef={printRef}
          photoSrc={cvFixedConfig.profilePhotoPath}
          linkedInQrPath={cvFixedConfig.linkedInQrPath}
          photoLoadError={photoLoadError}
          qrLoadError={qrLoadError}
          onPhotoError={() => setPhotoLoadError(true)}
          onQrError={() => setQrLoadError(true)}
          onOpenCourseModal={openNewCourseModal}
          onOpenEducationModal={openNewEducationModal}
          onOpenExperienceModal={openNewExperienceModal}
          onEditCourse={openEditCourseModal}
          onEditEducation={openEditEducationModal}
          onEditExperience={openEditExperienceModal}
          onEditGroupedPosition={openEditGroupedExperiencePosition}
        />
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
