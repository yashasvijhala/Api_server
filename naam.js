const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 6341;

app.use(express.json());

mongoose.connect('mongodb+srv://yjhala58:hk654321@cluster0.qlvts0l.mongodb.net/Api-server?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const mov_sc = new mongoose.Schema({
  name: String,
  directedBy: String,
  producedBy: String,
  releaseDate: String,
  boxOffice: String,
  imageUrl: String,
});

const Movie = mongoose.model('Movie', mov_sc);

app.post('/movies', async (req, res) => {
  try {
    const newmov = new Movie(req.body);
    await newmov.save();
    res.json(newmov);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/movies/:id', async (req, res) => {
  try {
    const m_id = req.params.id;
    const movie = await Movie.findById(m_id);
    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
    } else {
      res.json(movie);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/movies/:id', async (req, res) => {
  try {
    const m_id = req.params.id;
    const updates = req.body;

    const movie = await Movie.findByIdAndUpdate(m_id, updates, { new: true });

    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
    } else {
      res.json(movie);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/movies/:id', async (req, res) => {
  try {
    const m_id = req.params.id;
    const movie = await Movie.findByIdAndRemove(m_id);

    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
    } else {
      res.json(movie);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(6341)