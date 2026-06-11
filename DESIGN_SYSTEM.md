# Zola — Design System

Identidade visual acolhedora para conexão entre famílias e profissionais domésticos.

## Marca

- **Nome:** Zola
- **Slogan:** Cuidando de quem cuida da sua família.
- **Alternativo:** Conectando confiança, cuidado e oportunidades.

## Paleta

| Token | HEX | Uso |
|-------|-----|-----|
| Azul Petróleo | `#2B4C7E` | Header, logo, botões primários, confiança |
| Verde Sálvia | `#7BAE7F` | Verificação, ícones, apoio |
| Amarelo Suave | `#F2C94C` | CTAs de conversão |
| Off White | `#F7F2E8` | Fundo acolhedor |
| Cinza Escuro | `#2D3748` | Textos |

## Tipografia

- **Fonte:** DM Sans (Google Fonts)

## Componentes (classes)

- `btn-primary` — ação principal (petróleo)
- `btn-accent` — conversão (amarelo)
- `btn-secondary` — ação secundária
- `card` / `card-interactive` / `card-elevated`
- `eyebrow` — rótulos de seção
- `heading-display` / `heading-page` / `heading-section`
- `badge-verified` — selo verificado

## Princípios

- Espaçamento generoso, bordas arredondadas (`rounded-2xl` / `rounded-3xl`)
- Visual humano, fotografias reais, micro-animações (Framer Motion)
- Mobile first
- Evitar aspecto de classificados ou excesso de informação

Tokens em `src/design/brand.ts` e `tailwind.config.js`.
