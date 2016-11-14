function insertar(db)
{
	return function(req, res) {
		
		var dbEntidad = db.get(req.params.entidad);
		console.log(req.body);
		dbEntidad.insert(req.body);
		res.send({success: true, message: 'Se inserto correctamente!'});
	}
}

function listar(db)
{
	return function(req, res) {
		
		var dbEntidad = db.get(req.params.entidad);
		dbEntidad.find(req.body,function(err,docs){
			if(err){
				res.send({ success: false, message: 'no se pudo listar la entidad, o no existe' });
			}
			else{
				res.send({
						success: true,
						message: 'Lista de entidad exitosa!',
						res:docs
						});
				console.log(docs);
			}
		});
	}
}

function eliminar(db)
{
	return function(req, res) {
		
		var entidad = db.get(req.params.entidad);
		var id = req.query.id;
		
		entidad.remove({ _id: id }, function (err) {
			if (err){
			 res.send({ success: false, message: 'no se pudo eliminar el item' });
			}
			else res.send({ success: true, message: 'Se elimino de la entidad '+req.params.entidad+' con id '+id})
		});
	}
}

function actualizar(db)
{
	return function(req, res) {
		
		if(req.body.id == '' || req.body.id == undefined){
			
			res.send({ success: false, message: 'debes enviar el id' })
		}
		else{
			
			var dbEntidad = db.get(req.params.entidad)
			dbEntidad.updateById(req.body.id,req.body, function(){
				res.send({ success: true, message: 'actualización exitosa!' })
			});
		}
	}
		
}


exports.insertar = insertar;
exports.listar = listar;
exports.eliminar = eliminar;
exports.actualizar = actualizar;