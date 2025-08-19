// Fallback course data for when database is not available
import { CourseWithTranslations } from './courses';

export const fallbackCourses: CourseWithTranslations[] = [
  {
    id: 'aws',
    label: 'AWS Cloud Engineer Associate',
    backgroundColor: '#333333',
    iconUrl: '/Images/aws-certificate.png',
    description: 'Master AWS cloud services and infrastructure with our comprehensive Cloud Engineer Associate program. Learn to design, deploy, and manage scalable cloud solutions for modern business needs.'
  },
  {
    id: 'ux-ui',
    label: 'UX/UI Design',
    backgroundColor: '#333333',
    iconUrl: '/Images/logo-icon/figma.svg',
    description: 'Develop expertise in user experience and interface design. Create intuitive, beautiful digital products that users love. Learn industry-standard tools and methodologies for modern digital design.'
  },
  {
    id: 'docker',
    label: 'Docker',
    backgroundColor: '#333333',
    iconUrl: '/Images/logo-icon/docker.svg',
    description: 'Master containerization with Docker. Learn to build, deploy, and manage applications in containers for improved efficiency, scalability, and development workflows.'
  },
  {
    id: 'github',
    label: 'GitHub Actions',
    backgroundColor: '#333333',
    iconUrl: '/Images/logo-icon/github.png',
    description: 'Automate your workflows with GitHub Actions. Learn to build, test, and deploy code right from your GitHub repository with powerful CI/CD capabilities.'
  },
  {
    id: 'python',
    label: 'Python Developer',
    backgroundColor: '#333333',
    iconUrl: '/Images/logo-icon/python.svg',
    description: 'Become a proficient Python developer. Learn programming fundamentals, advanced concepts, and how to build real-world applications with one of the most versatile languages.'
  },
  {
    id: 'burp',
    label: 'Burp suite',
    backgroundColor: '#333333',
    iconUrl: '/Images/logo-icon/burp-suite.svg',
    description: 'Master web security testing with Burp Suite. Learn to identify and exploit vulnerabilities in web applications with industry-standard penetration testing tools.'
  },
  {
    id: 'ai',
    label: 'AI Automation',
    backgroundColor: '#333333',
    iconUrl: '/Images/logo-icon/n8n.svg',
    description: 'Leverage AI for automation. Learn to build intelligent systems that streamline processes, extract insights from data, and create efficient workflows.'
  },
  {
    id: 'terraform',
    label: 'Terraform',
    backgroundColor: '#333333',
    iconUrl: '/Images/logo-icon/terraform.svg',
    description: 'Leverage AI for automation. Learn to build intelligent systems that streamline processes, extract insights from data, and create efficient workflows.'
  }
];