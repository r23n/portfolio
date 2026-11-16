# Ghareeb Aljurdabi portfolio

A personal portfolio built with plain HTML, CSS and JavaScript. Open `index.html` in a browser or serve this folder with a local web server. `content.md` is the source of the website text. No build step or dependencies are required.

## Pages and content

- `index.html`: portfolio home page and sections.
- `projects/reboot01.html`: detailed Reboot01 projects and scenes.
- `404.html`: missing-page screen.
- `content.md`: portfolio, interface and scene text.
- `cv.pdf`: downloadable CV.
- `README.md`: usage and folder structure.
- `REFACTOR_REPORT.md`: cleanup inventory, line counts and browser checks.

## Styles (`css/`)

Load order: variables, reset, fonts, layout, shared components, page sections, effects, reduced motion, then responsive overrides.

- `variables.css`: colors, font stacks, logo typography and repeated dimensions and durations.
- `reset.css`: browser spacing, box sizing and form/link defaults.
- `fonts.css`: local web fonts and metric-matched fallback fonts.
- `layout.css`: containers, page defaults, heading fonts, wrapping and anchor offsets.
- `buttons.css`: shared primary button colors.
- `tags.css`: shared technology lists and tag styles.
- `pills.css`: shared logo typography and navbar pill surfaces.
- `labels.css`: section label typography, reserved space and typing cursor.
- `icons.css`: shared inline SVG sizing and alignment.
- `accessibility.css`: focus outlines, skip link and screen-reader helpers.
- `navbar.css`: floating navbar, active indicator and menu button.
- `home.css`: home content, title, location and actions.
- `portrait.css`: portrait, rotating square and floating tags.
- `status.css`: status text, reserved space and availability ring.
- `about.css`: introduction and statistics.
- `projects.css`: main project collection panel and file deck.
- `journey.css`: timeline, badges, edge fades and education rows.
- `volunteering.css`: volunteering rows and hover colors.
- `skills.css`: skills editor and syntax colors.
- `contact.css`: contact heading, email, copy button and links.
- `footer.css`: footer alignment and typography.
- `reboot.css`: detailed project layout and project text.
- `project-scenes.css`: decorative scenes and their keyframes.
- `not-found.css`: missing-page content.
- `scroll-hint.css`: home scroll hint and arrow motion.
- `intro.css`: intro appearance, flight and safety fallback.
- `reveal.css`: progressive scroll reveals.
- `progress.css`: fixed scroll progress bar.
- `hover.css`: shared arrow, button and underline hover effects.
- `transitions.css`: cross-page view transitions.
- `motion.css`: reduced-motion overrides.
- `responsive.css`: screen-size overrides grouped in page order.

## Scripts (`js/`)

- `intro.js`: welcome typing and flight to the navbar logo.
- `navbar.js`: mobile menu and active pill positioning.
- `active-link.js`: current-section navbar selection.
- `typing.js`: home title typing after the intro.
- `status.js`: status text cycling.
- `counter.js`: one-time statistic counters.
- `label-typing.js`: one-time section label typing.
- `reveal.js`: section reveals and staggered groups.
- `progress.js`: scroll progress updates.
- `scroll-hint.js`: hides the home hint after scrolling.
- `journey-scroll.js`: timeline edge fade updates.
- `project-deck.js`: one-time touch-device deck spread.
- `project-scenes.js`: scene visibility, pointer effects and turn counter.
- `copy-email.js`: email copying and accessible feedback.

## Assets

- `images/portrait.jpg`: portrait used in the home, navbar and intro.
- `images/favicon.svg`: standalone favicon.
- `fonts/ibm-plex-sans.woff2`: body and logo font.
- `fonts/jetbrains-mono.woff2`: headings, labels and code font.
- `fonts/ibm-plex-sans-OFL.txt`: IBM Plex Sans license.
- `fonts/jetbrains-mono-OFL.txt`: JetBrains Mono license.

HTML retains readable defaults when scripts fail. Animations respect reduced motion, and layout space stays reserved for changing text and artwork.
