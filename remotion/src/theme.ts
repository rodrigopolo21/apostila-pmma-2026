import { loadFont as loadDisplay } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadBody } from "@remotion/google-fonts/Inter";

export const display = loadDisplay("normal", { weights: ["700", "900"] }).fontFamily;
export const body = loadBody("normal", { weights: ["400", "600", "800"] }).fontFamily;

export const colors = {
  ink: "#05070d",
  navy: "#0a1a3a",
  blue: "#1d4ed8",
  blueBright: "#3b82f6",
  gold: "#d4af37",
  goldBright: "#ffd86b",
  white: "#ffffff",
  muted: "#9ba3b4",
};

export const bg =
  "radial-gradient(ellipse at 30% 0%, rgba(29,78,216,0.35) 0%, transparent 55%), radial-gradient(ellipse at 70% 100%, rgba(212,175,55,0.18) 0%, transparent 60%), linear-gradient(180deg, #05070d 0%, #0a1124 100%)";
