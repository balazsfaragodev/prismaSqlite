import { atom } from "jotai";

export const addContactModalOpenAtom = atom(false);
export const editContactModalOpenAtom = atom(false);

export const fileAtom = atom<File | null>(null);
export const previewUrlAtom = atom<string | null>(null);
