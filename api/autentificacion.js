var jwt = require('jsonwebtoken');

function autentificacion(db)
{
	return function(req, res) {
	
		var dbUsuario = db.get('usuario');
		dbUsuario.findOne({user: req.body.user}, function(err, user){
			if (err) throw err;
			if (!user) 
			{
				res.json({ success: false, message: 'La autentificacion fallo. El usuario no existe.' });
			} 
			else if (user) 
			{
				if (user.pass != req.body.pass) 
				{
					console.log(user.password);
					console.log(req.body.password)
					res.json({ success: false, message: 'Error de autentificacion. Contraseña incorrecta.' });
				} 
				else 
				{
					var token = jwt.sign(user, "secret" ,{expiresIn: "24h"});
					res.json({
						success: true,
						message: 'Autentificación exitosa!',
						token: token
						});
				}   
			}
	   });
	}
};

exports.autentificacion = autentificacion;