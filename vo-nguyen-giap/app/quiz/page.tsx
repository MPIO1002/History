"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

type Question = {
  question: string;
  options: string[];
  answer: number;
};


export default function QuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [checked, setChecked] = useState(false);
  const correctSoundRef = useRef<HTMLAudioElement | null>(null);
  const incorrectSoundRef = useRef<HTMLAudioElement | null>(null);

  // Khôi phục trạng thái từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem("quizState");
    if (saved) {
      const state = JSON.parse(saved);
      setSelected(state.selected || []);
      setShowResult(state.showResult || false);
      setCurrent(state.current || 0);
      setChecked(state.checked || false);
    }
  }, []);

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        // Nếu chưa có selected thì khởi tạo
        setSelected((prev) => prev.length === data.length ? prev : Array(data.length).fill(null));
        setLoading(false);
      });
  }, []);

  // Khởi tạo audio elements
  useEffect(() => {
    correctSoundRef.current = new Audio('/sounds/correct.mp3');
    incorrectSoundRef.current = new Audio('/sounds/wrong.mp3');
    
    // Preload audio
    if (correctSoundRef.current) correctSoundRef.current.preload = 'auto';
    if (incorrectSoundRef.current) incorrectSoundRef.current.preload = 'auto';
    
    return () => {
      // Cleanup
      if (correctSoundRef.current) {
        correctSoundRef.current = null;
      }
      if (incorrectSoundRef.current) {
        incorrectSoundRef.current = null;
      }
    };
  }, []);

  const playSound = (isCorrect: boolean) => {
    try {
      const audio = isCorrect ? correctSoundRef.current : incorrectSoundRef.current;
      if (audio) {
        audio.currentTime = 0; // Reset về đầu
        audio.play().catch(e => console.log('Audio play failed:', e));
      }
    } catch (error) {
      console.log('Sound play error:', error);
    }
  };

  const handleSelect = (oIdx: number) => {
    if (showResult || checked) return;
    const newSelected = [...selected];
    newSelected[current] = oIdx;
    setSelected(newSelected);
    saveState({ selected: newSelected, showResult, current, checked });
  };

  const handleCheck = () => {
    setChecked(true);
    
    // Phát âm thanh dựa trên câu trả lời
    if (questions[current] && selected[current] !== null) {
      const isCorrect = selected[current] === questions[current].answer;
      playSound(isCorrect);
    }
    
    saveState({ selected, showResult, current, checked: true });
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setChecked(false);
      saveState({ selected, showResult, current: current + 1, checked: false });
    } else {
      // Kết thúc quiz - lưu kết quả và chuyển hướng
      const score = selected.reduce((acc, answer, index) => {
        if (questions[index] && answer === questions[index].answer) {
          return acc + 1;
        }
        return acc;
      }, 0);
      
      const result = {
        score,
        total: questions.length,
        percentage: questions.length > 0 ? (score / questions.length) * 100 : 0,
        answers: selected,
        questions
      };
      
      localStorage.setItem('quizResult', JSON.stringify(result));
      localStorage.removeItem('quizState'); // Xóa trạng thái quiz cũ
      
      // Chuyển hướng đến trang kết quả
      router.push('/result');
    }
  };

  // Lưu trạng thái vào localStorage
  function saveState(state: { selected: number[]; showResult: boolean; current: number; checked: boolean }) {
    localStorage.setItem("quizState", JSON.stringify(state));
  }

  const correctCount = questions.length > 0
    ? selected.filter((ans, idx) => questions[idx] && ans === questions[idx].answer).length
    : 0;

  // Progress bar
  const progress = questions.length > 0 ? ((current / questions.length) * 100) : 0;

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-2 md:px-4 relative">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-30">
        <Navbar />
      </div>
      
      {/* Main content center */}
      <div className="max-w-2xl w-full flex flex-col items-center justify-center pt-16 md:pt-20 pb-24 md:pb-32" style={{ minHeight: '70vh' }}>
        {/* Progress bar - Above questions */}
        <div className="w-full mb-4 md:mb-6 px-2 md:px-4">
          <div className="w-full h-3 rounded-full relative" style={{ background: '#eaf7ea' }}>
            <div
              className="h-3 rounded-full transition-all"
              style={{ width: `${progress}%`, background: '#6ad47b' }}
            ></div>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-10 text-gray-500">Đang tải câu hỏi...</div>
        ) : questions.length > 0 && questions[current] ? (
          <div className="space-y-4 md:space-y-8 w-full">
            <div className="rounded-xl shadow p-3 md:p-4" style={{ background: '#f7f8fa' }}>
              <div className="mb-3 baloo font-bold text-center text-sm md:text-xl leading-tight md:leading-relaxed">
                Câu {current + 1} : {questions[current].question}
              </div>
              <div className="grid gap-2 md:gap-3">
                {questions[current].options.map((opt, oIdx) => {
                  const isChecked = selected[current] === oIdx;
                  let optionClass =
                    "flex items-center px-3 md:px-4 py-2 md:py-3 rounded-lg border font-semibold cursor-pointer transition select-none text-sm md:text-base";
                  if (isChecked && !checked) optionClass += " border-blue-500";
                  else optionClass += " border-gray-300";
                  // Màu nền đáp án
                  let bgColor = '#fff';
                  if (isChecked && !checked) bgColor = '#eaf1ff';
                  if (checked) {
                    if (questions[current] && oIdx === questions[current].answer) {
                      optionClass += " border-green-500";
                      bgColor = '#eaf7ea';
                    } else if (isChecked && questions[current] && oIdx !== questions[current].answer) {
                      optionClass += " border-red-500";
                      bgColor = '#ffeaea';
                    }
                  }
                  return (
                    <div
                      key={oIdx}
                      className={optionClass}
                      onClick={() => handleSelect(oIdx)}
                      style={{ userSelect: "none", background: bgColor }}
                    >
                      <span
                        className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center mr-2 md:mr-3 text-xs md:text-base font-bold rounded-full border"
                        style={{
                          borderColor: isChecked && !checked ? '#3b82f6' : '#e5e7eb',
                          background: isChecked && !checked ? '#eaf1ff' : '#fff',
                          color: '#374151',
                        }}
                      >{String.fromCharCode(65 + oIdx)}</span>
                      <span className="flex-1 baloo text-sm md:text-xl font-normal leading-tight md:leading-relaxed">{opt}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {showResult && (
              <div className="mt-6 text-center text-lg font-bold text-green-700">
                Bạn trả lời đúng {correctCount} / {questions.length} câu
              </div>
            )}
          </div>
        ) : null}
      </div>
      {/* Footer fixed bottom */}
      <footer className="fixed bottom-0 left-0 w-full bg-white z-10 shadow-inner">
        <div className="max-w-2xl mx-auto flex justify-between items-center min-h-[80px] py-4 px-4 md:px-6">
          {!checked ? (
            <>
              <button
                type="button"
                className="bg-gray-100 px-4 md:px-6 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-200 cursor-pointer text-sm md:text-base"
                onClick={() => {
                  setSelected(Array(questions.length).fill(null));
                  setShowResult(false);
                  setCurrent(0);
                  setChecked(false);
                  localStorage.removeItem('quizState');
                  localStorage.removeItem('quizResult');
                  saveState({ selected: Array(questions.length).fill(null), showResult: false, current: 0, checked: false });
                }}
              >
                Trở về
              </button>
              <button
                type="button"
                className="bg-red-600 px-4 md:px-6 py-2 rounded-lg font-semibold text-white hover:bg-red-700 cursor-pointer text-sm md:text-base disabled:opacity-50"
                onClick={handleCheck}
                disabled={selected[current] === null}
              >
                Kiểm tra
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1 md:gap-2">
                {questions[current] && selected[current] === questions[current].answer ? (
                  <>
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-green-600 font-bold text-sm md:text-lg baloo">Đúng rồi, bạn giỏi quá!</span>
                  </>
                ) : (
                  <>
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-red-600 font-bold text-lg baloo">Tiếc quá, bạn sai rồi!</span>
                  </>
                )}
              </div>
              <button
                type="button"
                className="bg-red-600 px-4 md:px-6 py-2 rounded-lg font-semibold text-white hover:bg-red-700 cursor-pointer text-sm md:text-base"
                onClick={handleNext}
              >
                {current < questions.length - 1 ? "Tiếp tục" : "Xem kết quả"}
              </button>
            </>
          )}
        </div>
      </footer>
    </main>
  );
}