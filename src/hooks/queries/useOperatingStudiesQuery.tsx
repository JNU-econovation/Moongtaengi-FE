import { useQuery } from "@tanstack/react-query"
import { studyListApi } from "../../utils/api/studyListApi";
import { getTokenFromSession } from "../../utils/getTokenFromSession";

interface StudyItem {
    studyId: number;
    studyName: string;
}

export const useOperatingStudiesQuery = () => {
    return useQuery<StudyItem[]>({
        queryKey: ['operatingStudyList'],
        queryFn: () => studyListApi('/studies/me/managed'),
        enabled: !!getTokenFromSession()
    })
}