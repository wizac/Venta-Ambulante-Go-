var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('monk')('localhost/otrabase');

app.use(bodyParser.json());

app.listen(8080, function () {
  console.log('aplicacion escuchando el puerto 8080');
});

app.post("/api/:entidad/put",function(req,res){
	var dbEntidad = db.get(req.params.entidad);
	console.log(req.body);
	dbEntidad.insert(req.body);
	res.send("se agrego correctamente en la coleccion: " + req.params.entidad);
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

app.get("/api/documentos/delete",function(req,res){
	console.log("id que se elimina: " + req.query.id);
	var documentos = db.get(req.params.documentos);
	var IdDocumento = db.query.id;
	
	documentos.remove({ _id: IdDocumento }, function (err) {
		if (err) throw err;
		else res.send('Se elimino el documento '+req.params.documentos+' con id '+IdDocumento);
	});
	
	usuario.remove({ _id: IdDocumento }, function (err) {
		if (err) throw err;
		else res.send('Se elimino el documento del usuario '+req.params.usuario+' con id documento '+IdDocumento);
	});
	
	
    }
});

app.get("/api/:entidad/delete",function(req,res){
	console.log("id que se elimina: " + req.query.id);
	var entidad = db.get(req.params.entidad);
	var id = req.query.id;
	
	entidad.remove({ _id: id }, function (err) {
		if (err) throw err;
		else res.send('Se elimino de la entidad '+req.params.entidad+' con id '+id);
	});
});

app.post("/api/:entidad/update",function(req, res){
	if(req.query.id == '' || req.query.id == undefined){
		console.log("nooo");
		res.send('Tenes que mandar el id boludo');
	}
	else{
		console.log("actualiza");
		
		var dbEntidad = db.get(req.params.entidad)
		dbEntidad.updateById(req.query.id,req.body, function(){
			res.send("Se actualizo");
		});
	}
	
	
});