var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({
  defaultLayout:'main'
});
app.engine('handlebars',handlebars.engine);
// app.use(express.static(__dirname + '/public'));
app.set('view engine','handlebars');
app.set('port',process.env.PORT||3000);
app.get('/',function(req,res){
  res.render('home');
})
app.get('/headers',function(req,res){
  res.set('Content-Type','text/plain');
  var s = '';
  for(var name in req.headers)
      s+=name + ': ' + req.headers[name] +'\n';
  res.send(s);
});
app.listen(app.get('port'),function(){
  console.log('Express has started on port 3000.');
});