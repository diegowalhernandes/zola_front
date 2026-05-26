# Zola — Design System

> Rebranding visual da plataforma que conecta clientes e profissionais.  
> **Escopo:** identidade, UI e percepção de valor — sem alteração de fluxos ou regras de negócio.

---

## 1. Conceito visual da marca

**Nome:** Zola  
**Tagline:** Profissionais verificados. Conexões de confiança.

**Essência:** Uma plataforma SaaS de confiança que elimina fricção entre quem precisa de um serviço e quem o executa com excelência. Visual inspirado em Stripe, Linear e Notion: limpo, técnico, premium.

**Metáfora:** Ponte digital — navy/graphite (solidez) + cyan/indigo (tecnologia e movimento).

---

## 2. Direção de identidade visual

| Pilar | Direção |
|--------|---------|
| Confiança | Tipografia forte, espaçamento generoso, badges de verificação |
| Tecnologia | Gradientes sutis cyan→indigo, glass header, sombras glow |
| Simplicidade | Poucos elementos por tela, hierarquia clara |
| Premium | Plus Jakarta Sans, bordas 12–16px, sombras premium |
| Transparência | Cards de especificações, agenda visível, estados claros |

**Logo:** Monograma “Z” em gradiente brand sobre cantos arredondados (`rounded-xl`).

---

## 3. Paleta de cores

### Light mode
| Token | Hex | Uso |
|--------|-----|-----|
| `graphite-50` | `#f8f9fb` | Fundo página |
| `graphite-900` | `#1a1e27` | Texto principal |
| `graphite-500` | `#6b7385` | Texto secundário |
| `brand-600` | `#0891b2` | Primária / links |
| `brand-500` | `#06b6d4` | Acentos, focus |
| `navy-900` | `#121a36` | Painéis escuros |
| `accent-500` | `#6366f1` | Gradiente secundário |

### Dark mode
| Token | Hex | Uso |
|--------|-----|-----|
| `navy-950` | `#070b14` | Fundo página |
| `navy-900` | `#121a36` | Cards |
| `graphite-100` | `#f1f3f7` | Texto principal |
| `brand-400` | `#22d3ee` | Primária dark |

### Gradientes
- **brand:** `135deg, #0891b2 → #6366f1` (CTAs, logo)
- **mesh:** radiais cyan/indigo 8–15% opacidade (hero)

---

## 4. Tipografia

**Família:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)

| Classe | Tamanho | Peso | Uso |
|--------|---------|------|-----|
| `.heading-display` | 40–52px | 800 | Hero, landing |
| `.heading-page` | 30px | 800 | Títulos de página |
| body | 16px | 400–500 | Parágrafos |
| `.eyebrow` | 12px | 600 | Labels de seção (uppercase) |
| `.text-muted` | 14–16px | 400 | Descrições |

---

## 5. Design system básico (tokens Tailwind)

Arquivos: `tailwind.config.js`, `src/styles.css`, `src/design/brand.ts`

### Superfícies
- `.surface-page` — fundo da página
- `.card` — container padrão
- `.card-elevated` — destaque (forms, modais)
- `.card-interactive` — hover com glow
- `.glass-header` — navbar sticky
- `.panel-dark` — seções institucionais

### Ações
- `.btn-primary` — gradiente + glow
- `.btn-secondary` — outline neutro
- `.btn-ghost` — ícones / toggles

### Formulários
- `.input` — campos com focus ring brand
- `.alert-error` / `.alert-success`

### Navegação
- `.nav-link` / `.nav-link-active`
- `.sidebar-link` / `.sidebar-link-active`

---

## 6. Componentes UI principais

| Componente | Arquivo | Notas |
|------------|---------|-------|
| Logo | `components/common/Logo.tsx` | Monograma Z + tagline |
| Navbar | `components/layout/Navbar.tsx` | Glass, dark mode |
| Card profissional | `components/professionals/ProfessionalCard.tsx` | Hover lift 4px |
| Rating | `components/common/Rating.tsx` | Estrelas brand |
| Toast | `contexts/ToastContext.tsx` | Slide up, navy/white |
| Skeleton | `components/common/Skeleton.tsx` | Loading states |

---

## 7. Melhorias visuais por tela

### Dashboard (cliente / profissional)
- Título `.heading-page`, métricas em `.stat-card`
- Sidebar com links ativos em gradiente soft
- Listas em `.list-row`

### Login / Cadastro
- Split layout: painel institucional (desktop) + form `.card-elevated`
- Toggle Cliente/Profissional com botões primário/secundário
- Onboarding profissional em painel brand soft

### Perfil profissional
- Hero cover + avatar com ring
- Blocos: especificações, agenda, avaliações em `.card`
- Aside resumo com badge disponibilidade

### Busca
- Filtros em card lateral sticky
- Grid de `ProfessionalCard` responsivo

### Chat
- Container `.card-elevated`, bolhas brand (eu) / graphite (outro)
- Header com status “Conectado” em brand

---

## 8. Exemplos de estilo

### Botão primário
```html
<button class="btn-primary">Confirmar agendamento</button>
```

### Card
```html
<div class="card p-6">...</div>
```

### Input
```html
<input class="input" placeholder="E-mail" />
```

### Navegação ativa
```html
<a class="nav-link-active nav-link bg-brand-500/10">Buscar</a>
```

---

## 9. Guia de consistência

1. **Sempre** usar classes do design system — evitar cores soltas (`emerald-*`, `slate-*` legado).
2. **Espaçamento:** múltiplos de 4 (Tailwind `4`, `6`, `8`, `12`).
3. **Raio:** `rounded-xl` (inputs/botões), `rounded-2xl` (cards), `rounded-3xl` (hero).
4. **Sombras:** `shadow-card` default, `shadow-premium` hero, `shadow-glow` CTAs.
5. **Dark mode:** classe `dark` no `<html>`, toggle em Navbar.
6. **Ícones:** react-icons `Fi*` (Feather) — traço fino, 18–20px.
7. **Motion:** hover `-translate-y-0.5` em botões; cards `y: -4` (Framer); toast slide 30px.

---

## 10. Microinterações e animações

| Elemento | Animação | Duração |
|----------|----------|---------|
| Botão primary | hover lift + brightness | 200ms |
| Card interativo | hover border glow | 300ms |
| Toast | fade + slide up | 400ms |
| Página | `animate-fade-in` | 400ms |
| Menu mobile | `animate-slide-up` | 450ms |
| ProfessionalCard | `whileHover={{ y: -4 }}` | spring |

**Evitar:** animações longas, parallax pesado, cores piscando.

---

## Implementação

O rebranding foi aplicado em:
- `tailwind.config.js`, `src/styles.css`
- Layouts, Navbar, Logo, Home, Auth, Register, Search, Chat, Dashboards
- Componentes compartilhados (cards, toast, professional card)

**Não alterado:** rotas, serviços API, regras de agendamento, cadastro, filtros, chat backend.

---

*Zola — pronta para escala, investimento e crescimento.*
