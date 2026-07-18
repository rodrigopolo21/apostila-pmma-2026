import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { display, body, colors, bg } from "../theme";

const Counter: React.FC<{ to: number; suffix?: string; duration?: number }> = ({ to, suffix = "", duration = 50 }) => {
  const frame = useCurrentFrame();
  const v = Math.round(interpolate(frame, [0, duration], [0, to], { extrapolateRight: "clamp" }));
  return <>{v}{suffix}</>;
};

export const Stat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s1 = spring({ frame, fps, config: { damping: 18 } });
  const s2 = spring({ frame: frame - 35, fps, config: { damping: 18 } });
  const stats = [
    { v: 1200, suf: "+", l: "alunos aprovados" },
    { v: 120, suf: "+", l: "redações nota máxima" },
    { v: 13, suf: "+", l: "anos de experiência" },
  ];
  return (
    <AbsoluteFill style={{ background: bg, padding: 80, justifyContent: "center", fontFamily: body }}>
      <div style={{ opacity: s1 }}>
        <span style={{ color: colors.blueBright, fontSize: 26, letterSpacing: 6, textTransform: "uppercase", fontWeight: 800 }}>números reais</span>
        <h2 style={{ fontFamily: display, color: colors.white, fontSize: 96, lineHeight: 1.05, fontWeight: 900, margin: "20px 0 50px" }}>
          A bagagem do<br />Prof. <span style={{ color: colors.goldBright }}>Maurílio Alencar</span>
        </h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28, opacity: s2 }}>
        {stats.map((st, i) => {
          const delay = i * 14;
          const sp = spring({ frame: frame - 30 - delay, fps, config: { damping: 14 } });
          return (
            <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 28, opacity: sp, transform: `translateX(${interpolate(sp,[0,1],[-40,0])}px)` }}>
              <div style={{ fontFamily: display, color: colors.goldBright, fontSize: 140, fontWeight: 900, lineHeight: 1, minWidth: 380 }}>
                <Counter to={st.v} suffix={st.suf} duration={45} />
              </div>
              <div style={{ color: colors.white, fontSize: 36, fontWeight: 600 }}>{st.l}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
