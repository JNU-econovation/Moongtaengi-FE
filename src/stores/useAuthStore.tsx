import { create } from "zustand";
import { getTokenFromSession } from "../utils/getTokenFromSession";
import { deleteToken } from "../utils/deleteToken";

interface AuthState {
    isLogin: boolean;
    userId: number | null;
    userNickname: string | null;
    setUserId: (arg: number) => void;
    setNickname: (arg: string) => void;
    setIsLogin: () => void;
    logout: () => boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLogin: !!getTokenFromSession(),

    userId: null,
    userNickname: null,

    setUserId: (id) => set({userId: id}),
    setNickname: (nickname) => set({userNickname: nickname}),

    setIsLogin: () => {
        const token = getTokenFromSession();
        if (!token) {
            set({isLogin: false});
            return;
        }
        set({isLogin: true});
    },

    logout: () => {
        deleteToken();
        set({isLogin: false});
        alert('로그아웃 되었습니다.');
        return true;
    }
}));