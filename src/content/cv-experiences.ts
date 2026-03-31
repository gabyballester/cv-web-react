import type { CvData } from '../domain/cv-schema'
import { l, period } from './cv-content-helpers'

export const cvExperiences = [
  {
    kind: "grouped",
    company: l("CAPGEMINI", "CAPGEMINI"),
    location: l("Valencia (Remoto)", "Valencia (Remote)"),
    positions: [
      {
        role: l("Frontend React Software Engineer", "Frontend React Software Engineer"),
        project: l("Onboarding", "Onboarding"),
        client: l("Openbank", "Openbank"),
        period: period("04/2025", "Present"),
        bullets: [
          l("Inicio del proyecto sobre arquitectura Hexagonal Openbank para el proceso completo de onboarding de clientes.", "Project inception on Openbank Hexagonal Architecture for the end-to-end customer onboarding journey."),
          l("Implementación de componentes reutilizables con React, TypeScript, Styled Components y ODS Open (Storybook).", "Built reusable UI with React, TypeScript, Styled Components, and ODS Open (Storybook)."),
          l("Testing con Jest y React Testing Library para calidad y cobertura.", "Testing with Jest and React Testing Library for quality and coverage."),
          l("Participación en ceremonias ágiles y colaboración con equipo multidisciplinar (frontend, backend, QA, UX/UI, accesibilidad).", "Contributed to agile ceremonies and collaborated in a multidisciplinary squad (frontend, backend, QA, UX/UI, accessibility).")
        ],
        technologies: [
          "React",
          "TypeScript",
          "Styled Components",
          "ODS Open",
          "Storybook",
          "Hexagonal Architecture",
          "Agile",
          "Scrum",
          "Git",
          "Jest",
          "React Testing Library",
          "Jira",
          "ESLint",
          "Prettier"
        ]
      },
      {
        role: l("Frontend React Software Engineer", "Frontend React Software Engineer"),
        project: l("Planes de pensiones", "Pension plans"),
        client: l("VidaCaixa", "VidaCaixa"),
        period: period("12/2024", "04/2025"),
        bullets: [
          l("Desarrollo y mantenimiento de aplicación para cálculo de planes de pensiones en entorno crítico.", "Developed and maintained a pension-plan calculation application in a critical business context."),
          l("Análisis de código heredado y documentación para continuar el desarrollo y reducir deuda técnica.", "Legacy code analysis and documentation to unblock delivery and reduce technical debt."),
          l("Nuevas funcionalidades según PO y UX, con foco en calidad y escalabilidad.", "Delivered new capabilities with Product Owner and UX, focusing on quality and scalability."),
          l("Testing con Jest y React Testing Library; trabajo en metodología ágil.", "Testing with Jest and React Testing Library; agile delivery practices.")
        ],
        technologies: [
          "React",
          "TypeScript",
          "Redux",
          "Storybook",
          "Agile",
          "Scrum",
          "Git",
          "Jest",
          "React Testing Library",
          "Jira",
          "Bitbucket",
          "ESLint",
          "Prettier"
        ]
      }
    ]
  },
  {
    kind: "single",
    role: l("Mid React Developer", "Mid React Developer"),
    company: l("BABEL GROUP", "BABEL GROUP"),
    project: l("Banca Digital", "Digital Banking"),
    period: period("03/2023", "12/2024"),
    location: l("Málaga (Remoto)", "Málaga (Remote)"),
    bullets: [
      l("Refactorización con principios Clean Code y SOLID para migrar componentes de clase a componentes funcionales.", "Refactored the codebase with Clean Code and SOLID principles, migrating class components to functional components."),
      l("Desarrollo de nuevas funcionalidades y mejoras UI a partir de diseños de Figma y librería de componentes interna.", "Developed new features and UI improvements based on Figma designs and the internal component library."),
      l("Implementación y mantenimiento de testing automatizado con Jest, React Testing Library y Enzyme.", "Implemented and maintained automated tests with Jest, React Testing Library, and Enzyme.")
    ],
    technologies: [
      "React",
      "TypeScript",
      "Styled Components",
      "Redux",
      "Context API",
      "Jest",
      "React Testing Library",
      "Enzyme",
      "Storybook",
      "Jenkins"
    ]
  },
  {
    kind: "single",
    role: l("Junior React Developer", "Junior React Developer"),
    company: l("CLEVERPY MACHINE LEARNING - Cliente: IDRICA", "CLEVERPY MACHINE LEARNING - Client: IDRICA"),
    project: l("MVP de control de calidad de aguas residuales industriales", "MVP for industrial wastewater quality control"),
    period: period("10/2021", "03/2023"),
    location: l("Valencia (Remoto)", "Valencia (Remote)"),
    bullets: [
      l("Puesta en marcha del proyecto con arquitectura cliente y construcción del frontend para cuadros de mando técnicos.", "Kicked off the project aligned with client architecture and built frontend dashboards for technical monitoring."),
      l("Integración de Azure, Chart.js, OpenLayers, AG Grid y DevExtreme en un ecosistema React + TypeScript.", "Integrated Azure, Chart.js, OpenLayers, AG Grid, and DevExtreme in a React + TypeScript ecosystem."),
      l("Gestión de estado global con Redux y Context API para autenticación y dominios funcionales.", "Managed global state with Redux and Context API for authentication and functional domains.")
    ],
    technologies: [
      "React",
      "TypeScript",
      "Redux",
      "Context API",
      "Azure",
      "Chart.js",
      "OpenLayers",
      "AG Grid",
      "DevExtreme"
    ]
  },
  {
    kind: "single",
    role: l("Junior Backend Developer", "Junior Backend Developer"),
    company: l("TMC SPAIN - Cliente: BRICODEPOT", "TMC SPAIN - Client: BRICODEPOT"),
    project: l("MVP de cálculo de costes de transporte", "MVP for transport cost calculation"),
    period: period("01/2021", "09/2021"),
    location: l("Madrid (Remoto)", "Madrid (Remote)"),
    bullets: [
      l("Creación de microservicio SaaS API REST para cálculo de costes logísticos y reglas de negocio.", "Built a SaaS REST API microservice for logistics cost calculation and business rules."),
      l("Integración con agencias de transporte mediante servicios REST, SOAP y XML.", "Integrated with shipping agencies through REST, SOAP, and XML services."),
      l("Definición y verificación de contratos API con Postman y Swagger, junto a pruebas automatizadas con Jest.", "Defined and validated API contracts with Postman and Swagger, supported by automated tests with Jest.")
    ],
    technologies: [
      "NestJS",
      "TypeScript",
      "Postman",
      "Swagger",
      "Jest"
    ]
  },
  {
    kind: "single",
    role: l("Junior React Developer", "Junior React Developer"),
    company: l("VERES", "VERES"),
    project: l("MVP para instituciones educativas", "MVP for educational institutions"),
    period: period("11/2019", "10/2020"),
    location: l("Valencia (Remoto)", "Valencia (Remote)"),
    bullets: [
      l("Arranque de proyecto para entidades educativas con maquetación responsive basada en HTML, CSS, SASS, Grid y Flexbox.", "Started the project for educational institutions with responsive layouts using HTML, CSS, SASS, Grid, and Flexbox."),
      l("Desarrollo de panel administrativo con rutas públicas/privadas, gestión de permisos y estado global con Redux.", "Developed an admin panel with public/private routes, permission handling, and global state managed with Redux.")
    ],
    technologies: [
      "React",
      "TypeScript",
      "Redux",
      "SASS",
      "ESLint"
    ]
  },
  {
    kind: "single",
    role: l("Junior Vue Developer", "Junior Vue Developer"),
    company: l("TECNIFICA COLECTIVOS\nGestionado por GeeksHubs (Grupo Alfatec)", "TECNIFICA COLECTIVOS\nManaged by GeeksHubs (Alfatec Group)"),
    project: l("Proyecto MVP documentación y contable para autónomos", "MVP project: documentation and accounting for freelancers"),
    period: period("02/2019", "10/2019"),
    location: l("Valencia", "Valencia"),
    bullets: [
      l("Desarrollo con VueJS utilizando Docker, con sprints semanales gestionados con Trello.", "Development with VueJS using Docker, with weekly sprints managed with Trello."),
      l("Diseño y maquetación con CSS Grid, Flexbox, SASS y Bootstrap.", "Design and layout with CSS Grid, Flexbox, SASS, and Bootstrap."),
      l("Implementación de lógica basada en componentes, servicios y variables de entorno.", "Implementation of logic based on components, services, and environment variables."),
      l("Intercambio de datos con Vuex y manejo de almacenamiento local y de sesión.", "Data exchange with Vuex and handling of local and session storage.")
    ],
    technologies: [
      "Vue",
      "TypeScript",
      "CSS",
      "SASS",
      "Bootstrap",
      "Git",
      "Bitbucket",
      "Docker",
      "Trello",
      "Vuex",
      "ESLint",
      "Prettier",
      "Agile",
      "Grid",
      "Flexbox"
    ]
  },
  {
    kind: "single",
    role: l("Recepcionista bilingüe Inglés/Español", "Receptionist bilingual English/Spanish"),
    company: l("INSTITUTO CERVANTES MANCHESTER", "INSTITUTO CERVANTES MANCHESTER"),
    project: l("Departamento de recepción", "Reception department"),
    period: period("03/2017", "10/2017"),
    location: l("Manchester, Reino Unido", "Manchester, UK"),
    bullets: [],
    technologies: []
  },
  {
    kind: "single",
    role: l("Líder de equipo logístico", "Logistic team leader"),
    company: l("XPO LOGISTICS", "XPO LOGISTICS"),
    project: l("Seguimiento de línea de producción, control de calidad y KPIs.", "Production line monitoring, quality control and KPIs."),
    period: period("10/2014", "03/2017"),
    location: l("Manchester, Reino Unido", "Manchester, UK"),
    bullets: [],
    technologies: []
  },
  {
    kind: "single",
    role: l("Técnico informático Tier 1 y Tier 2", "IT Technician – 1st & 2nd line"),
    company: l("VODAFONE ESPAÑA", "VODAFONE ESPAÑA"),
    project: l("Atención al cliente.", "Customer service."),
    period: period("06/2012", "08/2014"),
    location: l("Valencia", "Valencia"),
    bullets: [],
    technologies: []
  },
  {
    kind: "single",
    role: l("Técnico informático - Propietario de Franquicia", "IT Technician (Freelance)"),
    company: l("APP INFORMÁTICA", "APP INFORMÁTICA"),
    project: l("Funciones / tareas:", "Functions/tasks:"),
    period: period("05/2004", "10/2011"),
    location: l("Sagunto (Valencia)", "Sagunto (Valencia)"),
    bullets: [
      l("Montaje, reparación de equipos, reparación, copias de seguridad y restauración.", "Assembly, equipment repair, repair, backup and restoration."),
      l("Elaboración de presupuestos a medida y ventas.", "Preparation of custom budgets, quotations and sales.")
    ],
    technologies: []
  }
] satisfies CvData['experiences']
