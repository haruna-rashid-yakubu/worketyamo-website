export interface Course {
  id: string;
  label: string;
  backgroundColor?: string;
  iconUrl?: string;
  description: string;
}

export const courses: Course[] = [
  {
    id: 'aws',
    label: 'AWS Cloud Engineer Associate',
    backgroundColor: '#333333',
    iconUrl: '/Images/aws-certificate.png', // You'll need to add these icons later
    description: 'Master AWS cloud services and infrastructure with our comprehensive Cloud Engineer Associate program. Learn to design, deploy, and manage scalable cloud solutions for modern business needs.'
  },
  {
    id: 'ux-ui',
    label: 'UX/UI Design',
    backgroundColor: '#333333',
    iconUrl: '/Images/ui-ux.png',
    description: 'Develop expertise in user experience and interface design. Create intuitive, beautiful digital products that users love. Learn industry-standard tools and methodologies for modern digital design.'
  },
  {
    id: 'docker',
    label: 'Docker',
    backgroundColor: '#333333',
    iconUrl: '/Images/docker.png',
    description: 'Master containerization with Docker. Learn to build, deploy, and manage applications in containers for improved efficiency, scalability, and development workflows.'
  },
  {
    id: 'github',
    label: 'GitHub Actions',
    backgroundColor: '#333333',
    iconUrl: '/Images/github.png',
    description: 'Automate your workflows with GitHub Actions. Learn to build, test, and deploy code right from your GitHub repository with powerful CI/CD capabilities.'
  },
  {
    id: 'python',
    label: 'Python Developer',
    backgroundColor: '#333333',
    iconUrl: '/Images/python.png',
    description: 'Become a proficient Python developer. Learn programming fundamentals, advanced concepts, and how to build real-world applications with one of the most versatile languages.'
  },
  {
    id: 'burp',
    label: 'Burp suite',
    backgroundColor: '#333333',
    iconUrl: '/Images/burp.png',
    description: 'Master web security testing with Burp Suite. Learn to identify and exploit vulnerabilities in web applications with industry-standard penetration testing tools.'
  },
  {
    id: 'ai',
    label: 'AI Automation',
    backgroundColor: '#333333',
    iconUrl: '/Images/n8n.png',
    description: 'Leverage AI for automation. Learn to build intelligent systems that streamline processes, extract insights from data, and create efficient workflows.'
  },
  {
    id: 'terraform',
    label: 'Terraform',
    backgroundColor: '#333333',
    iconUrl: '/Images/terraform.png',
    description: 'Leverage AI for automation. Learn to build intelligent systems that streamline processes, extract insights from data, and create efficient workflows.'
  }
];
