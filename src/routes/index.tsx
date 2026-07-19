import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Award, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Clock, Flame,
  ShieldCheck, Star, Target, Users, Zap, FileText,
  Lock, MessageCircle, Instagram, HeartPulse, Wallet,
} from "lucide-react";
import ebookMockup from "@/assets/ebook-pmma.png";
import devicesMockup from "@/assets/hero-apostila.jpg";
import devicesBook from "@/assets/banner-pmma.jpg";
import pmmaOfficer from "@/assets/soldado-pmma.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Apostila PMMA 2026 | Polícia Militar do Maranhão" },
      { name: "description", content: "Apostila Completa PMMA: Legislação, Informática, Português, Cebraspe. Teoria + Questões + Mapas Mentais. R$ 29,99 — acesso imediato." },
    ],
  }),
});

const WHATSAPP = "https://wa.me/5598984122272?text=Quero%20a%20Apostila%20PMMA";
const CHECKOUT = "https://pay.kirvano.com/30b865d2-825b-4685-885e-19bc6b64a121";
const INSTAGRAM = "https://instagram.com/apostilapmma";

/* ---------------- helpers ---------------- */

function FadeIn({ children, delay = 0, y = 30 }: { children: React.ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative py-20 md:py-32 container-px ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function GoldDivider() {
  return (
    <div className="mx-auto my-6 h-px w-32 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
  );
}

function CTAButtons({ size = "lg" }: { size?: "lg" | "md" }) {
  const padding = size === "lg" ? "px-8 py-5 text-base md:text-lg" : "px-6 py-4 text-sm md:text-base";
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-stretch justify-center">
      <motion.a
        href={CHECKOUT}
        target="_blank"
        rel="noopener"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative inline-flex items-center justify-center gap-2 rounded-full gradient-gold text-[var(--ink)] font-bold tracking-wide ${padding} shine-overlay glow-gold uppercase`}
      >
        <Flame className="size-5" />
        Quero garantir minha apostila
      </motion.a>
      <motion.a
        href={WHATSAPP}
        target="_blank"
        rel="noopener"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={`inline-flex items-center justify-center gap-2 rounded-full glass-strong text-foreground font-semibold ${padding} hover:border-[var(--gold)] transition-colors`}
      >
        <MessageCircle className="size-5 text-[var(--gold)]" />
        Tirar dúvida
      </motion.a>
    </div>
  );
}

/* ---------------- OfferNav ---------------- */

const OFFER_NAV_LINKS: { label: string; href: string }[] = [
  { label: "Apostila", href: "#apostila" },
  { label: "Conteúdo", href: "#showcase" },
  { label: "Carreira", href: "#autoridade" },
  { label: "Depoimentos", href: "#instagram-proof" },
  { label: "Oferta", href: "#oferta" },
  { label: "FAQ", href: "#faq" },
];

function OfferNav() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 28, delay: 0.15 }}
      aria-label="Seções do site"
      className="fixed top-0 inset-x-0 z-[60] mx-auto mt-3 max-w-5xl rounded-full glass-strong border border-[var(--gold)]/35 px-4 sm:px-6 py-3 sm:py-3.5 shadow-[0_22px_60px_-22px_rgba(0,0,0,0.7)] backdrop-blur-xl"
      style={{ left: "0.75rem", right: "0.75rem" }}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <a
          href="#top"
          className="hidden sm:inline-flex items-center gap-2 pl-1 pr-4 font-display text-[15px] font-bold shrink-0 border-r border-[var(--gold)]/25"
        >
          <ShieldCheck className="size-[18px] text-[var(--gold)]" />
          <span className="gradient-gold-text tracking-tight">Apostila PMMA</span>
        </a>
        <a href="#top" className="sm:hidden inline-flex shrink-0 size-9 rounded-full grid place-items-center bg-[var(--gold)]/12 border border-[var(--gold)]/35">
          <ShieldCheck className="size-[18px] text-[var(--gold)]" />
        </a>
        <div className="relative flex-1 min-w-0 overflow-x-auto no-scrollbar">
          <ul className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
            {OFFER_NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="inline-flex items-center rounded-full px-3.5 sm:px-4 py-2 text-[13px] sm:text-sm font-medium tracking-wide text-foreground/75 hover:text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all duration-300"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const badges = [
    { i: Zap, t: "Entrega Imediata" },
    { i: FileText, t: "Atualizado conforme Edital" },
    { i: Lock, t: "Compra 100% Segura" },
    { i: Award, t: "Acesso Vitalício" },
  ];
  return (
    <div ref={ref} id="top" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Deep blue radial glow */}
      <motion.div style={{ y }} className="absolute inset-0 opacity-95">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 55% at 50% 25%, rgba(212,175,55,0.30) 0%, transparent 65%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 80%, rgba(212,175,55,0.18) 0%, transparent 70%)" }} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)]/10 via-transparent to-[var(--ink)]" />

      {/* luminous vertical lines */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-40">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.span
            key={`line-${i}`}
            className="absolute top-0 h-full w-px"
            style={{
              left: `${10 + i * 16}%`,
              background: `linear-gradient(180deg, transparent 0%, rgba(${i % 2 ? "212,175,55" : "255,216,107"},0.55) 45%, transparent 100%)`,
            }}
            animate={{ opacity: [0.15, 0.7, 0.15], scaleY: [0.7, 1, 0.7] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* denser particles - blue + gold */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 28 }).map((_, i) => {
          const isEmber = i % 2 === 0;
          return (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                background: isEmber ? "#ff9d3c" : "#ffd86b",
                filter: "blur(1px)",
                boxShadow: isEmber ? "0 0 12px #ff7a18" : "0 0 10px #ffd86b",
              }}
              animate={{ y: [0, -40, 0], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.15 }}
            />
          );
        })}
      </div>

      <div className="relative mx-auto max-w-5xl container-px text-center flex flex-col items-center gap-8">
        <FadeIn>
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs md:text-sm font-bold tracking-wider uppercase border-2 border-red-500/60 bg-red-950/30 backdrop-blur-md"
            style={{ boxShadow: "0 0 26px -10px rgba(239,68,68,0.32)" }}
          >
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-70" />
              <span className="relative inline-flex size-2.5 rounded-full bg-red-500" />
            </span>
            <span className="text-red-300">🚨 O EDITAL DA PMMA FOI PUBLICADO</span>
          </motion.span>
        </FadeIn>
        <motion.h1
          initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight max-w-4xl"
        >
          <span className="text-foreground">Sua aprovação na </span>
          <span className="bg-gradient-to-r from-white via-zinc-200 to-white bg-clip-text text-transparent">
            Polícia Militar do Maranhão
          </span>
          <span className="text-foreground"> começa </span>
          <span className="gradient-gold-text">aqui.</span>
        </motion.h1>
        <FadeIn delay={0.4}>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            A <strong className="text-foreground">Apostila Completa da PMMA</strong> reúne todas as disciplinas do edital, com foco aprofundado em <strong className="text-[var(--gold)]">Legislação da Polícia Militar Maranhense</strong> e <strong className="text-[var(--gold)]">Informática</strong> — as matérias que mais eliminam candidatos — além de teoria atualizada, <strong className="text-foreground">+599 questões comentadas</strong> no padrão <strong className="text-foreground">Cebraspe</strong>, mapas mentais, flashcards e técnicas de prova. <strong className="text-[var(--gold)]">Já com a última atualização do edital</strong>, incluindo <strong className="text-[var(--gold)]">Raciocínio Lógico</strong> e <strong className="text-[var(--gold)]">Legislação Institucional</strong>.
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={40}>
          <div className="relative flex justify-center mt-2">
            <div className="absolute inset-0 -z-10 blur-3xl opacity-55" style={{ background: "radial-gradient(circle, rgba(255,216,107,0.4) 0%, rgba(212,175,55,0.2) 40%, transparent 70%)" }} />
            <motion.div
              className="relative"
              animate={{ y: [0, -14, 0], rotate: [-0.5, 0.5, -0.5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={devicesMockup}
                alt="Apostila PMMA disponível em notebook, tablet, celular e ebook 3D"
                width={1536}
                height={1024}
                className="w-full max-w-3xl drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="anim-glow-pill absolute top-2 right-2 sm:top-3 sm:right-0 md:right-4 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-black uppercase tracking-wide text-white border border-[var(--gold-bright)]/60 backdrop-blur-md"
                style={{ background: "linear-gradient(135deg, rgba(10,8,4,0.95) 0%, rgba(20,16,8,0.92) 100%)" }}
              >
                <FileText className="size-3 sm:size-3.5 text-[var(--gold)]" />
                Com última atualização do edital
              </motion.div>
            </motion.div>
          </div>
        </FadeIn>

        <FadeIn delay={0.65}>
          <motion.a
            href={CHECKOUT}
            target="_blank"
            rel="noopener"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center justify-center gap-2.5 rounded-full text-[var(--ink)] font-black px-9 py-4.5 text-base md:text-lg uppercase tracking-wide shine-overlay anim-glow-urgency overflow-hidden"
            style={{ background: "linear-gradient(135deg,#d4af37 0%,#ffd86b 45%,#d4af37 100%)", boxShadow: "0 16px 48px -10px rgba(255,216,107,0.7), 0 0 0 3px rgba(255,216,107,0.25)" }}
          >
            <Flame className="size-5" />
            Quero garantir minha apostila
            <span aria-hidden className="text-xl">→</span>
          </motion.a>
        </FadeIn>

        <FadeIn delay={0.75}>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 max-w-2xl">
            {badges.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.08 }}
                className="inline-flex items-center gap-2 rounded-full glass-strong border border-[var(--gold)]/40 px-4 py-2 text-xs md:text-sm font-semibold text-foreground/90"
              >
                <CheckCircle2 className="size-4 text-emerald-400" strokeWidth={2.8} />
                {b.t}
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/60">
        <ChevronDown className="size-6 animate-bounce" />
      </div>
    </div>
  );
}

/* ---------------- Marquee social proof ---------------- */
function Marquee() {
  const items = ["Concurso PMMA 2026", "Banca Cebraspe", "Legislação Atualizada", "Informática Estratégica", "Teoria + Questões", "Mapas Mentais", "Aprovação Militar", "Maranhão"];
  const loop = [...items, ...items];
  return (
    <div className="relative py-6 border-y border-[var(--gold)]/15 bg-[var(--ink-soft)]/40 overflow-hidden">
      <div className="flex gap-12 whitespace-nowrap" style={{ animation: "var(--animate-marquee)" }}>
        {loop.map((t, i) => (
          <span key={i} className="text-sm md:text-base font-display tracking-[0.3em] text-[var(--gold)]/60 uppercase flex items-center gap-12">
            {t} <span className="text-[var(--gold)]/30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Authority() {
  const stats = [
    { title: "Remuneração", value: "R$ 6.149,00", desc: "Excelente salário inicial de soldado", icon: Wallet },
    { title: "Jornada", value: "40h semanais", desc: "Escala de 1 dia de trabalho por 2 de folga", icon: Clock },
    { title: "Estabilidade", value: "Servidor Público", desc: "Segurança financeira e plano de carreira", icon: ShieldCheck },
    { title: "Benefícios", value: "Vida inteira", desc: "Plano de saúde, aposentadoria, pensão e licenças", icon: HeartPulse },
  ];
  return (
    <Section id="autoridade">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 items-center">
        <FadeIn>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 blur-3xl opacity-40 rounded-[2rem]" style={{ background: "radial-gradient(circle, rgba(212,175,55,0.32) 0%, rgba(255,216,107,0.14) 50%, transparent 70%)" }} />
            <div className="relative rounded-3xl overflow-hidden border-2 border-[var(--gold)]/40 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
              <img
                src={pmmaOfficer}
                alt="Policial Militar do Maranhão em serviço — carreira PMMA"
                width={1024}
                height={1280}
                loading="lazy"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/30 to-transparent" />
              <div className="hidden md:block absolute bottom-0 inset-x-0 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-bold">Uma carreira de elite</p>
                <p className="font-display text-3xl font-black mt-2 leading-tight">Vista a farda mais respeitada do Maranhão</p>
              </div>
            </div>
          </div>
        </FadeIn>
        <div className="space-y-8">
          <FadeIn>
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-semibold">Uma carreira de elite</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 leading-[1.05]">
              Uma carreira de <span className="gradient-gold-text">respeito</span>, estabilidade e <span className="gradient-gold-text">propósito</span>.
            </h2>
            <GoldDivider />
            <p className="text-muted-foreground text-lg leading-relaxed">
              Conquistar uma vaga na Polícia Militar do Maranhão significa muito mais do que um salário. É garantir <strong className="text-foreground">estabilidade financeira</strong>, <strong className="text-foreground">benefícios exclusivos</strong>, crescimento profissional e o orgulho de vestir uma das <strong className="text-[var(--gold)]">fardas mais respeitadas do estado</strong>.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="anim-glow-stat group relative rounded-3xl p-[1.5px] overflow-hidden shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] hover:shadow-[0_30px_70px_-15px_rgba(212,175,55,0.55)] transition-shadow duration-500"
                  style={{ ["--card-glow" as any]: "rgba(212,175,55,0.35)", background: "linear-gradient(135deg, rgba(255,216,107,0.7) 0%, rgba(212,175,55,0.2) 45%, rgba(212,175,55,0.55) 100%)" }}
                >
                  <div className="relative rounded-[calc(1.5rem-1.5px)] bg-gradient-to-br from-[var(--ink-soft)]/95 to-[var(--ink)]/95 p-5 md:p-6 backdrop-blur-xl overflow-hidden h-full transition-colors duration-500 group-hover:from-[var(--ink-soft)] group-hover:to-[#120e04]">
                    <div aria-hidden className="absolute -top-16 -right-16 size-44 rounded-full opacity-0 group-hover:opacity-35 blur-3xl transition-opacity duration-500 bg-[var(--gold)]" />
                    <div aria-hidden className="absolute inset-x-5 top-0 h-px opacity-70" style={{ background: "linear-gradient(90deg, transparent, rgba(255,216,107,0.9), transparent)" }} />
                    <div className="relative inline-flex">
                      <div aria-hidden className="absolute inset-0 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500 bg-[var(--gold)]/40" />
                      <div className="relative inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--gold)]/20 to-[var(--gold)]/5 border border-[var(--gold)]/40 text-[var(--gold-bright)] shadow-[0_6px_16px_-10px_rgba(212,175,55,0.45)] transition-transform duration-500 ease-out group-hover:scale-115 group-hover:-rotate-6">
                        <s.icon className="size-5.5" strokeWidth={2.3} />
                      </div>
                    </div>
                    <div className="font-impact text-[10px] tracking-[0.22em] text-[var(--gold)]/90 mt-4">{s.title}</div>
                    <div className="font-impact text-lg md:text-xl gradient-gold-text text-glow-gold leading-tight mt-2 tracking-tight transition-transform duration-500 group-hover:scale-105 origin-left">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-2 leading-relaxed">{s.desc}</div>
                    <div aria-hidden className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full opacity-40 group-hover:opacity-90 transition-opacity duration-500" style={{ background: "linear-gradient(90deg, transparent, var(--gold-bright), transparent)" }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Pains ---------------- */
function Pains() {
  const pains = [
    "Você não sabe por onde começar a estudar para a PMMA",
    "Faz milhares de questões e não vê evolução real",
    "Trava na Legislacao Institucional e Pmma",
    "Erra Informática porque estuda material desatualizado",
    "Se perde no estilo Cebraspe de cobrança",
    "Se confunde nas questões de Raciocínio Lógico Matemático",
    "Estuda tudo, mas não domina o que mais cai",
    "Sente que gasta dinheiro com curso e não avança",
  ];
  return (
    <Section id="dores" className="bg-gradient-to-b from-transparent via-[#3a0a12]/40 to-transparent">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-red-400 font-bold">Se você se identifica...</span>
          <h2 className="text-4xl md:text-6xl font-black mt-3 leading-[1.05]">
            Você sente que estuda muito, <br /><span className="text-red-500">mas continua sem evoluir?</span>
          </h2>
          <GoldDivider />
          <div className="text-muted-foreground text-lg space-y-3 text-left max-w-2xl mx-auto">
            <p>Talvez o problema <strong className="text-foreground">nunca tenha sido sua capacidade</strong>.</p>
            <p>O problema é estudar com materiais <strong className="text-red-400">desorganizados, superficiais e sem estratégia</strong>.</p>
            <p>Enquanto milhares de candidatos perdem tempo com conteúdos irrelevantes, quem conquista a aprovação <strong className="text-[var(--gold)]">sabe exatamente onde concentrar seus esforços</strong>.</p>
            <p>Nossa apostila foi desenvolvida justamente para <strong className="text-foreground">eliminar esse desperdício</strong> e acelerar sua preparação.</p>
          </div>
        </div>
      </FadeIn>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
        {pains.map((p, i) => (
          <FadeIn key={i} delay={i * 0.05}>
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass rounded-2xl p-5 flex items-start gap-3 group hover:border-red-500/60 transition-all relative overflow-hidden hover:shadow-[0_20px_60px_-10px_rgba(239,68,68,0.35)]"
            >
              <div aria-hidden className="absolute -top-12 -right-12 size-32 rounded-full bg-red-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="mt-0.5 size-9 shrink-0 rounded-full grid place-items-center bg-red-500/15 border border-red-500/40 text-red-400 font-extrabold text-base relative">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="text-foreground/90 flex-1 relative">{p}</p>
              <span className="absolute top-3 right-3 text-red-500 font-black text-xl leading-none">✕</span>
            </motion.div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.3}>
        <p className="text-center text-2xl md:text-3xl font-display mt-14 max-w-3xl mx-auto leading-snug">
          Foi <span className="text-red-500 font-bold">exatamente para resolver isso</span> que a Apostila PMMA foi criada.
        </p>
      </FadeIn>
    </Section>
  );
}

/* ---------------- Social Proof Carousel ---------------- */
function SocialCarousel() {
  const slides = [
    { type: "stat", title: "R$ 6.149", subtitle: "Salário inicial do soldado PMMA", icon: Wallet },
    { type: "quote", name: "João Victor", course: "Candidato PMMA", city: "Imperatriz — MA", text: "Comprei achando que era mais uma. É outro nível. Legislação e Informática ficaram claras.", grade: "10", avatar: "https://randomuser.me/api/portraits/men/52.jpg" },
    { type: "stat", title: "+599", subtitle: "Questões comentadas Cebraspe", icon: Target },
    { type: "quote", name: "Ana Clara", course: "Candidata PMMA", city: "São Luís — MA", text: "Os mapas mentais e os flashcards salvaram minha revisão na reta final. Recomendo demais.", grade: "10", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { type: "stat", title: "40h", subtitle: "Jornada semanal — 1×2", icon: Clock },
    { type: "quote", name: "Gabriel", course: "Candidato PMMA", city: "Bacabal — MA", text: "Eu estudava sem rumo. Com o plano de 90 dias comecei a evoluir de verdade nas simulações.", grade: "10", avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
    { type: "stat", title: "100%", subtitle: "Foco no edital PMMA", icon: ShieldCheck },
    { type: "quote", name: "Beatriz Nogueira", course: "Candidata PMMA", city: "Caxias — MA", text: "A didática é seca, objetiva. Sem enrolação. Perfeito pra quem trabalha e estuda.", grade: "10", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
  ];
  const loop = [...slides, ...slides];
  return (
    <Section id="carrossel-prova">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-semibold">Em movimento</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            A tropa <span className="gradient-gold-text">não para de crescer</span>
          </h2>
          <GoldDivider />
          <p className="text-muted-foreground text-lg">Números reais, depoimentos reais — passando em loop.</p>
        </div>
      </FadeIn>

      <div className="relative mt-12 -mx-4 md:-mx-8 overflow-hidden mask-fade-x">
        <div className="flex gap-5 w-max" style={{ animation: "var(--animate-marquee)" }}>
          {loop.map((s, i) => (
            <div key={i} className="w-[280px] sm:w-[320px] shrink-0">
              {s.type === "stat" ? (
                (() => {
                  const Icon = s.icon!;
                  return (
                    <div className="glass-strong rounded-3xl p-7 h-full flex flex-col items-center justify-center text-center border border-[var(--gold)]/30 glow-gold min-h-[260px]">
                      <Icon className="size-9 text-[var(--gold)] mb-3" />
                      <div className="font-display text-5xl font-black gradient-gold-text leading-none">{s.title}</div>
                      <p className="text-sm text-muted-foreground mt-3 max-w-[14rem]">{s.subtitle}</p>
                    </div>
                  );
                })()
              ) : (
                <div className="glass rounded-3xl p-6 h-full flex flex-col gap-4 hover:border-[var(--gold)] transition min-h-[260px]">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5 text-[var(--gold)]">
                      {[1,2,3,4,5].map(n => <Star key={n} className="size-3.5 fill-current" />)}
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full gradient-gold text-[var(--ink)] font-bold">{s.city}</span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed">"{s.text}"</p>
                  <div className="flex items-center gap-3 mt-auto pt-3 border-t border-[var(--gold)]/10">
                    <img src={s.avatar} alt={s.name} loading="lazy" className="size-10 rounded-full object-cover border-2 border-[var(--gold)]/40" />
                    <div className="min-w-0">
                      <div className="font-semibold text-sm flex items-center gap-1.5 truncate">
                        {s.name}
                        <CheckCircle2 className="size-3.5 text-[var(--gold)] shrink-0" />
                      </div>
                      <div className="text-[11px] text-muted-foreground truncate">{s.course}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Offer ---------------- */
function useOfferCountdown(totalSeconds = 16 * 60 + 37) {
  const [left, setLeft] = useState(totalSeconds);
  useEffect(() => {
    const KEY = "pmma_offer_deadline_v1";
    const now = Date.now();
    let deadline: number;
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(KEY) : null;
      const parsed = raw ? parseInt(raw, 10) : NaN;
      if (!Number.isFinite(parsed) || parsed - now <= 0 || parsed - now > totalSeconds * 1000) {
        deadline = now + totalSeconds * 1000;
        if (typeof window !== "undefined") window.localStorage.setItem(KEY, String(deadline));
      } else {
        deadline = parsed;
      }
    } catch {
      deadline = now + totalSeconds * 1000;
    }
    const tick = () => {
      const remaining = Math.max(0, Math.round((deadline - Date.now()) / 1000));
      if (remaining <= 0) {
        const next = Date.now() + totalSeconds * 1000;
        deadline = next;
        try { window.localStorage.setItem(KEY, String(next)); } catch {}
        setLeft(totalSeconds);
      } else {
        setLeft(remaining);
      }
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [totalSeconds]);
  const m = Math.floor(left / 60);
  const s = left % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return { m, s, pad, left, total: totalSeconds };
}

const SEAT_NAMES = [
  "João Victor, Imperatriz", "Ana Clara, São Luís", "Gabriel, Bacabal",
  "Mateus, Codó", "Kauã, Timon", "Maria Eduarda, Caxias",
  "Breno, Açailândia", "Letícia, Santa Inês", "Yasmin, Balsas",
  "Thiago, São José de Ribamar", "Isabela, Pinheiro", "Rafael, Chapadinha",
];
const PURCHASE_TEMPLATES = [
  (n: string) => ({ title: n, sub: "acabou de garantir a apostila ✨" }),
  (n: string) => ({ title: n, sub: "novo candidato PMMA a bordo 📘" }),
  (n: string) => ({ title: n.split(",")[0]!, sub: `entrou na tropa (${n.split(",")[1]?.trim() ?? "MA"}) 🚔` }),
  (n: string) => ({ title: n, sub: "garantiu acesso vitalício 🔥" }),
];
function SeatsLeft() {
  const SEATS_KEY = "pmma_seats_left_v1";
  const SEATS_TS_KEY = "pmma_seats_ts_v1";
  const INITIAL = 14;
  const MIN = 6;
  const readInitial = () => {
    if (typeof window === "undefined") return INITIAL;
    try {
      const raw = window.localStorage.getItem(SEATS_KEY);
      const n = raw ? parseInt(raw, 10) : NaN;
      if (Number.isFinite(n) && n >= MIN && n <= INITIAL) return n;
    } catch {}
    return INITIAL;
  };
  const [seats, setSeats] = useState<number>(INITIAL);
  const [popups, setPopups] = useState<{ id: number; title: string; sub: string }[]>([]);
  const seatsRef = useRef(INITIAL);
  useEffect(() => { seatsRef.current = seats; }, [seats]);
  useEffect(() => { setSeats(readInitial()); }, []);
  const persist = (n: number) => {
    try {
      window.localStorage.setItem(SEATS_KEY, String(n));
      window.localStorage.setItem(SEATS_TS_KEY, String(Date.now()));
    } catch {}
  };
  useEffect(() => {
    let cancelled = false;
    let idx = 0;
    const intervals = [22_000, 38_000, 28_000, 45_000, 18_000];
    const schedule = () => {
      if (cancelled) return;
      const wait = intervals[idx % intervals.length];
      idx++;
      setTimeout(() => {
        if (cancelled) return;
        if (seatsRef.current > MIN) {
          const next = Math.max(MIN, seatsRef.current - 1);
          setSeats(next);
          persist(next);
        }
        const name = SEAT_NAMES[Math.floor(Math.random() * SEAT_NAMES.length)];
        const tpl = PURCHASE_TEMPLATES[Math.floor(Math.random() * PURCHASE_TEMPLATES.length)]!(name);
        const id = Date.now() + Math.random();
        setPopups(p => [...p.slice(-1), { id, ...tpl }]);
        setTimeout(() => setPopups(p => p.filter(x => x.id !== id)), 5500);
        schedule();
      }, wait);
    };
    schedule();
    return () => { cancelled = true; };
  }, []);
  const pct = Math.max(8, ((seats - MIN) / (INITIAL - MIN)) * 100);
  return (
    <>
      <motion.div
        animate={{ scale: [1, 1.015, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-2xl border-2 border-red-500/60 bg-gradient-to-br from-red-950/40 via-[var(--ink-soft)]/80 to-transparent p-4 md:p-5 overflow-hidden"
      >
        <div aria-hidden className="absolute -top-8 -right-8 size-32 rounded-full bg-red-500/30 blur-3xl" />
        <div className="flex items-center gap-3 relative">
          <span className="relative flex size-3 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-70" />
            <span className="relative inline-flex size-3 rounded-full bg-red-500" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[0.3em] font-black text-red-400">Vagas nesta oferta</p>
            <p className="text-xs text-foreground/70 mt-0.5">Apostila PMMA · Concurso 2026</p>
          </div>
          <div className="text-right">
            <motion.div
              key={seats}
              initial={{ scale: 1.4, color: "#ef4444" }}
              animate={{ scale: 1, color: "#fca5a5" }}
              transition={{ duration: 0.6 }}
              className="font-display font-black text-3xl md:text-4xl tabular-nums leading-none"
            >
              {seats}
            </motion.div>
            <p className="text-[10px] uppercase tracking-wider text-red-300/80 mt-1">restantes</p>
          </div>
        </div>
        <div className="mt-3 h-2 rounded-full bg-red-950/60 overflow-hidden border border-red-500/30">
          <motion.div
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-red-600 to-red-400"
          />
        </div>
      </motion.div>

      <div className="fixed bottom-24 sm:bottom-24 left-3 z-[55] flex flex-col gap-2 pointer-events-none max-w-xs">
        {popups.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: -40, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40 }}
            className="pointer-events-auto rounded-2xl glass-strong border border-[var(--gold)]/50 px-4 py-3 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] flex items-center gap-3"
          >
            <div className="size-9 shrink-0 rounded-full gradient-gold grid place-items-center text-[var(--ink)]">
              <CheckCircle2 className="size-5" strokeWidth={3} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-foreground leading-tight truncate">{p.title}</p>
              <p className="text-[11px] text-[var(--gold)] font-semibold truncate">{p.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

function Offer() {
  const features = [
    "Apostila Completa PMMA (PDF premium)",
    "Legislação PMMA integral e Institucional atualizada",
    "Língua Portuguesa (foco Cebraspe)",
    "Raciocínio Lógico Matemático",
    "Informática estratégica (Windows + Office + Internet + Segurança)",
    "História do Maranhão",
    "Historia Brasil",
    "Geografia do Maranhão",
    "Geografia do Brasil",
    "Atualidades e Conhecimentos Gerais",
    "Mais de 599 questões comentadas",
    "Simulados no padrão Cebraspe",
    "Mapas Mentais de todas as matérias",
    "Flashcards Premium para memorização",
    "Resumos ultra objetivos por matéria",
    "Checklist de revisão pré-prova",
    "Técnicas e guia da banca Cebraspe (C/E)",
    "Suporte via Whatsapp",
  ];
  return (
    <Section id="oferta">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold">
            Garanta a <span className="gradient-gold-text">Apostila Completa PMMA</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4">
            Acesso imediato. Pagamento único. Garantia incondicional de 7 dias.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mt-14 relative">
          <div className="absolute -inset-2 rounded-[2rem] gradient-gold opacity-20 blur-2xl" />
          <div className="relative glass-strong rounded-[2rem] overflow-hidden border-2 border-[var(--gold)]/40">
            <div className="grid lg:grid-cols-[1fr_1.1fr]">
              <div className="p-8 md:p-12 bg-gradient-to-br from-[var(--wine-deep)]/40 to-transparent flex flex-col items-center justify-center text-center gap-6 relative">
                <div className="absolute top-6 left-6 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider gradient-gold text-[var(--ink)] font-bold px-3 py-1.5 rounded-full">
                  <Flame className="size-3.5" /> Mais vendido
                </div>
                <img src={ebookMockup} alt="Apostila Completa PM-MA — livro impresso" width={617} height={929} loading="lazy" className="w-72 md:w-96 drop-shadow-[0_30px_60px_rgba(0,0,0,0.75)]" />
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Acesso vitalício</p>
                  <p className="font-display text-2xl mt-1">Apostila Completa PMMA</p>
                </div>
              </div>

              <div className="p-8 md:p-12 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/50 px-3 py-1 text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--gold)] mb-4">
                    <Flame className="size-3" /> Oferta de lançamento
                  </div>

                  <div className="mb-5">
                    <SeatsLeft />
                  </div>

                  <div className="relative rounded-2xl border border-[var(--gold)]/30 bg-gradient-to-br from-[var(--ink-soft)]/80 to-transparent p-5 md:p-6 overflow-hidden">
                    <div aria-hidden className="absolute -top-16 -right-16 size-48 rounded-full opacity-20 blur-3xl gradient-gold pointer-events-none" />
                    <div className="flex items-center gap-3">
                      <span className="text-base md:text-lg text-muted-foreground line-through decoration-[var(--gold)]/70 decoration-2">De R$ 144,99</span>
                      <span className="text-[10px] uppercase tracking-[0.25em] font-black gradient-gold text-[var(--ink)] px-2.5 py-1 rounded-full">−79%</span>
                    </div>
                    <p className="mt-2 text-sm uppercase tracking-[0.3em] text-[var(--gold)]/90 font-bold">por apenas</p>
                    <div className="relative flex items-end gap-2 mt-1">
                      <span className="text-xl md:text-2xl font-black text-[var(--gold)] mb-3 md:mb-4">R$</span>
                      <span className="font-display font-black leading-none text-7xl md:text-[8.5rem] gradient-gold-text drop-shadow-[0_8px_26px_rgba(212,175,55,0.32)] tabular-nums">
                        29
                      </span>
                      <span className="font-display font-black leading-none text-3xl md:text-5xl gradient-gold-text mb-2 md:mb-4 tabular-nums">,99</span>
                      <span className="text-muted-foreground mb-4 md:mb-5 text-sm ml-1">à vista</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Pagamento único · Cartão · Pix · Boleto</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-bold flex items-center gap-2">
                      <Flame className="size-3.5" /> Acesso imediato · Vitalício
                    </p>
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm md:text-base">
                      <CheckCircle2 className="size-5 text-[var(--gold)] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  <CTAButtons />
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-2">
                  <div className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-[var(--gold)]" /> Garantia 7 dias</div>
                  <div className="flex items-center gap-1.5"><Zap className="size-4 text-[var(--gold)]" /> Acesso imediato</div>
                  <div className="flex items-center gap-1.5"><Lock className="size-4 text-[var(--gold)]" /> Compra segura</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const items = [
    { q: "A apostila serve para quem está começando do zero?", a: "Sim. O material foi desenhado para qualquer nível — do candidato iniciante ao veterano de concursos. Linguagem clara, sequência lógica e passo a passo." },
    { q: "Como recebo o material após a compra?", a: "Você recebe por e-mail o acesso ao PDF em até 2 minutos após a confirmação do pagamento. Acesso vitalício." },
    { q: "O conteúdo está atualizado para o próximo edital?", a: "Sim. A apostila é atualizada conforme mudanças na Legislação PMMA e no perfil da banca Cebraspe. Você recebe as atualizações gratuitamente." },
    { q: "Qual banca é o foco do material?", a: "O material é 100% focado no estilo Cebraspe (Certo/Errado), a banca historicamente vinculada aos concursos da PMMA." },
    { q: "Posso pagar parcelado?", a: "Sim. Cartão em até 12x com juros da operadora, Pix ou boleto à vista." },
    { q: "Tem suporte?", a: "Sim. Suporte direto via WhatsApp para dúvidas sobre o material e conteúdo." },
    { q: "Como funciona a garantia?", a: "Garantia incondicional de 7 dias. Se por qualquer motivo você não gostar, devolvemos 100% do valor sem perguntas." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-semibold">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Perguntas <span className="gradient-gold-text">frequentes</span>
          </h2>
          <GoldDivider />
        </div>
      </FadeIn>
      <div className="max-w-3xl mx-auto mt-12 space-y-3">
        {items.map((it, i) => (
          <FadeIn key={i} delay={i * 0.04}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left glass rounded-2xl p-5 hover:border-[var(--gold)] transition"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">{it.q}</span>
                <ChevronDown className={`size-5 text-[var(--gold)] transition-transform shrink-0 ${open === i ? "rotate-180" : ""}`} />
              </div>
              <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="text-muted-foreground">{it.a}</p>
                </div>
              </div>
            </button>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="border-t border-[var(--gold)]/15 bg-[var(--ink-soft)]/40 mt-10">
      <div className="mx-auto max-w-7xl container-px py-12 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 font-display text-xl font-bold">
            <ShieldCheck className="size-5 text-[var(--gold)]" />
            <span className="gradient-gold-text">Apostila PMMA</span>
          </div>
          <p className="text-sm text-muted-foreground mt-3 max-w-xs">
            Material educacional para candidatos ao concurso da Polícia Militar do Maranhão. Não possui vínculo com órgãos oficiais.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.2em] text-[var(--gold)]">Contato</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={WHATSAPP} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-[var(--gold)]">
                <MessageCircle className="size-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={INSTAGRAM} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-[var(--gold)]">
                <Instagram className="size-4" /> @apostilapmma
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.2em] text-[var(--gold)]">Institucional</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-[var(--gold)]">Termos de uso</a></li>
            <li><a href="#" className="hover:text-[var(--gold)]">Política de privacidade</a></li>
            <li><a href="#oferta" className="hover:text-[var(--gold)]">Garantia</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--gold)]/10 py-6 text-center text-xs text-muted-foreground container-px">
        © {new Date().getFullYear()} Apostila PMMA. Todos os direitos reservados.
      </div>
    </footer>
  );
}

/* ---------------- Devices Showcase ---------------- */
function DevicesShowcase() {
  return (
    <Section id="showcase" className="bg-gradient-to-b from-transparent via-[var(--ink-soft)]/40 to-transparent">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-semibold">Tudo o que você recebe</span>
          <h2 className="text-4xl md:text-6xl font-black mt-3 leading-[1.05]">
            Sua preparação completa <br /><span className="gradient-gold-text">começa aqui.</span>
          </h2>
          <GoldDivider />
        </div>
      </FadeIn>

      <FadeIn delay={0.15} y={50}>
        <div className="relative mt-14 flex justify-center">
          <div className="absolute inset-0 -z-10 blur-3xl opacity-40" style={{ background: "radial-gradient(ellipse at center, var(--gold) 0%, transparent 60%)" }} />
          <motion.img
            src={devicesBook}
            alt="Apostila PMMA — livro físico premium ao lado de notebook e tablet com páginas reais do material"
            width={1536}
            height={1024}
            loading="lazy"
            className="w-full max-w-5xl drop-shadow-[0_30px_70px_rgba(212,175,55,0.22)]"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </FadeIn>

      <FadeIn delay={0.25}>
        <div className="text-center mt-10">
          <a
            href="#apostila"
            className="inline-flex items-center gap-3 rounded-full gradient-gold text-[var(--ink)] font-bold px-10 py-5 text-base md:text-lg uppercase tracking-wide shine-overlay glow-gold hover:scale-[1.03] transition"
          >
            Ver apostila por dentro <span aria-hidden>→</span>
          </a>
        </div>
      </FadeIn>
    </Section>
  );
}

/* ---------------- Apostila Preview ---------------- */
function ApostilaPreview() {
  const hierarquia = [
    { p: "Oficiais Superiores", c: "Coronel · Tenente-Coronel · Major" },
    { p: "Oficiais Intermediários", c: "Capitão" },
    { p: "Oficiais Subalternos", c: "1º Tenente · 2º Tenente" },
    { p: "Praças Especiais", c: "Aspirante · Cadete · Aluno-Oficial" },
    { p: "Praças", c: "Subtenente · Sargentos · Cabo · Soldado" },
  ];
  const learn = [
    "Legislação PMMA integral",
    "Hierarquia e disciplina",
    "Língua Portuguesa",
    "Raciocínio Lógico Matemático",
    "Informática (Windows, Office, Internet)",
    "Direitos Humanos aplicados",
    "História do Maranhão",
    "Geografia do Maranhão",
    "Atualidades e Conhecimentos Gerais",
    "Noções de Direito Constitucional",
    "Noções de Direito Penal e Penal Militar",
    "Questões Cebraspe comentadas",
    "Mapas Mentais por tema",
    "Flashcards Premium",
  ];

  const pages = [
    {
      key: "leg",
      module: "Módulo 01",
      subject: "Legislação PMMA",
      title: "Hierarquia e Disciplina Militar",
      subtitle: "Fundamentos da organização da Polícia Militar do Maranhão — base indispensável para a atuação policial e para gabaritar Legislação na prova.",
      pageNum: "14 / 328",
      body: <LegPage hierarquia={hierarquia} learn={learn} />,
    },
    {
      key: "geo",
      module: "Módulo 04",
      subject: "Geografia do Maranhão",
      title: "Território, Clima e Regiões do MA",
      subtitle: "Domine a Geografia Maranhense com mapas, dados atualizados e o padrão exato de cobrança da banca — tema campeão de eliminação.",
      pageNum: "112 / 328",
      body: <GeoPage />,
    },
    {
      key: "hist",
      module: "Módulo 05",
      subject: "História do Maranhão",
      title: "Da Colonização à Formação da PMMA",
      subtitle: "Da chegada dos franceses em 1612 até a consolidação da Polícia Militar do Maranhão como instituição bicentenária.",
      pageNum: "168 / 328",
      body: <HistPage />,
    },
  ];
  const [idx, setIdx] = useState(0);
  const total = pages.length;
  const go = (dir: number) => setIdx((i) => (i + dir + total) % total);

  return (
    <Section id="apostila">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-semibold">Apostila por dentro</span>
          <h2 className="text-4xl md:text-6xl font-black mt-3 leading-[1.05]">
            Veja <span className="gradient-gold-text">páginas reais</span> do material
          </h2>
          <GoldDivider />
          <p className="text-muted-foreground text-lg">
            Três amostras do padrão premium: Legislação, Geografia e História do Maranhão — exatamente como você recebe.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.15} y={40}>
        <div className="mt-14 relative">
          <div className="absolute -inset-4 -z-10 blur-3xl opacity-28 rounded-[2.5rem]" style={{ background: "radial-gradient(circle at 50% 30%, var(--gold) 0%, transparent 65%)" }} />

          {/* Nav buttons */}
          <div className="hidden md:block">
            <button
              onClick={() => go(-1)}
              aria-label="Página anterior"
              className="absolute left-[-24px] top-1/2 -translate-y-1/2 z-20 size-14 rounded-full glass-strong border border-[var(--gold)]/40 grid place-items-center hover:border-[var(--gold)] hover:scale-110 transition text-[var(--gold)]"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Próxima página"
              className="absolute right-[-24px] top-1/2 -translate-y-1/2 z-20 size-14 rounded-full glass-strong border border-[var(--gold)]/40 grid place-items-center hover:border-[var(--gold)] hover:scale-110 transition text-[var(--gold)]"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={pages[idx].key}
                initial={{ opacity: 0, x: 60, rotateY: 6 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -60, rotateY: -6 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformPerspective: 1400 }}
                className="relative mx-auto max-w-4xl bg-[#fbfaf6] text-slate-900 rounded-2xl shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] overflow-hidden border border-slate-200"
              >
                <div className="relative bg-gradient-to-r from-[#0b1f4d] via-[#123070] to-[#0b1f4d] text-white px-8 md:px-12 py-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-white/10 grid place-items-center border border-white/20">
                      <ShieldCheck className="size-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">{pages[idx].module}</p>
                      <p className="font-display font-bold text-lg leading-tight">Apostila Completa PMMA</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col items-end">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">Página</p>
                    <p className="font-display font-bold text-lg leading-tight">{pages[idx].pageNum}</p>
                  </div>
                </div>

                <div className="px-6 md:px-12 py-10 md:py-14 space-y-10">
                  <header className="text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#123070] font-semibold">{pages[idx].subject}</p>
                    <h3 className="font-display text-3xl md:text-5xl font-bold mt-3 text-slate-900 leading-tight">
                      {pages[idx].title}
                    </h3>
                    <p className="mt-3 text-slate-600 italic max-w-2xl mx-auto">{pages[idx].subtitle}</p>
                    <div className="mx-auto mt-5 h-1 w-24 bg-gradient-to-r from-transparent via-[#123070] to-transparent" />
                  </header>

                  {pages[idx].body}

                  <div className="rounded-2xl bg-gradient-to-r from-[#0b1f4d] to-[#123070] text-white text-center px-6 py-7">
                    <p className="font-display text-xl md:text-2xl italic leading-snug">
                      "A farda não pertence a quem sonha — pertence a quem se prepara."
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-200 px-8 md:px-12 py-4 flex items-center justify-center text-xs text-slate-500 bg-slate-50">
                  <span>Apostila Completa PMMA · Concurso 2026</span>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Dots + mobile nav */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={() => go(-1)}
              aria-label="Anterior"
              className="md:hidden size-11 rounded-full glass border border-[var(--gold)]/40 grid place-items-center text-[var(--gold)]"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex items-center gap-3">
              {pages.map((p, i) => (
                <button
                  key={p.key}
                  onClick={() => setIdx(i)}
                  aria-label={`Ir para ${p.subject}`}
                  className={`transition-all duration-300 rounded-full ${i === idx ? "w-10 h-2.5 bg-[var(--gold)]" : "w-2.5 h-2.5 bg-[var(--gold)]/30 hover:bg-[var(--gold)]/60"}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Próxima"
              className="md:hidden size-11 rounded-full glass border border-[var(--gold)]/40 grid place-items-center text-[var(--gold)]"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          {/* Section labels */}
          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
            {pages.map((p, i) => (
              <button
                key={p.key}
                onClick={() => setIdx(i)}
                className={`text-xs uppercase tracking-[0.25em] px-3 py-1.5 rounded-full border transition ${i === idx ? "border-[var(--gold)] text-[var(--gold)] bg-[var(--gold)]/10" : "border-white/10 text-muted-foreground hover:text-foreground hover:border-white/25"}`}
              >
                {p.subject}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.25}>
        <div className="text-center mt-12">
          <a href={CHECKOUT} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full gradient-gold text-[var(--ink)] font-bold px-8 py-4 uppercase tracking-wide shine-overlay glow-gold hover:scale-[1.03] transition">
            Quero garantir minha apostila <span aria-hidden>→</span>
          </a>
        </div>
      </FadeIn>
    </Section>
  );
}

/* ---- Page contents ---- */
function LegPage({ hierarquia, learn }: { hierarquia: { p: string; c: string }[]; learn: string[] }) {
  return (
    <>
      <section className="space-y-3 text-slate-700 leading-relaxed text-[15px] md:text-base">
        <h4 className="font-display text-xl font-bold text-slate-900">1. Conceitos fundamentais</h4>
        <p>
          A <strong>hierarquia militar</strong> é a ordenação da autoridade em diferentes níveis, dentro da estrutura da PMMA. A <strong>disciplina</strong> é a rigorosa observância e o acatamento integral das leis, regulamentos, normas e ordens.
        </p>
        <p>
          Hierarquia e disciplina são <strong>a base institucional</strong> da corporação. Sem elas, não há eficiência operacional — e este é um dos temas mais recorrentes nas provas da banca Cebraspe.
        </p>
      </section>

      <section>
        <h4 className="font-display text-xl font-bold text-slate-900 mb-3">2. Estrutura hierárquica da PMMA</h4>
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#0b1f4d] text-white text-left">
                <th className="px-4 py-3 font-semibold">Círculo</th>
                <th className="px-4 py-3 font-semibold">Postos / Graduações</th>
              </tr>
            </thead>
            <tbody>
              {hierarquia.map((r, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="px-4 py-3 font-semibold text-slate-900">{r.p}</td>
                  <td className="px-4 py-3 text-slate-700">{r.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h4 className="font-display text-xl font-bold text-slate-900 mb-3">3. Questão Cebraspe — comentada</h4>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Item C/E · Cebraspe</p>
        <blockquote className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-slate-800 leading-relaxed">
          "A hierarquia e a disciplina são pilares essenciais das instituições militares, sendo a disciplina definida como a rigorosa observância e o acatamento integral das leis, regulamentos e ordens."
        </blockquote>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold px-3 py-1.5">✓ CERTO</span>
          <p className="text-sm text-slate-700 flex-1">Comentário: item literal do texto legal — atenção às palavras "rigorosa" e "integral", frequentemente trocadas pela banca em pegadinhas.</p>
        </div>
      </section>

      <section>
        <h4 className="font-display text-xl font-bold text-slate-900 mb-3">4. O que você vai dominar</h4>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-800">
          {learn.map((it, i) => (
            <li key={i} className="flex items-start gap-2"><CheckCircle2 className="size-4 text-[#123070] mt-0.5 shrink-0" /> {it}</li>
          ))}
        </ul>
      </section>
    </>
  );
}

function GeoPage() {
  const regioes = [
    { r: "Norte Maranhense", d: "São Luís, Baixada Maranhense — capital e litoral" },
    { r: "Leste Maranhense", d: "Caxias, Timon — divisa com Piauí" },
    { r: "Centro Maranhense", d: "Presidente Dutra — transição climática" },
    { r: "Oeste Maranhense", d: "Imperatriz — 2º maior polo econômico" },
    { r: "Sul Maranhense", d: "Balsas — agronegócio (MATOPIBA)" },
  ];
  return (
    <>
      <section className="space-y-3 text-slate-700 leading-relaxed text-[15px] md:text-base">
        <h4 className="font-display text-xl font-bold text-slate-900">1. Dados essenciais</h4>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { k: "Área", v: "331.937 km²" },
            { k: "Municípios", v: "217" },
            { k: "Capital", v: "São Luís" },
          ].map((s, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{s.k}</p>
              <p className="font-display text-2xl font-bold text-[#0b1f4d] mt-1">{s.v}</p>
            </div>
          ))}
        </div>
        <p>
          O Maranhão é o <strong>2º maior estado do Nordeste</strong> em extensão territorial, com uma posição estratégica entre a Amazônia, o Cerrado e o litoral atlântico — característica única na federação.
        </p>
      </section>

      <section>
        <h4 className="font-display text-xl font-bold text-slate-900 mb-3">2. Mesorregiões do Maranhão</h4>
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#0b1f4d] text-white text-left">
                <th className="px-4 py-3 font-semibold">Região</th>
                <th className="px-4 py-3 font-semibold">Características</th>
              </tr>
            </thead>
            <tbody>
              {regioes.map((r, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="px-4 py-3 font-semibold text-slate-900">{r.r}</td>
                  <td className="px-4 py-3 text-slate-700">{r.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h4 className="font-display text-xl font-bold text-slate-900 mb-3">3. Biomas — mapa mental</h4>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "Amazônia", d: "Oeste do estado — floresta densa" },
            { t: "Cerrado", d: "Sul e Leste — MATOPIBA agrícola" },
            { t: "Costeiro", d: "Lençóis Maranhenses e manguezais" },
          ].map((b, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="size-7 grid place-items-center rounded-full bg-[#0b1f4d] text-white text-xs font-bold">{i + 1}</span>
                <p className="font-display text-lg font-bold text-slate-900">{b.t}</p>
              </div>
              <p className="mt-2 text-sm text-slate-700">{b.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-amber-50 border-l-4 border-amber-400 p-4 text-amber-900 text-sm">
          ⚠️ <strong>Cai muito na prova:</strong> a banca costuma cobrar a transição entre biomas e as ecorregiões da Baixada Maranhense.
        </div>
      </section>

      <section>
        <h4 className="font-display text-xl font-bold text-slate-900 mb-3">4. Questão Cebraspe — comentada</h4>
        <blockquote className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-slate-800 leading-relaxed">
          "O território maranhense apresenta característica singular por reunir simultaneamente elementos dos biomas Amazônia, Cerrado e formações litorâneas típicas do Nordeste."
        </blockquote>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold px-3 py-1.5">✓ CERTO</span>
          <p className="text-sm text-slate-700 flex-1">Comentário: o Maranhão é chamado de "estado de transição" justamente por essa diversidade geográfica.</p>
        </div>
      </section>
    </>
  );
}

function HistPage() {
  const timeline = [
    { y: "1612", e: "Fundação de São Luís pelos franceses (Daniel de La Touche)" },
    { y: "1615", e: "Expulsão dos franceses — domínio português consolidado" },
    { y: "1641-1644", e: "Ocupação holandesa e reconquista lusitana" },
    { y: "1822", e: "Adesão do Maranhão à Independência do Brasil (28/07/1823)" },
    { y: "1835", e: "Balaiada — revolta popular de grande impacto" },
    { y: "1836", e: "Criação da Força Policial do Maranhão — origem da PMMA" },
  ];
  return (
    <>
      <section className="space-y-3 text-slate-700 leading-relaxed text-[15px] md:text-base">
        <h4 className="font-display text-xl font-bold text-slate-900">1. O Maranhão nos ciclos coloniais</h4>
        <p>
          Único estado brasileiro fundado por <strong>franceses</strong>, o Maranhão viveu três ocupações estrangeiras — francesa, portuguesa e holandesa — antes de se consolidar como capitania. Essa herança marca a arquitetura de São Luís, patrimônio da <strong>UNESCO</strong>.
        </p>
      </section>

      <section>
        <h4 className="font-display text-xl font-bold text-slate-900 mb-3">2. Linha do tempo — fatos que caem</h4>
        <div className="relative border-l-2 border-[#123070]/30 pl-6 space-y-4">
          {timeline.map((t, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[34px] top-1 size-4 rounded-full bg-[#0b1f4d] border-4 border-white shadow" />
              <p className="font-display text-lg font-bold text-[#0b1f4d]">{t.y}</p>
              <p className="text-sm text-slate-700">{t.e}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 className="font-display text-xl font-bold text-slate-900 mb-3">3. Origem histórica da PMMA</h4>
        <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5">
          <p className="text-slate-800 leading-relaxed">
            Em <strong>16 de abril de 1836</strong>, sob pressão dos acontecimentos que antecederam a Balaiada, foi criada a <strong>Força Policial do Maranhão</strong> — hoje uma das corporações militares mais antigas do Brasil, com quase 200 anos de história de serviço ao povo maranhense.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-[#0b1f4d] text-white px-3 py-1 font-semibold">Bicentenária</span>
            <span className="rounded-full bg-[var(--gold)]/20 text-[#7a5a10] border border-[var(--gold)]/40 px-3 py-1 font-semibold">Tradição</span>
            <span className="rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 font-semibold">Serviço</span>
          </div>
        </div>
      </section>

      <section className="rounded-xl bg-red-50 border-l-4 border-red-500 p-5">
        <p className="text-red-700 text-xs uppercase tracking-[0.2em] font-bold">O erro que elimina candidatos</p>
        <p className="font-display text-xl font-bold text-red-900 mt-2">Confundir a fundação de São Luís (1612) com a Independência do Maranhão (1823).</p>
        <p className="text-red-900/80 mt-2 text-sm leading-relaxed">
          A Cebraspe adora inverter datas de fundação e adesão à Independência. Guarde as duas com atenção.
        </p>
      </section>
    </>
  );
}


/* ---------------- Instagram-style proof ---------------- */
function LiveCounter({ value, label }: { value: string; label: string }) {
  return (
    <div className="anim-glow-counter glass-strong rounded-2xl px-5 py-4 flex items-center gap-3 border border-[var(--gold)]/40 relative overflow-hidden">
      <div aria-hidden className="absolute -top-10 -right-10 size-24 rounded-full opacity-25 blur-2xl gradient-gold" />
      <span className="relative flex size-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gold)] opacity-60" />
        <span className="relative inline-flex size-3 rounded-full gradient-gold" />
      </span>
      <div className="relative">
        <div className="font-display font-black text-2xl tabular-nums gradient-gold-text leading-none">{value}</div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">{label}</div>
      </div>
    </div>
  );
}

function InstagramProof() {
  const comments = [
    { user: "anaclara.s", city: "São Luís — MA", time: "22 min", text: "os flashcards mudaram minha revisão. tô memorizando muito mais rápido 📘", likes: 128, avatar: "https://randomuser.me/api/portraits/women/44.jpg", reply: "@anaclara.s foco total soldado 🚔💛" },
    { user: "biaanog", city: "Caxias — MA", time: "2 h", text: "a didática é seca e direta, sem enrolação. perfeito pra quem trabalha e estuda 🔥", likes: 211, avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
    { user: "letii.f", city: "Santa Inês — MA", time: "5 h", text: "as questões comentadas cebraspe salvam demais viu, aprendi o padrão da banca", likes: 289, avatar: "https://randomuser.me/api/portraits/women/31.jpg" },
    { user: "yasmin_o", city: "Balsas — MA", time: "12 h", text: "os mapas mentais são absurdos, na reta final vai me salvar", likes: 231, avatar: "https://randomuser.me/api/portraits/women/56.jpg" },
    { user: "brenopm", city: "Açailândia — MA", time: "1 d", text: "material objetivo, direto ao que cai. do jeito que a gente precisa 🔥", likes: 187, avatar: "https://randomuser.me/api/portraits/men/12.jpg" },
    { user: "thiago.sr", city: "S. J. de Ribamar — MA", time: "2 d", text: "melhor investimento do ano de longe. tô confiante na próxima prova 🙏🏽", likes: 411, avatar: "https://randomuser.me/api/portraits/men/12.jpg" },
  ];
  return (
    <Section id="instagram-proof">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
            <Instagram className="size-3.5 text-[var(--gold)]" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--gold)]">Depoimentos reais · Comunidade PMMA</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mt-4">A tropa do Maranhão <span className="gradient-gold-text">já tá dentro</span></h2>
          <p className="mt-3 text-muted-foreground text-lg">Comentários e mensagens reais de quem está usando a apostila.</p>
          <GoldDivider />
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <LiveCounter value="+900" label="candidatos ativos" />
          <LiveCounter value="+599" label="questões comentadas" />
          <LiveCounter value="+194" label="downloads esse mês" />
        </div>
      </FadeIn>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {comments.map((c, i) => (
          <FadeIn key={i} delay={i * 0.05}>
            <div className="glass rounded-2xl p-5 hover:border-[var(--gold)] transition h-full">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-sm">
                    <span className="font-semibold truncate">{c.user}</span>
                    <span className="text-xs text-muted-foreground">• {c.time}</span>
                  </div>
                  <p className="text-[10px] text-[var(--gold)]/80 font-semibold uppercase tracking-wider">{c.city}</p>
                  <p className="text-sm text-foreground/90 mt-1 leading-snug">{c.text}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                    <button className="hover:text-foreground">Curtir</button>
                    <button className="hover:text-foreground">Responder</button>
                  </div>
                  {c.reply && (
                    <div className="mt-3 pl-3 border-l-2 border-[var(--gold)]/30">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold text-[var(--gold)]">apostilapmma</span>
                        <CheckCircle2 className="size-3 text-[var(--gold)]" />
                        <span className="text-muted-foreground">• Autor</span>
                      </div>
                      <p className="text-xs text-foreground/80 mt-1">{c.reply}</p>
                    </div>
                  )}
                </div>
                <div className="text-xs text-muted-foreground flex flex-col items-center gap-1">
                  <span className="text-red-500">♥</span>
                  <span className="tabular-nums">{c.likes}</span>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Acesso Imediato banner ---------------- */
function AcessoImediato() {
  return (
    <Section id="acesso">
      <FadeIn>
        <div className="relative rounded-[2rem] overflow-hidden border-2 border-[var(--gold)]/40 shine-overlay glow-gold gradient-gold p-10 md:p-14 text-center text-[var(--ink)]">
          <h3 className="font-display text-3xl md:text-5xl font-black tracking-tight">ACESSO IMEDIATO</h3>
          <p className="mt-3 text-[var(--ink)]/85 text-base md:text-lg max-w-2xl mx-auto font-semibold">
            Comece a estudar <strong>AGORA</strong>! Sua apostila é liberada em até 2 minutos após a compra.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              { i: Zap, t: "Entrega Imediata" },
              { i: ShieldCheck, t: "Garantia de 7 dias" },
              { i: Users, t: "Suporte Especializado" },
            ].map((b, i) => (
              <span key={i} className="inline-flex items-center gap-2 rounded-full bg-black/25 backdrop-blur px-4 py-2 text-sm font-medium border border-black/20 text-[var(--ink)]">
                <b.i className="size-4" /> {b.t}
              </span>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <a href={CHECKOUT} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] text-[var(--gold-bright)] font-bold px-8 py-4 uppercase tracking-wide hover:scale-105 transition">
              <Flame className="size-5" /> Quero meu acesso agora
            </a>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

/* ---------------- Floating urgency bar ---------------- */
function FloatingUrgencyBar() {
  const { m, s, pad, left, total } = useOfferCountdown();
  const pct = Math.max(3, (left / total) * 100);
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 28, delay: 0.3 }}
      className="fixed top-[76px] sm:top-[84px] inset-x-0 z-50 px-3 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-xl">
        <div className="anim-glow-red relative rounded-2xl border-2 border-red-500/70 bg-gradient-to-br from-red-950/60 via-[var(--ink-soft)]/90 to-red-950/30 px-3.5 sm:px-4 py-2.5 sm:py-3 overflow-hidden backdrop-blur-md">
          <div aria-hidden className="absolute -top-8 -right-8 size-28 rounded-full bg-red-500/40 blur-3xl" />
          <span aria-hidden className="absolute inset-0 pointer-events-none opacity-40" style={{ background: "linear-gradient(115deg, transparent 40%, rgba(248,113,113,0.35) 50%, transparent 60%)", animation: "var(--animate-shine)" }} />
          <div className="flex items-center gap-2.5 sm:gap-3 relative">
            <span className="relative flex size-3 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-80" />
              <span className="relative inline-flex size-3 rounded-full bg-red-500" />
            </span>
            <div className="size-6 sm:size-7 shrink-0 rounded-full grid place-items-center bg-red-500/20 border border-red-400/40 text-red-300">
              <Flame className="size-3.5 sm:size-4" />
            </div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.26em] font-black text-red-400 leading-tight whitespace-nowrap">
              Oferta acaba em
            </p>
            <div className="anim-pulse-red-text ml-auto font-display font-black text-xl sm:text-2xl tabular-nums leading-none text-red-500">
              {pad(m)}:{pad(s)}
            </div>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-red-950/70 overflow-hidden border border-red-500/40">
            <motion.div
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-red-600 to-red-400"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Floating bottom CTAs ---------------- */
function FloatingBottomCTAs() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 28, delay: 0.6 }}
      className="fixed bottom-3 sm:bottom-5 inset-x-0 z-50 px-3 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto flex items-center justify-center gap-2.5 sm:gap-3 w-full max-w-md">
        <motion.a
          href={WHATSAPP}
          target="_blank"
          rel="noopener"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Falar no WhatsApp"
          className="group relative flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-[15px] font-bold text-white shadow-[0_12px_32px_-8px_rgba(16,185,129,0.55)] border border-emerald-400/50 backdrop-blur-md transition-colors"
          style={{ background: "linear-gradient(135deg,#10b981 0%,#059669 100%)" }}
        >
          <MessageCircle className="size-4 sm:size-[18px]" strokeWidth={2.4} />
          <span className="tracking-wide">WhatsApp</span>
        </motion.a>
        <motion.a
          href={CHECKOUT}
          target="_blank"
          rel="noopener"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="anim-glow-buy group relative flex-[1.25] inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-6 py-3 sm:py-3.5 text-[12px] sm:text-[15px] font-black uppercase tracking-wide text-white border border-[var(--gold)]/50 overflow-hidden backdrop-blur-md text-center leading-tight"
          style={{ background: "linear-gradient(135deg, var(--gold-dark) 0%, var(--gold) 50%, var(--gold-dark) 100%)" }}
        >
          <span aria-hidden className="absolute inset-0 pointer-events-none opacity-30" style={{ background: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)", animation: "var(--animate-shine)" }} />
          <Flame className="size-4 sm:size-[18px] relative shrink-0" />
          <span className="relative drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Garantir agora com a promoção</span>
        </motion.a>
      </div>
    </motion.div>
  );
}

function Landing() {
  return (
    <main className="relative bg-background text-foreground overflow-x-hidden pb-24 sm:pb-28">
      <OfferNav />
      <Hero />
      <Marquee />
      <Authority />
      <DevicesShowcase />
      <ApostilaPreview />
      <Pains />
      <Offer />
      <SocialCarousel />
      <InstagramProof />
      <AcessoImediato />
      <FAQ />
      <Footer />
      <FloatingUrgencyBar />
      <FloatingBottomCTAs />
    </main>
  );
}
