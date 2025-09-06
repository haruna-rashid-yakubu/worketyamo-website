import { ImageResponse } from 'next/og';
import { getCourseDetailAction } from '@/app/actions';

export const runtime = 'edge';
export const alt = 'Formation Worketyamo';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OpengraphImage({
  params,
}: {
  params: { courseId: string };
}) {
  try {
    const courseDetail = await getCourseDetailAction(params.courseId);
    
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
              fontFamily: 'Inter',
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
            background: courseDetail.backgroundGradient || 'linear-gradient(135deg, #21262D 0%, #0a0a0a 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '60px',
            fontFamily: 'Inter',
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
            fontFamily: 'Inter',
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