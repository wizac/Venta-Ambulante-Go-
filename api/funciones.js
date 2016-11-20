function ventasOrdenadas(db)
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


function pedidosOrdenados(db)
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

exports.insertar = insertar;