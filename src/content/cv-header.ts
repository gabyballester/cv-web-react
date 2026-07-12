import type { CvData } from '../domain/cv-schema'
import { l } from './cv-content-helpers'

export const cvHeader = {
  name: "Gabriel Ballester Morant",
  roleTag: "Frontend React Software Engineer",
  frontendCareerSince: "02/2019",
  city: "Valencia, Spain",
  phone: "692653170",
  email: "gaby.ballester@gmail.com",
  linkedin: "linkedin.com/in/gabyballester",
  quotes: [
    l("Enfrento los retos como oportunidades de aprender y crecer profesionalmente.", "I treat challenges as opportunities to learn and grow professionally."),
    l("Perfil polivalente, trabajo metódico y orientación a resultados.", "Versatile profile, methodical work, and a results-driven mindset."),
    l("Determinación constante para cumplir objetivos individuales y de equipo.", "Consistent determination to meet both individual and team goals.")
  ],
  skillHighlights: [
    {
      label: l("JavaScript", "JavaScript"),
      tenureKey: "javascriptProduct",
      icon: "javascript"
    },
    {
      label: l("React", "React"),
      tenureKey: "react",
      icon: "react"
    },
    {
      label: l("TypeScript", "TypeScript"),
      tenureKey: "typescript",
      icon: "typescript"
    },
    {
      label: l("Redux · Context API", "Redux · Context API"),
      tenureKey: "stateManagement",
      icon: "state"
    },
    {
      label: l("Testing (Jest · RTL)", "Testing (Jest · RTL)"),
      tenureKey: "testingFrontend",
      icon: "testing"
    },
    {
      label: l("Git · Bitbucket · Jenkins", "Git · Bitbucket · Jenkins"),
      tenureKey: "gitWorkflow",
      icon: "git"
    },
    {
      label: l("APIs REST (NestJS)", "REST APIs (NestJS)"),
      tenureKey: "restApis",
      icon: "api"
    },
    {
      label: l("Storybook · Styled Components", "Storybook · Styled Components"),
      tenureKey: "designSystems",
      icon: "uiSystems"
    },
    {
      label: l("Agile · Scrum", "Agile · Scrum"),
      tenureKey: "scrumDelivery",
      icon: "agile"
    }
  ],
  languages: [
    l("Inglés C1 (Trinity)", "English C1 (Trinity)"),
    l("Valencià C1 (JQCV)", "Valencian C1 (JQCV)"),
    l("Francés B1 (MCER)", "French B1 (MCER)"),
    l("Alemán A1 (EOI)", "German A1 (EOI)")
  ]
} satisfies CvData['header']
