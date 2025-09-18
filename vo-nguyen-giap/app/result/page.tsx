"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';

interface Question {
  question: string;
  options: string[];
  answer: number;
}

export default function ResultPage() {
  // Lấy kết quả từ localStorage
  const [result, setResult] = React.useState<{
    score: number;
    total: number;
    percentage: number;
    answers: number[];
    questions: Question[];
  } | null>(null);
  
  const successSoundRef = useRef<HTMLAudioElement | null>(null);

  // Khởi tạo audio
  React.useEffect(() => {
    successSoundRef.current = new Audio('/sounds/success.mp3');
    if (successSoundRef.current) {
      successSoundRef.current.preload = 'auto';
    }
    
    return () => {
      if (successSoundRef.current) {
        successSoundRef.current = null;
      }
    };
  }, []);

  React.useEffect(() => {
    const savedResult = localStorage.getItem('quizResult');
    if (savedResult) {
      const parsedResult = JSON.parse(savedResult);
      setResult(parsedResult);
      
      // Phát âm thanh success khi có kết quả
      setTimeout(() => {
        if (successSoundRef.current) {
          successSoundRef.current.play().catch(e => console.log('Success audio play failed:', e));
        }
      }, 500); // Delay 500ms để trang load xong
    }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy kết quả</h2>
            <Link href="/quiz" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
              Làm bài lại
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { score, total, percentage } = result;

  // Tính toán cho hình tròn SVG
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-15 px-4 pb-4">
        {/* Thank you message */}
          <div className="text-center">
            <Image 
              src="/thanks.jpg" 
              alt="Cảm ơn" 
              width={800}
              height={600}
              className="mx-auto mb-4 w-[350px] h-auto"
            />
          </div>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
              KẾT QUẢ BÀI LÀM
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Câu hỏi trắc nghiệm về Đại tướng Võ Nguyên Giáp
            </p>
          </div>

          {/* Score Circle */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <svg className="w-48 h-48 md:w-64 md:h-64 transform -rotate-90" viewBox="0 0 200 200">
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                />
                {/* Progress circle */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke={percentage >= 70 ? "#10b981" : percentage >= 50 ? "#f59e0b" : "#ef4444"}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              {/* Score text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl md:text-5xl font-bold text-gray-800">{score}</span>
                <span className="text-lg md:text-xl text-gray-600">/ {total}</span>
                <span className="text-xl md:text-2xl font-bold text-gray-700 mt-1">{percentage.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}