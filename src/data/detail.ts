import { Course } from './courses';

export type CourseModule = {
  title: string;
  description: string;
  topics?: string[];
};

export type CourseInstructor = {
  name: string;
  title: string;
  imageUrl?: string;
  courses?: number;
  learners?: number;
};

export type CourseSkill = {
  name: string;
  iconUrl?: string;
};

export type CourseTestimonial = {
  name: string;
  role?: string;
  imageUrl?: string;
  text: string;
  stars?: number;
};

export type CourseDetail = {
  id: string;
  fullTitle: string;
  subtitle: string;
  backgroundGradient?: string;
  enrollmentCount?: number;
  rating?: number;
  reviewCount?: number;
  level?: string;
  experienceRequired?: string;
  schedule?: string;
  scheduleDuration?: string;
  scheduleFlexibility?: string;
  modules: CourseModule[];
  instructors?: CourseInstructor[];
  skills: CourseSkill[];
  shareable?: boolean;
  shareableText?: string;
  industryRecognized?: boolean;
  industryRecognizedText?: string;
  languages?: string[];
  testimonials?: CourseTestimonial[];
};

export const courseDetails: Record<string, CourseDetail> = {
  'ux-ui': {
    id: 'ux-ui',
    fullTitle: 'Certificat professionnel en UX/UI Design',
    subtitle: 'Maîtrisez les concepts et outils pour créer des expériences numériques intuitives et esthétiques qui ravissent les utilisateurs.',
    backgroundGradient: 'linear-gradient(135deg,rgb(102, 51, 255) 0%,rgba(85, 51, 255, 0) 80%)',
    enrollmentCount: 53428,
    rating: 4.7,
    reviewCount: 983,
    level: 'Débutant à Intermédiaire',
    experienceRequired: 'Aucune expérience préalable requise',
    schedule: 'Horaire flexible',
    scheduleDuration: '4 mois, 8 heures par semaine',
    scheduleFlexibility: 'Apprenez à votre rythme',
    modules: [
      {
        title: 'Fondamentaux de l’UX et recherche utilisateur',
        description: 'Apprenez les principes de conception centrée utilisateur et les méthodologies de recherche',
        topics: ['Personas', 'Parcours utilisateur', 'Techniques de recherche']
      },
      {
        title: 'Conception UI et prototypage',
        description: 'Maîtrisez les principes de design visuel et créez des prototypes interactifs',
        topics: ['Théorie des couleurs', 'Typographie', 'Systèmes de design', 'Prototypage']
      },
      {
        title: 'Outils de design (Figma, Adobe XD, Sketch)',
        description: 'Devenez expert des outils standard de l’industrie',
        topics: ['Figma', 'Adobe XD', 'Sketch', 'InVision']
      }
    ],
    skills: [
      { name: 'Recherche utilisateur' },
      { name: 'Wireframing' },
      { name: 'Conception d’interface' },
      { name: 'Prototypage' },
      { name: 'Figma' },
      { name: 'Architecture de l’information' }
    ],
    instructors: [
      {
        name: 'Sarah Johnson',
        title: 'Responsable Design UX',
        courses: 5,
        learners: 42000
      }
    ],
    languages: ['Anglais', 'Français', 'Espagnol'],
    shareable: true,
    shareableText: 'Ajoutez à votre profil LinkedIn',
    industryRecognized: true,
    industryRecognizedText: 'En savoir plus'
  },
  'aws': {
    id: 'aws',
    fullTitle: 'Certificat professionnel d’architecte de solutions cloud AWS',
    subtitle: 'Démarrez pour devenir Architecte de Solutions AWS. Acquérez les compétences nécessaires pour concevoir des architectures sur AWS et préparez-vous à l’examen AWS Certified Solutions Architect – Associate.',
    backgroundGradient: 'linear-gradient(180deg,rgba(255, 153, 0, 1) 0%, rgba(20, 20, 21, 1) 70%)',
    enrollmentCount: 76904,
    rating: 4.8,
    reviewCount: 1523,
    level: 'Niveau intermédiaire',
    experienceRequired: 'Expérience recommandée',
    schedule: 'Horaire flexible',
    scheduleDuration: '5 mois, 10 heures par semaine',
    scheduleFlexibility: 'Apprenez à votre rythme',
    modules: [
      {
        title: 'Introduction au cloud et AWS',
        description: 'Concepts clés du cloud, régions et zones de disponibilité',
        topics: []
      },
      {
        title: 'Gestion des identités et des accès (IAM)',
        description: 'Création d’utilisateurs, rôles, stratégies et bonnes pratiques de sécurité',
        topics: []
      },
      {
        title: 'Compute avec EC2 et Lambda',
        description: 'Lancement, configuration et auto-scaling de serveurs et fonctions serverless',
        topics: []
      },
      {
        title: 'Stockage avec S3 et EBS',
        description: 'Buckets, permissions, règles de cycle de vie et volumes de stockage',
        topics: []
      },
      {
        title: 'Réseau AWS (VPC, subnets, groupes de sécurité)',
        description: 'Architecture réseau, tables de routage et contrôle d’accès',
        topics: []
      },
      {
        title: 'Infrastructure as Code (CloudFormation)',
        description: 'Templates YAML, déploiement et gestion des stacks',
        topics: []
      }
    ],
    instructors: [
      {
        name: 'Rachid Hourma',
        title: 'Architecte Solutions Cloud AWS',
        imageUrl: '/Images/instructors/rachid-hourma.jpg',
        courses: 9,
        learners: 66784
      }
    ],
    skills: [
      { name: 'Amazon S3', iconUrl: '/Images/skills/amazon-s3.png' },
      { name: 'Gestion des identités (IAM)', iconUrl: '/Images/skills/aws-iam.png' },
      { name: 'Architecture de solutions', iconUrl: '/Images/skills/solution-architecture.png' },
      { name: 'Amazon EC2', iconUrl: '/Images/skills/aws-ec2.png' },
      { name: 'Amazon DynamoDB', iconUrl: '/Images/skills/aws-dynamodb.png' }
    ],
    shareable: true,
    shareableText: 'Ajoutez à votre profil LinkedIn',
    industryRecognized: true,
    industryRecognizedText: 'En savoir plus',
    languages: ['Anglais', 'Français'],
    testimonials: [
      {
        name: 'Mylian Ndongo',
        role: 'Apprenant depuis 2019',
        imageUrl: '/Images/testimonials/mylian-ndongo.jpg',
        text: 'Pouvoir suivre les cours à mon propre rythme a été une expérience incroyable.',
        stars: 5
      },
      {
        name: 'Amélie Dubois',
        role: 'Apprenante depuis 2020',
        imageUrl: '/Images/testimonials/amelie-dubois.jpg',
        text: 'Les exemples pratiques et les cas d’étude sont très pertinents.',
        stars: 5
      }
    ]
  }, 

  "docker":  {
    id: 'docker',
    fullTitle: 'Bootcamp Docker – Maîtrisez la conteneurisation',
    subtitle: 'Formation intensive de 4 semaines pour apprendre Docker et déployer vos applications en production.',
    backgroundGradient: 'linear-gradient(135deg, #2496ed 0%, #1b6fa8 100%)',
    enrollmentCount: 1200,
    rating: 4.7,
    reviewCount: 315,
    level: 'Débutant à Intermédiaire',
    experienceRequired: 'Aucune expérience préalable requise',
    schedule: 'Horaire fixe',
    scheduleDuration: '4 semaines, 20 heures par semaine',
    scheduleFlexibility: 'Formation intensive à rythme fixe',
    modules: [
      {
        title: 'Introduction à la conteneurisation',
        description: 'Isolation des applications dans des conteneurs',
        topics: []
      },
      {
        title: 'Initiation à Docker Engine et Docker Desktop',
        description: 'Installation et exécution de conteneurs via CLI et interface',
        topics: []
      },
      {
        title: 'Dockerfiles et images Docker',
        description: 'Écriture de Dockerfiles pour construire des images',
        topics: []
      },
      {
        title: 'Stockage et volumes',
        description: 'Gestion de la persistance des données avec des volumes',
        topics: []
      },
      {
        title: 'Réseau dans Docker',
        description: 'Configuration des réseaux (bridge, host, overlay) entre conteneurs',
        topics: []
      },
      {
        title: 'Docker Compose',
        description: 'Définition et lancement de services multi-conteneurs via un fichier YAML',
        topics: []
      }
    ],
    instructors: [
      {
        name: 'Rachid Hourma',
        title: 'Formateur Docker',
        imageUrl: '/Images/instructors/rachid-hourma.jpg',
        courses: 5,
        learners: 12000
      }
    ],
    skills: [
      { name: 'Docker', iconUrl: '/Images/skills/docker.png' },
      { name: 'Docker Compose', iconUrl: '/Images/skills/docker-compose.png' },
      { name: 'Conteneurisation', iconUrl: '/Images/skills/containerization.png' },
      { name: 'Volumes & Stockage', iconUrl: '/Images/skills/storage.png' }
    ],
    shareable: true,
    shareableText: 'Ajoutez à votre profil LinkedIn',
    industryRecognized: true,
    industryRecognizedText: 'Certification reconnue',
    languages: ['Français'],
    testimonials: [
      {
        name: 'Jean Dupont',
        role: 'Apprenant depuis 2022',
        imageUrl: '/Images/testimonials/jean-dupont.jpg',
        text: 'Excellente formation, très pratique et bien structurée.',
        stars: 5
      },
      {
        name: 'Fatou N.',
        role: 'Apprenante depuis 2023',
        imageUrl: '/Images/testimonials/fatou-n.jpg',
        text: 'Le formateur était à l’écoute et les ateliers étaient très concrets.',
        stars: 5
      }
    ]
  }, 
  "terraform" : {
    id: 'terraform',
    fullTitle: 'Bootcamp Terraform – 6 semaines intensives',
    subtitle: 'Automatisez et fiabilisez la gestion de votre infrastructure cloud grâce à Terraform avec notre bootcamp 100 % pratique.',
    backgroundGradient: 'linear-gradient(135deg, rgba(72, 149, 239, 1) 0%, rgba(15, 32, 78, 1) 80%)',
    enrollmentCount: 43210,
    rating: 4.9,
    reviewCount: 987,
    level: 'Intermédiaire',
    experienceRequired: 'Notions de base en cloud computing recommandées',
    schedule: 'Horaire fixe',
    scheduleDuration: '6 semaines, 18 heures par semaine',
    scheduleFlexibility: 'Formation intensive à rythme fixe',
    modules: [
      {
        title: 'Introduction à l’Infrastructure as Code (IaC)',
        description: 'Principes et bénéfices de l’IaC pour automatiser vos déploiements',
        topics: []
      },
      {
        title: 'Prise en main de Terraform',
        description: 'Installation, configuration des providers et premières commandes (`init`, `plan`, `apply`)',
        topics: []
      },
      {
        title: 'HCL et configuration des ressources',
        description: 'Utilisation de la syntaxe HashiCorp (variables, outputs, data sources)',
        topics: []
      },
      {
        title: 'Gestion de l’état',
        description: 'Backends locaux et distants (S3, Terraform Cloud), verrouillage et versioning de l’état',
        topics: []
      },
      {
        title: 'Création de modules Terraform',
        description: 'Structuration et réutilisation de modules pour standardiser et partager vos configurations',
        topics: []
      },
      {
        title: 'Intégration CI/CD & bonnes pratiques',
        description: 'Tests, validations et pipelines GitHub Actions / GitLab CI pour déployer automatiquement',
        topics: []
      }
    ],
    instructors: [
      {
        name: 'Rachid Hourma',
        title: 'Formateur Terraform & Architecte DevOps',
        imageUrl: '/Images/instructors/rachid-hourma.jpg',
        courses: 7,
        learners: 45200
      }
    ],
    skills: [
      { name: 'Infrastructure as Code (IaC)', iconUrl: '/Images/skills/iac.png' },
      { name: 'Terraform', iconUrl: '/Images/skills/terraform.png' },
      { name: 'HashiCorp Configuration Language', iconUrl: '/Images/skills/hcl.png' },
      { name: 'Gestion d’état', iconUrl: '/Images/skills/state-management.png' },
      { name: 'Modules Terraform', iconUrl: '/Images/skills/terraform-modules.png' },
      { name: 'CI/CD', iconUrl: '/Images/skills/cicd.png' }
    ],
    shareable: true,
    shareableText: 'Ajoutez à votre profil LinkedIn',
    industryRecognized: true,
    industryRecognizedText: 'Certification reconnue',
    languages: ['Français'],
    testimonials: [
      {
        name: 'Lucas Martin',
        role: 'Apprenant depuis 2021',
        imageUrl: '/Images/testimonials/lucas-martin.jpg',
        text: 'Formation Terraform très complète, modules pratiques et exemples concrets.',
        stars: 5
      },
      {
        name: 'Sophie K.',
        role: 'Apprenante depuis 2022',
        imageUrl: '/Images/testimonials/sophie-k.jpg',
        text: 'J’ai automatisé mon infrastructure en un temps record grâce à ce bootcamp.',
        stars: 5
      }
    ]
  }, 
 "ai" : {
  id: 'ai-automation',
  fullTitle: 'Bootcamp AI Automation – 4 semaines intensives',
  subtitle: 'Automatisez vos workflows grâce à l’IA et aux API les plus puissantes avec notre formation 100 % pratique.',
  backgroundGradient: 'linear-gradient(135deg, #FF6F61 0%, #2C3E50 80%)',
  enrollmentCount: 2540,
  rating: 4.8,
  reviewCount: 542,
  level: 'Intermédiaire',
  experienceRequired: 'Notions de programmation recommandées',
  schedule: 'Horaire fixe',
  scheduleDuration: '4 semaines, 15 heures par semaine',
  scheduleFlexibility: 'Formation intensive à rythme fixe',
  modules: [
    {
      title: 'Introduction à l’automatisation IA',
      description: 'Principes, cas d’usage et bénéfices pour vos process',
      topics: []
    },
    {
      title: 'Workflows événementiels avec n8n',
      description: 'Création, connexion d’APIs et orchestration visuelle de tâches',
      topics: []
    },
    {
      title: 'Recherche et filtrage intelligents avec DeepSeek',
      description: 'Extraction de données, indexation et requêtes sémantiques',
      topics: []
    },
    {
      title: 'Intégration des Google APIs',
      description: 'Sheets, Drive, Gmail, Calendar et Cloud Functions pour interagir avec l’écosystème Google',
      topics: []
    },
    {
      title: 'Création d’agents IA',
      description: 'Développement et déploiement d’agents autonomes dotés de tableaux de bord, notifications et logs centralisés',
      topics: []
    },
    {
      title: 'Bonus MCP',
      description: 'Meilleures pratiques et cas d’usage métier pour maximiser votre ROI',
      topics: []
    }
  ],
  instructors: [
    {
      name: 'Rachid Hourma',
      title: 'Formateur IA & Automation',
      imageUrl: '/Images/instructors/rachid-hourma.jpg',
      courses: 4,
      learners: 32000
    }
  ],
  skills: [
    { name: 'IA Automation', iconUrl: '/Images/skills/ia-automation.png' },
    { name: 'n8n', iconUrl: '/Images/skills/n8n.png' },
    { name: 'DeepSeek', iconUrl: '/Images/skills/deepseek.png' },
    { name: 'Google APIs', iconUrl: '/Images/skills/google-apis.png' },
    { name: 'Agents IA', iconUrl: '/Images/skills/agents-ia.png' },
    { name: 'MCP', iconUrl: '/Images/skills/mcp.png' }
  ],
  shareable: true,
  shareableText: 'Ajoutez à votre profil LinkedIn',
  industryRecognized: true,
  industryRecognizedText: 'Certification reconnue',
  languages: ['Français'],
  testimonials: [
    {
      name: 'Alice T.',
      role: 'Apprenante depuis 2022',
      imageUrl: '/Images/testimonials/alice-t.jpg',
      text: 'Ce bootcamp m’a permis d’automatiser mes processus métiers en un temps record.',
      stars: 5
    },
    {
      name: 'Oumar B.',
      role: 'Apprenant depuis 2023',
      imageUrl: '/Images/testimonials/oumar-b.jpg',
      text: 'Les ateliers avec n8n et DeepSeek étaient extrêmement pratiques.',
      stars: 5
    }
  ]
}, 
'burp': {
  id: 'burp-suite',
  fullTitle: 'Bootcamp Burp Suite – 4 semaines intensives',
  subtitle: 'Renforcez la sécurité de vos applications web et maîtrisez Burp Suite avec notre bootcamp 100 % pratique.',
  backgroundGradient: 'linear-gradient(135deg, #E53935 0%, #1F1F1F 80%)',
  enrollmentCount: 1980,
  rating: 4.7,
  reviewCount: 340,
  level: 'Intermédiaire',
  experienceRequired: 'Notions de base en développement web recommandées',
  schedule: 'Horaire fixe',
  scheduleDuration: '4 semaines, 15 heures par semaine',
  scheduleFlexibility: 'Formation intensive à rythme fixe',
  modules: [
    {
      title: 'Introduction à la cybersécurité web',
      description: 'Principes, cycle de pentesting et OWASP Top 10',
      topics: []
    },
    {
      title: 'Installation & découverte de Burp Suite',
      description: 'Configuration du proxy, prise en main de l’interface et des outils',
      topics: []
    },
    {
      title: 'Interception & manipulation HTTP/S',
      description: 'Proxy, Repeater et modification en temps réel des requêtes et réponses',
      topics: []
    },
    {
      title: 'Tests automatisés avec Intruder',
      description: 'Fuzzing, brute-force et création de payloads sur mesure',
      topics: []
    },
    {
      title: 'Analyse des vulnérabilités & Scanner',
      description: 'Scans actif/passif, détection et priorisation des failles',
      topics: []
    },
    {
      title: 'Reporting & intégration CI/CD',
      description: 'Génération de rapports exploitables et intégration dans vos pipelines DevSecOps',
      topics: []
    }
  ],
  instructors: [
    {
      name: 'Rachid Hourma',
      title: 'Formateur Cybersécurité',
      imageUrl: '/Images/instructors/rachid-hourma.jpg',
      courses: 6,
      learners: 23000
    }
  ],
  skills: [
    { name: 'Burp Suite', iconUrl: '/Images/skills/burp-suite.png' },
    { name: 'Pentesting Web', iconUrl: '/Images/skills/web-pentesting.png' },
    { name: 'OWASP Top 10', iconUrl: '/Images/skills/owasp-top10.png' },
    { name: 'Intruder', iconUrl: '/Images/skills/intruder.png' },
    { name: 'Scanner', iconUrl: '/Images/skills/scanner.png' },
    { name: 'DevSecOps', iconUrl: '/Images/skills/devsecops.png' }
  ],
  shareable: true,
  shareableText: 'Ajoutez ce cours à votre profil LinkedIn',
  industryRecognized: true,
  industryRecognizedText: 'Certification reconnue',
  languages: ['Français'],
  testimonials: [
    {
      name: 'Marie Laurent',
      role: 'Apprenante depuis 2021',
      imageUrl: '/Images/testimonials/marie-laurent.jpg',
      text: 'Ce bootcamp m’a donné toutes les clés pour pentester efficacement mes applications.',
      stars: 5
    },
    {
      name: 'Karim N.',
      role: 'Apprenant depuis 2022',
      imageUrl: '/Images/testimonials/karim-n.jpg',
      text: 'Les ateliers pratiques avec Burp Suite étaient extrêmement enrichissants.',
      stars: 5
    }
  ]
}, 
"python" : {
  id: 'python',
  fullTitle: 'Bootcamp Python – 4 semaines intensives',
  subtitle: 'Devenez un développeur Python opérationnel et créez des scripts et applications fiables grâce à notre bootcamp 100 % pratique.',
  backgroundGradient: 'linear-gradient(135deg, #306998 0%, #FFD43B 80%)',
  enrollmentCount: 5400,
  rating: 4.6,
  reviewCount: 420,
  level: 'Débutant à Intermédiaire',
  experienceRequired: 'Aucune expérience préalable requise',
  schedule: 'Horaire fixe',
  scheduleDuration: '4 semaines, 20 heures par semaine',
  scheduleFlexibility: 'Formation intensive à rythme fixe',
  modules: [
    {
      title: 'Introduction à Python',
      description: 'Installation, IDE, variables, types de base et premières lignes de code',
      topics: []
    },
    {
      title: 'Structures de contrôle & fonctions',
      description: 'Conditions, boucles, définition et appel de fonctions',
      topics: []
    },
    {
      title: 'Structures de données & compréhensions',
      description: 'Listes, tuples, dictionnaires, sets et expressions génératrices',
      topics: []
    },
    {
      title: 'Programmation orientée objet',
      description: 'Classes, héritage, méthodes et bonnes pratiques OOP',
      topics: []
    },
    {
      title: 'Modules, bibliothèques & environnement virtuel',
      description: 'pip, virtualenv, utilisation de bibliothèques (requests, pandas…)',
      topics: []
    },
    {
      title: 'Automatisation & scripts pratiques',
      description: 'Manipulation de fichiers, web scraping, interaction avec des API',
      topics: []
    }
  ],
  instructors: [
    {
      name: 'Rachid Hourma',
      title: 'Formateur Python',
      imageUrl: '/Images/instructors/rachid-hourma.jpg',
      courses: 10,
      learners: 34000
    }
  ],
  skills: [
    { name: 'Python', iconUrl: '/Images/skills/python.png' },
    { name: 'POO', iconUrl: '/Images/skills/oop.png' },
    { name: 'Structures de données', iconUrl: '/Images/skills/data-structures.png' },
    { name: 'Web Scraping', iconUrl: '/Images/skills/web-scraping.png' },
    { name: 'API Interaction', iconUrl: '/Images/skills/api-interaction.png' },
    { name: 'Automation', iconUrl: '/Images/skills/automation.png' }
  ],
  shareable: true,
  shareableText: 'Ajoutez à votre profil LinkedIn',
  industryRecognized: true,
  industryRecognizedText: 'Certification reconnue',
  languages: ['Français'],
  testimonials: [
    {
      name: 'Samantha K.',
      role: 'Apprenante depuis 2022',
      imageUrl: '/Images/testimonials/samantha-k.jpg',
      text: 'Le bootcamp Python était très complet et accessible.',
      stars: 5
    },
    {
      name: 'Mohamed A.',
      role: 'Apprenant depuis 2023',
      imageUrl: '/Images/testimonials/mohamed-a.jpg',
      text: 'J’ai pu automatiser des tâches quotidiennes grâce aux scripts appris.',
      stars: 5
    }
  ]
}, 
'github': {
  id: 'git-github',
  fullTitle: 'Bootcamp Git & GitHub (+ GitHub Actions) – 4 semaines intensives',
  subtitle: 'Maîtrisez le versioning, collaborez efficacement et automatisez vos pipelines CI/CD avec Git & GitHub.',
  backgroundGradient: 'linear-gradient(135deg, #F05032 0%, #24292e 80%)',
  enrollmentCount: 3650,
  rating: 4.7,
  reviewCount: 410,
  level: 'Débutant à Intermédiaire',
  experienceRequired: 'Aucune expérience préalable requise',
  schedule: 'Horaire fixe',
  scheduleDuration: '4 semaines, 15 heures par semaine',
  scheduleFlexibility: 'Formation intensive à rythme fixe',
  modules: [
    {
      title: 'Introduction à Git & GitHub',
      description: 'Concepts de versioning, historique, installation et configuration initiale',
      topics: []
    },
    {
      title: 'Commandes de base & workflows locaux',
      description: 'init, clone, add, commit, status, diff, log et bonnes pratiques de commit',
      topics: []
    },
    {
      title: 'Branches, fusion & résolution de conflits',
      description: 'branch, checkout, merge, rebase, gestion et résolution de conflits',
      topics: []
    },
    {
      title: 'Collaboration sur GitHub',
      description: 'Repositories distants, push/pull, forks, pull requests, code review et protection de branches',
      topics: []
    },
    {
      title: 'Gestion de projet sur GitHub',
      description: 'Issues, labels, milestones, Projects (tableaux Kanban), Wikis et releases',
      topics: []
    },
    {
      title: 'GitHub Actions & CI/CD',
      description: 'Introduction aux workflows YAML, tests automatisés, intégration continue et déploiement via GitHub Actions',
      topics: []
    }
  ],
  instructors: [
    {
      name: 'Rachid Hourma',
      title: 'Formateur Git & GitHub',
      imageUrl: '/Images/instructors/rachid-hourma.jpg',
      courses: 8,
      learners: 29000
    }
  ],
  skills: [
    { name: 'Git', iconUrl: '/Images/skills/git.png' },
    { name: 'GitHub', iconUrl: '/Images/skills/github.png' },
    { name: 'Branching', iconUrl: '/Images/skills/branching.png' },
    { name: 'Collaboration', iconUrl: '/Images/skills/collaboration.png' },
    { name: 'GitHub Actions', iconUrl: '/Images/skills/github-actions.png' }
  ],
  shareable: true,
  shareableText: 'Ajoutez à votre profil LinkedIn',
  industryRecognized: true,
  industryRecognizedText: 'Certification reconnue',
  languages: ['Français'],
  testimonials: [
    {
      name: 'Élodie M.',
      role: 'Apprenante depuis 2022',
      imageUrl: '/Images/testimonials/elodie-m.jpg',
      text: 'Ce bootcamp m’a permis d’adopter les meilleures pratiques Git et d’automatiser mes workflows.',
      stars: 5
    },
    {
      name: 'Thomas L.',
      role: 'Apprenant depuis 2023',
      imageUrl: '/Images/testimonials/thomas-l.jpg',
      text: 'Les GitHub Actions sont devenus un jeu d’enfant grâce à ce bootcamp.',
      stars: 5
    }
  ]
}
};

export function getCourseDetailById(id: string): CourseDetail | undefined {
  return courseDetails[id];
}
