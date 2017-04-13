
var express = require('express');
var router = express.Router();
var knex = require('../db/connection');



//Get All
router.get('/', (req, res)=>{
  knex('movies').select('*')
  .then((data)=>{
    res.render('movies/index', {
      allMovies: data
    });
  });
});

//Delete One
router.delete('/:id', function(req, res){
  id = req.params.id
  knex('movies').del().where('id', id).then(function(){
    res.redirect('/movies')
  });
});

//Go to form for new
router.get('/new', function(req, res){
  res.render('movies/new');
});

//Get One
router.get('/:id', function(req, res){
  var id = req.params.id;
  knex('movies').select('*').where('id', id)
  .first()
  .then((data)=>{
    res.render('movies/show_page', {
      singleMovie: data
    });
  });
});

//Go to form to update
router.get('/:id/edit', function(req, res){
  var id = req.params.id;
  knex('movies').select('*').where('id', id)
  .first()
  .then((data)=>{
    res.render(`movies/edit`, {
      singleMovie: data
    });
  });
});

//Create One
router.post('/', function(req, res, next){
  var movie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    rating: req.body.rating,
    poster_url: req.body['poster']
  }
  knex('movies').insert(movie, '*').then((newMovie)=>{
    id = newMovie[0].id
    res.redirect(`/movies/${id}`)
  });
});

//Update One
router.put('/:id', function(req, res, next){
  var id = req.params.id
  var movie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    rating: req.body.rating,
    poster_url: req.body['poster']
  }
  knex('movies').update(movie, '*').where('id', id).then((newMovie)=>{

    id = newMovie[0].id
    res.redirect(`/movies/${id}`)
  });
});



module.exports = router;
