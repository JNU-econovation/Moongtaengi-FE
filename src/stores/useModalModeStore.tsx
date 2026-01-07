import { create } from "zustand";

interface ModalState {
    modalMode: "createStudy" | "inviteCode" | null;
    setModalMode: (status: "createStudy" | "inviteCode" | null) => void;
}

export const useModalModeStore = create<ModalState>((set) => ({
    modalMode: null,
    setModalMode: (status) => set({modalMode: status})
}))

