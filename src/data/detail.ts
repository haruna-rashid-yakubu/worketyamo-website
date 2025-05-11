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
  }
};

export function getCourseDetailById(id: string): CourseDetail | undefined {
  return courseDetails[id];
}
