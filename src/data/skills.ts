export type SkillCategory = {
  category: string
  color: string
  icon: string
  items: string[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Backend',
    color: 'cyan',
    icon: '⚙️',
    items: [
      'C#',
      'ASP.NET Core MVC',
      'ASP.NET Core Web API',
      'Entity Framework Core',
      'LINQ',
      'RESTful API',
      'N-Tier Architecture',
      'Repository Pattern',
      'Unit of Work',
      'DTO Pattern',
      'Validation',
      'Middleware',
    ],
  },
  {
    category: 'Database',
    color: 'indigo',
    icon: '🗄️',
    items: [
      'SQL Server',
      'SQLite',
      'EF Core Migrations',
      'Relational DB Design',
      'Stored Procedures',
      'Database Optimization',
    ],
  },
  {
    category: 'Frontend',
    color: 'violet',
    icon: '🎨',
    items: [
      'HTML',
      'CSS',
      'JavaScript',
      'Bootstrap',
      'Tailwind CSS',
      'Responsive UI',
      'Dashboard UI',
      'SweetAlert2',
      'Data Tables',
      'Chart.js',
    ],
  },
  {
    category: 'Tools & DevOps',
    color: 'emerald',
    icon: '🔧',
    items: [
      'Git',
      'GitHub',
      'Visual Studio',
      'VS Code',
      'Swagger / OpenAPI',
      'Postman',
      'IIS',
      'Docker (Temel)',
    ],
  },
  {
    category: 'AI & Otomasyon',
    color: 'amber',
    icon: '🤖',
    items: [
      'AI destekli geliştirme',
      'Claude Code',
      'ChatGPT',
      'n8n (Temel)',
      'Prompt Engineering',
      'Otomasyon akışları',
    ],
  },
]
