const express = require('express');
const app = express();
const port = 6341; 

app.use(express.json());
let movies = [
  {
    id: 1,
    name: 'The Shawshank Redemption',
    directedBy: 'Frank Darabont',
    producedBy: 'Niki Marvin',
    releaseDate: '1994',
    boxOffice: '$58.3 million',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/c5eea2f44626ddcbe2e5a4e3f37a36e05d7ca2ceb1690d795ca9ac38a8f5d365._RI_TTW_.jpg',
  },
  {
    id: 2,
    name: 'Back to the future',
    directedBy: ' Robert Zemeckis',
    producedBy: 'Neil Canton',
    releaseDate: ' 1985',
    boxOffice: '$50.3 million',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
  },
];


app.post('/movies', (req, res) => {
  const newMovie = req.body;
  newMovie.id = movies.length+1;
  movies.push(newMovie);
  res.json(newMovie);
});


app.get('/movies', (req, res) => {
  res.json(movies);
});


app.get('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === movieId);
  if (!movie) {
    res.status(404).json({ error: 'Movie not found' });
  } else {
    res.json(movie);
  }
});

app.patch('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updates = req.body;
    let j = -1;
    let i = 0;
    //console.log(id)
    while (i < movies.length) {
        console.log(movies[i].id, id)
      if (movies[i].id === id) {
        j = i;
        break;
      }
      i++;
    }
    //console.log(j)
    if (j === -1) {
      res.status(404).json({ error: 'Movie not found' });
    } else {
      const movie = movies[j];
      for (const k in updates) {
        if (movie[k] !== undefined) {
          movie[k] = updates[k];
        }
      }
      res.json(movie);
    }
  });
  

app.delete('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const index = movies.findIndex((movie) => movie.id === movieId);
  if (index === -1) {
    res.status(404).json({ error: 'Movie not found' });
  } else {
    const deletedMovie = movies.splice(index, 1)[0];
    res.json(deletedMovie);
  }
})
app.listen(6341)