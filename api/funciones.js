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

function ventasOrdenadasConfirmadas(db)
{
	return function(req, res) {
		
		var dbEntidad = db.get("venta");
		dbEntidad.find({"estado":true},{"sort" : ['fecha', 'asc']},function(err,docs){
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


function pedidosOrdenadosConfirmados(db)
{
	return function(req, res) {
		
		var dbEntidad = db.get("pedido");
		dbEntidad.find({"estado":true},{"sort" : ['fecha', 'asc']},function(err,docs){
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

function ventasOrdenadasNoConfirmadas(db)
{
	return function(req, res) {
		
		var dbEntidad = db.get("venta");
		dbEntidad.find({"estado":false},{"sort" : ['fecha', 'asc']},function(err,docs){
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


function pedidosOrdenadosNoConfirmados(db)
{
	return function(req, res) {
		
		var dbEntidad = db.get("pedido");
		dbEntidad.find({"estado":false},{"sort" : ['fecha', 'asc']},function(err,docs){
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

function registro(db){
	return function(req, res){
		
			var nuevoUsuario = { 
				nombre : req.body.nombre,
				apellido : req.body.apellido,
				user : req.body.user,
				pass : req.body.pass
			}
			
			var usuarios = db.get('usuario');
			usuarios.findOne({ user : nuevoUsuario.user}, function( err, doc){
				if(err){
					res.send({ success: false, message: 'Se produjo un error cuando se intentaba validar el usuario'});
				}
				else{
					if(doc != null){
						res.send({ success: false, message: 'El usuario ingresado ya existe'});
					}
					else{
						usuarios.insert(nuevoUsuario, function( err, docs){
							if(err){
								res.send({ success: false, message: 'Se produjo un error intentando insertar un usuario'});
							}	
							else{
								res.send({
								success: true,
								message: 'El usuario se cargo con exito!',
								res: docs
								});
							}
						});
						
					}
				}
			})
				
	}	
}

exports.ventasOrdenadas = ventasOrdenadas;
exports.pedidosOrdenados = pedidosOrdenados;
exports.ventasOrdenadasConfirmadas = ventasOrdenadasConfirmadas;
exports.pedidosOrdenadosConfirmados = pedidosOrdenadosConfirmados;
exports.ventasOrdenadasNoConfirmadas = ventasOrdenadasNoConfirmadas;
exports.pedidosOrdenadosNoConfirmados = pedidosOrdenadosNoConfirmados;
module.exports.registro = registro;