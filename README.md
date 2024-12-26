# Peteca

**Sistema de Gestão de Grupos PET**

## Descrição

Este repositório contém o Peteca, um sistema de gestão integrada voltado aos discentes e docentes participantes do [Programa de Educação Tutorial (PET)](<[https://](http://portal.mec.gov.br/pet)>) que queiram gerir os seus grupos PET digitalmente. O sistema proporciona facilidade no controle e disponibilização de acesso de informações por meio de um robusto sistema de autenticação, gerenciamento granular de permissões e acesso por qualquer navegador Web.

O sistema é modular e pode ser facilmente incrementado com novos recursos. Os módulos originalmente planejados incluíam: gerenciamento de inventário do grupo, gerenciamento das finanças do grupo, organização e exibição de documentos importantes e exibição do calendário de atividades do grupo. Este repositório contém apenas o módulo de gerenciamento de inventário atualmente implementado.

Este sistema foi desenvolvido durante a linha de disciplinas da área de Engenharia de Software do curso de Ciência da Computação da [Universidade Estadual de Maringá (UEM)](http://www.uem.br). A implementação foi realizada para a disciplina de Construção de Software (9793/01), sob o prof. Carlos Danilo Luz.

Participaram do desenvolvimento do sistema, em algum momento:

- [Caio Vieira Arasaki](https://github.com/K1-Japa) (projeto, desenvolvimento)
- [Guilherme Frare Clemente](https://github.com/GuiSebax) (desenvolvimento)
- [João Pedro Zen Sirino](https://github.com/JoZens) (projeto)
- [Lucas Wolschick](https://github.com/LucasWolschick) (projeto, desenvolvimento)
- [Marcos Vinicius de Oliveira](https://github.com/marcosoliveira-hub) (desenvolvimento)
- [Maria Eduarda Panage Silva](https://github.com/allonszy) (projeto)
- [Matheus Hamada](https://github.com/NotHamada) (projeto, desenvolvimento)

## Instalação

O projeto está dividido em dois componentes: o módulo da interface, o _front-end_ e o módulo do servidor, o _back-end_. Ambas as partes foram desenvolvidas utilizando-se o ambiente Node.js e o ecossistema de pacotes _npm.js_. O sistema requer um banco de dados _PostgreSQL_ instalado na máquina para poder executar.

1. Certifique-se que o PostgreSQL esteja instalado em sua máquina e executando, e verifique se o _node.js_ e _npm_ também estão instalados.
2. Crie um banco de dados no PostgreSQL inicialmente vazio, e anote sua _string_ de conexão.
3. Clone o repositório:
   ```bash
   $ git clone https://github.com/LucasWolschick/Peteca.git
   $ cd Peteca
   ```
4. Baixe as dependências:
   ```bash
   $ cd back
   $ npm i
   $ cd ../front
   $ npm i
   ```
5. Altere o arquivo _.env_ na pasta _back_ para que possua a URL de conexão na variável DATABASE_URL (deve estar no formato `postgresql://USER:SENHA@HOST:PORT/DATABASE`), além das demais variáveis. Note os valores utilizados para o email e senha da conta administradora.
6. Abra um terminal e inicie o _front-end_:
   ```bash
   $ cd Peteca/front
   $ npm run build
   $ npm run dev
   ```
7. Abra outro terminal e inicie o _back-end_:
   ```bash
   $ cd Peteca/back
   $ npm run generatePrisma
   $ npm run populateDb
   $ npm run dev
   ```
8. Abra o endereço [http://localhost:3000/](http://localhost:3000/) em seu navegador, e se autentique com as credenciais de administrador.
