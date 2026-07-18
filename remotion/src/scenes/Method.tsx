import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { display, body, colors, bg } from "../theme";

export const Method: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame, fps, config: { damping: 18 } });
  const steps = [
    { n: "01", t: "Estrutura UEMA", d: "Introdução, dois desenvolvimentos e conclusão reflexiva — sem proposta de intervenção." },
    { n: "02", t: "Repertório certo", d: "Filosofia, literatura e dados que a banca da UEMA realmente valoriza." },
    { n: "03", t: "Modelos prontos", d: "Frases-coringa, conectivos e fechamentos validados em provas reais." },
  ];
  return (
    <AbsoluteFill style={{ background: bg, padding: 80, justifyContent: "center", fontFamily: body }}>
      <div style={{ opacity: t }}>
        <span style={{ color: colors.gold, fontSize: 26, letterSpacing: 6, textTransform: "uppercase", fontWeight: 800 }}>o método</span>
        <h2 style={{ fontFamily: display, color: colors.white, fontSize: 100, lineHeight: 1.02, fontWeight: 900, margin: "16px 0 50px" }}>
          3 passos para <span style={{ color: colors.blueBright, fontStyle: "italic" }}>nota 9+</span>
        </h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {steps.map((s, i) => {
          const sp = spring({ frame: frame - 18 - i * 14, fps, config: { damping: 16 } });
          return (
            <div key={i} style={{ display: "flex", gap: 28, alignItems: "flex-start", padding: 28, borderRadius: 24, background: "rgba(255,255,255,0.04)", border: `1px solid rgba(212,175,55,0.25)`, opacity: sp, transform: `translateX(${interpolate(sp,[0,1],[60,0])}px)` }}>
              <div style={{ fontFamily: display, color: colors.goldBright, fontSize: 72, fontWeight: 900, lineHeight: 0.9, minWidth: 140 }}>{s.n}</div>
              <div>
                <div style={{ fontFamily: display, color: colors.white, fontSize: 46, fontWeight: 700 }}>{s.t}</div>
                <div style={{ color: colors.muted, fontSize: 28, marginTop: 8, lineHeight: 1.35 }}>{s.d}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
