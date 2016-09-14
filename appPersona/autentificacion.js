var db = require('monk')('localhost/basegenerica');
var express = require('express');
var app = express();
var data = Array();
var lastId = 0;
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
app.set('superSecret','contra');

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

app.use(bodyParser.json());

function islogged(req,res,next){
	 
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) 
	{
      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) 
	  {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } 
	  else 
	  {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

    } 
	else 
	{
      // if there is no token
      // return an error
      return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
      });
    }
 };
 
app.use('/api', islogged);

app.post("/autentificacion",function(req,res){
	
	var dbUsuario = db.get('usuario');
	dbUsuario.findOne({usuario: req.body.usuario}, function(err, user){
		if (err) throw err;
		if (!user) 
		{
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} 
		else if (user) 
		{
			// check if password matches
			if (user.password != req.body.password) 
			{
				console.log(user.password);
				console.log(req.body.password)
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} 
			else 
			{
				console.log("si entra");
				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, app.get('superSecret'),{expiresIn: "24h"});
				// return the information including token as JSON
				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
					});
			}   
		}
   });
 });
 


app.post("/api/:entidad/put",function(req, res){
	var dbEntidad = db.get(req.params.entidad);
	console.log("metodo post put");
	console.log(req.body);
	dbEntidad.insert(req.body);
	res.send("Se agrego la coleccion: "+ req.params.entidad);
});

app.get("/api/:entidad/list",function(req,res){
	console.log(req.query);
	var dbEntidad = db.get(req.params.entidad);
	dbEntidad.find({},function(err,docs){
		if(err){
			throw err;
		}
		else{
			res.send(docs);
			console.log(docs);
		}
	});
});



 
app.get("/api/:entidad/filtro",function(req,res){
	var dbEntidad = db.get(req.params.entidad);
	var objeto = req.query;
	var atributo;
	var OJson = {};
	
	for(atributo in objeto)
	{
		if(atributo != "token")
		{
			var exp = new RegExp("^"+objeto[atributo]);
			OJson[atributo] = exp;
		}
	}
	
	dbEntidad.find(OJson,function(err,docs){
		if(err){
			throw err;
		}
		else{
			res.send(docs);
		}
	});
});


app.get("/persona/delete",function(req,res){
	console.log(req.query.id);
	var id = req.query.id;
	data.splice(id,1);
	res.send("Se elimino la persona con id " + id);
});

app.post("/persona/update",function(req, res){
	console.log(req.body);
	var actualizo = false;
	var personaNueva = {
		"id" : req.body.id,
		"nombre" : req.body.nombre,
		"apellido" : req.body.apellido,
		"documento" : req.body.documento
	}
	for(var contador=0; contador < data.length; contador++)
	{
		if(data[contador].id == personaNueva.id)
		{
			data[contador].nombre = personaNueva.nombre;
			data[contador].apellido = personaNueva.apellido;
			data[contador].documento = personaNueva.documento;
			actualizo = true;
		}
	}
	if(actualizo)
	{
		console.log("La persona con el id ="+personaNueva.id+" se modifico correctamente");
		res.send("La persona con el id ="+personaNueva.id+" se modifico correctamente")
	}
	else
	{
		console.log("La persona no se pudo modificar. Verifique el id ingresado");
		res.send("La persona no se pudo modificar. Verifique el id ingresado")
	}

});
