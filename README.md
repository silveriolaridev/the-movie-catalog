# The Movie Catalog

The Movie Catalog é uma aplicação web desenvolvida com React para explorar filmes, buscar títulos, visualizar detalhes completos e descobrir recomendações relacionadas.

O projeto consome dados da API do TMDB e foi desenvolvido com foco em componentização, consumo de API externa, rotas dinâmicas, responsividade, organização de código e boas práticas de acessibilidade.

## Funcionalidades

- Listagem de filmes populares
- Busca de filmes por título
- Paginação de resultados
- Ordenação por popularidade, ordem alfabética, avaliação e ano
- Página de detalhes do filme
- Exibição de informações como sinopse, nota, data de lançamento, duração, gêneros, diretor e elenco
- Recomendações de filmes relacionados
- Layout responsivo
- Tema claro/escuro baseado na preferência do sistema
- Navegação com React Router DOM
- Consumo de API com Axios

## Tecnologias utilizadas

- React
- JavaScript
- Vite
- React Router DOM
- Axios
- React Icons
- CSS
- HTML
- TMDB API

## Como executar o projeto

Para rodar este projeto localmente, é necessário ter uma conta no [TMDB](https://www.themoviedb.org/) e gerar um token de acesso à API.

### 1. Clone o repositório

```bash
git clone https://github.com/silveriolaridev/the-movie-catalog.git
```

### 2. Acesse a pasta do projeto

```bash
cd the-movie-catalog
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure a API do TMDB

Crie uma conta no [TMDB](https://www.themoviedb.org/) e gere um token de acesso à API.

Depois, crie um arquivo `.env` na raiz do projeto, no mesmo nível do `package.json`, e adicione a variável:

```env
VITE_TMDB_TOKEN=seu_read_access_token_do_tmdb
```

> O projeto utiliza variáveis de ambiente do Vite, por isso o nome da variável precisa começar com `VITE_`.

### 5. Execute o projeto

```bash
npm run dev
```

### 6. Acesse no navegador

```bash
http://localhost:5173
```

## Estrutura do projeto

```txt
src/
  api/
    axiosConfig.js
    movieRequests.js

  components/
    Footer/
    Header/
    MovieCard/
    MovieDetailsCard/
    MoviesRecomendations/
    SearchBar/

  pages/
    Home/
      Home.css
      Home.jsx

    MovieDetails/
      MovieDetails.css
      MovieDetails.jsx

  App.jsx
  index.css
  main.jsx
```