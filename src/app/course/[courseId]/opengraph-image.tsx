import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Formation Worketyamo';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Lightweight fallback course data for OG image generation
const courseData = {
  'aws': {
    label: 'AWS Cloud Engineer Associate',
    fullTitle: 'AWS Cloud Engineer Associate',
    subtitle: 'Master AWS cloud services and infrastructure with comprehensive training',
    backgroundColor: 'linear-gradient(135deg, #FF9500 0%, #FF6B35 100%)',
    rating: 4.8,
    enrollmentCount: 1250
  },
  'ux-ui': {
    label: 'UX/UI Design',
    fullTitle: 'UX/UI Design',
    subtitle: 'Create intuitive, beautiful digital products that users love',
    backgroundColor: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
    rating: 4.9,
    enrollmentCount: 890
  },
  'docker': {
    label: 'Docker',
    fullTitle: 'Docker & Conteneurisation',
    subtitle: 'Master containerization for improved efficiency and scalability',
    backgroundColor: 'linear-gradient(135deg, #0DB7ED 0%, #1793D1 100%)',
    rating: 4.7,
    enrollmentCount: 675
  },
  'github': {
    label: 'GitHub Actions',
    fullTitle: 'GitHub Actions',
    subtitle: 'Automate workflows with powerful CI/CD capabilities',
    backgroundColor: 'linear-gradient(135deg, #24292e 0%, #1e2327 100%)',
    rating: 4.6,
    enrollmentCount: 520
  },
  'python': {
    label: 'Python Developer',
    fullTitle: 'Python Developer',
    subtitle: 'Build real-world applications with Python programming',
    backgroundColor: 'linear-gradient(135deg, #3776ab 0%, #ffd343 100%)',
    rating: 4.8,
    enrollmentCount: 1450
  },
  'burp': {
    label: 'Burp Suite',
    fullTitle: 'Burp Suite',
    subtitle: 'Master web security testing and penetration testing',
    backgroundColor: 'linear-gradient(135deg, #FF4B4B 0%, #C62D2D 100%)',
    rating: 4.5,
    enrollmentCount: 340
  },
  'ai': {
    label: 'AI Automation',
    fullTitle: 'Intelligence Artificielle',
    subtitle: 'Build intelligent systems and automation workflows',
    backgroundColor: 'linear-gradient(135deg, #00D2FF 0%, #3A7BD5 100%)',
    rating: 4.9,
    enrollmentCount: 980
  },
  'terraform': {
    label: 'Terraform',
    fullTitle: 'Terraform Infrastructure',
    subtitle: 'Infrastructure as Code with Terraform',
    backgroundColor: 'linear-gradient(135deg, #7B42BC 0%, #5C2E91 100%)',
    rating: 4.7,
    enrollmentCount: 425
  }
};

export default async function OpengraphImage({
  params,
}: {
  params: { courseId: string };
}) {
  try {
    const courseDetail = courseData[params.courseId as keyof typeof courseData];
    
    if (!courseDetail) {
      // Return default OG image if course not found
      return new ImageResponse(
        (
          <div
            style={{
              background: 'linear-gradient(135deg, #21262D 0%, #0a0a0a 100%)',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                color: 'white',
                fontSize: 60,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 20,
              }}
            >
              Formation Non Trouvée
            </div>
            <div
              style={{
                color: '#FF6B35',
                fontSize: 32,
                fontWeight: 'normal',
                textAlign: 'center',
              }}
            >
              Worketyamo
            </div>
          </div>
        ),
        {
          ...size,
        }
      );
    }

    return new ImageResponse(
      (
        <div
          style={{
            background: courseDetail.backgroundColor || 'linear-gradient(135deg, #21262D 0%, #0a0a0a 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '60px',
          }}
        >
          {/* Left side - Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              marginRight: '40px',
            }}
          >
            <div
              style={{
                color: '#FF6B35',
                fontSize: 24,
                fontWeight: 'normal',
                marginBottom: 16,
              }}
            >
              FORMATION
            </div>
            
            <div
              style={{
                color: 'white',
                fontSize: 48,
                fontWeight: 'bold',
                lineHeight: 1.1,
                marginBottom: 20,
                maxWidth: '600px',
              }}
            >
              {courseDetail.fullTitle}
            </div>
            
            <div
              style={{
                color: '#E9E9E9',
                fontSize: 20,
                fontWeight: 'normal',
                marginBottom: 30,
                maxWidth: '500px',
                lineHeight: 1.3,
              }}
            >
              {courseDetail.subtitle}
            </div>
            
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              <div
                style={{
                  color: '#FFD700',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                ⭐ {courseDetail.rating}/5
              </div>
              
              <div
                style={{
                  color: '#4CAF50',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                ✅ Certification
              </div>
              
              <div
                style={{
                  color: '#2196F3',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                👥 {courseDetail.enrollmentCount} étudiants
              </div>
            </div>
            
            <div
              style={{
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
                marginTop: 'auto',
              }}
            >
              Worketyamo.com
            </div>
          </div>
          
          {/* Right side - Course icon/logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '200px',
              height: '200px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              fontSize: '80px',
            }}
          >
            {courseDetail.label.charAt(0).toUpperCase()}
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    // Fallback OG image for errors
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #21262D 0%, #0a0a0a 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              color: 'white',
              fontSize: 60,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            Formations Tech
          </div>
          <div
            style={{
              color: '#FF6B35',
              fontSize: 32,
              fontWeight: 'normal',
              textAlign: 'center',
            }}
          >
            Worketyamo
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  }
}