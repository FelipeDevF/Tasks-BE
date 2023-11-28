Bem-vindo ao projeto! Abaixo estão os passos para iniciar o projeto com sucesso.

## Pré-requisitos

Antes de começar, certifique-se de ter o Node.js e o npm instalados em sua máquina. Além disso, você precisará do Docker para executar o banco de dados. Você pode baixar o Node.js em [nodejs.org](https://nodejs.org/) e o Docker em [docker.com](https://www.docker.com/).

## Como Rodar o Projeto

1. **Instalação das Dependências:**
   Abra o terminal na pasta do projeto e execute o seguinte comando para instalar as dependências necessárias:

   npm install

2. **Gerar Prisma Client:**
Após a instalação, execute o seguinte comando para gerar o Prisma Client:

  npx prisma generate

3. **Iniciar Banco de Dados com Docker:**
Para iniciar o banco de dados usando Docker, execute:

  docker-compose up -d

4. **Executar Migrações do Prisma:**
Execute o seguinte comando para executar as migrações do Prisma:

  npx prisma migrate dev

5. **Criar uma Nova Migração:**
Quando solicitado a inserir um nome para a nova migração, digite um nome significativo e pressione Enter.

6. **Visualizar o Banco de Dados com Prisma Studio:**
Se desejar visualizar o banco de dados, execute:

  npx prisma studio

7. **Iniciar o Servidor de Desenvolvimento:**
Finalmente, inicie o servidor de desenvolvimento com:

  npm run start:dev
