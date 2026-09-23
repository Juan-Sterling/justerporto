/**
 * Skills & Technical Capabilities Data Model
 * Organizes Juan's 36 technical capabilities into 4 core architecture categories
 * with stack roles and categorized metadata.
 */

export const SKILL_CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend',
    tagline: 'Client Architecture & UI Systems',
    description: 'Modern user interfaces, responsive design systems, single-page applications, and interactive experiences.',
  },
  {
    id: 'backend',
    label: 'Backend',
    tagline: 'Server Architecture & APIs',
    description: 'Enterprise server logic, RESTful API design, MVC frameworks, multiplatform runtimes, and business workflows.',
  },
  {
    id: 'database',
    label: 'Database',
    tagline: 'Relational & Cloud Datastores',
    description: 'Relational data modeling, complex query optimization, migrations, and modern realtime cloud backends.',
  },
  {
    id: 'tools',
    label: 'Tools & DevOps',
    tagline: 'Workflow, Infrastructure & Cloud',
    description: 'Distributed version control, containerized deployment, CI/CD pipelines, cloud platforms, and engineering toolchains.',
  },
];

export const SKILLS_DATA = [
  // ================= FRONTEND =================
  {
    id: 'react',
    name: 'React.js',
    category: 'frontend',
    role: 'Component architecture, SPA development, custom hooks & reactive UI state.',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    role: 'Server-side rendering, static site generation, API routing & production React optimization.',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    role: 'Core language for client-side interactivity, asynchronous async/await pipelines & DOM control.',
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'frontend',
    role: 'Semantic web structuring, accessibility fundamentals & modern browser APIs.',
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'frontend',
    role: 'Modern responsive layouts, Flexbox, Grid, transitions & CSS animations.',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    role: 'Utility-first CSS styling, responsive design tokens & sleek modern interfaces.',
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    category: 'frontend',
    role: 'Responsive enterprise grid layouts, UI components & client dashboard workflows.',
  },
  {
    id: 'jquery',
    name: 'jQuery',
    category: 'frontend',
    role: 'Client-side scripting, event handling & AJAX integrations in legacy architectures.',
  },

  // ================= BACKEND =================
  {
    id: 'laravel',
    name: 'Laravel',
    category: 'backend',
    role: 'Primary enterprise PHP framework for MVC architecture, Eloquent ORM & secure REST APIs.',
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'backend',
    role: 'Server-side application logic, backend scripting & enterprise web system development.',
  },
  {
    id: 'symfony',
    name: 'Symfony',
    category: 'backend',
    role: 'Modular PHP components, enterprise backend patterns & decoupled services.',
  },
  {
    id: 'rest-api',
    name: 'REST API',
    category: 'backend',
    role: 'Standardized HTTP endpoints, JSON data exchange & decoupling client/server systems.',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    role: 'Data processing, backend automation, API services & enterprise ERP integration.',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    role: 'JavaScript backend runtime, asynchronous event-driven services & microservice APIs.',
  },
  {
    id: 'odoo',
    name: 'Odoo',
    category: 'backend',
    role: 'Open-source ERP customization, business module development & PostgreSQL data flows.',
  },
  {
    id: 'java',
    name: 'Java',
    category: 'backend',
    role: 'Strongly typed object-oriented backend programming & foundational Android development.',
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    category: 'backend',
    role: 'Modern expressive native Android application programming with coroutines.',
  },
  {
    id: 'dart',
    name: 'Dart',
    category: 'backend',
    role: 'Client-optimized programming language for building performant multiplatform mobile apps.',
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'backend',
    role: 'Cross-platform native mobile application framework for iOS and Android with single codebase.',
  },

  // ================= DATABASE =================
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    role: 'Advanced open-source relational database with robust indexing, JSONB & complex queries.',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'database',
    role: 'High-performance relational database for dynamic web applications & data persistence.',
  },
  {
    id: 'sql-server',
    name: 'SQL Server',
    category: 'database',
    role: 'Microsoft enterprise relational database management with T-SQL procedures & reporting.',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'database',
    role: 'Open-source Firebase alternative featuring realtime PostgreSQL, auth & storage.',
  },
  {
    id: 'firebase',
    name: 'Firebase',
    category: 'database',
    role: 'Google cloud BaaS for real-time mobile/web databases, analytics & authentication.',
  },

  // ================= TOOLS & DEVOPS =================
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    role: 'Distributed version control, branch management, merge conflict resolution & team collaboration.',
  },
  {
    id: 'github',
    name: 'Github',
    category: 'tools',
    role: 'Code repository hosting, pull request reviews, actions & open-source projects.',
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    category: 'tools',
    role: 'Enterprise DevOps lifecycle management, automated CI/CD pipelines & issue tracking.',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'tools',
    role: 'Application containerization, reproducible development stacks & multi-container compose.',
  },
  {
    id: 'linux',
    name: 'Linux',
    category: 'tools',
    role: 'Unix terminal environment, bash command line scripting & production server management.',
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'tools',
    role: 'Comprehensive API testing, request payload inspection & endpoint documentation.',
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'tools',
    role: 'Primary integrated development environment with debugging, linting & Git tooling.',
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'tools',
    role: 'Collaborative UI/UX prototyping, design systems inspection & pixel-accurate frontend translation.',
  },
  {
    id: 'jira',
    name: 'Jira',
    category: 'tools',
    role: 'Agile sprint planning, backlog grooming, ticket tracking & team project delivery.',
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'tools',
    role: 'Cloud infrastructure services, EC2 hosting, S3 cloud storage & server scaling.',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'tools',
    role: 'Edge-network deployment for React and Next.js applications with preview environments.',
  },
  {
    id: 'netlify',
    name: 'Netlify',
    category: 'tools',
    role: 'Serverless web deployment, continuous integration & modern web hosting platform.',
  },
  {
    id: 'cloudinary',
    name: 'Cloudinary',
    category: 'tools',
    role: 'End-to-end cloud image & video optimization, asset transformation & fast CDN delivery.',
  },
];
