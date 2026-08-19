import { Howl, Howler } from "howler";

export function sound(condition: string) {
  const soundBadge = document.querySelector(".hero-sound-badge");

  if (condition.includes("rain")) {
    const badgeTag = document.querySelector(".badgeTag");

    if (badgeTag.innerHTML != condition) {
      badgeTag.innerHTML = condition;
    }
    soundBadge.addEventListener("click", (event) => {
        let count = 0
      if (sound.playing() && count == 0) {
        sound.stop()
        count = 1
      }else{
        count = 0;
        sound.play()
      }
    });
    const sound = new Howl({
      src: ["/src/assets/gentle-rain.mp3"],
    });
    sound.play();
    sound.volume(0.2)
  }
}
