import axios from "axios";
import { getTokenFromSession } from "../../utils/getTokenFromSession";
import { useQuery } from "@tanstack/react-query";

interface StudyItem {
  studyId: number;
  studyName: string;
  studyPeriod: {
    startDate: string;
    endDate: string;
  };
  studyTopic: string;
  studyInviteCode: string;
  myRole: 'HOST' | 'GUEST';
}

const getStudyApi = async (studyId: string) => {
    const token = getTokenFromSession();

    const response = await axios.get(`${import.meta.env.VITE_API_CREATE_STUDY}/${studyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data;
}

export const useStudyQuery = (studyId: string) => {
    return useQuery<StudyItem>({
        queryKey: ['studyInfo', studyId],
        queryFn: () => getStudyApi(studyId),
        enabled: !!studyId && !!getTokenFromSession()
    })
}