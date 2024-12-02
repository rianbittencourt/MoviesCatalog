import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzEzOGY3OWI5YmY5YThkOGI5MDAxM2VlZDlmYzU4OSIsIm5iZiI6MTY3MTQ1OTM4OS41ODgsInN1YiI6IjYzYTA3MjNkMmYzYjE3MDA5NGNhNjQ2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ivvWHBmXmC4ddXWJx-qPVo4o8qP85PeyepO0lcWRBsI',
    'Content-Type': 'application/json'
  },
  params: {
    language: 'pt-BR'
  }
});

export default api;