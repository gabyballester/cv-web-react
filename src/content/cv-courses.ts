import type { CvData } from '../domain/cv-schema'
import { l } from './cv-content-helpers'

export const cvCourses = [
  {
    name: l("React", "React"),
    items: [
      {
        title: "React - The Complete Guide (incl. Hooks, React Router, Redux)",
        length: "48h",
        author: "Maximillian Schwarzmüller"
      },
      {
        title: "React: De cero a experto (Hooks y MERN)",
        length: "49h",
        author: "Fernando Herrera"
      },
      {
        title: "React PRO: Lleva tus bases al siguiente nivel",
        length: "27h",
        author: "Fernando Herrera"
      },
      {
        title: "React - La Guia Completa: Hooks Context Redux MERN +15 Apps",
        length: "67h",
        author: "Juan Pablo De La Torre Valdez"
      },
      {
        title: "Web Personal MERN Full Stack: MongoDB, Express, React y Node",
        length: "34h",
        author: "Agustin Navarro Galdon"
      },
      {
        title: "React and NestJS: A Practical Guide with Docker",
        length: "7h",
        author: "Antonio Papa"
      }
    ]
  },
  {
    name: l("React Native", "React Native"),
    items: [
      {
        title: "React Native - The Practical Guide [2022]",
        length: "29h",
        author: "Maximillian Schwarzmüller"
      },
      {
        title: "React Native: Aplicaciones nativas para iOS y Android",
        length: "44h",
        author: "Fernando Herrera"
      }
    ]
  },
  {
    name: l("Otros", "Others"),
    items: [
      {
        title: "NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)",
        length: "41h",
        author: "Maximillian Schwarzmüller"
      },
      {
        title: "CSS - The Complete Guide (Flexbox, Grid & SASS)",
        length: "22h",
        author: "Maximillian Schwarzmüller"
      },
      {
        title: "Master NestJS - The JavaScript Node.js Framework",
        length: "8h",
        author: "Piotr Jura"
      }
    ]
  }
] satisfies CvData['courses']
