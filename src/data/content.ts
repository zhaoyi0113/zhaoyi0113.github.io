export const profile = {
  name: 'Joey Yi Zhao',
  avatarUrl: 'https://avatars.githubusercontent.com/u/3355579?v=4&s=320',
  title: 'Tech Lead · Software Engineer',
  tagline:
    'Building serverless payments infrastructure, event-sourced systems, and high-scale APIs — with a focus on clarity, reliability, and craft.',
  location: 'Melbourne, Victoria, Australia',
  since: 2007,
  links: {
    linkedin: 'https://www.linkedin.com/in/zhaoyi0113/',
    github: 'https://github.com/zhaoyi0113',
    medium: 'https://medium.com/@zhaoyi0113',
    stackoverflow: 'https://stackexchange.com/users/7084284/zhao-yi',
    legacySite: 'https://zhaoyi0113.github.io/',
  },
}

export type Experience = {
  role: string
  company: string
  companyUrl?: string
  period: string
  location: string
  summary: string
  highlights: string[]
  stack: string[]
}

export const experience: Experience[] = [
  {
    role: 'Team Lead',
    company: 'Zeller',
    companyUrl: 'https://www.zeller.com/',
    period: 'May 2020 — Present',
    location: 'Melbourne, Australia',
    summary:
      'Leading engineering for payments, deposits, and transaction history at scale — serverless microservices on AWS.',
    highlights: [
      'Event sourcing, CQRS, and GraphQL (AppSync) for finance data; query paths over tens of millions of transactions with DynamoDB.',
      'Custom protocol over WebSocket API Gateway in Go for real-time sync between payment devices and POS.',
      'CI/CD on CodePipeline/CodeBuild; contract testing with Pact; ELK for logs, metrics, and monitoring.',
    ],
    stack: [
      'TypeScript',
      'Go',
      'AWS',
      'GraphQL',
      'AppSync',
      'Lambda',
      'DynamoDB',
      'PostgreSQL',
      'ECS',
    ],
  },
  {
    role: 'Full Stack Engineer',
    company: 'DiUS',
    companyUrl: 'https://dius.com.au/',
    period: 'Jul 2019 — Jun 2020',
    location: 'Melbourne, Australia',
    summary: 'IRESS market data distribution — migrating legacy monoliths to AWS microservices.',
    highlights: [
      'ECS Fargate, Lambda, Elasticsearch, ALB; infrastructure as code with Terraform.',
      'Services in Python and Node.js (REST and GraphQL); observability with Datadog.',
    ],
    stack: ['Python', 'Node.js', 'AWS', 'Terraform', 'Elasticsearch', 'GraphQL'],
  },
  {
    role: 'Full Stack Developer',
    company: 'IE Digital',
    period: 'Jun 2018 — Jul 2019',
    location: 'Melbourne, Australia',
    summary: 'Mobile sales experience for Australia Post.',
    highlights: [
      'Cordova Android app; React / Redux front end; Lambda and CouchDB / PouchDB on the backend.',
    ],
    stack: ['React', 'Redux', 'AWS Lambda', 'CouchDB', 'Cordova'],
  },
  {
    role: 'Full Stack Developer',
    company: 'Southbank Software',
    period: 'Nov 2016 — Jun 2018',
    location: 'Melbourne, Australia',
    summary: 'Open-source MongoDB IDE — dbKoda — and desktop tooling.',
    highlights: [
      'Electron desktop app; Node.js services; React and MobX UI with rich editing and admin features.',
    ],
    stack: ['Electron', 'Node.js', 'React', 'MobX', 'MongoDB'],
  },
  {
    role: 'Tech Lead',
    company: 'ThoughtWorks',
    companyUrl: 'https://www.thoughtworks.com/',
    period: 'Oct 2015 — Oct 2016',
    location: 'Beijing, China',
    summary: 'Delivery leadership, architecture, and engineering culture for client products.',
    highlights: [
      'Drove lean, agile, automated testing, DevOps, and cloud-based delivery practices.',
    ],
    stack: ['Java', 'Agile', 'DevOps', 'Cloud'],
  },
  {
    role: 'Senior Software Engineer',
    company: 'GE Healthcare',
    companyUrl: 'https://www.gehealthcare.com/',
    period: 'Jul 2007 — Sep 2015',
    location: 'China',
    summary: 'Healthcare imaging and clinical software — frameworks, UI, and platform engineering.',
    highlights: [
      'Java frameworks and services; UI components for clinical applications.',
      'Drools-based constraint engine for CT; DICOM imaging workflows; ClearCase multi-site sync; build and branching strategy.',
    ],
    stack: ['Java', 'DICOM', 'Drools', 'ClearCase'],
  },
]

export const skillGroups = [
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Go', 'Python', 'Java'],
  },
  {
    label: 'Cloud & data',
    items: [
      'AWS',
      'Lambda',
      'DynamoDB',
      'RDS / Aurora',
      'ECS',
      'API Gateway',
      'AppSync',
      'Elasticsearch',
    ],
  },
  {
    label: 'Architecture',
    items: [
      'Event sourcing',
      'CQRS',
      'Microservices',
      'GraphQL',
      'REST',
      'Contract testing',
      'CI/CD',
    ],
  },
  {
    label: 'Frontend & tools',
    items: ['React', 'Redux', 'Electron', 'MongoDB', 'PostgreSQL', 'Terraform'],
  },
]

export type Project = {
  name: string
  description: string
  url: string
  badge?: string
}

export const projects: Project[] = [
  {
    name: 'MongoDB Runner',
    description:
      'VS Code extension to run MongoDB and compatible databases from the editor. Custom “MongoDB Runner” language and execution flow.',
    url: 'https://marketplace.visualstudio.com/items?itemName=JoeyYiZhao.mongo-runner',
    badge: 'VS Code',
  },
  {
    name: 'dbKoda',
    description:
      'Open-source MongoDB IDE: syntax highlighting, autocomplete, explain plans, graphical query builder, and index suggestions.',
    url: 'https://dbkoda.com/',
    badge: 'Open source',
  },
  {
    name: 'mongodb-runner',
    description: 'GitHub repository for the MongoDB Runner tooling and related experiments.',
    url: 'https://github.com/zhaoyi0113/mongodb-runner',
    badge: 'GitHub',
  },
]

export type Article = {
  title: string
  url: string
  date: string
  topics: string[]
}

export const articles: Article[] = [
  {
    title:
      'How Neural Networks Learn to See: A Deep Dive Through a Handwritten Digit Classifier',
    url: 'https://medium.com/@zhaoyi0113/how-neural-networks-learn-to-see-a-deep-dive-through-a-handwritten-digit-classifier-04720fa3b07f',
    date: '2026',
    topics: ['AI', 'Python', 'Deep learning'],
  },
  {
    title: 'From 0 to 1 — AI Agent',
    url: 'https://medium.com/@zhaoyi0113/from-0-to-1-ai-agent-7a608e13fba1',
    date: '2026',
    topics: ['LLM', 'Agents'],
  },
  {
    title:
      'Unlocking the Power of Linear Regression — Diving Deeper into the World of Predictive Modeling',
    url: 'https://medium.com/@zhaoyi0113/unlocking-the-power-of-linear-regression-diving-deeper-into-the-world-of-predictive-modeling-e433490856f4',
    date: '2024',
    topics: ['ML', 'Statistics'],
  },
  {
    title: 'What is the Tech trends for 2024',
    url: 'https://medium.com/@zhaoyi0113/tech-trends-for-2024-05f096443b7c',
    date: '2024',
    topics: ['Engineering', 'Trends'],
  },
  {
    title: 'What can’t AI do — Human can',
    url: 'https://medium.com/@zhaoyi0113/what-cant-ai-do-920a70a49113',
    date: '2023',
    topics: ['AI', 'Essay'],
  },
  {
    title: 'The right way to monitor your lambdas’ runtime error',
    url: 'https://medium.com/@zhaoyi0113/the-right-way-to-monitor-your-lambdas-runtime-error-ef2dcc1709cd',
    date: '2023',
    topics: ['AWS', 'Lambda', 'Observability'],
  },
  {
    title: 'How do I migrate hundreds of small repos into one Monorepo with NX, Github Action',
    url: 'https://medium.com/@zhaoyi0113/how-do-i-migrate-hundreds-of-small-repos-into-one-monorepo-with-nx-github-action-1bb1506b9217',
    date: '2023',
    topics: ['Monorepo', 'Nx', 'CI/CD'],
  },
  {
    title: 'Understand how are addresses used for transferring in/out Smart Contract',
    url: 'https://medium.com/@zhaoyi0113/ho-to-transfer-between-different-addresses-in-smart-contract-13ec67d5e395',
    date: '2023',
    topics: ['Solidity', 'Ethereum'],
  },
  {
    title: 'Smart Contract — From beginning to a smart contract engineer',
    url: 'https://medium.com/@zhaoyi0113/smart-contract-from-beginning-to-a-smart-contract-engineer-ea3992ea7391',
    date: '2023',
    topics: ['Blockchain', 'Solidity'],
  },
  {
    title: 'The most popular Go libraries you may need in your project',
    url: 'https://medium.com/@zhaoyi0113/most-popular-go-libraries-you-may-need-in-your-project-830cd21ec7ff',
    date: '2023',
    topics: ['Go'],
  },
]

export const certifications = [
  {
    name: 'AWS Certified Security — Specialty',
    issuer: 'Amazon Web Services',
    issued: 'Feb 2020',
  },
  {
    name: 'AWS Certified Developer — Associate',
    issuer: 'Amazon Web Services',
    issued: 'Dec 2019',
  },
]

export const publications = [
  {
    title: '如何将关系型数据导入MongoDB？',
    url: 'https://www.infoq.com/cn/articles/migrate-from-rmdb-mongodb/',
  },
  {
    title: 'MongoDB的水平扩展，你做对了吗？',
    url: 'https://www.infoq.com/cn/articles/scale-out-mongodb/',
  },
  {
    title: '如何通过MongoDB自带的Explain功能提高检索性能？',
    url: 'https://www.infoq.com/cn/articles/improve-find-performance-in-mongo/',
  },
]
