# 設計參考：Shinwa Active（日本物流／DX 企業網站）

> 這**不是** Blazelink 的設計規範，只是抓來參考的範例。
> 行銷頁的視覺方向以 `design-brief.md` §6（明亮克制的顧問白）為準。
> 來源：https://shinwa-active.co.jp/ ，經 aura.build 萃取。

---

---
version: alpha
name: Shinwa Active Corporate Site
description: A professional logistics and DX corporate site utilizing a high-contrast industrial palette, dynamic scrolling elements, and motion-heavy branding.
colors:
  primary: "#212836"
  accent: "#0060B0"
  surface: "#F3F3F3"
  text-main: "#000000"
  text-sub: "#999999"
  white: "#FFFFFF"
typography:
  families:
    sans: "'Noto Sans JP', sans-serif"
    heading: "'Montserrat', 'Heebo', sans-serif"
  sizes:
    h1: "42px"
    h2: "36px"
    body: "16px"
    meta: "13px"
  weights:
    light: 300
    regular: 400
    bold: 700
spacing:
  section: "5.06rem"
  gap: "24px"
rounded:
  default: "0px"
  pill: "9999px"
components:
  button: "{colors.primary}"
  news-card: "{colors.white}"
---
## Overview
The Shinwa Active website presents an image of reliability and technological advancement within the logistics sector. The visual personality is characterized by high-density information layout, substantial use of full-width video backgrounds, and a sophisticated industrial color scheme. Motion cues are frequent, featuring marquee-style scrolling text (moving horizontally behind sections), parallax image sliders, and SVG path animations in the recruitment section. The tone is professional yet forward-looking, utilizing a mix of bold sans-serif English headings and structured Japanese body text.
## Colors
The palette is rooted in deep charcoal and navy tones, providing a stable foundation for the logistics industry.
- **Primary Blue (#0060B0)**: Used primarily in gradients and the recruitment call-to-action, signifying trust and technology.
- **Dark Neutral (#212836)**: The dominant text and UI accent color, used for high-contrast legibility.
- **Surface Gray (#F3F3F3)**: Used for secondary section backgrounds to provide subtle depth transitions from white.
- **Semantic Gradients**: Linear transitions from primary blue to darker charcoal are used for decorative SVG elements and overlays.
## Typography
The typography follows a dual-language hierarchy. Montserrat and Heebo provide a clean, modern aesthetic for English subheadings and decorative elements, while Noto Sans JP ensures readability for business-critical information.
- **Headings**: Feature large, bold English labels (e.g., "SERVICE", "CASE") paired with smaller Japanese translations.
- **Meta Data**: Dates and categories in the News section use a monospaced-adjacent clean sans-serif at reduced sizes (13px).
- **Copy**: Body text uses a generous line height (approx. 1.8) for maximum readability against complex backgrounds.
## Layout
The site utilizes a flexible container system with a standard content width of 1100px. Sections are vertically separated by large gaps (up to 80px), creating a sense of scale. Layout patterns include:
- **Grid Systems**: News and Case Study sections use a responsive grid that transitions from 3-column layouts on desktop to single columns on mobile.
- **Asymmetric Blocks**: The Service section uses alternating image/text blocks to maintain visual interest.
- **Infinite Horizontal Scroll**: Background marquee text ("ABOUT", "RECRUIT") moves continuously to imply constant activity.
## Elevation & Depth
Depth is achieved through layering rather than traditional drop shadows.
- **Stacking**: Large typographic elements sit behind foreground images to create a multi-layered effect.
- **Glass/Overlays**: The header uses a semi-transparent or solid white background depending on scroll position to maintain visibility over video content.
- **Noise Texture**: A subtle noise grain background (`noise.png`) is applied to various surfaces to give the industrial site a tactile, high-end finish.
## Shapes
The design language is predominantly rectilinear, using sharp corners for images, cards, and section containers.
- **Contrast Shapes**: Pill-shaped elements (9999px radius) are reserved for specific functional UI like tags or pagination dots.
- **Geometric Accents**: Circular SVG rings and paths are used as decorative backgrounds to break the grid and reference the "circle of trust" mentioned in the brand copy.
## Components
- **Navigation**: A persistent header with a clean text-based menu that transitions into a full-screen overlay on mobile.
- **Action Buttons**: Rectangular containers with high-contrast text and a subtle right-pointing arrow icons inside the hover state.
- **Cards**: News cards feature a fixed aspect ratio thumbnail followed by stacked metadata and a title, with a hover effect that scales the image slightly.
- **Tab System**: Functional radio-button controlled tabs for filtering news categories without page reloads.
## Do's and Don'ts
- **Do**: Maintain the high-contrast relationship between deep blues and bright whites.
- **Do**: Use English subheaders in all-caps Montserrat above Japanese section titles.
- **Do**: Use horizontal marquee text as a background layer for primary sections.
- **Don't**: Introduce soft rounded corners to content cards or primary buttons; keep them sharp.
- **Don't**: Use drop shadows on text; prefer high-contrast background overlays for legibility.
## Accessibility
- **Contrast**: The site adheres to high-contrast requirements by using a primary charcoal color for text on light backgrounds.
- **Interactive Targets**: Buttons and navigation links have clearly defined target areas, and hover states typically involve a transition in opacity or background color.
- **Motion**: The site includes significant motion (parallax, marquee text, video). For accessibility compliance, it is noted that system-level "reduced motion" settings should ideally pause the background marquee and video loops.
- **Hierarchy**: Clear usage of H1 through H4 tags provides a logical document outline for screen readers.
## Assets
- **Background**: https://shinwa-active.co.jp/ajax-loader.gif
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/common/footer/logo/logo.svg
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/common/footer/other/jcr.png
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/common/footer/other/kenko.png
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/common/footer/other/privacy.png
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/common/header/logo/logo.png
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/common/img_dummy02.png
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/common/sns/ig.png
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/common/sns/line.png
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/common/sns/youtube.png
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/about/bg-text.png
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/fv/text-sp.svg
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/fv/text.svg
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/recruit/bg-text.png
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/recruit/copy.svg
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/service/01.webp
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/service/02.webp
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/service/03.webp
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/service/bg-sp.png
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/service/bg.png
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/slide/01.webp
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/slide/02.webp
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/slide/03.webp
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/slide/04.webp
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/slide/05.webp
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/slide/06.webp
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/slide/07.webp
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/slide/08.webp
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/slide/09.webp
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/slide/10.webp
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/slide/11.webp
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/slide/12.webp
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/img/top/slide/13.webp
- **Video**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/corporate/movie/fv.mp4
- **Icon**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/img/common/apple-touch-icon.png
- **Icon**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/themes/shinwa-active/img/common/favicon.ico
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/uploads/2023/05/ogp.png
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/uploads/2023/07/256f29ac49c9debca6e8323131b652b3.webp
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/uploads/2023/07/5cb3e62859fb2ea2e3332f821f6cbb02.jpg
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/uploads/2023/07/7456db506df564a7ebe627c13907b793.jpg
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/uploads/2023/07/9edb0b9bdbc528e4b946d32578041741.jpg
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/uploads/2023/08/5117828c5f6de565ce8af27f6e0e2f5e.jpg
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/uploads/2023/12/20231221-3.jpeg
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/uploads/2024/06/20240626-1.jpg
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/uploads/2025/07/20250718-1.jpg
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/uploads/2025/10/20251001-2.jpg
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/uploads/2026/05/DSC06098-2.webp
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/uploads/2026/06/20260612-2.jpg
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/uploads/2026/08/20260803-2.jpg
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/uploads/2026/08/20260820-3.jpg
- **Image**: https://shinwa-active.co.jp/cms_Y9Vc8j2Y/wp-content/uploads/2026/08/20260828-3.jpg
- **Font**: https://shinwa-active.co.jp/fonts/montserrat-v31-latin-200.woff
- **Font**: https://shinwa-active.co.jp/fonts/montserrat-v31-latin-200.woff2
- **Font**: https://shinwa-active.co.jp/fonts/montserrat-v31-latin-300.woff
- **Font**: https://shinwa-active.co.jp/fonts/montserrat-v31-latin-300.woff2
- **Font**: https://shinwa-active.co.jp/fonts/montserrat-v31-latin-500.woff
- **Font**: https://shinwa-active.co.jp/fonts/montserrat-v31-latin-500.woff2
- **Font**: https://shinwa-active.co.jp/fonts/montserrat-v31-latin-700.woff
- **Font**: https://shinwa-active.co.jp/fonts/montserrat-v31-latin-700.woff2
- **Font**: https://shinwa-active.co.jp/fonts/montserrat-v31-latin-regular.woff
- **Font**: https://shinwa-active.co.jp/fonts/montserrat-v31-latin-regular.woff2
- **Font**: https://shinwa-active.co.jp/fonts/slick.eot
- **Font**: https://shinwa-active.co.jp/fonts/slick.ttf
- **Font**: https://shinwa-active.co.jp/fonts/slick.woff
- **Background**: https://shinwa-active.co.jp/img/common/bg/noise.png
- **Background**: https://shinwa-active.co.jp/img/common/btn/arrow/white/bottom.png
- **Background**: https://shinwa-active.co.jp/img/common/btn/arrow/white/left.png
- **Background**: https://shinwa-active.co.jp/img/common/btn/arrow/white/right.png
- **Background**: https://shinwa-active.co.jp/img/common/footer/bg-sp.png
- **Background**: https://shinwa-active.co.jp/img/common/footer/bg.png
- **Background**: https://shinwa-active.co.jp/img/common/footer/contact/call.png
- **Background**: https://shinwa-active.co.jp/img/common/footer/contact/download.png
- **Background**: https://shinwa-active.co.jp/img/common/header/contact/call.png
- **Background**: https://shinwa-active.co.jp/img/common/header/contact/download.png
- **Background**: https://shinwa-active.co.jp/img/service/contact/bg-sp.png
- **Background**: https://shinwa-active.co.jp/img/service/contact/bg.png
- **Background**: https://shinwa-active.co.jp/img/service/logistics/logistics-bg.png
- **Font**: https://shinwa-active.co.jp/fonts/slick.eot?#iefix — contexts: css url()
- **Background**: https://shinwa-active.co.jp/fonts/slick.svg#slick — contexts: css url()
