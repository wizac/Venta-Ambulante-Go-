function insertar(db)
{
	return function(req, res) {
		
		var dbEntidad = db.get(req.params.entidad);
		console.log(req.body);
		dbEntidad.insert(req.body);
		res.send({success: true, message: 'Se inserto correctamente!'});
	}
}

exports.insertar = insertar;