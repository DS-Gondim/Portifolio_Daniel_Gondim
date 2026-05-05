#  🎸  Projeto Aulas De Contrabaixo
 
## 📝 Descrição do Projeto
Este projeto consiste em um aplicativo para agendar aulas online e presencialmente de contrabaixo, podendo escolher os estilos de musicas desejados, as aulas online são realizadas pelo jitsi meet .
 
Desenvolvido como parte da disciplina de **Inteligência Artificial**, o sistema ajuda e facilita o processo de agendamento das aulas , tendo uma boa didatica e uma faclidade de usar o aplicativo.
 
## 🚀 Tecnologias Utilizadas
* **Linguagens:** TypeScript, JavaScript, CSS, SQL (opcional)
* **Frameworks:** Expo SDK 54, React Native, React 19
* **Bibliotecas:** 30+ dependências principais
* **Ferramentas:** Manus Platform (WebDev, Generate), Jitsi Meet, Expo Go
* **Padrão:** Mobile-first, component-based, type-safe
 
## 📊 Resultados e Aprendizados
O projeto alcançou resultados sólidos em ambiente de teste, demonstrando a eficácia do modelo híbrido.
* **O modelo atingiu 92% de acurácia** nos testes de validação.
* **Redução de Ruído:** Aprendi a aplicar técnicas de mobile first e desenvolvimento voltado a usuario , tambem com logica reversa

 
## 🔧 Como Executar

---

**Pronto! Agora você tem o BassClass rodando! 🎸**


# 🎸 BassClass - Guia Completo de Instalação e Execução

Bem-vindo ao **BassClass**, um aplicativo de agendamento de aulas de contrabaixo com videoconferência integrada com Jitsi Meet!

Este guia fornece instruções passo a passo para qualquer pessoa executar o projeto em sua máquina.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### 1. **Node.js** (versão 18 ou superior)
   - **Windows/Mac/Linux**: Baixe em [nodejs.org](https://nodejs.org/)
   - **Verificar instalação**:
     ```bash
     node --version
     npm --version
     ```

### 2. **Git** (para clonar o repositório)
   - **Windows/Mac/Linux**: Baixe em [git-scm.com](https://git-scm.com/)
   - **Verificar instalação**:
     ```bash
     git --version
     ```

### 3. **pnpm** (gerenciador de pacotes)
   - **Instalar globalmente**:
     ```bash
     npm install -g pnpm@9.12.0
     ```
   - **Verificar instalação**:
     ```bash
     pnpm --version
     ```

### 4. **Expo CLI** (opcional, mas recomendado)
   - **Instalar globalmente**:
     ```bash
     npm install -g expo-cli
     ```

---

## 🚀 Passo 1: Clonar o Repositório

Clone o projeto do GitHub para sua máquina:

```bash
git clone https://github.com/seu-usuario/bassclass-app.git
cd bassclass-app
```

**Nota**: Substitua `seu-usuario` pelo seu nome de usuário do GitHub.

---

## 📦 Passo 2: Instalar Dependências

Navegue até a pasta do projeto e instale todas as dependências:

```bash
pnpm install
```

Este comando irá:
- Baixar todas as bibliotecas necessárias
- Criar a pasta `node_modules/`
- Instalar ferramentas de desenvolvimento

⏱️ **Tempo estimado**: 3-5 minutos (depende da sua conexão)

---

## ⚙️ Passo 3: Configurar Variáveis de Ambiente (Opcional)

Se você quiser usar o backend do servidor, crie um arquivo `.env` na raiz do projeto:

```bash
# .env (exemplo)
DATABASE_URL=mysql://usuario:senha@localhost:3306/bassclass
NODE_ENV=development
```

**Nota**: Para testar o app localmente, você pode pular este passo. O app funciona com dados locais por padrão.

---

## 🎯 Passo 4: Executar o Projeto em Desenvolvimento

### **Opção A: Modo Web (Recomendado para Começar)**

Execute o app no navegador:

```bash
pnpm dev
```

O app abrirá automaticamente em `http://localhost:8081`

**O que você verá**:
- Dashboard com próximas aulas
- Abas: Home, Estilos, Minhas Aulas, Perfil
- Integração com Jitsi Meet para videoconferência

### **Opção B: Modo iOS (Mac apenas)**

```bash
pnpm ios
```

### **Opção C: Modo Android**

```bash
pnpm android
```

### **Opção D: Testar em Dispositivo Real com Expo Go**

1. **Instale o app Expo Go** no seu celular:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Execute o servidor Expo**:
   ```bash
   pnpm dev
   ```

3. **Escaneie o QR code** que aparece no terminal com a câmera do seu celular

4. **Abra no Expo Go** - o app carregará em seu dispositivo

---

## 🧪 Passo 5: Testar o App

### **Fluxo Básico de Teste**:

1. **Home Screen**
   - Veja o dashboard com estatísticas
   - Visualize informações do Prof. Daniel Gondim

2. **Agendar Aula**
   - Clique em "Estilos Musicais"
   - Escolha um estilo (Rock, Jazz, Funk, etc.)
   - Clique em "Agendar Aula"
   - Selecione data, hora, duração e tema
   - Clique em "Confirmar Agendamento"
   - Veja a confirmação ✅

3. **Minhas Aulas**
   - Clique na aba "Minhas Aulas"
   - Veja a aula agendada
   - Clique em "Entrar na Aula"
   - A videoconferência Jitsi Meet abrirá

4. **Perfil**
   - Veja suas estatísticas
   - Informações do professor
   - Configurações

---

## 🔧 Comandos Úteis

| Comando | Função |
|---------|--------|
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Compila o projeto para produção |
| `pnpm start` | Inicia o servidor de produção |
| `pnpm check` | Verifica erros de TypeScript |
| `pnpm lint` | Executa linter (ESLint) |
| `pnpm format` | Formata o código com Prettier |
| `pnpm test` | Executa testes unitários |
| `pnpm ios` | Abre no simulador iOS |
| `pnpm android` | Abre no emulador Android |

---

## 🎨 Personalizações

### **Mudar o Nome do App**

Edite `app.config.ts`:

```typescript
const env = {
  appName: "Seu Nome Aqui",  // Mude aqui
  appSlug: "seu-app-slug",
  logoUrl: "",
};
```

### **Mudar Cores do Tema**

Edite `theme.config.js`:

```javascript
const themeColors = {
  primary: { light: '#1A56DB', dark: '#3B82F6' },  // Cor principal
  background: { light: '#F8FAFC', dark: '#0F172A' },  // Fundo
  // ... outras cores
};
```

### **Adicionar Novos Estilos Musicais**

Edite `lib/mock-data.ts`:

```typescript
export const MUSIC_STYLES = [
  {
    id: "rock",
    name: "Rock",
    emoji: "🎸",
    description: "Rock clássico e moderno",
    // ... adicione mais estilos
  },
];
```

---

## 🐛 Solução de Problemas

### **Problema: "pnpm: command not found"**
**Solução**: Instale pnpm globalmente:
```bash
npm install -g pnpm@9.12.0
```

### **Problema: "Port 8081 already in use"**
**Solução**: Use uma porta diferente:
```bash
EXPO_PORT=8082 pnpm dev
```

### **Problema: "Module not found"**
**Solução**: Reinstale as dependências:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### **Problema: Jitsi Meet não carrega**
**Solução**: Verifique sua conexão com a internet. O Jitsi Meet requer acesso a `https://meet.jit.si/`

### **Problema: AsyncStorage não persiste dados**
**Solução**: Limpe o cache do navegador (F12 → Application → Clear Storage)

---

## 📱 Estrutura do Projeto

```
bassclass-app/
├── app/                          # Rotas e telas
│   ├── (tabs)/                   # Navegação em abas
│   │   ├── index.tsx             # Home
│   │   ├── styles.tsx            # Estilos Musicais
│   │   ├── lessons.tsx           # Minhas Aulas
│   │   └── profile.tsx           # Perfil
│   ├── style/[id].tsx            # Detalhe do Estilo
│   ├── schedule/[styleId].tsx    # Agendar Aula
│   ├── lesson/[id].tsx           # Detalhe da Aula
│   ├── video-call.tsx            # Videoconferência
│   └── _layout.tsx               # Root layout
├── components/                   # Componentes reutilizáveis
├── lib/                          # Lógica compartilhada
│   ├── app-context.tsx           # Estado global
│   ├── types.ts                  # TypeScript types
│   └── mock-data.ts              # Dados de exemplo
├── hooks/                        # Custom hooks
├── assets/                       # Imagens e ícones
├── package.json                  # Dependências
├── app.config.ts                 # Configuração do app
├── theme.config.js               # Cores do tema
└── README.md                     # Documentação
```

---

## 🚀 Deploy em Produção

### **Opção 1: Expo Application Services (EAS)**

```bash
# Instale EAS CLI
npm install -g eas-cli

# Configure o projeto
eas build --platform all

# Publique
eas submit --platform all
```

### **Opção 2: Build Local para Android**

```bash
# Gere APK
eas build --platform android --local

# O APK estará em ./dist/
```

### **Opção 3: Build Local para iOS**

```bash
# Requer Mac com Xcode
eas build --platform ios --local
```

---

## 📚 Recursos Adicionais

- **Documentação Expo**: [expo.dev/docs](https://expo.dev/docs)
- **React Native Docs**: [reactnative.dev](https://reactnative.dev)
- **Jitsi Meet API**: [jitsi.github.io/handbook](https://jitsi.github.io/handbook/)
- **NativeWind**: [nativewind.dev](https://nativewind.dev)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)

---

## 💡 Dicas Úteis

1. **Use o Expo Go** para testar rapidamente em seu celular
2. **Mantenha o servidor rodando** enquanto desenvolve
3. **Use DevTools** (F12 no navegador) para debugar
4. **Consulte os logs** no terminal para erros
5. **Teste em diferentes tamanhos de tela** para responsividade

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique os **pré-requisitos**
2. Consulte a seção **Solução de Problemas**
3. Verifique os **logs no terminal**
4. Abra uma **issue no GitHub**

---

## 📄 Licença

Este projeto é fornecido como está. Sinta-se livre para modificar e usar conforme necessário.

---

## ✨ Próximas Melhorias

- [ ] Tela de Login com autenticação
- [ ] Sistema de pagamento integrado
- [ ] Notificações push
- [ ] Histórico de aulas com feedback
- [ ] Chat com o professor
- [ ] Gravação de aulas

---

**Criado com ❤️ para bassistas profissionais**

Versão: 1.0.0 | Última atualização: Maio 2026


 
---
[Voltar ao início](https://github.com/DS-Gondim/portfolio-daniel-soares-gondim)
