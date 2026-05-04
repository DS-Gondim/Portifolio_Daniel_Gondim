# BassClass — Interface Design Plan

## Brand Identity
- **App Name:** BassClass
- **Tagline:** Aulas de Contrabaixo com Daniel Gondim
- **Primary Color:** #1A56DB (professional blue)
- **Accent Color:** #F59E0B (warm amber — music energy)
- **Background:** #F8FAFC (light) / #0F172A (dark)
- **Surface:** #FFFFFF (light) / #1E293B (dark)

---

## Screen List

1. **Home (Dashboard)** — Próxima aula, estilos musicais destacados, quick stats
2. **Music Styles** — Browse music genres/styles with lesson counts
3. **Style Detail** — Lessons for specific style, schedule new lesson
4. **Schedule Lesson** — Date/time picker, style selection, notes
5. **My Lessons** — List of upcoming and past lessons (tabs)
6. **Lesson Detail** — Full lesson info, join/cancel/reschedule actions
7. **Video Conference** — Jitsi Meet WebView full-screen call
8. **Profile** — User profile, lesson history, settings

---

## Primary Content & Functionality

### Home (Dashboard)
- Greeting with user name
- "Próxima Aula" card with countdown timer and Join button
- Quick stats: aulas concluídas, horas estudadas, estilos aprendidos
- "Estilos Musicais" horizontal scroll cards with lesson counts
- Recent activity

### Music Styles Screen
- Grid or list of music styles (Rock, Jazz, Funk, Samba, Blues, Pop, Metal, etc.)
- Each style card shows: style name, icon/emoji, lesson count, difficulty level
- Tap to see available lessons in that style

### Style Detail
- Style header with icon/emoji
- Description of the style
- List of available lessons/topics in that style
- "Agendar Aula" button

### Schedule Lesson
- Selected style summary at top
- Date picker (calendar-style)
- Time slot selector
- Lesson duration (30min / 60min / 90min)
- Lesson topic / notes input
- Confirm button with price summary

### My Lessons (Tabs: Próximas | Passadas)
- Lesson cards: style, date/time, status badge, join button
- Empty state illustrations
- FlatList

### Lesson Detail
- Full lesson info card
- Style info
- Lesson topic/notes
- Status (Agendada / Em andamento / Concluída / Cancelada)
- Action buttons: Entrar na Chamada / Cancelar / Reagendar
- Meeting room ID display

### Video Conference (Jitsi Meet WebView)
- Full-screen WebView loading meet.jit.si
- Custom room name generated from lesson ID
- Loading overlay with spinner
- Back button (floating, top-left)
- Keep screen awake during call

### Profile
- Avatar + name + email
- Stats summary (lessons completed, hours studied, styles learned)
- Settings list (notifications, theme, language)
- Logout

---

## Music Styles Included
Rock, Jazz, Funk, Samba, Blues, Pop, Metal, Reggae, Gospel, Bossa Nova, Forró, Axé, Pagode, MPB, Eletrônico

---

## Navigation Structure

```
Tab Bar:
├── Home (house.fill)
├── Estilos (music note icon)
├── Minhas Aulas (calendar.fill)
└── Perfil (person.crop.circle.fill)

Modal / Stack Screens:
├── Style Detail (push from Estilos)
├── Schedule Lesson (push from Style Detail)
├── Lesson Detail (push from My Lessons)
└── Video Conference (modal, full-screen)
```

---

## Layout Principles
- All screens use `ScreenContainer` with safe area handling
- Cards use 16px border-radius, subtle shadow, border
- Tab bar: 4 tabs, icon + label, active = primary blue
- Typography: bold headers (24-32px), regular body (14-16px), muted captions (12px)
- Spacing: 16px horizontal padding, 12-16px between cards
- Buttons: full-width primary (blue), secondary outlined, destructive (red)
- Music style cards: emoji/icon, style name, lesson count, difficulty badge
