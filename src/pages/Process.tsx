import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import NavbarPure from '../components/NavbarPure';

// 타입 정의
interface Week {
  weekNum: number;
  topic: string;
  status: 'active' | 'hidden';
  date?: string; // 날짜는 없을 수도 있다고 가정하거나 필수라면 제거
}

interface StudyData {
  studyId: string;
  currentStep: number;
  totalWeeks: Week[];
}


// 메인 페이지 컴포넌트
const Process: React.FC = () => {
  // useParams 제네릭 타입 명시 (react-router-dom 버전에 따라 다를 수 있음)
  const { studyId } = useParams<{ studyId: string }>();
  
  // 각 주차별 DOM 요소 참조를 위한 Ref (Key: weekNum, Value: div element)
  const weekRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // 초기 데이터
  const [studyData, setStudyData] = useState<StudyData>({
    studyId: studyId || "23",
    currentStep: 2,
    totalWeeks: [
      { weekNum: 1, topic: "기본 문법", status: "active", date: "10월 23일 / 10월 29일" },
      { weekNum: 2, topic: "컴포넌트", status: "active", date: "10월 30일 / 11월 7일" },
      { weekNum: 3, topic: "훅(Hooks)", status: "hidden", date: "11월 8일 / 11월 14일" },
      { weekNum: 4, topic: "리덕스", status: "hidden", date: "11월 15일 / 11월 21일" }
    ]
  });

  // 페이지 진입 시 혹은 currentStep 변경 시 해당 주차로 스크롤 이동
  useEffect(() => {
    const currentWeekElement = weekRefs.current[studyData.currentStep];
    if (currentWeekElement) {
      setTimeout(() => {
        currentWeekElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [studyData.currentStep]);

  // 페이지 추가 핸들러
  const handleAddPage = () => {
    if (studyData.currentStep < studyData.totalWeeks.length) {
      setStudyData((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1
      }));
    }
  };

  // 현재 진행 상황(currentStep)까지 보여주되, 순서는 오름차순
  const visibleWeeks = studyData.totalWeeks
    .filter((week) => week.weekNum <= studyData.currentStep)
    .sort((a, b) => a.weekNum - b.weekNum);

  return (
    <div className="min-h-screen bg-custom-bg text-white flex flex-col items-center">
      {/* 네비게이션 바: 상단 고정 및 블러 처리 */}
      <div className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/50 rounded-full">
        <NavbarPure />
      </div>

      <div className="w-full max-w-6xl px-4 py-10 flex flex-col gap-24 mb-40">
        {/* 주차별 리스트 렌더링 */}
        {visibleWeeks.map((week) => (
          <div 
            key={week.weekNum} 
            ref={(el) => { weekRefs.current[week.weekNum] = el; }} // Ref 할당
            className="w-full md:mb-10 2xl:mb-20 md:scale-85 2xl:scale-100"
          >
            
            {/* 날짜 및 상단 컨트롤 */}
            <div className="flex justify-between items-end mb-4 px-2">
              <h2 className="text-3xl font-bold">{week.date || `Week ${week.weekNum}`}</h2>
              <div className="flex gap-2 text-sm text-gray-400">
                <button className="bg-[#2C2C2C] px-3 py-1 rounded-full hover:bg-gray-700">수정하기</button>
                <button className="bg-[#2C2C2C] px-3 py-1 rounded-full hover:bg-gray-700">나의 과제 모아보기</button>
              </div>
            </div>

            {/* 그리드 레이아웃 */}
            <div className="flex flex-col gap-4">
              
              {/* 상단: 메인 주제 카드 + 첫 번째 과제 카드 */}
              <div className="flex flex-col md:flex-row gap-4 h-auto md:h-80">
                
                {/* 메인 주제 카드 (발견하기) */}
                <div className="flex-1 bg-[#1F1F1F] rounded-2xl p-6 relative flex flex-col justify-between overflow-hidden group">
                  <div className="z-10">
                    <span className="text-black text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-b from-custom-gradient-blue to-custom-gradient-green">TRACK 3</span>
                    <p className="text-gray-400 text-sm mt-4">AI 추천</p>
                    <h3 className="text-5xl font-bold mt-1 mb-2">발견하기</h3>
                    <p className="text-gray-400 text-lg">{week.topic} 설명</p>
                  </div>

                  {/* 캐릭터 영역 (흰색 박스) */}
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 w-48 h-48 bg-white rounded-2xl shadow-lg"></div>

                  {/* 하단 진행도 바 */}
                  <div className="w-full flex gap-1 mt-6 h-2">
                    {studyData.totalWeeks.map((w) => (
                      <div 
                        key={w.weekNum} 
                        className={`flex-1 rounded-full h-full ${w.weekNum <= week.weekNum ? 'bg-white' : 'bg-gray-600'}`}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* 첫 번째 과제 카드 */}
                <div className="w-full md:w-1/3 bg-[#1F1F1F] rounded-2xl p-6 flex flex-col justify-between hover:bg-[#2a2a2a] transition-colors cursor-pointer">
                  <div>
                    <h4 className="text-2xl font-bold mb-2">이번 주<br />부여 받은 과제</h4>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-10 h-10 bg-gray-600 rounded-full"></div> 
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">닉네임</span>
                      <span className="text-xs text-gray-400">이번 주 과제 파일명 1</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 하단: 과제 카드 리스트 (3개) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-64">
                {[2, 3, 4].map((idx) => (
                  <div key={idx} className="bg-[#1F1F1F] rounded-2xl p-6 flex flex-col justify-between hover:bg-[#2a2a2a] transition-colors cursor-pointer">
                    <div>
                       <h4 className="text-xl font-bold mb-2">이번 주<br />부여 받은 과제</h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-xs">아이콘</div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">닉네임</span>
                        <span className="text-xs text-gray-400">이번 주 과제 파일명 {idx}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>
      
      {/* 페이지 추가 버튼 (테스트용) */}
      <div className="fixed bottom-10 z-50">
        <button 
          onClick={handleAddPage}
          className="bg-[#2C2C2C] text-white px-6 py-3 rounded-full hover:bg-gray-600 transition-colors font-bold shadow-lg border border-gray-700"
        >
          페이지 추가
        </button>
      </div>
    </div>
  );
};

export default Process;