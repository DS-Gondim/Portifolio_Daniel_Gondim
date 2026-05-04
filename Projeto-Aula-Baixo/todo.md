# BassClass TODO

## Setup & Configuration
- [x] Update app name to "BassClass"
- [x] Update theme colors (blue/purple brand)
- [x] Generate and set app logo/icon (bass guitar themed)
- [x] Configure tab navigation (4 tabs: Home, Estilos, Minhas Aulas, Perfil)
- [x] Add all icon mappings to icon-symbol.tsx

## Data Layer
- [x] Define TypeScript types (MusicStyle, Lesson, User)
- [x] Create music styles data (Rock, Jazz, Funk, Samba, Blues, Pop, Metal, etc.)
- [x] Create mock lessons for each style
- [x] Create AppContext for global state (lessons, user)
- [x] AsyncStorage persistence for lessons

## Screens
- [x] Home / Dashboard screen
- [x] Music Styles screen (grid/list view)
- [x] Style Detail screen
- [x] Schedule Lesson screen (date/time picker)
- [x] My Lessons screen (upcoming + past tabs)
- [x] Lesson Detail screen
- [x] Video Conference screen (Jitsi Meet WebView)
- [x] Profile screen

## Jitsi Meet Integration
- [x] Build Jitsi Meet WebView component
- [x] Generate unique room names from lesson IDs
- [x] Handle loading state and errors
- [x] Keep screen awake during calls (expo-keep-awake)

## Polish
- [x] Empty states for lessons list
- [x] Haptic feedback on key actions
- [x] Smooth navigation transitions
- [x] Dark mode support
- [x] Responsive design for mobile

## Pending (Future Enhancements)
- [ ] Push notifications for lesson reminders
- [ ] Lesson feedback/rating system
- [ ] Payment integration
- [ ] Lesson recording
- [ ] Chat with professor
- [ ] Progress tracking
- [ ] Backend sync with database
- [ ] Loading skeletons
