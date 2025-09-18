import Link from 'next/link'
import Navbar from './components/Navbar'

export default function Home() {
  // Image arrays for 4 background columns
  const column1Images = ['1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6']
  const column2Images = ['7', '8', '9', '10', '11', '12', '7', '8', '9', '10', '11', '12']
  const column3Images = ['1', '3', '5', '7', '9', '11', '1', '3', '5', '7', '9', '11']
  const column4Images = ['2', '4', '6', '8', '10', '12', '2', '4', '6', '8', '10', '12']

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
      {/* Navbar */}
      <Navbar />
      
      {/* Background with responsive columns */}
      <div className="flex h-screen absolute inset-0 gap-2 sm:gap-3 md:gap-5">
        {/* Column 1 - Opacity 10% (90% fade) */}
        <div className="w-1/2 sm:w-1/3 md:w-1/4 overflow-hidden relative">
          <div className="animate-slide-up opacity-10 sm:opacity-15">
            <div className="flex flex-col">
              {column1Images.map((num, index) => (
                <img
                  key={`col1-${index}`}
                  src={`/image-${num}.png`}
                  alt={`Column 1 ${num}`}
                  className="w-full h-32 sm:h-48 md:h-64 object-cover mb-3 sm:mb-4 md:mb-5 rounded-md md:rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Column 2 - Opacity 25% */}
        <div className="w-1/2 sm:w-1/3 md:w-1/4 overflow-hidden relative">
          <div className="animate-slide-down opacity-20 sm:opacity-30">
            <div className="flex flex-col">
              {column2Images.map((num, index) => (
                <img
                  key={`col2-${index}`}
                  src={`/image-${num}.png`}
                  alt={`Column 2 ${num}`}
                  className="w-full h-32 sm:h-48 md:h-64 object-cover mb-3 sm:mb-4 md:mb-5 rounded-md md:rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Column 3 - Hidden on mobile, visible sm+ */}
        <div className="hidden sm:block sm:w-1/3 md:w-1/4 overflow-hidden relative">
          <div className="animate-slide-up opacity-35 md:opacity-40">
            <div className="flex flex-col">
              {column3Images.map((num, index) => (
                <img
                  key={`col3-${index}`}
                  src={`/image-${num}.png`}
                  alt={`Column 3 ${num}`}
                  className="w-full h-48 md:h-64 object-cover mb-4 md:mb-5 rounded-md md:rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Column 4 - Hidden on mobile and sm, visible md+ */}
        <div className="hidden md:block md:w-1/4 overflow-hidden relative">
          <div className="animate-slide-down opacity-55">
            <div className="flex flex-col">
              {column4Images.map((num, index) => (
                <img
                  key={`col4-${index}`}
                  src={`/image-${num}.png`}
                  alt={`Column 4 ${num}`}
                  className="w-full h-64 object-cover mb-5 rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating content - Enhanced responsive positioning */}
      <div className="absolute inset-x-3 top-1/2 transform -translate-y-1/2 sm:inset-x-6 md:left-8 md:right-auto md:w-2/5 lg:w-1/3 z-20 p-4 sm:p-6 md:p-8 sm:bg-opacity-94 md:bg-opacity-90 rounded-xl sm:rounded-2xl md:rounded-none">
        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 md:mb-6 text-center md:text-left leading-tight sm:leading-snug">
          <span className="block sm:inline">Chào mừng các bạn đến với</span>
          <span className="block">phần câu hỏi trắc nghiệm về</span>
          <span className="block">đại tướng Võ Nguyên Giáp</span>
        </h2>
        <div className="text-center md:text-left">
          <Link 
            href="/quiz"
            className="bg-red-600 text-white py-3 sm:py-4 px-6 sm:px-8 md:px-5 rounded-lg text-base sm:text-lg md:text-xl font-semibold hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl inline-block w-auto text-center transform hover:scale-105"
          >
            <span className="text-base sm:text-lg md:text-lg text-white">LÀM BÀI</span>
          </Link>
        </div>
      </div>
    </div> 
  )
}