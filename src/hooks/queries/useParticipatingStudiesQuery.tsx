import { useQuery } from "@tanstack/react-query";
import { studyListApi } from "../../utils/api/studyListApi";
import { getTokenFromSession } from "../../utils/getTokenFromSession";

interface StudyItem {
    studyId: number;
    studyName: string;
}

export const usePaticipatingStudiesQuery = () => {
    return useQuery<StudyItem[]>({
        queryKey: ['participatingStudyList'],
        queryFn: () => studyListApi('/studies/me/joined'),
        enabled: !!getTokenFromSession()
    })
}