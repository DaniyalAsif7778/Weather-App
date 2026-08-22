declare module "howler" {
  export class Howl {
    constructor(options: { src: string[]; volume?: number; loop?: boolean });
    play(): number;
    pause(): void;
    stop(): void;
    playing(): boolean;
  }
}
