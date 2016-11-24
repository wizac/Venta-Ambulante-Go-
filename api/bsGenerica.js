function insertar(db)
{
	return function(req, res) {
		
		var dbEntidad = db.get(req.params.entidad);
		console.log(req.body);
		dbEntidad.insert(req.body,function(err,docs){
			if(err){
				res.send({ success: false, message: 'No se pudo insertar el item en la entidad' })
			}
			else{
				res.send({
						success: true,
						message: 'Se inserto correctamente el item en la entidad!',
						res: docs
						});
			}
		});
	}
}

function listar(db)
{
	return function(req, res) {
		
		if(req.body.id != '' && req.body.id != undefined){
			
			var ObjectId = db.helper.id.ObjectID
			var dbEntidad = db.get(req.params.entidad);
			dbEntidad.findOne({"_id": new ObjectId(req.body.id)},function(err,docs){
				if(err){
					res.send({ success: false, message: 'no se pudo listar la entidad por id, no existe o el id es invalido'});
				}
				else{
					console.log("si entro");
					res.send({
							success: true,
							message: 'Lista de entidad por id exitosa!',
							res:docs
							});
					console.log(docs);
				}
			});
		}
		else{
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
}

function eliminar(db)
{
	return function(req, res) {
		
		var ObjectId = db.helper.id.ObjectID
		var dbEntidad = db.get(req.params.entidad);
		dbEntidad.findOne({"_id": new ObjectId(req.body.id)},function(err,doc){
			if(err){
				res.send({ success: false, message: 'se produjo un error cuando se intentaba buscar el item por el id enviado'});
			}
			else if(doc == null){
				res.send({ success: false, message: 'el id enviado no existe'});
			}
			else{
				dbEntidad.remove({"_id": new ObjectId(req.body.id)},function(err,docs){
					if (err){
						res.send({ success: false, message: 'no se pudo eliminar el item' });
					}
					else{ res.send({
							success: true,
							message: 'El item se elimino correctamente',
							res:docs
						});
					}
				});
			}
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
			var ObjectId = db.helper.id.ObjectID
			var dbEntidad = db.get(req.params.entidad);
			dbEntidad.findOne({"_id": new ObjectId(req.body.id)},function(err,doc){
				if(err){
					res.send({ success: false, message: 'se produjo un error cuando se intentaba buscar el item por el id enviado'});
				}
				else if(doc == null){
					res.send({ success: false, message: 'el id enviado no existe'});
				}
				else{
					var id = req.body.id;
					delete req.body["id"];
					console.log("----------------------------------------------");
					console.log(req.body);
					console.log("----------------------------------------------");
					dbEntidad.updateById(id, req.body,function(err,docs){
						if (err){
							res.send({ success: false, message: 'no se pudo eliminar el item' });
						}
						else{ res.send({
								success: true,
								message: 'El item con el id ' + id + ' se actualizo correctamente',
								res:docs
							});
						}
					});
				}
			});
		}
	}
		
}


exports.insertar = insertar;
exports.listar = listar;
exports.eliminar = eliminar;
exports.actualizar = actualizar;