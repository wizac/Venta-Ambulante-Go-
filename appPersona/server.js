var express = require('express');
var app = express();
var data = Array();
var lastId = 0;
var bodyParser = require('body-parser');



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.use(bodyParser.json());

app.post("/persona/put",function(req, res){
	console.log("metodo post put");
	console.log(req.body);
	var persona = {
		"id" : lastId,
		"nombre" : req.body.nombre,
		"apellido" : req.body.apellido,
		"documento" : req.body.documento
	}
	
	data[lastId++] = persona;
	res.send("Se agrego la persona");
});

app.get("/persona/list",function(req, res){
	res.json(data);
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
