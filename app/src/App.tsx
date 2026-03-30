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
    darkTheme: 'Tema oscuro',
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
    darkTheme: 'Dark theme',
  },
} as const

function localize(locale: Locale, value: { es: string; en: string }) {
  return value[locale]
}

function App() {
  const [locale, setLocale] = useState<Locale>('es')
  const [darkMode, setDarkMode] = useState(false)
  const [cvData, setCvData] = useState<CvData>(initialCvData)
  const [newExpRole, setNewExpRole] = useState({ es: '', en: '' })
  const [newExpCompany, setNewExpCompany] = useState({ es: '', en: '' })
  const [newExpProject, setNewExpProject] = useState({ es: '', en: '' })
  const [newExpBullets, setNewExpBullets] = useState({ es: '', en: '' })
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

  const addExperience = () => {
    if (!newExpRole.es.trim() || !newExpRole.en.trim()) return
    setCvData((prev) => ({
      ...prev,
      experiences: [
        {
          role: { ...newExpRole },
          company: { ...newExpCompany },
          project: { ...newExpProject },
          period: { from: 'MM/YYYY', to: locale === 'es' ? 'Actualidad' : 'Present' },
          location: { es: 'España', en: 'Spain' },
          bullets: [
            {
              es: newExpBullets.es || 'Descripcion pendiente.',
              en: newExpBullets.en || 'Description pending.',
            },
          ],
          technologies: ['React', 'TypeScript'],
        },
        ...prev.experiences,
      ],
    }))
    setNewExpRole({ es: '', en: '' })
    setNewExpCompany({ es: '', en: '' })
    setNewExpProject({ es: '', en: '' })
    setNewExpBullets({ es: '', en: '' })
  }

  return (
    <div className={`app ${darkMode ? 'theme-dark' : ''}`}>
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
          <label className="theme-toggle">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
            {labels[locale].darkTheme}
          </label>
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
        <aside className="editor no-print">
          <h2>{labels[locale].addExperience}</h2>
          <input
            placeholder="Role ES"
            value={newExpRole.es}
            onChange={(e) => setNewExpRole((prev) => ({ ...prev, es: e.target.value }))}
          />
          <input
            placeholder="Role EN"
            value={newExpRole.en}
            onChange={(e) => setNewExpRole((prev) => ({ ...prev, en: e.target.value }))}
          />
          <input
            placeholder="Company ES"
            value={newExpCompany.es}
            onChange={(e) => setNewExpCompany((prev) => ({ ...prev, es: e.target.value }))}
          />
          <input
            placeholder="Company EN"
            value={newExpCompany.en}
            onChange={(e) => setNewExpCompany((prev) => ({ ...prev, en: e.target.value }))}
          />
          <input
            placeholder="Project ES"
            value={newExpProject.es}
            onChange={(e) => setNewExpProject((prev) => ({ ...prev, es: e.target.value }))}
          />
          <input
            placeholder="Project EN"
            value={newExpProject.en}
            onChange={(e) => setNewExpProject((prev) => ({ ...prev, en: e.target.value }))}
          />
          <textarea
            placeholder="Bullet ES"
            value={newExpBullets.es}
            onChange={(e) => setNewExpBullets((prev) => ({ ...prev, es: e.target.value }))}
          />
          <textarea
            placeholder="Bullet EN"
            value={newExpBullets.en}
            onChange={(e) => setNewExpBullets((prev) => ({ ...prev, en: e.target.value }))}
          />
          <button type="button" onClick={addExperience}>
            {labels[locale].addExperience}
          </button>
        </aside>

        <section className="paper-stack" ref={printRef}>
          <article className="a4-page">
            <div className="cv-grid">
              <aside className="cv-sidebar">
                <div className="photo-placeholder">GB</div>
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
              </aside>
              <section className="cv-content">
                <header className="hero">
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
                    <div
                      className="item experience-item"
                      key={`${exp.company.es}-${exp.period.from}`}
                    >
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
                        {labels[locale].technologies}: {exp.technologies.join(' | ')}
                      </p>
                    </div>
                  ))}
                </section>
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
                    <div
                      className="item experience-item"
                      key={`${exp.company.es}-${exp.period.from}`}
                    >
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
                        {labels[locale].technologies}: {exp.technologies.join(' | ')}
                      </p>
                    </div>
                  ))}
                </section>
              </section>
            </div>
          </article>
        </section>
      </main>
    </div>
  )
}

export default App
