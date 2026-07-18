import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { display, body, colors, bg } from "../theme";

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame, fps, config: { damping: 18 } });
  const t2 = spring({ frame: frame - 18, fps, config: { damping: 18 } });
  const t3 = spring({ frame: frame - 36, fps, config: { damping: 14 } });
  const pulse = 1 + Math.sin(frame / 8) * 0.02;
  return (
    <AbsoluteFill style={{ background: bg, padding: 80, justifyContent: "center", alignItems: "center", textAlign: "center", fontFamily: body }}>
      <div style={{ opacity: t }}>
        <span style={{ color: colors.gold, fontSize: 26, letterSpacing: 6, textTransform: "uppercase", fontWeight: 800 }}>Vagas limitadas</span>
      </div>
      <h2 style={{ fontFamily: display, color: colors.white, fontSize: 130, lineHeight: 1, fontWeight: 900, margin: "20px 0 30px", opacity: t2, transform: `translateY(${interpolate(t2,[0,1],[30,0])}px)` }}>
        Sua aprovação<br />começa <span style={{ color: colors.goldBright, fontStyle: "italic" }}>hoje</span>.
      </h2>
      <p style={{ color: colors.muted, fontSize: 32, maxWidth: 780, lineHeight: 1.4, opacity: t2 }}>
        Método Redação UEMA/PAES — Prof. Maurílio Alencar
      </p>
      <div style={{ marginTop: 56, opacity: t3, transform: `scale(${pulse})` }}>
        <div style={{ padding: "32px 64px", borderRadius: 999, background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldBright})`, color: colors.ink, fontWeight: 900, fontSize: 44, letterSpacing: 2, textTransform: "uppercase", boxShadow: "0 30px 80px -20px rgba(255,216,107,0.6)" }}>
          Quero a apostila
        </div>
        <div style={{ marginTop: 24, color: colors.white, fontSize: 26, fontWeight: 600 }}>
          Acesso imediato · Garantia 7 dias
        </div>
      </div>
    </AbsoluteFill>
  );
};
