import type { CvData } from './cvSchema'

export const initialCvData: CvData = {
  profile: {
    name: 'Gabriel Ballester Morant',
    roleTag: '<Mid React Developer/>',
    city: 'Valencia, Spain',
    phone: '692653170',
    email: 'gaby.ballester@gmail.com',
    linkedin: 'linkedin.com/in/gabyballester',
    quotes: [
      {
        es: 'Afronto los retos como una oportunidad de crecimiento.',
        en: 'I embrace challenges as opportunities to grow.',
      },
      {
        es: 'Polivalente y metódico.',
        en: 'Versatile and methodical in my approach.',
      },
      {
        es: 'Mi determinación ha sido clave para alcanzar mis objetivos.',
        en: 'Determination has been pivotal in achieving my objectives.',
      },
    ],
    languages: [
      { es: 'Inglés C1 (Trinity)', en: 'English C1 (Trinity)' },
      { es: 'Valencià C1 (JQCV)', en: 'Valencian C1 (JQCV)' },
      { es: 'Francés B1 (MCER)', en: 'French B1 (MCER)' },
      { es: 'Alemán A1 (EOI)', en: 'German A1 (EOI)' },
    ],
  },
  education: [
    {
      title: {
        es: 'Bootcamp Full Stack JavaScript Developer',
        en: 'Bootcamp Full Stack JavaScript Developer',
      },
      center: {
        es: 'Geekshubs Academy (Grupo Alfatec), Valencia, España',
        en: 'Geekshubs Academy (Grupo Alfatec), Valencia, Spain',
      },
      period: { from: '10/2018', to: '01/2019' },
    },
    {
      title: {
        es: 'Certificado de Profesionalidad (DAW)',
        en: 'Professional Certificate (DAW)',
      },
      center: {
        es: 'AULA CAMPUS, Burjassot (Valencia), España',
        en: 'AULA CAMPUS, Burjassot (Valencia), Spain',
      },
      period: { from: '01/2018', to: '07/2018' },
    },
  ],
  experiences: [
    {
      role: { es: 'Mid React Developer', en: 'Mid React Developer' },
      company: {
        es: 'BABEL GROUP - Cliente: Unicaja',
        en: 'BABEL GROUP - Client: Unicaja',
      },
      project: { es: 'Proyecto: Banca Digital', en: 'Project: Digital Banking' },
      period: { from: '03/2023', to: 'Actualidad / Present' },
      location: { es: 'España', en: 'Spain' },
      bullets: [
        {
          es: 'Refactorización con Clean Code y SOLID para migrar componentes de clase a funcionales y mejorar escalabilidad.',
          en: 'Refactored codebase with Clean Code and SOLID principles to migrate class components to functional components and improve scalability.',
        },
        {
          es: 'Implementación de diseños de Figma respetando la funcionalidad existente.',
          en: 'Implemented Figma designs while preserving existing functionality.',
        },
        {
          es: 'Testing con Jest, React Testing Library y Enzyme.',
          en: 'Implemented testing with Jest, React Testing Library, and Enzyme.',
        },
      ],
      technologies: [
        'React',
        'TypeScript',
        'Styled Components',
        'Redux',
        'Context API',
        'Jest',
        'Storybook',
        'Jenkins',
      ],
    },
    {
      role: { es: 'Junior React Developer', en: 'Junior React Developer' },
      company: {
        es: 'CLEVERPY MACHINE LEARNING - Cliente: Idrica',
        en: 'CLEVERPY MACHINE LEARNING - Client: Idrica',
      },
      project: {
        es: 'MVP de control de calidad de aguas residuales industriales',
        en: 'MVP for industrial wastewater quality control',
      },
      period: { from: '10/2021', to: '03/2023' },
      location: { es: 'España', en: 'Spain' },
      bullets: [
        {
          es: 'Puesta en marcha del proyecto alineado con arquitectura de cliente.',
          en: 'Kicked off the project aligned with client architecture guidelines.',
        },
        {
          es: 'Integración de Azure, Chart.js, OpenLayers, AG Grid y DevExtreme en un entorno React.',
          en: 'Integrated Azure, Chart.js, OpenLayers, AG Grid, and DevExtreme in a React environment.',
        },
      ],
      technologies: ['React', 'TypeScript', 'Redux', 'Azure', 'Chart.js', 'OpenLayers', 'AG Grid'],
    },
    {
      role: { es: 'Junior Backend Developer', en: 'Junior Backend Developer' },
      company: {
        es: 'TMC SPAIN - Cliente: Bricodepot',
        en: 'TMC SPAIN - Client: Bricodepot',
      },
      project: {
        es: 'MVP de cálculo de costes de transporte',
        en: 'MVP for transport cost calculation',
      },
      period: { from: '01/2021', to: '09/2021' },
      location: { es: 'España', en: 'Spain' },
      bullets: [
        {
          es: 'Creación de microservicio SaaS API REST para cálculo de costes.',
          en: 'Created a SaaS REST API microservice for cost calculation.',
        },
        {
          es: 'Integración con agencias mediante servicios REST, SOAP y XML.',
          en: 'Integrated with logistics agencies through REST, SOAP, and XML services.',
        },
      ],
      technologies: ['NestJS', 'TypeScript', 'Postman', 'Swagger', 'Jest'],
    },
    {
      role: { es: 'Junior React Developer', en: 'Junior React Developer' },
      company: { es: 'VERES', en: 'VERES' },
      project: {
        es: 'PoC y MVP para instituciones educativas',
        en: 'PoC and MVP for educational institutions',
      },
      period: { from: '11/2019', to: '10/2020' },
      location: { es: 'España', en: 'Spain' },
      bullets: [
        {
          es: 'Desarrollo de panel administrativo con rutas públicas y privadas.',
          en: 'Developed an administration panel with public and private routes.',
        },
      ],
      technologies: ['React', 'TypeScript', 'Redux', 'SASS', 'ESLint'],
    },
    {
      role: { es: 'Junior Vue Developer', en: 'Junior Vue Developer' },
      company: {
        es: 'TECNICOO (Gestionado por GeeksHubs)',
        en: 'TECNICOO (Managed by GeeksHubs)',
      },
      project: {
        es: 'MVP documental y contable para autónomos',
        en: 'MVP for documentation and accounting for freelancers',
      },
      period: { from: '02/2019', to: '10/2019' },
      location: { es: 'España', en: 'Spain' },
      bullets: [
        {
          es: 'Desarrollo en VueJS con Docker y metodología ágil semanal.',
          en: 'Developed in VueJS with Docker and weekly agile sprints.',
        },
      ],
      technologies: ['Vue', 'TypeScript', 'Vuex', 'Docker', 'Bootstrap'],
    },
  ],
  courses: [
    {
      name: { es: 'React', en: 'React' },
      items: [
        {
          title: 'React - The Complete Guide (incl. Hooks, React Router, Redux)',
          length: '48h',
          author: 'Maximillian Schwarzmüller',
        },
        {
          title: 'React: De cero a experto (Hooks y MERN)',
          length: '49h',
          author: 'Fernando Herrera',
        },
      ],
    },
    {
      name: { es: 'Otros', en: 'Others' },
      items: [
        {
          title: 'NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)',
          length: '41h',
          author: 'Maximillian Schwarzmüller',
        },
      ],
    },
  ],
}
