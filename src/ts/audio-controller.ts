import { Howl } from "howler";
import rainAudioUrl from "../assets/gentle-rain.mp3";

let ambientSound: Howl | undefined;

export function updateAmbientSound(isRainy: boolean): void {
  const badge = document.querySelector<HTMLElement>(".hero-sound-badge");
  const label = document.querySelector<HTMLElement>(".badgeTag");
  if (!badge || !label) return;

  label.textContent = isRainy ? "Gentle rain" : "Light breeze";
  if (!isRainy) {
    ambientSound?.stop();
    ambientSound = undefined;
    badge.onclick = null;
    return;
  }

  ambientSound?.stop();
  ambientSound = new Howl({ src: [rainAudioUrl], volume: 0.2, loop: true });
  ambientSound.play();
  badge.onclick = () => (ambientSound?.playing() ? ambientSound.pause() : ambientSound?.play());
}
