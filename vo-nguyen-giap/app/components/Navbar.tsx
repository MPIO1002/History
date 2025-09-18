import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-3 md:p-4 relative z-30">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and title */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <Image 
            src="/logo.png" 
            alt="Logo"
            width={32}
            height={32}
            className="object-contain md:w-10 md:h-10"
          />
          <h1 className="text-sm md:text-xl font-bold text-gray-800 leading-tight">
            LỊCH SỬ ĐẢNG CỘNG SẢN VIỆT NAM
          </h1>
        </div>

        {/* Navigation links - Hidden on mobile for now */}
        <div className="hidden sm:flex space-x-4 md:space-x-6">
          <Link 
            href="/" 
            className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm md:text-base"
          >
            Trang chủ
          </Link>
          <Link 
            href="/quiz" 
            className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm md:text-base"
          >
            Làm bài
          </Link>
        </div>
      </div>
    </nav>
  )
}