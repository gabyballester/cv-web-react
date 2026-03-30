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
    {
      title: {
        es: 'Administracion de Sistemas Informaticos (ASIR)',
        en: 'Computer Systems Management (ASIR)',
      },
      center: {
        es: 'IES Serpis, Valencia, España',
        en: 'IES Serpis, Valencia, Spain',
      },
      period: { from: '09/2002', to: '04/2004' },
    },
    {
      title: {
        es: 'Tecnico Superior Administrativo y Comercial (FP2)',
        en: 'Administrative and Commercial Technician (FP2)',
      },
      center: {
        es: 'IES Cabanyal, Valencia, España',
        en: 'IES Cabanyal, Valencia, Spain',
      },
      period: { from: '09/1994', to: '06/1999' },
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
      period: { from: '03/2023', to: 'Present' },
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
    {
      role: {
        es: 'Recepcionista bilingue Ingles/Español',
        en: 'Bilingual Receptionist (English/Spanish)',
      },
      company: {
        es: 'Instituto Cervantes Manchester',
        en: 'Instituto Cervantes Manchester',
      },
      project: {
        es: 'Community management y tareas de recepcion',
        en: 'Community management and front desk operations',
      },
      period: { from: '03/2017', to: '10/2017' },
      location: { es: 'Manchester, UK', en: 'Manchester, UK' },
      bullets: [
        {
          es: 'Atencion al publico y coordinacion diaria de tareas administrativas.',
          en: 'Handled customer-facing operations and daily administrative coordination.',
        },
      ],
      technologies: ['Customer Service', 'Operations'],
    },
    {
      role: { es: 'Lider de equipo logístico', en: 'Logistics Team Leader' },
      company: {
        es: 'XPO Logistics',
        en: 'XPO Logistics',
      },
      project: {
        es: 'Supervision de linea de produccion y KPIs',
        en: 'Production line supervision and KPI tracking',
      },
      period: { from: '10/2014', to: '03/2017' },
      location: { es: 'Manchester, UK', en: 'Manchester, UK' },
      bullets: [
        {
          es: 'Control de calidad, rendimiento y coordinacion operativa.',
          en: 'Oversaw quality control, throughput, and operational coordination.',
        },
      ],
      technologies: ['KPIs', 'Team Leadership', 'Operations'],
    },
    {
      role: { es: 'Tecnico informatico Tier 1 y Tier 2', en: 'IT Technician (Tier 1 and Tier 2)' },
      company: {
        es: 'Vodafone España',
        en: 'Vodafone Spain',
      },
      project: {
        es: 'Soporte tecnico y atencion al cliente',
        en: 'Technical support and customer service',
      },
      period: { from: '06/2012', to: '08/2014' },
      location: { es: 'España', en: 'Spain' },
      bullets: [
        {
          es: 'Resolucion de incidencias y soporte tecnico en distintos niveles.',
          en: 'Resolved incidents and delivered multi-level technical support.',
        },
      ],
      technologies: ['Support', 'Incident Management'],
    },
    {
      role: {
        es: 'Tecnico informatico (Franquicia propia)',
        en: 'IT Technician (Franchise Owner)',
      },
      company: {
        es: 'APP Informatica',
        en: 'APP Informática',
      },
      project: {
        es: 'Servicios de reparacion, backup y ventas',
        en: 'Repair services, backups, and sales',
      },
      period: { from: '05/2004', to: '10/2011' },
      location: { es: 'España', en: 'Spain' },
      bullets: [
        {
          es: 'Montaje y reparacion de equipos, copias de seguridad y restauraciones.',
          en: 'Performed PC assembly and repair, backups, and restorations.',
        },
        {
          es: 'Elaboracion de presupuestos a medida y ventas.',
          en: 'Prepared tailored quotes and managed sales.',
        },
      ],
      technologies: ['Hardware', 'Backups', 'Sales'],
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
        {
          title: 'React PRO: Lleva tus bases al siguiente nivel',
          length: '27h',
          author: 'Fernando Herrera',
        },
        {
          title: 'React - La Guia Completa: Hooks Context Redux MERN +15 Apps',
          length: '67h',
          author: 'Juan Pablo De La Torre Valdez',
        },
        {
          title: 'Web Personal MERN Full Stack: MongoDB, Express, React y Node',
          length: '34h',
          author: 'Agustin Navarro Galdon',
        },
        {
          title: 'React and NestJS: A Practical Guide with Docker',
          length: '7h',
          author: 'Antonio Papa',
        },
      ],
    },
    {
      name: { es: 'React Native', en: 'React Native' },
      items: [
        {
          title: 'React Native - The Practical Guide [2022]',
          length: '29h',
          author: 'Maximillian Schwarzmüller',
        },
        {
          title: 'React Native: Aplicaciones nativas para iOS y Android',
          length: '44h',
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
        {
          title: 'CSS - The Complete Guide (Flexbox, Grid & SASS)',
          length: '22h',
          author: 'Maximillian Schwarzmüller',
        },
        {
          title: 'Master NestJS - The JavaScript Node.js Framework',
          length: '8h',
          author: 'Piotr Jura',
        },
      ],
    },
  ],
}
