# Instruções Importantes - Casa do Pão

## Passos para Colocar o Site no Ar

### 1. Configuração do Firebase

**MUITO IMPORTANTE**: O site não funcionará completamente sem configurar o Firebase.

1. Acesse: https://console.firebase.google.com/
2. Clique em "Adicionar projeto"
3. Dê um nome ao projeto (ex: "casa-do-pao")
4. Siga os passos até criar o projeto
5. No painel do projeto, clique em "Firestore Database"
6. Clique em "Criar banco de dados"
7. Escolha "Modo de produção" ou "Modo de teste" (inicialmente)
8. Escolha uma localização (ex: southamerica-east1)
9. Volte para a página inicial do projeto
10. Clique no ícone de engrenagem > "Configurações do projeto"
11. Role até "Seus apps" e clique no ícone "</>" (Web)
12. Registre o app (pode dar o nome "casa-do-pao-web")
13. **COPIE as credenciais que aparecerem**
14. Abra o arquivo: `src/config/firebase.js`
15. Substitua os valores pelas suas credenciais:

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",              // Cole aqui
  authDomain: "SEU_AUTH_DOMAIN_AQUI",      // Cole aqui
  projectId: "SEU_PROJECT_ID_AQUI",        // Cole aqui
  storageBucket: "SEU_STORAGE_BUCKET_AQUI",// Cole aqui
  messagingSenderId: "SEU_SENDER_ID_AQUI", // Cole aqui
  appId: "SEU_APP_ID_AQUI"                 // Cole aqui
};
```

### 2. Configuração do WhatsApp

O site integra com WhatsApp para receber pedidos.

**Arquivo 1:** `src/contexts/CartContext.jsx`
- Linha 74: `const phoneNumber = '5511999999999';`
- Substitua pelo número real no formato: `55` + DDD + número
- Exemplo: Para SP (11) 98765-4321 = `5511987654321`

**Arquivo 2:** `src/pages/Contact.jsx`
- Linha 28: `const whatsappUrl = 'https://wa.me/5511999999999?text=...'`
- Use o mesmo número do arquivo anterior

### 3. Personalizar Informações da Padaria

**Rodapé** - `src/components/Footer.jsx`:
- Endereço (linha ~35)
- Telefones (linha ~41)
- Email (linha ~45)
- Horário de funcionamento (linhas ~54-65)
- Links de redes sociais (linhas ~21-33)

**Página de Contato** - `src/pages/Contact.jsx`:
- Endereço (linhas ~48-51)
- Telefones (linhas ~58-61)
- Emails (linhas ~68-71)
- Horário (linhas ~78-82)
- Mapa do Google (linha ~91) - cole o iframe do Google Maps

### 4. Executar o Projeto Localmente

```bash
# Instalar dependências (só precisa fazer uma vez)
npm install

# Executar em modo desenvolvimento
npm run dev
```

Abra o navegador em: http://localhost:5173

### 5. Adicionar Produtos

1. Acesse: http://localhost:5173/admin
2. Digite a senha: `admin123`
3. Clique em "Novo Produto"
4. Preencha as informações:
   - Nome do produto
   - Preço
   - Categoria
   - Descrição
   - URL da imagem (pode usar Unsplash, Imgur, etc.)
   - Marque "Produto em Destaque" se quiser que apareça na home
5. Clique em "Salvar Produto"

**IMPORTANTE**: Os produtos ficam salvos no Firebase Firestore.

### 6. Publicar o Site (Deploy)

#### Opção 1: Vercel (Recomendado - Grátis)

1. Crie conta em: https://vercel.com
2. Instale o Vercel CLI: `npm i -g vercel`
3. No terminal, dentro da pasta do projeto, digite: `vercel`
4. Siga os passos e pronto!

#### Opção 2: Netlify (Grátis)

1. Crie conta em: https://netlify.com
2. Arraste a pasta `dist` (depois de rodar `npm run build`)
3. Pronto!

#### Opção 3: Firebase Hosting (Grátis)

1. Instale: `npm install -g firebase-tools`
2. Execute: `firebase login`
3. Execute: `firebase init hosting`
4. Execute: `npm run build`
5. Execute: `firebase deploy`

### 7. Alterar Senha do Admin

**Arquivo:** `src/pages/Admin.jsx`
- Linha 20: `const ADMIN_PASSWORD = 'admin123';`
- Troque por uma senha segura
- **IMPORTANTE**: Em produção, use Firebase Authentication

### 8. Cores do Site

**Arquivo:** `tailwind.config.js`

As cores atuais são:
- **Azul** (primary): Botões principais, links
- **Amarelo** (secondary): Destaques, badges
- **Marrom** (accent): Elementos de terra, padaria

Para mudar, edite os valores RGB nas linhas 9-35.

### 9. Imagens dos Produtos

Recomendações de sites para imagens gratuitas:
- https://unsplash.com (alta qualidade)
- https://pexels.com (gratuito)
- https://pixabay.com (gratuito)

Ou use o próprio Google Fotos para hospedar imagens da padaria.

### 10. Regras de Segurança do Firebase

No Firebase Console, vá em "Firestore Database" > "Regras" e use:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Qualquer um pode ler produtos
    match /products/{product} {
      allow read: if true;
      allow write: if false; // Só permite escrita via painel admin
    }
  }
}
```

## Problemas Comuns

### Erro: "Failed to fetch"
- Verifique se configurou o Firebase corretamente
- Confirme que criou o banco Firestore

### WhatsApp não abre
- Verifique se o número está no formato correto: 55DDNNNNNNNNN
- Não use espaços, parênteses ou traços

### Site não carrega
- Execute `npm install` novamente
- Delete a pasta `node_modules` e `package-lock.json`, depois `npm install`

### Produtos não aparecem
- Adicione produtos pelo painel admin
- Verifique se o Firebase está configurado

## Contatos e Suporte

- Documentação React: https://react.dev
- Documentação Firebase: https://firebase.google.com/docs
- Documentação Tailwind: https://tailwindcss.com/docs

## Melhorias Futuras (Opcionais)

1. Adicionar autenticação de usuários
2. Histórico de pedidos
3. Pagamento online
4. Sistema de avaliações
5. Blog de receitas
6. Newsletter
7. Programa de fidelidade
8. App mobile (React Native)

Boa sorte com a Casa do Pão! 🍞✨
