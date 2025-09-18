"use client";
import React from "react";
import Link from "next/link";

export default function HomePage() {
  // Tạo mảng ảnh cho 2 bên
  const leftImages = ["image.png", "image-1.png", "image-2.png", "image-3.png", "image-4.png", "image-5.png"];
  const rightImages = ["image-6.png", "image-7.png", "image-8.png", "image-9.png", "image-10.png", "image-11.png"];

  return (
    <main className="min-h-screen bg-white flex">
      {/* Left Bento Grid */}
      <div className="flex-1 p-4 overflow-hidden">
        <div className="animate-slide-up">
          <div className="grid grid-cols-2 gap-4 h-screen">
            {leftImages.concat(leftImages).map((img, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden relative"
                style={{
                  height: index % 3 === 0 ? "200px" : index % 3 === 1 ? "150px" : "250px",
                }}
              >
                <img
                  src={`/${img}`}
                  alt={`Image ${index}`}
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-8 baloo text-gray-800 ml-5">
            Chào mừng đến với phần câu hỏi trắc nghiệm về đại tướng Võ Nguyên Giáp
          </h1>
          <Link href="/quiz">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl baloo cursor-pointer transition-colors">
              Làm bài
            </button>
          </Link>
        </div>
      </div>

      {/* Right Bento Grid */}
      <div className="flex-1 p-4 overflow-hidden">
        <div className="animate-slide-down">
          <div className="grid grid-cols-2 gap-4 h-screen">
            {rightImages.concat(rightImages).map((img, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden relative"
                style={{
                  height: index % 3 === 0 ? "180px" : index % 3 === 1 ? "220px" : "160px",
                }}
              >
                <img
                  src={`/${img}`}
                  alt={`Image ${index}`}
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes slide-down {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 20s linear infinite;
        }

        .animate-slide-down {
          animation: slide-down 20s linear infinite;
        }
      `}</style>
    </main>
  );
}