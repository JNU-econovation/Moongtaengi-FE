import { create } from "zustand";
import { getTokenFromSession } from "../utils/getTokenFromSession";
import { deleteToken } from "../utils/deleteToken";

interface AuthState {
    isLogin: boolean;
    setIsLogin: (status: boolean) => void;
    logout: () => boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLogin: !!getTokenFromSession(),

    setIsLogin: (status) => {
        const token = getTokenFromSession();
        if (token) set({isLogin: status});
    },

    logout: () => {
        deleteToken();
        set({isLogin: false});
        alert('로그아웃 되었습니다.');
        return true;
    }
}));