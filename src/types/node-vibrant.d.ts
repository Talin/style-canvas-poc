declare module 'node-vibrant' {
  export interface Palette {
    Vibrant?: Swatch;
    Muted?: Swatch;
    DarkVibrant?: Swatch;
    DarkMuted?: Swatch;
    LightVibrant?: Swatch;
    LightMuted?: Swatch;
  }

  export interface Swatch {
    hex: string;
    rgb: [number, number, number];
    hsl: [number, number, number];
    population: number;
  }

  export class Vibrant {
    static from(src: string): Vibrant;
    getPalette(): Promise<Palette>;
  }

  export { Vibrant as default };
}

declare module 'node-vibrant/dist/esm/pipeline' {
  export const pipeline: any;
} 