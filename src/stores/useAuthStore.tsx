import { create } from "zustand";
import { getTokenFromSession } from "../utils/getTokenFromSession";
import { deleteToken } from "../utils/deleteToken";

interface AuthState {
    isLogin: boolean;
    setIsLogin: () => void;
    logout: () => boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLogin: !!getTokenFromSession(),

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