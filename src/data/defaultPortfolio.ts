import type { PortfolioData } from '../types/portfolio';

export const DEFAULT_PORTFOLIO: PortfolioData = {
  profile: {
    name: 'Gobika S.',
    role: 'Aspiring Software Developer | Java Developer | Computer Science Student',
    headline: 'Building Ideas Into Intelligent Digital Experiences.',
    intro:
      "I'm a passionate Computer Science student who enjoys exploring technology, solving problems, and building meaningful projects. Currently strengthening my programming skills and exploring the world of software development.",
    typingRoles: [
      'Java Developer',
      'Aspiring Software Engineer',
      'Problem Solver',
      'Tech Enthusiast',
    ],
    portraitUrl: '/src/assets/images/gobika_profile_portrait_1794822393177.jpg',
    aboutParagraphs: [
      'I am an undergraduate Computer Science and Data Science student dedicated to turning analytical concepts and clean logic into dependable software.',
      'My academic focus bridges software engineering fundamentals with data-driven inquiry—from writing structured Java and Python programs to querying relational datasets in Oracle Database and exploring computer vision research.',
      'I approach every challenge with a continuous learning mindset, strengthening my core algorithms, version-control discipline, and engineering craft to build practical, real-world applications.',
    ],
    aboutFocusAreas: [
      {
        title: 'Software Engineering Craft',
        detail: 'Building modular, readable solutions in Java and Python with clear problem decomposition.',
      },
      {
        title: 'Data & Vision Exploration',
        detail: 'Applying deep learning models and structured SQL workflows to interpret complex patterns.',
      },
      {
        title: 'Continuous Growth',
        detail: 'Actively expanding hands-on fluency across databases, Git workflows, and practical applications.',
      },
    ],
  },
  skills: [
    { id: 'skill-java', name: 'Java', category: 'Programming', level: null, note: 'Core language' },
    { id: 'skill-python', name: 'Python', category: 'Programming', level: null, note: 'Data & scripting' },
    { id: 'skill-sql', name: 'SQL', category: 'Programming', level: null, note: 'Relational querying' },
    { id: 'skill-oracle', name: 'Oracle Database', category: 'Database', level: null, note: 'RDBMS & schema design' },
    { id: 'skill-git', name: 'Git', category: 'Tools', level: null, note: 'Version control' },
    { id: 'skill-github', name: 'GitHub', category: 'Tools', level: null, note: 'Collaboration & hosting' },
    { id: 'skill-vscode', name: 'VS Code', category: 'Tools', level: null, note: 'Primary IDE' },
    { id: 'skill-jupyter', name: 'Jupyter Notebook', category: 'Tools', level: null, note: 'Interactive data science' },
  ],
  projects: [
    {
      id: 'proj-crowd-density',
      title: 'AI-Based Crowd Density and Stampede Risk Prediction System',
      description:
        'An AI-based research project focused on estimating crowd density, monitoring crowd movement patterns, and identifying potential stampede risks using computer vision techniques.',
      technologies: ['Python', 'Deep Learning', 'CSRNet', 'Computer Vision'],
      categoryLabel: 'Computer Vision Research',
      statusLabel: 'Research Project',
      githubUrl: '',
      imageUrl: '/src/assets/images/project_crowd_density_1794822394357.jpg',
      isEditableTemplate: false,
      highlights: [
        'Density map estimation using Congested Scene Recognition (CSRNet) convolutional architecture.',
        'Frame-level crowd distribution analysis aimed at detecting high-congestion risk zones early.',
        'Built in Python with modular experimentation workflows for visual evaluation.',
      ],
    },
    {
      id: 'proj-java-upcoming',
      title: 'Java Application Project (Editable Slot)',
      description:
        'Reserved workspace for upcoming object-oriented Java applications—covering backend logic, data structures, or desktop/web utilities. Click Customize to add your title, summary, and repository link when ready.',
      technologies: ['Java', 'OOP', 'Data Structures'],
      categoryLabel: 'Software Engineering',
      statusLabel: 'Planned · Editable',
      githubUrl: '',
      isEditableTemplate: true,
      highlights: [
        'Designed for future Java coursework or independent software builds.',
        'Edit title, description, stack tags, and GitHub link anytime.',
      ],
    },
    {
      id: 'proj-db-upcoming',
      title: 'Database & Software Development Project (Editable Slot)',
      description:
        'Reserved workspace for upcoming relational database systems with Oracle Database / SQL or full-stack software development builds. Customize this card as your next project progresses.',
      technologies: ['SQL', 'Oracle Database', 'Software Development'],
      categoryLabel: 'Database & Systems',
      statusLabel: 'Planned · Editable',
      githubUrl: '',
      isEditableTemplate: true,
      highlights: [
        'Structured placeholder for schema design, querying, or full-stack applications.',
        'Zero fabricated links—add your repository URL once published.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-ug',
      degree: 'Computer Science / Data Science',
      institution: '[Add College Name]',
      status: 'Undergraduate Student – Second Year',
      graduationYear: '[Add Graduation Year]',
      notes: 'Focusing on core computer science foundations, Java & Python programming, relational databases, and applied data science.',
    },
  ],
  achievements: [
    {
      id: 'ach-cert',
      category: 'Technical Certifications',
      title: '[Add Technical Certification]',
      issuer: '[Issuing Organization]',
      date: '[Year]',
      description: 'Add verified coursework or technical certifications in Java, Python, SQL, or Data Science here.',
      isPlaceholder: true,
    },
    {
      id: 'ach-workshop',
      category: 'Workshops',
      title: '[Add Workshop Attended]',
      issuer: '[Host / Institution]',
      date: '[Year]',
      description: 'Record hands-on technical workshops, bootcamps, or developer seminars you have completed.',
      isPlaceholder: true,
    },
    {
      id: 'ach-hackathon',
      category: 'Hackathons',
      title: '[Add Hackathon Participation]',
      issuer: '[Event Name]',
      date: '[Year]',
      description: 'Document hackathon builds, problem statements tackled, and team contributions.',
      isPlaceholder: true,
    },
    {
      id: 'ach-research',
      category: 'Research Paper Publications',
      title: '[Add Research Paper or Preprint]',
      issuer: '[Journal / Conference]',
      date: '[Year]',
      description: 'List published papers, conference presentations, or academic research documentation.',
      isPlaceholder: true,
    },
    {
      id: 'ach-academic',
      category: 'Academic Achievements',
      title: '[Add Academic Honor or Milestone]',
      issuer: '[Department / University]',
      date: '[Year]',
      description: 'Include dean list recognitions, scholarships, or academic competition results.',
      isPlaceholder: true,
    },
  ],
  contact: {
    email: '[Add Email]',
    linkedinUrl: '[Add LinkedIn URL]',
    githubUrl: '[Add GitHub URL]',
    location: 'India',
  },
};
