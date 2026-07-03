# Handoff: Invitación Baby Shower — Matías

## Overview
Invitación digital animada para el Baby Shower de Matías (Colombia). Es una experiencia mobile-first de una sola página, con tres pantallas secuenciadas (loader → apertura animada → invitación principal), tema "osito" en paleta azul de bebé, countdown en vivo, tarjetas de detalle del evento, y CTAs de confirmación por WhatsApp + mapa.

## About the Design Files
Los archivos de este bundle (`.dc.html`) son **referencias de diseño de alta fidelidad**, construidos en un entorno de prototipado propio (Design Components) — no son código de producción para copiar tal cual. La tarea es **recrear este diseño en HTML + CSS + JS plano** (o el framework que uses), respetando exactamente colores, tipografía, tiempos y animaciones descritos abajo. Puedes abrir los `.dc.html` directamente en el navegador para ver el diseño renderizado y usarlos como referencia visual pixel-perfect — el contenido entre `<x-dc>...</x-dc>` es el HTML/CSS real (estilos inline), y la clase `Component` al final es la lógica de estado equivalente a JS vanilla.

## Fidelity
**Alta fidelidad (hifi).** Todos los colores, tipografías, tamaños, tiempos de animación y transiciones indicados abajo son finales — deben implementarse tal cual, no son solo indicativos.

---

## Screens / Views

### 1. Loader (pantalla de carga inicial)
- **Propósito:** primera pantalla que ve el invitado al abrir el link, ~2.2s.
- **Fondo:** sólido `#24425F` (navy), pantalla completa (`position: fixed; inset: 0`).
- **Contenido, centrado vertical y horizontal:**
  - Ícono de cabeza de oso, 72×72px (ver "Ícono osito" en Design Tokens), con un anillo pulsante alrededor (`pulseRing`, ver Animations).
  - Texto "MI BABY SHOWER" — Poppins 500, 11px, letter-spacing 3px, uppercase, color `#DCE9F2`.
  - "Matías" — Great Vibes cursive, 30px, blanco, debajo del texto anterior.
  - Gap vertical entre elementos: 18px.
- **Duración:** se muestra 2200ms y pasa automáticamente a "Apertura" (con transición fade, ver Interactions).

### 2. Apertura (pantalla animada de invitación)
- **Propósito:** anuncio principal con globos flotando estilo oso.
- **Fondo:** pantalla completa, gradiente lineal 180°, de `#1B334C` (arriba) a `#24425F` (abajo).
- **Globos flotando (7 unidades):** cada uno es una "cabeza de oso" simplificada — un círculo grande + 2 círculos pequeños (orejas) en las esquinas superiores, color y tamaño variables (ver Design Tokens → Balloons), animación `balloonFloat` infinita, posiciones y delays distintos por globo para que no se muevan sincronizados.
- **Texto central:**
  - "MIS PAPIS QUIEREN QUE ME ACOMPAÑES EN MI BABY SHOWER" — Poppins 500, 13px, letter-spacing 3px, uppercase, color `#A9C9E0`, margin-bottom 14px.
  - "Matías" — Great Vibes, tamaño responsivo `clamp(48px, 16vw, 76px)`, blanco.
- **Botón "Toca para continuar":** debajo, margin-top 46px. Fondo transparente, borde 1px `rgba(255,255,255,0.4)`, texto blanco, Poppins 500, 13px, letter-spacing 1px, padding 14px 30px, border-radius 8px. Hover: borde y texto pasan a `#A9C9E0`.
- **Duración:** se muestra automáticamente hasta los 8200ms totales desde el inicio (loader + apertura), O hasta que el usuario toque el botón — lo que ocurra primero.

### 3. Invitación principal
- **Contenedor:** tarjeta centrada, `max-width: 480px`, ancho 100% en pantallas angostas, fondo `#F5F8FA`, `box-shadow: 0 0 60px rgba(36,66,95,0.15)`, `overflow: hidden`, `position: relative`.
- **Fondo ambiente:** 4 manchas circulares (blobs) difuminadas, opacidad 0.07, `z-index: -1` (detrás de todo el contenido), animación `bgDrift` infinita (colores y tamaños en Design Tokens).

#### Header (dentro de la tarjeta)
- Fondo `#24425F`, padding `56px 28px 64px`, texto centrado, `overflow: hidden`.
- 4 mini-globos-oso translúcidos (opacity 0.3) flotando dentro del header únicamente (mismo patrón que en Apertura pero más pequeños), posicionados en las esquinas para no tapar texto.
- Ícono de osito 60×60px (mismo diseño que el loader, ver Design Tokens).
- "MI BABY SHOWER" — Poppins 500, 12px, letter-spacing 3px, uppercase, color `#A9C9E0`.
- "Matías" — Great Vibes, `clamp(42px, 13vw, 64px)`, blanco.
- Cita: `"Mis papás , desean que los acompañes a celebrar mi llegada"` — Poppins italic, 15px, line-height 1.6, color `#DCE9F2`, max-width 320px centrado.

#### Countdown ("¿Cuánto falta?")
- Título: Poppins 600, 11px, letter-spacing 2px, uppercase, color `#24425F`, centrado.
- Grid de 4 columnas, gap 10px (4 celdas: Días / Horas / Min / Seg).
- Cada celda: fondo `rgba(36,66,95,0.06)`, borde 1px `#C89860`, border-radius 10px, padding `14px 4px`, texto centrado.
- Número: Poppins 800, tamaño responsivo `clamp(20px, 7vw, 30px)`, color `#C89860` (accent gold). Se anima con `countPulse` (scale bump) cada vez que cambia el valor.
- Label (DÍAS/HORAS/MIN/SEG): Poppins 600, 9px, letter-spacing 1px, uppercase, color `#33475A`.
- **Se actualiza cada segundo en vivo** (contador regresivo real hacia la fecha del evento) — implementar como componente aislado con su propio intervalo, para que el re-render por segundo NO afecte/reinicie el resto de la página (ver nota en Interactions).

#### Fotos (par de imágenes cuadradas)
- Fila flex, gap 14px, `flex-wrap: wrap` para pantallas muy angostas.
- Cada foto: `aspect-ratio: 1/1`, border-radius 14px, `object-fit: cover`, overlay de gradiente oscuro en la parte inferior con un label (Poppins 600, 11px, uppercase, blanco) — ej. "Mis papis" / "Matías".
- Placeholder mientras no hay imagen: patrón de rayas diagonales suave en el color de acento correspondiente.

#### Tarjetas de detalles del evento
- Título "DETALLES DEL EVENTO" — mismo estilo que el título del countdown.
- Columna de tarjetas, gap 12px. Cada tarjeta: fondo blanco, borde `rgba(36,66,95,0.10)`, border-radius 12px, padding `18px 20px`, shadow suave `0 2px 8px rgba(0,0,0,0.05)`.
  - Label superior (ej. "FECHA", "HORA", "LUGAR"): Poppins 600, 10px, letter-spacing 1.5px, uppercase, color `#C89860`.
  - Título: Poppins 600, 16px, color `#24425F`.
  - Subtítulo opcional (ej. dirección): Poppins 13px, color `#5b6b78`, line-height 1.5.
  - **Nota destacada** (ej. aviso de parqueadero): Poppins 600, 13px, color `#B5544A` (terracota), separada por `border-top: 1px dashed rgba(181,84,74,0.3)`, padding-top 10px, margin-top 10px — debe verse claramente distinta al resto de la tarjeta, no como texto secundario.
- Tarjeta especial "Nota especial / Lluvia de Sobres": fondo degradado sutil rosa (`rgba(217,140,147,0.10)` → `rgba(217,140,147,0.03)`), borde `#D98C93`. Texto: "Tu cariño y compañía son el mejor regalo para Matías."
- Tarjeta RSVP (fecha límite de confirmación): fondo `rgba(36,66,95,0.05)`, borde `rgba(36,66,95,0.12)`, layout flex `space-between` (envuelve en columna si no cabe), con un badge de días restantes a la derecha: fondo `#24425F`, número Poppins 800 22px color `#C89860`, label "días" Poppins 600 8px uppercase color `#DCE9F2`. Este badge también cuenta regresiva en vivo (actualiza cada 30s, componente aislado).

#### CTA de mapa
- Botón/link ancho completo: fondo blanco, borde 1px `#24425F`, texto `#24425F`, Poppins 600, 14px, padding `16px 20px`, border-radius 8px. Hover: fondo `#24425F`, texto blanco. Abre Google Maps en nueva pestaña.

#### CTAs de WhatsApp
- Dos botones apilados, ancho completo, texto centrado, Poppins 600, 15px, padding `16px 20px`, border-radius 8px:
  - "Confirmar con papi" — fondo `#4C8C63` (verde), shadow `0 4px 16px rgba(76,140,99,0.25)`.
  - "Confirmar con mami" — fondo `#D98C93` (rosa), shadow `0 4px 16px rgba(217,140,147,0.25)`.
- Hover en ambos: `transform: translateY(-2px)` + shadow más intensa.
- Cada botón abre `https://wa.me/<número>?text=<mensaje-precargado-urlencoded>` en nueva pestaña.

#### Footer
- Huella de oso decorativa centrada (una almohadilla ovalada + 3 dedos pequeños encima, todo color `#C89860`) — NO usar puntos crecientes genéricos, debe leerse claramente como huellita.
- "Con cariño, Milton & Jhoanna" — Great Vibes, 24px, color `#24425F`.

#### Botón flotante de música
- `position: fixed; bottom: 20px; right: 20px`, círculo 48×48px, fondo `#24425F`, borde 1px `#C89860`, ícono `♪` / `❚❚` según estado, color `#C89860`, shadow `0 4px 16px rgba(36,66,95,0.3)`. Toggle play/pause de un `<audio loop>`.

---

## Interactions & Behavior

### Secuencia de fases
1. `loading` (0–2200ms)
2. `opening` (2200–8200ms, o hasta tap en "Toca para continuar")
3. `main` (resto de la sesión)

### Transición entre fases — MUY IMPORTANTE, esto es lo que se perdió
Cada cambio de fase (loading→opening, opening→main) hace un **crossfade de opacidad de ~0.9s**, NO un corte instantáneo:
1. Al disparar el cambio de fase, el contenido actual pasa a `opacity: 0` con `transition: opacity 0.9s ease`.
2. Se espera **900ms** (con `setTimeout`) para que termine el fade-out.
3. Recién ahí se monta el contenido de la siguiente fase y se pone `opacity: 1` (que también anima in con la misma transición de 0.9s).
4. Durante la ventana de fade-out (los 900ms), se superpone una animación extra: una silueta de osito borrosa (`filter: blur(6px)`) que **crece de escala 0.4 a 2.6 mientras se desvanece** (`opacity: 0 → 0.5 → 0`), centrada en pantalla, `pointer-events: none`, duración 1.1s, easing `ease-out`. Esto da la sensación de "avance" entre pantallas.

### Por qué el contador NO debe re-renderizar toda la página
El countdown y el badge de RSVP actualizan su propio estado cada 1s / 30s respectivamente. **Deben ser componentes aislados** con su propio `setInterval`, para que ese tick por segundo no dispare un re-render del árbol completo — si el contador vive en el mismo componente que controla las fases/animaciones, cada re-render por segundo reinicia las animaciones CSS de una sola vez (fade-ins, etc.) a medio camino, causando parpadeos o pantallas en blanco. Este fue un bug real que se corrigió aislando el countdown.

### Otras animaciones (continuas, no re-disparar nunca)
- `balloonFloat`: los globos-oso (apertura + header) flotan infinitamente — translateY -28px, translateX +10px, rotate ±3°, ease-in-out, loop infinito. Cada globo tiene su propia duración (5–9s) y delay para que no se sincronicen.
- `bgDrift`: las manchas de fondo de la tarjeta principal se mueven sutilmente (translate + scale 1.06), 20–26s por ciclo, opacity fija en 0.07 — deben ser prácticamente imperceptibles, solo dan vida al fondo.
- `pulseRing`: anillo pulsante alrededor del ícono del loader, box-shadow expandiéndose, 1.8s loop.
- `countPulse`: bump de escala (1 → 1.12 → 1) en el número del contador cada vez que cambia su valor.
- Hover states en botones (mapa, WhatsApp, "toca para continuar") son transiciones CSS normales de 0.25s, no keyframes.

**Nota:** no se usan animaciones de entrada de una sola vez tipo `fadeInUp`/`fadeIn` en los contenidos internos — se removieron a propósito porque combinadas con capturas de pantalla y con el re-render del contador causaban que el contenido apareciera en blanco. Las únicas animaciones deben ser las continuas (loop) listadas arriba, más el crossfade de fase y la silueta de oso.

## State Management
- `phase`: `'loading' | 'opening' | 'main'`
- `fade`: `'in' | 'out'` — controla la opacidad del wrapper durante la transición
- Countdown: fecha objetivo del evento `2026-08-01T15:00:00-05:00` (zona horaria Bogotá, UTC-5)
- RSVP badge: fecha límite `2026-07-25T23:59:59-05:00`
- `isMusicPlaying`: boolean para el toggle de audio

## Design Tokens

### Colores
- Navy (fondo header/loader/apertura): `#24425F`
- Navy gradiente apertura: `#1B334C` → `#24425F`
- Fondo página/tarjeta principal: `#F5F8FA`
- Texto cuerpo: `#33475A`
- Accent gold (oso, countdown, bordes): `#C89860`
- Gold gradiente (cara del oso): `#D9AD78` → `#C89860`
- Crema (hocico/orejas internas del oso): `#F3E4CC`
- Celeste bebé (acentos, eyebrow text): `#A9C9E0`
- Rosa (acento, botón mamá): `#D98C93`
- Verde (botón papá/WhatsApp): `#4C8C63`
- Terracota alerta (nota parqueadero): `#B5544A`
- Texto muted en tarjetas: `#5b6b78`

### Tipografía
- Display/firma: **Great Vibes** (cursiva), Google Fonts.
- Todo lo demás: **Poppins**, pesos 400/500/600/700/800, Google Fonts.
- Jerarquía uppercase + letter-spacing amplio (2–3px) para eyebrows/labels en todo el diseño — es parte del sistema, mantenerlo consistente.

### Ícono osito (usado en loader y header, 2 tamaños: 72px y 60px)
Círculo con gradiente radial `#D9AD78`→`#C89860`, 2 círculos más pequeños arriba a los lados (orejas) con un círculo crema encima (interior de oreja), y dentro del círculo principal: óvalo crema (hocico) en la parte inferior, 2 puntos navy (ojos), 1 óvalo navy pequeño (nariz).

### Balloons (7 en Apertura, 4 más pequeños/translúcidos en Header)
Estructura: círculo principal + 2 círculos más pequeños en las esquinas superiores (orejas), mismo color que el círculo principal. Colores rotando entre `#C89860` / `#A9C9E0` / `#D98C93`. Tamaños 24–46px (apertura) / 14–26px (header, opacity 0.3).

### Assets
- `papas.jpeg` / `bebe.jpeg` — reemplazar por fotos reales de la familia (actualmente son placeholders con textura de rayas). Estas se muestran en la sección de fotos de la invitación principal.
- `music.mp3` — pista de fondo opcional (referenciada pero no incluida; el botón de música asume este archivo en la misma carpeta).
- Fuentes: Google Fonts `Great+Vibes` y `Poppins:wght@400;500;600;700;800`.

## Files
- `Invitacion Baby Shower Matias.dc.html` — página completa (loader + apertura + invitación principal + toda la lógica de fases/timing).
- `CountdownGrid.dc.html` — componente aislado del contador regresivo principal (4 celdas).
- `RsvpBadge.dc.html` — componente aislado del badge de días restantes para confirmar.
- `assets/papas.jpeg`, `assets/bebe.jpeg` — imágenes placeholder a reemplazar por las fotos reales.

Abre `Invitacion Baby Shower Matias.dc.html` directamente en un navegador para ver el diseño completo funcionando (loader → apertura → invitación), incluyendo todas las animaciones y tiempos descritos arriba.
