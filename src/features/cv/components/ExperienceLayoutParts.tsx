import type { ExperiencePosition, Locale } from '../../../domain/cv-schema'
import { localize, localizePeriodToken } from '../../../shared/locale-utils'

type LocalizedLine = { es: string; en: string }

type RoleDatesProps = {
  role: string
  periodFrom: string
  periodTo: string
  locale: Locale
}

/** Top line: role (bold) + date range (italic/right in flow). */
export function ExperienceRoleDatesRow({ role, periodFrom, periodTo, locale }: RoleDatesProps) {
  return (
    <div className="item-head">
      <strong>{role}</strong>
      <span>
        {periodFrom} - {localizePeriodToken(locale, periodTo)}
      </span>
    </div>
  )
}

type CompanyLineProps = {
  text: string
  className?: string
}

/** Company / client line — same visual weight for single and grouped entries. */
export function ExperienceCompanyLine({
  text,
  className = 'meta experience-company',
}: CompanyLineProps) {
  return <p className={className}>{text}</p>
}

/** Company left, location right (e.g. *Capgemini* … *Valencia · Remoto*) — one line. */
export function ExperienceCompanyLocationRow({
  companyText,
  locationText,
}: {
  companyText: string
  locationText: string
}) {
  const loc = locationText.trim()
  if (!loc) {
    return <ExperienceCompanyLine text={companyText} />
  }
  return (
    <div className="experience-company-location-row">
      <span className="experience-company experience-company--lead">{companyText}</span>
      <span className="experience-location experience-location--trail">{loc}</span>
    </div>
  )
}

type ProjectLineProps = {
  text: string
  projectLabel: string
  clientLabel: string
  clientText?: string
  showProjectLabel?: boolean
  tight?: boolean
}

export function ExperienceProjectLine({
  text,
  projectLabel,
  clientLabel,
  clientText,
  showProjectLabel = true,
  tight,
}: ProjectLineProps) {
  const cls = tight
    ? 'experience-project-line experience-project-line--tight'
    : 'experience-project-line'
  const client = clientText?.trim() ?? ''
  const left = showProjectLabel ? `${projectLabel}: ${text}` : text
  const inlineProjectClient = client
    ? `${left} - ${clientLabel}: ${client.toUpperCase()}`
    : left
  return <p className={cls}>{inlineProjectClient}</p>
}

type BulletsProps = {
  items: LocalizedLine[]
  locale: Locale
}

export function ExperienceBulletList({ items, locale }: BulletsProps) {
  if (items.length === 0) return null
  return (
    <ul>
      {items.map((b) => (
        <li key={b.es}>{localize(locale, b)}</li>
      ))}
    </ul>
  )
}

type TechProps = {
  technologiesLabel: string
  technologies: string[]
}

export function ExperienceTechnologiesLine({ technologiesLabel, technologies }: TechProps) {
  if (technologies.length === 0) return null
  return (
    <p className="meta">
      {technologiesLabel}: {technologies.join(' | ')}
    </p>
  )
}

type GroupProjectRowProps = {
  projectText: string
  projectLabel: string
  clientLabel: string
  clientText?: string
  periodFrom: string
  periodTo: string
  locale: Locale
  tight?: boolean
}

/** Grouped experience: project title + per-position dates on one row. */
export function ExperienceGroupProjectDatesRow({
  projectText,
  projectLabel,
  clientLabel,
  clientText,
  periodFrom,
  periodTo,
  locale,
  tight,
}: GroupProjectRowProps) {
  const pClass = tight
    ? 'experience-group-project experience-group-project--tight'
    : 'experience-group-project'
  const client = clientText?.trim() ?? ''
  const inlineProjectClient = client
    ? `${projectLabel}: ${projectText} - ${clientLabel}: ${client.toUpperCase()}`
    : `${projectLabel}: ${projectText}`
  return (
    <div className="item-head experience-group-project-row">
      <p className={pClass}>{inlineProjectClient}</p>
      <span>
        {periodFrom} - {localizePeriodToken(locale, periodTo)}
      </span>
    </div>
  )
}

type GroupDatesOnlyProps = {
  periodFrom: string
  periodTo: string
  locale: Locale
}

/** Grouped position with no project label: keeps date alignment with other rows. */
export function ExperienceGroupDatesOnlyRow({ periodFrom, periodTo, locale }: GroupDatesOnlyProps) {
  return (
    <div className="item-head experience-group-project-row">
      <p className="experience-group-project experience-group-project--tight">&nbsp;</p>
      <span>
        {periodFrom} - {localizePeriodToken(locale, periodTo)}
      </span>
    </div>
  )
}

type GroupHeaderProps = {
  role: string
  periodFrom: string
  periodTo: string
  locale: Locale
  companyText: string
  locationText: string
}

export function ExperienceGroupHeader({
  role,
  periodFrom,
  periodTo,
  locale,
  companyText,
  locationText,
}: GroupHeaderProps) {
  return (
    <div className="experience-group-header experience-group-header--tight">
      <ExperienceRoleDatesRow
        role={role}
        periodFrom={periodFrom}
        periodTo={periodTo}
        locale={locale}
      />
      <ExperienceCompanyLocationRow companyText={companyText} locationText={locationText} />
    </div>
  )
}

type GroupPositionBodyProps = {
  pos: ExperiencePosition
  locale: Locale
  technologiesLabel: string
  projectText: string
  projectLabel: string
  clientLabel: string
  clientText?: string
  rowCompact: boolean
}

/** One position inside a grouped company: rail (dot + short join) + project + details. */
export function ExperienceGroupPositionBody({
  pos,
  locale,
  technologiesLabel,
  projectText,
  projectLabel,
  clientLabel,
  clientText,
  rowCompact,
}: GroupPositionBodyProps) {
  const projectBlock = projectText ? (
    <ExperienceGroupProjectDatesRow
      projectText={projectText}
      projectLabel={projectLabel}
      clientLabel={clientLabel}
      clientText={clientText}
      periodFrom={pos.period.from}
      periodTo={pos.period.to}
      locale={locale}
      tight={rowCompact}
    />
  ) : (
    <ExperienceGroupDatesOnlyRow
      periodFrom={pos.period.from}
      periodTo={pos.period.to}
      locale={locale}
    />
  )

  return (
    <div className="experience-group-body-stack">
      <div className="experience-group-body-topline">
        <div className="experience-group-rail" aria-hidden="true">
          <span className="experience-group-rail-dot" />
        </div>
        <div className="experience-group-body-project-wrap">{projectBlock}</div>
      </div>
      <div className="experience-group-body-below">
        <ExperienceBulletList items={pos.bullets} locale={locale} />
        <ExperienceTechnologiesLine
          technologiesLabel={technologiesLabel}
          technologies={pos.technologies}
        />
      </div>
    </div>
  )
}
