var db = require('monk')('localhost/basegenerica');
var express = require('express');
var app = express();
var data = Array();
var lastId = 0;
var bodyParser = require('body-parser');



app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

app.use(bodyParser.json());

app.post("/api/:entidad/put",function(req, res){
	var dbEntidad = db.get(req.params.entidad);
	console.log("metodo post put");
	console.log(req.body);
	dbEntidad.insert(req.body);
	res.send("Se agrego la coleccion: "+ req.params.entidad);
});

app.get("/api/:entidad/list",function(req,res){
	var dbEntidad = db.get(req.params.entidad);
	dbEntidad.find(req.query,function(err,docs){
		if(err){
			throw err;
		}
		else{
			res.send(docs);
		}
	});
});

app.get("/api/:entidad/filtro",function(req,res){
	var dbEntidad = db.get(req.params.entidad);
	var objeto = req.query;
	var atributo;
	
	for(atributo in objeto)
	{
		var exp = new RegExp("^"+objeto[atributo]);
		objeto[atributo] = exp;
	}
	
	dbEntidad.find(objeto,function(err,docs){
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
