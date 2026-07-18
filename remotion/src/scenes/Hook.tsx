import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { display, body, colors, bg } from "../theme";

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s1 = spring({ frame: frame - 4, fps, config: { damping: 18 } });
  const s2 = spring({ frame: frame - 18, fps, config: { damping: 20 } });
  const s3 = spring({ frame: frame - 36, fps, config: { damping: 14 } });
  const blur = interpolate(s1, [0, 1], [16, 0]);
  return (
    <AbsoluteFill style={{ background: bg, padding: 80, justifyContent: "center", fontFamily: body }}>
      <div style={{ opacity: s1, transform: `translateY(${interpolate(s1,[0,1],[24,0])}px)` }}>
        <span style={{ display: "inline-block", padding: "10px 20px", border: `1px solid ${colors.gold}`, borderRadius: 999, color: colors.gold, fontSize: 24, letterSpacing: 6, textTransform: "uppercase", fontWeight: 700 }}>UEMA · PAES</span>
      </div>
      <h1 style={{ fontFamily: display, color: colors.white, fontSize: 130, lineHeight: 1.02, margin: "32px 0 0", fontWeight: 900, opacity: s2, filter: `blur(${blur}px)`, transform: `translateY(${interpolate(s2,[0,1],[40,0])}px)` }}>
        A redação<br />
        <span style={{ color: colors.goldBright, fontStyle: "italic" }}>vale</span> a sua<br />
        aprovação.
      </h1>
      <div style={{ marginTop: 36, opacity: s3, transform: `translateY(${interpolate(s3,[0,1],[20,0])}px)` }}>
        <p style={{ color: colors.muted, fontSize: 30, maxWidth: 760, lineHeight: 1.4 }}>
          E ela é o único critério onde você pode <span style={{ color: colors.white, fontWeight: 800 }}>tirar 10</span> e ultrapassar o concorrente.
        </p>
      </div>
    </AbsoluteFill>
  );
};
