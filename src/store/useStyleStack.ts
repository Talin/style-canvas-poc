import { create } from 'zustand';

type Palette = { primary: string[]; neutrals: string[] };

interface StyleStackState {
  palette?: Palette;
  setPalette: (p: Palette) => void;

  activeFill?: string;
  setActiveFill: (c: string) => void;   // <- in the interface
}

export const useStyleStack = create<StyleStackState>((set) => ({
  palette: undefined,
  setPalette: (p) => set({ palette: p }),

  activeFill: undefined,
  setActiveFill: (c) => set({ activeFill: c }),   // <- make sure this exists
}));
