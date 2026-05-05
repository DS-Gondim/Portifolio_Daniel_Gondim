# 🎸 BassClass - Agendamento de Aulas de Contrabaixo com Videoconferência

[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61dafb?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0.29-000020?logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Um aplicativo mobile moderno para agendamento de aulas de contrabaixo com o Professor Daniel Gondim, featuring videoconferência integrada com **Jitsi Meet**.

## ✨ Recursos Principais

- 🎯 **Agendamento de Aulas** - Escolha data, hora, duração e estilo musical
- 🎥 **Videoconferência Jitsi Meet** - Integração completa para aulas online
- 🎵 **8+ Estilos Musicais** - Rock, Jazz, Funk, Samba, Blues, Pop, Metal, Bossa Nova
- 💾 **Persistência Local** - AsyncStorage para salvar aulas offline
- 🌙 **Tema Dinâmico** - Suporte para light/dark mode
- 📱 **Responsivo** - Design mobile-first com suporte a tablets
- ⚡ **Performance** - Construído com React Native e Expo
- 🎨 **UI Moderna** - Tailwind CSS com NativeWind

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+
- pnpm 9.12.0+
- Git

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/bassclass-app.git
cd bassclass-app

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev
```

O app abrirá em `http://localhost:8081`

## 📖 Documentação Completa

Para um guia passo a passo detalhado, consulte [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## 📱 Plataformas Suportadas

- ✅ **Web** - Navegador moderno
- ✅ **iOS** - iPhone/iPad (via Expo Go ou build nativo)
- ✅ **Android** - Dispositivos Android (via Expo Go ou build nativo)

## 🛠️ Stack Tecnológico

### Frontend
- **React Native 0.81.5** - Framework mobile
- **Expo SDK 54** - Plataforma de desenvolvimento
- **TypeScript 5.9.3** - Tipagem estática
- **NativeWind 4.2.1** - Tailwind CSS para React Native
- **Expo Router 6** - Roteamento e navegação

### Videoconferência
- **React Native WebView** - Integração Jitsi Meet
- **Jitsi Meet** - Plataforma de videoconferência
- **Expo Keep Awake** - Mantém tela ativa durante chamadas

### Estado & Dados
- **React Context API** - Gerenciamento de estado
- **AsyncStorage** - Persistência local
- **date-fns** - Formatação de datas

### UI & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **Expo Vector Icons** - Ícones Material Design
- **Expo Symbols** - Ícones SF Symbols (iOS)

### Desenvolvimento
- **Vitest** - Testes unitários
- **ESLint** - Linting
- **Prettier** - Formatação de código
- **TypeScript** - Type checking

## 📁 Estrutura do Projeto

```
bassclass-app/
├── app/                          # Rotas (Expo Router)
│   ├── (tabs)/                   # Navegação em abas
│   │   ├── index.tsx             # Home/Dashboard
│   │   ├── styles.tsx            # Estilos Musicais
│   │   ├── lessons.tsx           # Minhas Aulas
│   │   └── profile.tsx           # Perfil
│   ├── style/[id].tsx            # Detalhe do Estilo
│   ├── schedule/[styleId].tsx    # Agendar Aula
│   ├── lesson/[id].tsx           # Detalhe da Aula
│   ├── video-call.tsx            # Videoconferência Jitsi
│   └── _layout.tsx               # Root layout com providers
├── components/                   # Componentes reutilizáveis
│   ├── screen-container.tsx      # Container com SafeArea
│   ├── themed-view.tsx           # View com tema
│   └── ui/icon-symbol.tsx        # Mapeamento de ícones
├── lib/                          # Lógica compartilhada
│   ├── app-context.tsx           # Context global (aulas, usuário)
│   ├── types.ts                  # TypeScript types
│   ├── mock-data.ts              # Dados de exemplo
│   ├── theme-provider.tsx        # Tema light/dark
│   └── trpc.ts                   # Cliente tRPC
├── hooks/                        # Custom React Hooks
│   ├── use-colors.ts             # Cores do tema
│   └── use-color-scheme.ts       # Detecção light/dark
├── constants/                    # Constantes
│   └── theme.ts                  # Configuração de cores
├── assets/                       # Imagens e ícones
│   └── images/icon.png           # Logo do app
├── package.json                  # Dependências
├── app.config.ts                 # Configuração Expo
├── theme.config.js               # Paleta de cores
├── tailwind.config.js            # Configuração Tailwind
├── tsconfig.json                 # Configuração TypeScript
└── SETUP_GUIDE.md                # Guia de instalação
```

## 🎯 Fluxo de Uso

1. **Home** - Visualize próximas aulas e estatísticas
2. **Estilos Musicais** - Escolha um estilo para aprender
3. **Agendar Aula** - Selecione data, hora, duração e tema
4. **Confirmação** - Veja a aula agendada
5. **Minhas Aulas** - Acesse suas aulas agendadas
6. **Videoconferência** - Clique "Entrar na Aula" para iniciar Jitsi Meet

## 🔧 Comandos Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia servidor de desenvolvimento
pnpm ios              # Abre no simulador iOS
pnpm android          # Abre no emulador Android

# Build
pnpm build            # Compila para produção
pnpm start            # Inicia servidor de produção

# Qualidade de Código
pnpm check            # Verifica erros TypeScript
pnpm lint             # Executa ESLint
pnpm format           # Formata código com Prettier
pnpm test             # Executa testes

# Banco de Dados
pnpm db:push          # Sincroniza schema do banco
```

## 🎨 Personalizações

### Mudar Nome do App
Edite `app.config.ts`:
```typescript
const env = {
  appName: "Seu Nome Aqui",
  appSlug: "seu-app-slug",
};
```

### Mudar Cores do Tema
Edite `theme.config.js`:
```javascript
const themeColors = {
  primary: { light: '#1A56DB', dark: '#3B82F6' },
  background: { light: '#F8FAFC', dark: '#0F172A' },
  // ... outras cores
};
```

### Adicionar Novos Estilos Musicais
Edite `lib/mock-data.ts`:
```typescript
export const MUSIC_STYLES = [
  {
    id: "seu-estilo",
    name: "Seu Estilo",
    emoji: "🎵",
    description: "Descrição do estilo",
    difficulty: "Iniciante",
    lessonCount: 0,
  },
  // ... adicione mais
];
```

## 📱 Testar em Dispositivo Real

### Com Expo Go (Recomendado)

1. Instale [Expo Go](https://expo.dev/client) no seu celular
2. Execute `pnpm dev`
3. Escaneie o QR code com a câmera
4. Abra no Expo Go

### Com Build Nativo

```bash
# iOS (requer Mac com Xcode)
eas build --platform ios

# Android
eas build --platform android
```

## 🐛 Solução de Problemas

### Port 8081 já está em uso
```bash
EXPO_PORT=8082 pnpm dev
```

### Módulos não encontrados
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Jitsi Meet não carrega
- Verifique sua conexão com a internet
- Certifique-se de que `https://meet.jit.si/` está acessível

Para mais problemas, consulte [SETUP_GUIDE.md](./SETUP_GUIDE.md#-solução-de-problemas)

## 📚 Recursos Adicionais

- [Documentação Expo](https://expo.dev/docs)
- [React Native Docs](https://reactnative.dev)
- [Jitsi Meet API](https://jitsi.github.io/handbook/)
- [NativeWind](https://nativewind.dev)
- [Tailwind CSS](https://tailwindcss.com)

## 🚀 Deploy

### Expo Application Services (EAS)

```bash
npm install -g eas-cli
eas build --platform all
eas submit --platform all
```

### Build Local

```bash
# Android APK
eas build --platform android --local

# iOS (Mac only)
eas build --platform ios --local
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍🏫 Professor

**Daniel Gondim**
- Contrabaixista Profissional
- Especialista em múltiplos estilos musicais
- R$ 150/hora

## 💡 Roadmap

- [ ] Autenticação com email/senha
- [ ] Sistema de pagamento (Stripe/PayPal)
- [ ] Notificações push
- [ ] Histórico de aulas com feedback
- [ ] Chat com o professor
- [ ] Gravação de aulas
- [ ] Progressão de aluno
- [ ] Certificados

## 📞 Suporte

Para suporte, abra uma issue no GitHub ou entre em contato através do email.

## ✨ Agradecimentos

- [Expo](https://expo.dev) - Plataforma de desenvolvimento
- [React Native](https://reactnative.dev) - Framework mobile
- [Jitsi](https://jitsi.org) - Videoconferência
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [NativeWind](https://nativewind.dev) - Tailwind para React Native

---

**Criado com ❤️ para bassistas profissionais**

Versão: 1.0.0 | Última atualização: Maio 2026
