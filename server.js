const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (error) => {
    if(error) {
      console.log('Unable to append to server.log');
    }
  });
  console.log(`${now}: ${req.method} ${req.url}`);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'We\'ll be right back',
//     message: 'This site is currently being updated.'
//   });
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Andrew',
  //   likes: [
  //     'Biking',
  //     'Cities'
  //   ]
  // })

  res.render('home.hbs', {
    pageTitle: "Home Page",
    welcomeMessage: 'Welcome to My Website'
  });
});

app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error handling request'
  })
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'My Projects'
  });
});

app.listen(port, () => {
  console.log(`Server is up and running at port ${port}`);
});
