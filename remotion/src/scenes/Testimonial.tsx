import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { display, body, colors, bg } from "../theme";

export const Testimonial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame, fps, config: { damping: 18 } });
  const t2 = spring({ frame: frame - 20, fps, config: { damping: 16 } });
  return (
    <AbsoluteFill style={{ background: bg, padding: 80, justifyContent: "center", fontFamily: body }}>
      <div style={{ opacity: t, transform: `scale(${interpolate(t,[0,1],[0.94,1])})` }}>
        <div style={{ background: "rgba(255,255,255,0.05)", border: `1px solid rgba(212,175,55,0.3)`, borderRadius: 36, padding: 56, boxShadow: "0 40px 120px -30px rgba(29,78,216,0.5)" }}>
          <div style={{ fontFamily: display, color: colors.goldBright, fontSize: 140, lineHeight: 0.6, fontWeight: 900 }}>“</div>
          <p style={{ fontFamily: display, color: colors.white, fontSize: 56, lineHeight: 1.2, fontWeight: 700, margin: "8px 0 36px" }}>
            Tirei <span style={{ color: colors.goldBright }}>10</span> na redação da UEMA. Os modelos prontos do método foram decisivos — segui o passo a passo na prova.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 20, opacity: t2 }}>
            <Img src="https://i.pravatar.cc/200?img=45" style={{ width: 96, height: 96, borderRadius: "50%", border: `3px solid ${colors.goldBright}` }} />
            <div>
              <div style={{ color: colors.white, fontSize: 32, fontWeight: 800 }}>Camila Soares</div>
              <div style={{ color: colors.blueBright, fontSize: 24, fontWeight: 600 }}>Aprovada Medicina UEMA</div>
            </div>
            <div style={{ marginLeft: "auto", padding: "14px 24px", borderRadius: 999, background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldBright})`, color: colors.ink, fontWeight: 900, fontSize: 26 }}>NOTA 10/10</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
