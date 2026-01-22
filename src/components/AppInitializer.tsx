import { useEffect } from "react";
import { useGlobalUserDataQuery } from "../hooks/queries/useGlobalUserDataQuery"
import { useAuthStore } from "../stores/useAuthStore";

export const AppInitializer = () => {
    const {data} = useGlobalUserDataQuery();

    const setUserId = useAuthStore((s) => s.setUserId);
    const setNickname = useAuthStore((s) => s.setNickname);

    useEffect(() => {
        if (!data) return;

        setUserId(data.id);
        setNickname(data.nickname);
    }, [data, setUserId, setNickname]);

    return null;
}