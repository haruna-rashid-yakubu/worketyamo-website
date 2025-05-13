import { Course } from './courses';

export type CourseModule = {
  title: string;
  description: string;
  topics?: string[];
  detailedContent?: string;
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
    subtitle: "Maîtrisez les concepts et outils pour créer des expériences numériques intuitives et esthétiques qui ravissent les utilisateurs.",
    backgroundGradient: 'linear-gradient(180deg, #AF5BFF 0%, #0D1117 80%)',
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
        title: 'Fondamentaux de l\'UX et recherche utilisateur',
        description: 'Apprenez les principes de conception centrée utilisateur et les méthodologies de recherche',
        topics: ['Personas', 'Parcours utilisateur', 'Techniques de recherche', "Méthodes d'interviews", "Tests d'utilisabilité", 'Analyse des données'],
        detailedContent: "Découvrez les principes fondamentaux de l'expérience utilisateur et comment ils façonnent les produits numériques modernes. Vous apprendrez à réaliser des recherches utilisateurs efficaces pour guider vos décisions de conception, créer des personas détaillés qui représentent vos utilisateurs cibles, et cartographier des parcours utilisateurs pour identifier les points de friction et les opportunités d'amélioration. Ce module couvre également les techniques d'entretien, l'organisation de tests d'utilisabilité, et l'analyse des données qualitatives et quantitatives."
      },
      {
        title: "Conception UI et prototypage",
        description: "Maîtrisez les principes de design visuel et créez des prototypes interactifs",
        topics: ['Théorie des couleurs', 'Typographie', 'Systèmes de design', 'Prototypage', 'Accessibilité', 'Grilles et mise en page', 'Micro-interactions'],
        detailedContent: "Plongez dans les principes fondamentaux du design d'interface utilisateur qui rendent vos produits à la fois beaux et fonctionnels. Vous maîtriserez la théorie des couleurs et son impact psychologique, les principes de typographie pour une lisibilité optimale, et la création de systèmes de design cohérents et évolutifs. Vous apprendrez à concevoir des interfaces accessibles respectant les normes WCAG, à utiliser les grilles pour des mises en page équilibrées, et à créer des prototypes interactifs haute-fidélité. Le module couvre également la conception de micro-interactions qui améliorent l'engagement et le retour d'information pour les utilisateurs."
      },
      {
        title: 'Outils de design (Figma, Adobe XD, Sketch)',
        description: 'Devenez expert des outils standard de l\'industrie',
        topics: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Composants et variantes', 'Auto-layout', 'Systèmes de design', 'Collaboration en temps réel'],
        detailedContent: "Maîtrisez les outils de conception UX/UI les plus demandés sur le marché. Ce module se concentre particulièrement sur Figma, avec une exploration approfondie de ses fonctionnalités avancées comme les composants et variantes, l'auto-layout, et les systèmes de design. Vous apprendrez à organiser efficacement vos fichiers, à créer des bibliothèques de composants réutilisables, et à utiliser les prototypes interactifs pour simuler des expériences utilisateur complètes. Le module couvre également les fonctionnalités de collaboration en temps réel et les meilleures pratiques pour travailler en équipe, ainsi qu'un aperçu d'autres outils comme Adobe XD, Sketch et InVision pour une compréhension globale de l'écosystème des outils de design."
      }
    ],
    skills: [
      { name: 'Recherche utilisateur' },
      { name: 'Wireframing' },
      { name: 'Conception d’interface' },
      { name: 'Prototypage' },
      { name: 'Figma', iconUrl: '/Images/logo-icon/figma.svg' },
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
    testimonials: [
      {
        name: 'Mylian Ndongo',
        role: 'Apprenant depuis 2019',
        imageUrl: '/Images/testimonials/mylian-ndongo.jpg',
        text: 'Before Worketyamo, I had never built a full-stack application from scratch—now I’ve launched two production-ready projects and landed my dream role as a Software Engineer at a top tech firm. The intensive bootcamp curriculum, hands-on mentorship, and real-world project experience transformed my confidence and skills in just 12 weeks.',
        stars: 5
      },
      {
        name: 'Amélie Dubois',
        role: 'Apprenante depuis 2020',
        imageUrl: '/Images/testimonials/amelie-dubois.jpg',
        text: 'Before Worketyamo, I had never built a full-stack application from scratch—now I’ve launched two production-ready projects and landed my dream role as a Software Engineer at a top tech firm. The intensive bootcamp curriculum, hands-on mentorship, and real-world project experience transformed my confidence and skills in just 12 weeks.',
        stars: 5
      }
    ],
    shareable: true,
    shareableText: 'Ajoutez à votre profil LinkedIn',
    industryRecognized: true,
    industryRecognizedText: 'En savoir plus'
  },
  'aws': {
    id: 'aws',
    fullTitle: 'Certificat professionnel d’architecte de solutions cloud AWS',
    subtitle: 'Démarrez pour devenir Architecte de Solutions AWS. Acquérez les compétences nécessaires pour concevoir des architectures sur AWS et préparez-vous à l’examen AWS Certified Solutions Architect – Associate.',
    backgroundGradient: 'linear-gradient(180deg, #FF9900 0%, #0D1117 80%)',
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
        title: "Introduction au cloud et AWS",
        description: "Concepts clés du cloud, régions et zones de disponibilité",
        topics: ["Cloud computing", "Modèles de service", "AWS Global Infrastructure"],
        detailedContent: "Plongée dans les principes du cloud computing et des différents modèles de service. Exploration des régions AWS et des zones de disponibilité pour garantir performance et résilience. Navigation approfondie de la console AWS et gestion des coûts en mode pay-as-you-go. Étude des scenarios d'usage réels pour choisir la meilleure architecture cloud."
      },
      {
        title: "Gestion des identités et des accès (IAM)",
        description: "Création d'utilisateurs, rôles, stratégies et bonnes pratiques de sécurité",
        topics: ["IAM Users", "IAM Roles", "IAM Policies", "Security Best Practices"],
        detailedContent: "Apprenez à créer et gérer des utilisateurs, des groupes et des rôles IAM. Maîtrisez la création de stratégies personnalisées et l'application du principe du moindre privilège. Implémentez l'authentification multifactorielle (MFA) et analysez les rapports de crédentials. Configurez des rôles pour services et applications."
      },
      {
        title: "Compute avec EC2 et Lambda",
        description: "Lancement, configuration et auto-scaling de serveurs et fonctions serverless",
        topics: ["EC2 Instances", "Lambda Functions", "Auto Scaling", "Load Balancing"],
        detailedContent: "Découvrez comment lancer et gérer des instances EC2, configurer des groupes de sécurité et utiliser des paires de clés pour un accès sécurisé. Explorez les différentes familles d'instances et les options de tarification. Développez des fonctions Lambda pour des architectures sans serveur et configurez des déclencheurs d'événements. Implémentez l'auto-scaling pour optimiser les performances et les coûts."
      },
      {
        title: "Stockage avec S3 et EBS",
        description: "Buckets, permissions, règles de cycle de vie et volumes de stockage",
        topics: ["S3 Buckets", "S3 Storage Classes", "EBS Volumes", "Lifecycle Policies"],
        detailedContent: "Maîtrisez la création et la gestion des buckets S3, la configuration des permissions et des politiques d'accès. Implémentez des stratégies de cycle de vie pour optimiser les coûts de stockage. Configurez la réplication entre régions pour la haute disponibilité. Créez et attachez des volumes EBS, configurez des snapshots automatiques et optimisez les performances."
      },
      {
        title: "Réseau AWS (VPC, subnets, Security Groups)",
        description: "Architecture réseau, tables de routage et contrôle d'accès",
        topics: ["VPC Design", "Subnets", "Route Tables", "Security Groups", "NACLs"],
        detailedContent: "Concevez des architectures VPC pour des applications multi-tiers. Configurez des sous-réseaux publics et privés avec des tables de routage appropriées. Implémentez des groupes de sécurité et des listes de contrôle d'accès réseau (NACLs) pour un contrôle précis du trafic. Établissez des connexions VPN et Direct Connect pour des environnements hybrides sécurisés."
      },
      {
        title: "Introduction à l'infrastructure as Code (CloudFormation)",
        description: "Templates YAML, déploiement et gestion des stacks",
        topics: ["CloudFormation Templates", "Stack Management", "AWS CDK", "Infrastructure as Code"],
        detailedContent: "Apprenez à définir votre infrastructure comme du code en utilisant AWS CloudFormation. Créez des templates YAML ou JSON pour déployer des ressources de manière cohérente et répétable. Utilisez des paramètres, des mappages et des fonctions intrinsèques pour des templates flexibles. Gérez les stacks CloudFormation à travers différents environnements et mettez en œuvre des stratégies de déploiement sécurisées."
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
        text: 'Before Worketyamo, I had never built a full-stack application from scratch—now I’ve launched two production-ready projects and landed my dream role as a Software Engineer at a top tech firm. The intensive bootcamp curriculum, hands-on mentorship, and real-world project experience transformed my confidence and skills in just 12 weeks.',
        stars: 5
      },
      {
        name: 'Amélie Dubois',
        role: 'Apprenante depuis 2020',
        imageUrl: '/Images/testimonials/amelie-dubois.jpg',
        text: 'Before Worketyamo, I had never built a full-stack application from scratch—now I’ve launched two production-ready projects and landed my dream role as a Software Engineer at a top tech firm. The intensive bootcamp curriculum, hands-on mentorship, and real-world project experience transformed my confidence and skills in just 12 weeks.',
        stars: 5
      }
    ]
  }, 

  "docker":  {
    id: 'docker',
    fullTitle: 'Bootcamp Docker – Maîtrisez la conteneurisation',
    subtitle: 'Formation intensive de 4 semaines pour apprendre Docker et déployer vos applications en production.',
    backgroundGradient: 'linear-gradient(180deg, #2496ed 0%, #0D1117 80%)',
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
        topics: ['Virtualisation vs Conteneurisation', 'Architecture Docker', 'Images et Conteneurs', 'Avantages des conteneurs', 'Cas d\'utilisation'],
        detailedContent: "Découvrez les concepts fondamentaux de la conteneurisation et comment elle révolutionne le déploiement d'applications. Ce module compare la virtualisation traditionnelle avec la conteneurisation légère, explique l'architecture en couches de Docker, et détaille la relation entre images et conteneurs. Vous comprendrez les avantages de la conteneurisation en termes de portabilité, de scalabilité et d'efficacité des ressources, ainsi que les principaux cas d'utilisation dans le développement moderne."
      },
      {
        title: 'Initiation à Docker Engine et Docker Desktop',
        description: 'Installation et exécution de conteneurs via CLI et interface',
        topics: ['Installation multiplateforme', 'CLI Docker', 'Interface Docker Desktop', 'Commandes essentielles', 'Pull & Run', 'Cycle de vie des conteneurs'],
        detailedContent: "Maîtrisez les outils fondamentaux de l'écosystème Docker en commençant par l'installation sur différentes plateformes (Windows, Mac, Linux). Vous apprendrez à naviguer dans l'interface Docker Desktop et à utiliser efficacement la ligne de commande Docker. Le module couvre les commandes essentielles pour gérer le cycle de vie complet des conteneurs: création, exécution, pause, arrêt et suppression. Vous pratiquerez l'utilisation des commandes docker pull pour récupérer des images depuis Docker Hub et docker run pour les exécuter avec différentes options."
      },
      {
        title: 'Dockerfiles et images Docker',
        description: 'Écriture de Dockerfiles pour construire des images',
        topics: ['Syntaxe Dockerfile', 'Instructions FROM, RUN, COPY', 'Multi-stage builds', 'Optimisation des couches', 'Tags et versionnement', 'Docker Hub', 'Registres privés'],
        detailedContent: "Apprenez à créer vos propres images Docker personnalisées à travers la rédaction de Dockerfiles efficaces. Ce module explore en détail la syntaxe des Dockerfiles et les instructions clés comme FROM, RUN, COPY, WORKDIR et ENTRYPOINT. Vous découvrirez les techniques de multi-stage builds pour créer des images légères et sécurisées, ainsi que l'optimisation des couches pour réduire la taille des images et accélérer les builds. Le module couvre également les stratégies de tagging, le versionnement des images, et la publication sur Docker Hub ou des registres privés."
      },
      {
        title: 'Stockage et volumes',
        description: 'Gestion de la persistance des données avec des volumes',
        topics: ['Types de stockage Docker', 'Volumes nommés', 'Bind mounts', 'tmpfs', 'Données persistantes', 'Partage de données', 'Backups et migrations'],
        detailedContent: "Maîtrisez la gestion des données persistantes dans l'environnement éphémère des conteneurs Docker. Ce module présente les différents types de stockage disponibles dans Docker: volumes nommés, bind mounts et tmpfs. Vous apprendrez à créer, gérer et utiliser des volumes pour conserver les données au-delà du cycle de vie des conteneurs, à partager des données entre plusieurs conteneurs, et à implémenter des stratégies de sauvegarde et de migration des données. Des exemples pratiques illustrent l'utilisation des volumes avec des bases de données, des applications stateful et des services nécessitant une persistance."
      },
      {
        title: 'Réseau dans Docker',
        description: 'Configuration des réseaux (bridge, host, overlay) entre conteneurs',
        topics: ['Drivers réseau Docker', 'Bridge network', 'Host network', 'Overlay network', 'Résolution de noms', 'Communication inter-conteneurs', 'Exposition de ports'],
        detailedContent: "Explorez l'architecture réseau de Docker et apprenez à configurer différents types de réseaux pour vos applications conteneurisées. Ce module détaille les drivers réseau disponibles: bridge (le réseau par défaut), host (partage de la pile réseau de l'hôte), et overlay (communication entre hôtes dans un swarm). Vous maîtriserez la création de réseaux personnalisés, la résolution de noms via DNS interne, les techniques de communication sécurisée entre conteneurs, et les stratégies d'exposition de ports pour rendre vos services accessibles depuis l'extérieur."
      },
      {
        title: 'Docker Compose',
        description: 'Définition et lancement de services multi-conteneurs via un fichier YAML',
        topics: ['Syntaxe YAML', 'docker-compose.yml', 'Services, networks, volumes', 'Dépendances entre services', "Variables d'environnement", 'Scale et réplicas', 'Déploiement en développement et production'],
        detailedContent: "Simplifiez la gestion d'applications multi-conteneurs avec Docker Compose. Ce module vous enseigne comment définir l'ensemble de votre infrastructure dans un fichier docker-compose.yml déclaratif, incluant services, réseaux et volumes. Vous apprendrez à gérer les dépendances entre services, à utiliser des variables d'environnement et des fichiers .env, et à orchestrer le démarrage synchronisé de services interdépendants. Le module couvre également les commandes Docker Compose essentielles, les stratégies de scaling horizontal, et les différentes approches pour les environnements de développement et de production."
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
      { name: 'Docker', iconUrl: '/Images/logo-icon/docker.svg' },
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
    backgroundGradient: 'linear-gradient(180deg, #4E0CBB 0%, #0D1117 80%)',
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
      { name: 'Terraform', iconUrl: '/Images/logo-icon/terraform.svg' },
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
  fullTitle: 'Bootcamp AI Automation',
  subtitle: 'Automatisez vos workflows grâce à l’IA et aux API les plus puissantes avec notre formation 100 % pratique.',
  backgroundGradient: 'linear-gradient(180deg, #FF6F61 0%, #0D1117 80%)',
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
    { name: 'n8n', iconUrl: '/Images/logo-icon/n8n.svg' },
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
  fullTitle: 'Bootcamp Burp Suite',
  subtitle: 'Renforcez la sécurité de vos applications web et maîtrisez Burp Suite avec notre bootcamp 100 % pratique.',
  backgroundGradient: 'linear-gradient(180deg, #E53935 0%, #0D1117  80%)',
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
      topics: ['Fondamentaux de la sécurité web', 'Méthodologie de pentesting', 'OWASP Top 10', 'Aspects légaux', 'Sécurité éthique', 'Vulnérabilités courantes'],
      detailedContent: "Découvrez les principes fondamentaux de la sécurité des applications web et l'importance du pentesting dans le cycle de développement logiciel. Ce module explore la méthodologie complète de test d'intrusion (reconnaissance, analyse, exploitation, post-exploitation, rapport), ainsi que les vulnérabilités les plus critiques selon l'OWASP Top 10. Vous apprendrez les aspects légaux et éthiques du hacking, l'importance des autorisations formelles, et les différentes approches de tests (boîte noire, boîte grise, boîte blanche)."
    },
    {
      title: 'Installation & découverte de Burp Suite',
      description: 'Configuration du proxy, prise en main de l’interface et des outils',
      topics: ['Installation multiplateforme', 'Versions gratuite vs Pro', 'Configuration du proxy', 'Certificat SSL', 'Interface utilisateur', 'Découverte des modules', 'Extensions'],
      detailedContent: "Maîtrisez l'installation et la configuration de Burp Suite sur différentes plateformes. Ce module couvre les différences entre les versions gratuite et professionnelle, la configuration du proxy pour intercepter le trafic, et l'installation du certificat SSL pour analyser les communications sécurisées. Vous explorerez l'interface utilisateur de Burp Suite, ses différents modules (Proxy, Spider, Intruder, Repeater, etc.), et découvrirez comment étendre ses fonctionnalités avec des extensions BApp."
    },
    {
      title: 'Interception & manipulation HTTP/S',
      description: 'Proxy, Repeater et modification en temps réel des requêtes et réponses',
      topics: ['Mode interception', 'Filtres de proxy', 'Modification de requêtes', 'Analyse de réponses', 'Headers HTTP', 'Cookies', 'Utilisation de Repeater', 'Comparaison de réponses'],
      detailedContent: "Apprenez à intercepter et modifier activement le trafic web en temps réel avec Burp Proxy. Ce module détaille la configuration des filtres d'interception, la modification des paramètres de requêtes (headers, cookies, body), et l'analyse des réponses du serveur. Vous maîtriserez l'outil Repeater pour envoyer des requêtes modifiées et comparer les réponses, ce qui est essentiel pour tester manuellement des vulnérabilités comme les injections SQL, XSS, ou les failles de contrôle d'accès."
    },
    {
      title: 'Tests automatisés avec Intruder',
      description: 'Fuzzing, brute-force et création de payloads sur mesure',
      topics: ["Modes d'attaque (Sniper, Battering ram, Pitchfork, Cluster bomb)", "Définition de points d'injection", 'Listes de payloads', 'Encodage et décodage', 'Fuzzing de paramètres', 'Attaques par dictionnaire', 'Filtrage des résultats'],
      detailedContent: "Automatisez vos tests de sécurité avec Burp Intruder, un puissant outil pour lancer des attaques automatisées contre les applications web. Ce module explore les différents modes d'attaque disponibles (Sniper, Battering ram, Pitchfork, Cluster bomb) et leurs cas d'utilisation spécifiques. Vous apprendrez à définir des points d'injection, à créer et customiser des listes de payloads pour différents types d'attaques (fuzzing, injection, brute-force), et à configurer les options d'encodage. Le module couvre également les techniques avancées de filtrage des résultats pour identifier rapidement les vulnérabilités."
    },
    {
      title: 'Analyse des vulnérabilités & Scanner',
      description: 'Scans actif/passif, détection et priorisation des failles',
      topics: ['Scanner passif vs actif', 'Configuration des scans', 'Évaluation des vulnérabilités', 'Faux positifs', 'Priorisation (CVSS)', 'Vulnérabilités complexes', 'Exploitation manuelle'],
      detailedContent: "Maîtrisez les fonctionnalités de scan automatisé de Burp Suite pour détecter efficacement les vulnérabilités. Ce module distingue le scanner passif (analyse non intrusive du trafic intercepté) et le scanner actif (génération active de requêtes pour tester les vulnérabilités). Vous apprendrez à configurer les scans, à évaluer la gravité des failles détectées avec le système CVSS, et à distinguer les faux positifs des vulnérabilités réelles. Le module aborde également l'identification et l'exploitation manuelle de vulnérabilités complexes que les scanners automatiques peuvent manquer."
    },
    {
      title: 'Reporting & intégration CI/CD',
      description: 'Génération de rapports exploitables et intégration dans vos pipelines DevSecOps',
      topics: ['Génération de rapports', 'Documentation des vulnérabilités', 'Recommandations de correction', 'Burp Suite Enterprise', 'API Burp', 'Intégration CI/CD', 'DevSecOps'],
      detailedContent: "Transformez vos découvertes en rapports exploitables et intégrez les tests de sécurité dans votre workflow de développement. Ce module couvre la génération de rapports professionnels avec Burp Suite, la documentation efficace des vulnérabilités avec preuves de concept, et la formulation de recommandations de correction actionables. Vous découvrirez Burp Suite Enterprise Edition et son API pour automatiser les scans de sécurité, ainsi que les stratégies d'intégration des tests dans les pipelines CI/CD pour adopter une approche DevSecOps où la sécurité est intégrée dès le début du cycle de développement."
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
    { name: 'Burp Suite', iconUrl: '/Images/logo-icon/burp-suite.svg' },
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
  fullTitle: 'Bootcamp Python',
  subtitle: 'Devenez un développeur Python opérationnel et créez des scripts et applications fiables grâce à notre bootcamp 100 % pratique.',
  backgroundGradient: 'linear-gradient(180deg, #FFD743 0%, #0D1117 80%)',
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
      topics: ['Installation et configuration', 'Environnements de développement', 'Variables et types primitifs', 'Opérations de base', 'Entrées/sorties', 'Présentation PEP8'],
      detailedContent: "Démarrez votre parcours Python en maîtrisant les fondamentaux du langage et de son écosystème. Ce module couvre l'installation de Python sur différentes plateformes, la configuration d'environnements de développement (PyCharm, VS Code, Jupyter Notebooks), et les concepts de base du langage. Vous apprendrez à travailler avec les variables, les types primitifs (entiers, flottants, chaînes, booléens), les opérations arithmétiques et logiques, ainsi que les entrées/sorties standards. Une introduction aux bonnes pratiques de codage suivant le guide de style PEP8 vous permettra d'écrire un code lisible et maintenable dès le début."
    },
    {
      title: 'Structures de contrôle & fonctions',
      description: 'Conditions, boucles, définition et appel de fonctions',
      topics: ['Conditions (if, elif, else)', 'Boucles (for, while)', 'Compréhensions de listes', 'Définition de fonctions', 'Paramètres et retours', 'Fonctions lambda', 'Portée des variables'],
      detailedContent: "Maîtrisez le flux d'exécution de vos programmes Python grâce aux structures de contrôle et aux fonctions. Ce module approfondit les instructions conditionnelles (if, elif, else), les différentes boucles (for, while) et leurs opérateurs de contrôle (break, continue). Vous apprendrez à définir des fonctions avec paramètres positionnels, nommés et par défaut, à utiliser les fonctions lambda pour des opérations concises, et à comprendre la portée des variables (locale vs globale). Les compréhensions de listes, une fonctionnalité puissante et élégante de Python, sont également couvertes en détail."
    },
    {
      title: 'Structures de données & compréhensions',
      description: 'Listes, tuples, dictionnaires, sets et expressions génératrices',
      topics: ['Listes et méthodes', 'Tuples et immutabilité', 'Dictionnaires et tables de hachage', 'Sets et opérations', 'Compréhensions avancées', 'Générateurs', 'Algorithmes sur collections'],
      detailedContent: "Explorez en profondeur les structures de données Python qui permettent de stocker et manipuler efficacement l'information. Ce module examine les particularités de chaque type de collection: listes (mutable, ordonnée), tuples (immutable, ordonné), dictionnaires (paires clé-valeur) et sets (collections non-ordonnées d'éléments uniques). Vous maîtriserez les compréhensions avancées pour les listes, dictionnaires et sets, ainsi que les expressions génératrices pour un traitement efficace de grands volumes de données. Le module aborde également les algorithmes courants sur les collections et les techniques d'optimisation de performance."
    },
    {
      title: 'Programmation orientée objet',
      description: 'Classes, héritage, méthodes et bonnes pratiques OOP',
      topics: ['Classes et instances', 'Attributs et méthodes', 'Constructeurs et destructeurs', 'Héritage et polymorphisme', 'Encapsulation', 'Méthodes spéciales', 'Propriétés et descripteurs'],
      detailedContent: "Adoptez le paradigme de la programmation orientée objet (POO) en Python pour créer des applications modulaires et réutilisables. Ce module explore la définition de classes, la création d'instances, et l'utilisation d'attributs et de méthodes. Vous apprendrez les concepts fondamentaux de la POO: héritage (simple et multiple), encapsulation, polymorphisme, ainsi que les spécificités Python comme les méthodes spéciales (__init__, __str__, __repr__, etc.). Le module couvre également les techniques avancées comme les propriétés, les descripteurs et les classes abstraites, ainsi que les bonnes pratiques de conception objet."
    },
    {
      title: 'Modules, bibliothèques & environnement virtuel',
      description: 'pip, virtualenv, utilisation de bibliothèques (requests, pandas…)',
      topics: ['Organisation de code en modules', 'Imports et packages', 'Environnements virtuels', 'Gestion des dépendances', 'Pip et requirements.txt', 'Bibliothèques standards', 'Bibliothèques tierces populaires'],
      detailedContent: "Découvrez comment structurer vos projets Python et tirer parti de l'immense écosystème de bibliothèques disponibles. Ce module enseigne l'organisation de code en modules et packages réutilisables, les différentes méthodes d'importation, et la création d'environnements virtuels isolés avec virtualenv et venv. Vous apprendrez à gérer efficacement les dépendances avec pip et à documenter vos besoins dans requirements.txt. Le module présente également les bibliothèques standards incontournables (os, sys, json, datetime) et introduit des bibliothèques tierces populaires comme requests pour les appels HTTP, pandas pour l'analyse de données, et pytest pour les tests."
    },
    {
      title: 'Automatisation & scripts pratiques',
      description: 'Manipulation de fichiers, web scraping, interaction avec des API',
      topics: ['Lecture/Écriture de fichiers', 'Parsing de données (CSV, JSON, XML)', 'Web scraping avec BeautifulSoup', 'Requêtes HTTP avec requests', 'Communication avec des APIs', "Scripts d'automatisation", 'Gestion des erreurs et exceptions'],
      detailedContent: "Mettez en pratique vos compétences Python pour résoudre des problèmes concrets et automatiser des tâches répétitives. Ce module se concentre sur des applications pratiques: manipulation de fichiers (lecture, écriture, parcours de répertoires), traitement de formats structurés (CSV, JSON, XML), extraction de données web avec BeautifulSoup, et interaction avec des APIs REST via la bibliothèque requests. Vous développerez plusieurs scripts d'automatisation complets: génération de rapports, traitement batch de fichiers, extraction et transformation de données, et intégration avec des services web. Une attention particulière est portée à la gestion robuste des erreurs et des exceptions pour créer des scripts fiables en production."
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
    { name: 'Python', iconUrl: '/Images/logo-icon/python.svg' },
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
  fullTitle: 'Bootcamp Git & GitHub (+ GitHub Actions)',
  subtitle: 'Maîtrisez le versioning, collaborez efficacement et automatisez vos pipelines CI/CD avec Git & GitHub.',
  backgroundGradient: 'linear-gradient(180deg, #3A098B 0%, #0D1117 80%)',
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
      title: "Introduction à Git & GitHub",
      description: "Concepts de versioning, historique, installation et configuration initiale",
      topics: ['Systèmes de contrôle de version', 'Historique de Git', 'Installation multi-OS', 'Configuration globale/locale', 'Interface CLI vs GUI', 'Création de compte GitHub'],
      detailedContent: "Découvrez les fondamentaux du contrôle de version et les avantages de Git par rapport aux autres systèmes. Ce module couvre l'histoire de Git et GitHub, l'installation sur différents systèmes d'exploitation, et la configuration initiale (nom d'utilisateur, email, éditeur par défaut). Vous apprendrez à naviguer entre l'interface en ligne de commande et les interfaces graphiques disponibles, et à créer et configurer votre premier compte GitHub."
    },
    {
      title: 'Commandes de base & workflows locaux',
      description: 'init, clone, add, commit, status, diff, log et bonnes pratiques de commit',
      topics: ['Init & Clone', 'Staging area (git add)', 'Commit & messages', 'Status & Diff', 'Log & historique', 'Ignorer des fichiers (.gitignore)', 'Bonnes pratiques'],
      detailedContent: "Maîtrisez les opérations fondamentales pour travailler avec Git localement. Ce module couvre la création de nouveaux dépôts (git init) et la copie de dépôts existants (git clone), la gestion de la staging area, et la création de commits avec des messages clairs et descriptifs. Vous apprendrez à consulter l'état de votre répertoire de travail (git status), à comparer les changements (git diff), et à naviguer dans l'historique des commits (git log). Le module aborde également la configuration de fichiers .gitignore pour exclure certains fichiers du suivi, et les bonnes pratiques pour des messages de commit efficaces."
    },
    {
      title: "Branches, fusion & résolution de conflits",
      description: "branch, checkout, merge, rebase, gestion et résolution de conflits",
      topics: ['Création de branches', 'Navigation entre branches', 'Merge vs Rebase', 'Fast-forward vs recursive', 'Conflits de fusion', 'Outils de résolution', 'Git flow'],
      detailedContent: "Découvrez la puissance du travail avec des branches, l'une des fonctionnalités clés de Git. Ce module explique comment créer et naviguer entre les branches (git branch, git checkout, git switch), les différentes stratégies pour intégrer les changements (git merge, git rebase), et les types de fusions possibles. Vous apprendrez à identifier, comprendre et résoudre efficacement les conflits de fusion qui surviennent lorsque les mêmes lignes sont modifiées dans différentes branches. Le module présente également la méthodologie Git Flow pour organiser les branches selon les meilleures pratiques de l'industrie."
    },
    {
      title: "Collaboration sur GitHub",
      description: "Repositories distants, push/pull, forks, pull requests, code review et protection de branches",
      topics: ['Remote repositories', 'Push & Pull', 'Fork & Clone', 'Pull Requests', 'Code Review', 'Discussions & Commentaires', 'Protection de branches'],
      detailedContent: "Apprenez à collaborer efficacement avec d'autres développeurs grâce à GitHub. Ce module explore la gestion des dépôts distants, l'envoi (push) et la récupération (pull) des changements, ainsi que le workflow de fork pour contribuer à des projets open source. Vous maîtriserez le processus de pull request, depuis la création jusqu'à la fusion, en passant par la revue de code et les discussions constructives. Le module couvre également les fonctionnalités de protection de branches pour sécuriser votre code et imposer des workflows de qualité comme les revues obligatoires ou les tests automatisés avant fusion."
    },
    {
      title: "Gestion de projet sur GitHub",
      description: "Issues, labels, milestones, Projects (tableaux Kanban), Wikis et releases",
      topics: ['Issues & suivi de bugs', 'Labels & assignations', 'Milestones & roadmap', 'Projects & Kanban', 'Documentation & Wiki', 'Releases & tags', 'Templates'],
      detailedContent: "Découvrez comment GitHub peut servir de plateforme complète de gestion de projet au-delà du simple hébergement de code. Ce module approfondit l'utilisation des issues pour le suivi des bugs et des fonctionnalités, l'organisation avec des labels personnalisés et des jalons (milestones), et la visualisation du flux de travail avec les tableaux Kanban de GitHub Projects. Vous apprendrez à créer et maintenir une documentation claire avec GitHub Wiki, à gérer les versions avec les releases et les tags, et à standardiser les contributions avec des templates d'issues et de pull requests."
    },
    {
      title: "GitHub Actions & CI/CD",
      description: "Introduction aux workflows YAML, tests automatisés, intégration continue et déploiement via GitHub Actions",
      topics: ['Concepts de CI/CD', 'Structure YAML', 'Events & Triggers', 'Jobs & Steps', 'Runners & Environnements', 'Actions marketplace', 'Déploiement automatisé'],
      detailedContent: "Automatisez vos workflows de développement avec GitHub Actions, la solution native CI/CD de GitHub. Ce module explore les concepts fondamentaux d'intégration et de déploiement continus, la syntaxe et la structure des fichiers de workflow YAML, et les différents événements qui peuvent déclencher vos workflows. Vous apprendrez à configurer des jobs et des steps, à utiliser différents types de runners, et à tirer parti des milliers d'actions préconstruites disponibles sur la marketplace. Le module inclut des exemples pratiques de workflows automatisés pour les tests, la validation de code, et le déploiement d'applications sur différentes plateformes."
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
    { name: 'GitHub', iconUrl: '/Images/logo-icon/github.png' },
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
