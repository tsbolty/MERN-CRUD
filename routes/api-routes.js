const router = require('express').Router();
const db = require('../models');

router.post('/test/create', ({body}, res) =>{
  console.log('something')
  db.Test.create(body)
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

router.get('/test/read', (req, res) =>{
  db.Test.find({})
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

router.put('/test/update/:id', ({params, body}, res) =>{
  db.Test.findByIdAndUpdate(
    params.id,
    {$set: {title: params.title, body: params.body}},
    {new: true}
  )
    .then(data =>{
      res.json(data);
    })
    .catch(err =>{
      res.json(err);
    });
});

router.delete('/test/delete/:id', ({params}, res) =>{
  db.Test.findByIdAndDelete(params.id)
    .then(()=>{
      res.json(true);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;