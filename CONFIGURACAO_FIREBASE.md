# Configuração do Firebase - Casa do Pão

## Passo 1: Configurar Authentication no Firebase Console

1. Acesse: https://console.firebase.google.com/
2. Selecione seu projeto: **padaria-casa-do-pao**
3. No menu lateral, clique em **Authentication**
4. Clique em **Get started** (se for a primeira vez)
5. Na aba **Sign-in method**, clique em **Email/Password**
6. Ative a opção **Email/Password** (primeira opção)
7. Clique em **Save**

## Passo 2: Criar Usuário Administrador

1. Ainda em **Authentication**, clique na aba **Users**
2. Clique no botão **Add user**
3. Preencha:
   - **Email**: admin@casadopao.com (ou o email que preferir)
   - **Password**: Escolha uma senha forte
4. Clique em **Add user**

**IMPORTANTE**: Guarde essas credenciais! Você vai usar para fazer login no painel admin.

## Passo 3: Configurar Regras do Firestore

1. No Firebase Console, clique em **Firestore Database** no menu lateral
2. Clique na aba **Rules** (Regras)
3. **SUBSTITUA** todo o conteúdo atual pelas regras abaixo:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Regras para a coleção de produtos
    match /products/{productId} {
      // Qualquer pessoa pode LER os produtos (público)
      allow read: if true;

      // Apenas usuários autenticados podem ESCREVER (criar, atualizar, deletar)
      allow create, update, delete: if request.auth != null;
    }

    // Regra padrão: negar acesso a outras coleções
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

4. Clique em **Publish** para aplicar as regras

## Passo 4: Testar o Sistema

1. Execute o projeto: `npm run dev`
2. Acesse: http://localhost:5174/admin
3. Faça login com as credenciais criadas no Passo 2
4. Tente adicionar um produto de teste

## Explicação das Regras

### Produtos (products)
- **Leitura (read)**: Liberada para todos (público)
  - Isso permite que o site exiba os produtos sem precisar de login

- **Escrita (create, update, delete)**: Apenas usuários autenticados
  - Somente quem fizer login no painel admin pode:
    - Criar novos produtos
    - Editar produtos existentes
    - Deletar produtos

### Outras Coleções
- Por padrão, qualquer outra coleção é bloqueada
- Isso protege seu banco de dados de acessos não autorizados

## Estrutura de Segurança

```
┌─────────────────────────────────────────┐
│          Firebase Firestore             │
├─────────────────────────────────────────┤
│                                         │
│  📂 products (Produtos)                 │
│     ├─ 👁️  Leitura: TODOS               │
│     └─ ✏️  Escrita: APENAS AUTENTICADOS │
│                                         │
│  📂 Outras coleções                     │
│     └─ 🔒 Bloqueadas                    │
│                                         │
└─────────────────────────────────────────┘
```

## Comandos para Deploy das Regras (Opcional)

Se você instalou o Firebase CLI, pode fazer deploy das regras via terminal:

```bash
# Instalar Firebase CLI (se ainda não tiver)
npm install -g firebase-tools

# Fazer login
firebase login

# Inicializar o projeto (escolha apenas Firestore)
firebase init firestore

# Deploy das regras
firebase deploy --only firestore:rules
```

## Adicionando Mais Administradores

Para adicionar mais usuários administradores:

1. Firebase Console → Authentication → Users
2. Clique em **Add user**
3. Adicione o email e senha do novo admin
4. Pronto! O novo usuário já pode fazer login

## Removendo Acesso de Administrador

1. Firebase Console → Authentication → Users
2. Encontre o usuário
3. Clique nos três pontos (⋮) ao lado
4. Selecione **Delete user**

## Segurança Adicional (Recomendado para Produção)

### 1. Adicionar Domínio Autorizado

1. Firebase Console → Authentication → Settings
2. Em **Authorized domains**, adicione seu domínio de produção
3. Exemplo: `casadopao.com.br`

### 2. Limitar Tentativas de Login

O Firebase já possui proteção contra brute force automaticamente, mas você pode:

1. Ativar **Email Enumeration Protection** em Settings
2. Configurar **reCAPTCHA** para login

### 3. Backup Regular

1. Firebase Console → Firestore Database → Backups
2. Configure backups automáticos

### 4. Monitoramento

1. Firebase Console → Analytics
2. Acompanhe os acessos ao seu banco de dados

## Troubleshooting (Problemas Comuns)

### Erro: "Permission denied"
- **Causa**: Regras do Firestore não foram configuradas
- **Solução**: Siga o Passo 3 acima

### Erro: "Auth/invalid-credential"
- **Causa**: Email ou senha incorretos
- **Solução**: Verifique as credenciais no Firebase Console → Authentication → Users

### Erro: "Auth/network-request-failed"
- **Causa**: Problema de conexão com internet
- **Solução**: Verifique sua conexão

### Produtos não aparecem no site
- **Causa**: Regras de leitura não configuradas
- **Solução**: Certifique-se que `allow read: if true;` está nas regras

### Não consigo adicionar produtos
- **Causa**: Usuário não está autenticado ou regras de escrita não configuradas
- **Solução**:
  1. Faça logout e login novamente
  2. Verifique as regras do Firestore

## Arquivo de Regras Local

As regras também estão disponíveis no arquivo `firestore.rules` na raiz do projeto.
Você pode usar esse arquivo para fazer deploy via Firebase CLI.

## Contatos de Suporte

- Documentação Firebase Auth: https://firebase.google.com/docs/auth
- Documentação Firestore Rules: https://firebase.google.com/docs/firestore/security/get-started
- Firebase Support: https://firebase.google.com/support

## Checklist de Configuração

- [ ] Authentication habilitado (Email/Password)
- [ ] Usuário admin criado
- [ ] Regras do Firestore configuradas
- [ ] Regras publicadas (deployed)
- [ ] Login testado no painel admin
- [ ] Adicionar produto testado
- [ ] Produtos visíveis no site público

Se todos os itens estiverem marcados, sua configuração está completa! ✅
