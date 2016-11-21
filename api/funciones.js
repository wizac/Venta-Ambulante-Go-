function ventasOrdenadas(db)
{
	return function(req, res) {
		
		var dbEntidad = db.get("venta");
		dbEntidad.find({},{"sort" : ['fecha', 'asc']},function(err,docs){
			if(err){
				res.send({ success: false, message: 'no se pudo listar las ventas' });
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
		
		var dbEntidad = db.get("pedido");
		dbEntidad.find({},{"sort" : ['fecha', 'asc']},function(err,docs){
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


exports.ventasOrdenadas = ventasOrdenadas;
exports.pedidosOrdenados = pedidosOrdenados;