import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Hook } from "./scenes/Hook";
import { Stat } from "./scenes/Stat";
import { Method } from "./scenes/Method";
import { Testimonial } from "./scenes/Testimonial";
import { CTA } from "./scenes/CTA";

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#05070d" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={90}>
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={springTiming({ config: { damping: 200 }, durationInFrames: 18 })} />
        <TransitionSeries.Sequence durationInFrames={90}>
          <Stat />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: 22 })} />
        <TransitionSeries.Sequence durationInFrames={110}>
          <Method />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: 22 })} />
        <TransitionSeries.Sequence durationInFrames={95}>
          <Testimonial />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={springTiming({ config: { damping: 200 }, durationInFrames: 18 })} />
        <TransitionSeries.Sequence durationInFrames={120}>
          <CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
