import { create } from "zustand";

interface ModalState {
    modalMode: "createStudy" | "inviteCode" | "ECONO" | null;
    setModalMode: (status: "createStudy" | "inviteCode" | "ECONO" | null) => void;
}

export const useModalModeStore = create<ModalState>((set) => ({
    modalMode: null,
    setModalMode: (status) => set({modalMode: status})
}))

