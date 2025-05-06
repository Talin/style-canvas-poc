import { create } from 'zustand';

type Palette = { primary: string[]; neutrals: string[] };

interface StyleStackState {
  palette?: Palette;
  setPalette: (p: Palette) => void;
}

export const useStyleStack = create<StyleStackState>((set) => ({
  palette: undefined,
  setPalette: (p) => set({ palette: p }),
}));
