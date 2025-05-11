import Image from "next/image";
import CourseSearch from "../components/CourseSearch";

export default function Home() {
  return (
    <div 
      className="flex flex-col md:flex md:flex-col md:justify-center bg-[url('/Images/background-place.jpg')] bg-cover bg-center bg-no-repeat bg-fixed min-h-screen md:items-center  p-4 py-10 md:py-0 md:pb-16 gap-8 sm:gap-12 md:gap-16 lg:gap-5"
    >
      <Image 
        src="/Images/worketyamo.svg" 
        alt="Worketyamo logo" 
        width={200} 
        height={40} 
        className="w-32 sm:w-40 sm:h-40 md:w-48  md:mx-auto"
        priority
      />
      
      <main className="flex flex-col gap-6 sm:gap-8 md:items-center text-left md:text-center w-full max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg md:mx-auto">
          <h1 className="text-5xl text-left md:text-6xl lg:text-7xl font-heading md:text-center bg-gradient-to-r from-gray-600 via-gray-50 to-white bg-clip-text text-transparent">Accélérateur de talents tech</h1>
          <p className="text-base sm:text-lg font-body text-left md:text-center text-[#C3C3C3] mt-2 sm:mt-3">Bootcamps intensifs et expérience de projet réel vous permettant de lancer une carrière technologique à fort impact.</p>
        </div>
        
        {/* Course Search Component */}
        <div className="w-full max-w-full sm:max-w-sm md:max-w-lg lg:max-w-lg xl:max-w-xl md:mx-auto">
          <CourseSearch />
        </div>
      </main>
    </div>
  );
}
