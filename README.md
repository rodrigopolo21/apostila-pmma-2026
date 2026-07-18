# Apostila PMMA 2026 — Polícia Militar do Maranhão

Landing page de vendas da Apostila Completa para o concurso da **Polícia Militar
do Maranhão (PMMA)** — Legislação Institucional, Informática, Raciocínio Lógico,
questões no padrão Cebraspe, mapas mentais e mais.

Aplicação **React + Vite (SPA)** — 100% estática, sem servidor. Faz deploy em
qualquer host estático (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

## Stack

- **React 19** + **TypeScript**
- **Vite 7** (build/SPA)
- **TanStack Router** (roteamento client-side)
- **Tailwind CSS 4** + componentes **shadcn/ui** (Radix)
- **Framer Motion** (animações)

## Rodar localmente

```bash
npm install       # instala as dependências
npm run dev        # sobe em http://localhost:8080
```

## Scripts

| Comando           | O que faz                                       |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento (porta 8080)        |
| `npm run build`   | Gera o site estático em `dist/`                 |
| `npm run preview` | Serve o build de produção localmente            |
| `npm run lint`    | Verifica o código com ESLint                    |

## Deploy

O build gera uma pasta `dist/` estática. Configurações prontas incluídas:

- **Vercel** → `vercel.json` (framework Vite, output `dist`, fallback SPA)
- **Netlify** → `netlify.toml` + `public/_redirects`

### Vercel (recomendado)

```bash
npm i -g vercel
vercel --prod
```

Ou pela interface: importe o repositório, o `vercel.json` já configura tudo
(inclusive o fallback de SPA que faz qualquer rota devolver `index.html` — sem 404).

### Netlify

Importe o repositório — o `netlify.toml` já define build `npm run build` e
publicação em `dist` com o redirect de SPA.

## Estrutura

```
index.html               # HTML raiz (meta tags, fontes)
src/
  main.tsx               # ponto de entrada (monta o RouterProvider)
  router.tsx             # configuração do TanStack Router
  routes/
    __root.tsx           # layout raiz + telas de 404/erro
    index.tsx            # a landing page completa
  styles.css             # design tokens + Tailwind
  assets/                # imagens (otimizadas)
  components/ui/         # componentes shadcn/ui
  hooks/ · lib/          # utilitários
```

## Personalização rápida

- **Links** (WhatsApp, checkout, Instagram): constantes `WHATSAPP`, `CHECKOUT`,
  `INSTAGRAM` no topo de `src/routes/index.tsx`.
- **Textos e seções**: `src/routes/index.tsx`.
- **Cores/tema**: variáveis CSS (`--gold`, `--ink`, etc.) em `src/styles.css`.
