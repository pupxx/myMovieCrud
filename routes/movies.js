
var express = require('express');
var router = express.Router();
var knex = require('../db/connection');



/* GET home page. */
// router.get('/', function(req, res) {
//   res.render('movies/index');
// });



router.get('/', (req, res)=>{
  knex('movies').select('*')
  .then((data)=>{
    res.render('movies/index', {
      allMovies: data
    });
  });
});

router.delete('/:id', function(req, res){
  id = req.params.id
  knex('movies').del().where('id', id).then(function(){
    res.redirect('/movies')
  })
})

router.get('/new', function(req, res){
  res.render('movies/new');
});


router.get('/:id', function(req, res){
  var id = req.params.id;
  knex('movies').select('*').where('id', id)
  .first()
  .then((data)=>{
    console.log(data);
    res.render('movies/show_page', {
      singleMovie: data
    });
  });
});

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
    console.log(newMovie);
    res.redirect(`/movies/${id}`)
  })
})
module.exports = router;
