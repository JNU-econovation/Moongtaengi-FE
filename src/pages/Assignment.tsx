import { useNavigate, useParams } from "react-router-dom"

export const Assignment = () => {
    const navigate = useNavigate();

    const {studyId, processId} = useParams<"studyId" | "processId">();
    const assignmentId: number = 1;

    return (
        <button 
            onClick={() => {navigate(`/studies/${studyId}/processes/${processId}/assignments/${assignmentId}/edit`)}}
            className="bg-white text-black"
        >
            스터디 과제 작성하기
        </button>
    )
}