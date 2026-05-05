# ⚡ Quick Start - BassClass em 5 Minutos

Guia rápido para executar o BassClass em sua máquina.

## ✅ Verificação de Pré-requisitos (1 min)

Abra seu terminal e execute:

```bash
# Verificar Node.js
node --version    # Deve ser 18 ou superior

# Verificar npm
npm --version

# Verificar Git
git --version
```

Se algum comando não funcionar, instale:
- **Node.js**: [nodejs.org](https://nodejs.org/)
- **Git**: [git-scm.com](https://git-scm.com/)

## 📥 Clonar o Projeto (1 min)

```bash
git clone https://github.com/seu-usuario/bassclass-app.git
cd bassclass-app
```

## 📦 Instalar Dependências (2 min)

```bash
# Instalar pnpm (gerenciador de pacotes)
npm install -g pnpm@9.12.0

# Instalar dependências do projeto
pnpm install
```

## 🚀 Executar o App (1 min)

```bash
pnpm dev
```

✨ O app abrirá automaticamente em `http://localhost:8081`

---

## 🎯 Testar o App

### Fluxo Básico:

1. **Home** - Veja o dashboard
2. **Estilos Musicais** - Clique em "Estilos Musicais"
3. **Escolher Estilo** - Clique em um estilo (ex: Rock)
4. **Agendar** - Clique em "Agendar Aula"
5. **Preencher Dados** - Selecione data, hora, duração
6. **Confirmar** - Clique em "Confirmar Agendamento"
7. **Ver Aula** - Vá para "Minhas Aulas"
8. **Videoconferência** - Clique em "Entrar na Aula"

---

## 📱 Testar em Seu Celular

### Com Expo Go (Fácil):

1. Instale **Expo Go** no seu celular:
   - [iOS](https://apps.apple.com/app/expo-go/id982107779)
   - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Execute `pnpm dev` no terminal

3. Escaneie o **QR code** com a câmera do seu celular

4. Abra no **Expo Go**

---

## 🛑 Parar o App

Pressione `Ctrl + C` no terminal

---

## ❓ Problemas?

### Port 8081 já está em uso
```bash
EXPO_PORT=8082 pnpm dev
```

### Módulos não encontrados
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

### Jitsi Meet não carrega
- Verifique sua conexão com a internet
- Tente em outro navegador

---

## 📚 Próximos Passos

- Leia [SETUP_GUIDE.md](./SETUP_GUIDE.md) para mais detalhes
- Veja [README.md](./README.md) para documentação completa
- Explore o código em `app/` e `components/`

---

**Pronto! Agora você tem o BassClass rodando! 🎸**
