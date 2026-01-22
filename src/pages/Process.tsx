import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStudyQuery } from '../hooks/queries/useStudyQuery.tsx';
import { useProcessQuery } from '../hooks/queries/useProcessQuery.tsx';
import { ProcessCard } from '../components/ProcessCard.tsx';
import { useQueryClient } from '@tanstack/react-query';

const Process = () => {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { studyId = '' } = useParams<{ studyId: string }>();

  const { data: studyData, isLoading: isStudyLoading } = useStudyQuery(studyId ?? '');
  const { data: processData = [], isLoading: isProcessLoading } = useProcessQuery(studyId ?? '');

  console.log('processData: ', processData);

  // 전체 프로세스 항목 Refs
  const itemRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // 하단 과제 카드 가로 스크롤 Refs
  const scrollRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});


  // 하단 과제 카드 스크롤 핸들러
  const handleScroll = (processId: number, direction: 'left' | 'right') => {
    const container = scrollRefs.current[processId];
    if (container) {
      const scrollAmount = container.clientWidth; // 한 화면(3개 분량)만큼 이동
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };


  useEffect(() => {
    if (isStudyLoading || isProcessLoading) return;

    // 스터디 자체가 없으면 메인으로 리다이렉트
    if (!studyData) {
      navigate('/', { replace: true });
    }

    // 프로세스 데이터가 없으면 상세 설정 페이지로 리다이렉트
    if (processData && processData.length === 0 && studyData?.myRole === 'HOST') {
      navigate(`/studies/${studyId}/setting`, {replace: true});
    }

  }, [isStudyLoading, isProcessLoading, studyData, processData]);

  // 페이지 접속 시 스크롤
  useEffect(() => {
    const activeProcess = processData?.find(p => p.status === 'IN_PROGRESS');
    if (activeProcess) {
      const activeElement = itemRefs.current[activeProcess.processOrder];
      if (activeElement) {
        setTimeout(() => {
          activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [processData]);

  // 전역 데이터 캐시 쿼리
  useEffect(() => {
    queryClient.invalidateQueries({queryKey: ['userGlobalData']});
  }, []);


  if (isStudyLoading || isProcessLoading) return <div className='h-screen bg-custom-bg text-white'>로딩 중...</div>;
  if (!studyData) return null;
  if (processData && processData.length === 0) return <div className='h-screen bg-custom-bg text-white'>아직 프로세스가 생성되지 않았습니다.</div>

  return (
    <div className="min-h-full bg-custom-bg text-white flex flex-col items-center">
      <div className="w-full max-w-6xl px-4 py-10 flex flex-col gap-24 mb-40 md:scale-90 2xl:scale-98">
        {processData.map((process) => (
          <ProcessCard studyData={studyData} processData={processData} process={process} scrollRefs={scrollRefs} itemRefs={itemRefs} handleScroll={handleScroll} />
        ))}
      </div>
    </div >
  );
};

export default Process;
