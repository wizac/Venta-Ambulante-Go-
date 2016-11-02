var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('monk')('localhost/ventasdb');

app.use(bodyParser.json());

app.listen(8081, function () {
  console.log('aplicacion escuchando el puerto 8081');
});

app.post("/api/:entidad/put",function(req,res){
	var dbEntidad = db.get(req.params.entidad);
	console.log(req.body);
	dbEntidad.insert(req.body);
	res.send({success: true, message: 'se agrego correctamente!'});
	//res.send("se agrego correctamente en la coleccion: " + req.params.entidad);
});

app.get("/api/:entidad/list",function(req,res){
	var dbEntidad = db.get(req.params.entidad);
	dbEntidad.find(req.query,function(err,docs){
		if(err){
			res.send({ success: false, message: 'no se pudo listar el producto, o no existe' })
		}
		else{
			res.send({
					success: true,
					message: 'Lista de items exitosa!',
					docs: docs
					});
			//res.send(docs);
		}
	});
});

app.get("/api/:entidad/delete",function(req,res){
	console.log("id que se elimina: " + req.query.id);
	var entidad = db.get(req.params.entidad);
	var id = req.query.id;
	
	entidad.remove({ _id: id }, function (err) {
		if (err) res.send({ success: false, message: 'no se pudo eliminar el item' })
		else res.send({ success: true, message: 'Se elimino de la entidad '+req.params.entidad+' con id '+id})
			//res.send('Se elimino de la entidad '+req.params.entidad+' con id '+id);
	});
});

app.post("/api/:entidad/update",function(req, res){
	if(req.query.id == '' || req.query.id == undefined){
		
		res.send({ success: false, message: 'debes enviar el id' })
		//res.send('Tenes que mandar el id');
	}
	else{
		console.log("actualiza");
		
		var dbEntidad = db.get(req.params.entidad)
		dbEntidad.updateById(req.query.id,req.body, function(){
			res.send({ success: true, message: 'actualización exitosa!' })
		});
	}
	
	
});