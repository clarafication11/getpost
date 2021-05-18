

var express = require("express");
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
  res.render('home.handlebars')
});

var context = {};


app.get('/',function(req,res){
  var parm = [];
  context = {};
  for (var i in req.query){
    parm.push({'name':i,'value':req.query[i] })
  }
  context.requestType = "GET request received.";
  context.dataList = parm;
  context.type = "GET";
  res.render('final', context)
});

app.post("/", function (req, res) {
	var parmB = [];
  var parmQ = [];
  parm = [];
  context = {};
  for (var b in req.body) {
    parm.push({ 'name': b, 'value': req.body[b] });
  }
  for (var q in req.query){
    parm.push({'name': q, 'value': req.query[q] });
  }
  context.requestType = "POST request received.";
  context.passedBodyData = parm;
  context.passedQueryData = parm;
  context.type = 'POST';
  res.render("final", context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(404);
  res.render('404');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
