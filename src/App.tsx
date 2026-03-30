import { useMemo, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { initialCvData } from './cvData'
import { cvSchema, type CvData, type Locale } from './cvSchema'
import './App.css'

const labels = {
  es: {
    education: 'Formacion',
    experience: 'Experiencia laboral',
    courses: 'Cursos destacados',
    languages: 'Idiomas',
    technologies: 'Tecnologias y herramientas',
    addExperience: 'Anadir experiencia',
    importJson: 'Importar JSON',
    exportJson: 'Exportar JSON',
    printPdf: 'Descargar PDF A4',
    profile: 'Perfil',
    manageExperiences: 'Gestionar experiencias',
    edit: 'Editar',
    save: 'Guardar',
    cancel: 'Cancelar',
    close: 'Cerrar',
  },
  en: {
    education: 'Education',
    experience: 'Work experience',
    courses: 'Highlighted courses',
    languages: 'Languages',
    technologies: 'Technologies and tools',
    addExperience: 'Add experience',
    importJson: 'Import JSON',
    exportJson: 'Export JSON',
    printPdf: 'Download A4 PDF',
    profile: 'Profile',
    manageExperiences: 'Manage experiences',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
  },
} as const

function localize(locale: Locale, value: { es: string; en: string }) {
  return value[locale]
}

function ExperienceBlock({
  exp,
  locale,
  technologiesLabel,
}: {
  exp: CvData['experiences'][number]
  locale: Locale
  technologiesLabel: string
}) {
  return (
    <div className="item experience-item" key={`${exp.company.es}-${exp.period.from}`}>
      <div className="item-head">
        <strong>{localize(locale, exp.role)}</strong>
        <span>
          {exp.period.from} - {exp.period.to}
        </span>
      </div>
      <p className="meta">{localize(locale, exp.company)}</p>
      <p>{localize(locale, exp.project)}</p>
      <ul>
        {exp.bullets.map((b) => (
          <li key={b.es}>{localize(locale, b)}</li>
        ))}
      </ul>
      <p className="meta">
        {technologiesLabel}: {exp.technologies.join(' | ')}
      </p>
    </div>
  )
}

function App() {
  const [locale, setLocale] = useState<Locale>('es')
  const [cvData, setCvData] = useState<CvData>(initialCvData)
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false)
  const [photoLoadError, setPhotoLoadError] = useState(false)
  const [qrLoadError, setQrLoadError] = useState(false)
  const [editingExperienceIndex, setEditingExperienceIndex] = useState<number | null>(null)
  const [draftExperience, setDraftExperience] = useState({
    role: { es: '', en: '' },
    company: { es: '', en: '' },
    project: { es: '', en: '' },
    bullet: { es: '', en: '' },
    technologies: 'React, TypeScript',
    from: 'MM/YYYY',
    to: 'Present',
  })
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `cv-gabriel-ballester-${locale}`,
    pageStyle: '@page { size: A4; margin: 0; }',
  })

  const firstPageExperiences = useMemo(() => cvData.experiences.slice(0, 3), [cvData.experiences])
  const secondPageExperiences = useMemo(() => cvData.experiences.slice(3), [cvData.experiences])

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(cvData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cv-data-${locale}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importJson: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        const validated = cvSchema.parse(parsed)
        setCvData(validated)
      } catch {
        alert('JSON invalido para el schema de CV.')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

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
    setIsExperienceModalOpen(true)
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
    setIsExperienceModalOpen(true)
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

    setIsExperienceModalOpen(false)
  }

  return (
    <div className="app">
      <header className="toolbar no-print">
        <div className="toolbar-left">
          <button
            type="button"
            onClick={() => setLocale('es')}
            className={locale === 'es' ? 'active' : ''}
          >
            ES
          </button>
          <button
            type="button"
            onClick={() => setLocale('en')}
            className={locale === 'en' ? 'active' : ''}
          >
            EN
          </button>
        </div>
        <div className="toolbar-right">
          <button type="button" onClick={handlePrint}>
            {labels[locale].printPdf}
          </button>
          <button type="button" onClick={exportJson}>
            {labels[locale].exportJson}
          </button>
          <label className="import-label">
            {labels[locale].importJson}
            <input type="file" accept=".json" onChange={importJson} />
          </label>
        </div>
      </header>

      <main className="layout">
        <section className="paper-stack" ref={printRef}>
          <article className="a4-page">
            <div className="cv-grid">
              <aside className="cv-sidebar">
                <div className="photo-wrap">
                  {!photoLoadError ? (
                    <img
                      src="/profile-photo.jpg"
                      alt="Gabriel Ballester"
                      className="profile-photo"
                      onError={() => setPhotoLoadError(true)}
                    />
                  ) : (
                    <div className="photo-placeholder">GB</div>
                  )}
                </div>
                <h3>{labels[locale].profile}</h3>
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
                <h3>{labels[locale].languages}</h3>
                <ul className="plain-list">
                  {cvData.profile.languages.map((item) => (
                    <li key={item.es}>{localize(locale, item)}</li>
                  ))}
                </ul>
                <h3>LinkedIn QR</h3>
                <div className="qr-wrap">
                  {!qrLoadError ? (
                    <img
                      src="/linkedin-qr.png"
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
                <section>
                  <h2>{labels[locale].education}</h2>
                  {cvData.education.map((item) => (
                    <div className="item" key={item.title.es}>
                      <strong>{localize(locale, item.title)}</strong>
                      <span>
                        {item.period.from} - {item.period.to}
                      </span>
                      <p>{localize(locale, item.center)}</p>
                    </div>
                  ))}
                </section>
                <section>
                  <h2>{labels[locale].experience}</h2>
                  {firstPageExperiences.map((exp) => (
                    <ExperienceBlock
                      key={`${exp.company.es}-${exp.period.from}`}
                      exp={exp}
                      locale={locale}
                      technologiesLabel={labels[locale].technologies}
                    />
                  ))}
                </section>
                <div className="no-print section-actions">
                  <button type="button" onClick={openNewExperienceModal}>
                    {labels[locale].addExperience}
                  </button>
                  <button type="button" onClick={() => setIsExperienceModalOpen(true)}>
                    {labels[locale].manageExperiences}
                  </button>
                </div>
              </section>
            </div>
          </article>

          <article className="a4-page">
            <div className="cv-grid">
              <aside className="cv-sidebar">
                <h3>{labels[locale].courses}</h3>
                {cvData.courses.map((category) => (
                  <div key={category.name.es} className="course-category">
                    <strong>{localize(locale, category.name)}</strong>
                    {category.items.map((course) => (
                      <p key={course.title}>
                        {course.title}
                        <br />
                        {locale === 'es' ? 'Duracion' : 'Length'}: {course.length}
                      </p>
                    ))}
                  </div>
                ))}
              </aside>
              <section className="cv-content">
                <section>
                  <h2>{labels[locale].experience}</h2>
                  {secondPageExperiences.map((exp) => (
                    <ExperienceBlock
                      key={`${exp.company.es}-${exp.period.from}`}
                      exp={exp}
                      locale={locale}
                      technologiesLabel={labels[locale].technologies}
                    />
                  ))}
                </section>
              </section>
            </div>
          </article>
        </section>
      </main>

      {isExperienceModalOpen ? (
        <div className="modal-overlay no-print" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-header">
              <h3>{labels[locale].manageExperiences}</h3>
              <button type="button" onClick={() => setIsExperienceModalOpen(false)}>
                {labels[locale].close}
              </button>
            </div>

            <div className="modal-list">
              {cvData.experiences.map((exp, index) => (
                <div
                  className="modal-list-item"
                  key={`${exp.company.es}-${exp.period.from}-${index}`}
                >
                  <span>{localize(locale, exp.role)}</span>
                  <button type="button" onClick={() => openEditExperienceModal(index)}>
                    {labels[locale].edit}
                  </button>
                </div>
              ))}
            </div>

            <div className="modal-form">
              <input
                placeholder="Role ES"
                value={draftExperience.role.es}
                onChange={(e) =>
                  setDraftExperience((prev) => ({
                    ...prev,
                    role: { ...prev.role, es: e.target.value },
                  }))
                }
              />
              <input
                placeholder="Role EN"
                value={draftExperience.role.en}
                onChange={(e) =>
                  setDraftExperience((prev) => ({
                    ...prev,
                    role: { ...prev.role, en: e.target.value },
                  }))
                }
              />
              <input
                placeholder="Company ES"
                value={draftExperience.company.es}
                onChange={(e) =>
                  setDraftExperience((prev) => ({
                    ...prev,
                    company: { ...prev.company, es: e.target.value },
                  }))
                }
              />
              <input
                placeholder="Company EN"
                value={draftExperience.company.en}
                onChange={(e) =>
                  setDraftExperience((prev) => ({
                    ...prev,
                    company: { ...prev.company, en: e.target.value },
                  }))
                }
              />
              <input
                placeholder="Project ES"
                value={draftExperience.project.es}
                onChange={(e) =>
                  setDraftExperience((prev) => ({
                    ...prev,
                    project: { ...prev.project, es: e.target.value },
                  }))
                }
              />
              <input
                placeholder="Project EN"
                value={draftExperience.project.en}
                onChange={(e) =>
                  setDraftExperience((prev) => ({
                    ...prev,
                    project: { ...prev.project, en: e.target.value },
                  }))
                }
              />
              <textarea
                placeholder="Bullet ES"
                value={draftExperience.bullet.es}
                onChange={(e) =>
                  setDraftExperience((prev) => ({
                    ...prev,
                    bullet: { ...prev.bullet, es: e.target.value },
                  }))
                }
              />
              <textarea
                placeholder="Bullet EN"
                value={draftExperience.bullet.en}
                onChange={(e) =>
                  setDraftExperience((prev) => ({
                    ...prev,
                    bullet: { ...prev.bullet, en: e.target.value },
                  }))
                }
              />
              <input
                placeholder="Tech comma separated"
                value={draftExperience.technologies}
                onChange={(e) =>
                  setDraftExperience((prev) => ({
                    ...prev,
                    technologies: e.target.value,
                  }))
                }
              />
              <div className="modal-period">
                <input
                  placeholder="From MM/YYYY"
                  value={draftExperience.from}
                  onChange={(e) =>
                    setDraftExperience((prev) => ({
                      ...prev,
                      from: e.target.value,
                    }))
                  }
                />
                <input
                  placeholder="To"
                  value={draftExperience.to}
                  onChange={(e) =>
                    setDraftExperience((prev) => ({
                      ...prev,
                      to: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" onClick={saveExperience}>
                {labels[locale].save}
              </button>
              <button type="button" onClick={openNewExperienceModal}>
                {labels[locale].addExperience}
              </button>
              <button type="button" onClick={() => setIsExperienceModalOpen(false)}>
                {labels[locale].cancel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
