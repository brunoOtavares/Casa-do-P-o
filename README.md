# Casa do Pão - Site de Vendas para Padaria

Site moderno e responsivo para vendas online de produtos de padaria, desenvolvido com React, Tailwind CSS e Firebase.

## Características

- Design moderno e acolhedor inspirado em tons de azul, amarelo e marrom
- Página inicial com banner e produtos em destaque
- Catálogo completo de produtos com filtros por categoria
- Carrinho de compras com persistência (LocalStorage)
- Integração com WhatsApp para finalização de pedidos
- Painel administrativo protegido por senha
- Totalmente responsivo (mobile e desktop)

## Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript para interfaces
- **React Router DOM** - Navegação entre páginas
- **Tailwind CSS** - Framework CSS utilitário
- **Firebase Firestore** - Banco de dados em tempo real
- **Lucide React** - Ícones modernos
- **Vite** - Build tool e dev server

## Instalação

1. Clone o repositório ou extraia os arquivos do projeto

2. Instale as dependências:
```bash
npm install
```

3. Configure o Firebase:
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Crie um banco de dados Firestore
   - Copie as credenciais do Firebase
   - Abra o arquivo `src/config/firebase.js`
   - Substitua as credenciais pelos dados do seu projeto

4. Configure o número do WhatsApp:
   - Abra `src/contexts/CartContext.jsx`
   - Na linha 74, substitua `5511999999999` pelo número do WhatsApp da padaria (com DDI + DDD)
   - Abra `src/pages/Contact.jsx`
   - Na linha 28, substitua pelo mesmo número

## Executar o Projeto

### Modo Desenvolvimento
```bash
npm run dev
```
O site estará disponível em `http://localhost:5173`

### Build para Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.jsx      # Cabeçalho com navegação
│   ├── Footer.jsx      # Rodapé com informações
│   └── ProductCard.jsx # Card de produto
├── pages/              # Páginas da aplicação
│   ├── Home.jsx        # Página inicial
│   ├── Products.jsx    # Catálogo de produtos
│   ├── Cart.jsx        # Carrinho de compras
│   ├── About.jsx       # Sobre nós
│   ├── Contact.jsx     # Contato
│   └── Admin.jsx       # Painel administrativo
├── contexts/           # Context API
│   └── CartContext.jsx # Gerenciamento do carrinho
├── config/             # Configurações
│   └── firebase.js     # Configuração Firebase
├── App.jsx             # Componente principal
└── index.css           # Estilos globais
```

## Funcionalidades

### Para Clientes

1. **Navegação**
   - Página inicial com produtos em destaque
   - Catálogo completo com filtros por categoria
   - Páginas Sobre Nós e Contato

2. **Carrinho de Compras**
   - Adicionar produtos ao carrinho
   - Ajustar quantidades
   - Remover produtos
   - Persistência automática (itens não são perdidos ao recarregar)

3. **Finalização de Pedido**
   - Botão "Finalizar no WhatsApp"
   - Mensagem automática com lista de produtos e total
   - Abre o WhatsApp com a mensagem pronta

### Para Administradores

1. **Acesso ao Painel**
   - Acesse `/admin` no navegador
   - Senha padrão: `admin123`

2. **Gerenciar Produtos**
   - Adicionar novos produtos
   - Editar produtos existentes
   - Excluir produtos
   - Marcar produtos como destaque
   - Upload de imagens via URL

## Personalização

### Cores
As cores podem ser personalizadas no arquivo `tailwind.config.js`:
- `primary`: Azul (tons de azul)
- `secondary`: Amarelo (tons de amarelo)
- `accent`: Marrom (tons de terra)

### Fontes
As fontes usadas são:
- **Inter**: Texto corpo
- **Poppins**: Títulos e destaques

Podem ser alteradas no arquivo `tailwind.config.js`

### Informações de Contato
Edite o arquivo `src/components/Footer.jsx` para atualizar:
- Endereço
- Telefones
- Email
- Horário de funcionamento
- Links de redes sociais

## Segurança

**IMPORTANTE**: Em produção, considere:

1. Implementar autenticação adequada no painel admin usando Firebase Authentication
2. Configurar regras de segurança no Firestore
3. Usar variáveis de ambiente para credenciais sensíveis
4. Implementar HTTPS
5. Validação de dados no servidor

## Suporte

Para dúvidas ou problemas:
- Verifique a configuração do Firebase
- Confirme que todas as dependências foram instaladas
- Consulte a documentação do [React](https://react.dev/) e [Firebase](https://firebase.google.com/docs)

## Licença

Este projeto foi desenvolvido para uso comercial da padaria Casa do Pão.
