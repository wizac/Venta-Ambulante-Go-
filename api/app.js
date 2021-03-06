var db = require('monk')('localhost/ventasdb');
var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var login = require("./autentificacion");
var abm = require("./bsGenerica");
var funciones = require("./funciones");

app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRoutes);


function apiRoutes(req,res,next){
	 
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) 
	{
      jwt.verify(token, "secret", function(err, decoded) {      
      if (err) 
	  {
        return res.json({ success: false, message: 'Usted no tiene permiso de acceso.' });    
      } 
	  else 
	  {
        req.decoded = decoded;    
        next();
      }
    });

    } 
	else 
	{
      return res.status(403).send({ 
        success: false, 
        message: 'No se proporciono el token.' 
      });
    }
 };
 
 
/* ----------------------- FUNCIONALIDAD ------------------------ */

app.post('/autentificacion', login.autentificacion(db));

app.post('/registro', funciones.registro(db));

app.post("/api/:entidad/insertar", abm.insertar(db));
	
app.post("/api/:entidad/listar", abm.listar(db));

app.post("/api/:entidad/eliminar", abm.eliminar(db));

app.post("/api/:entidad/actualizar", abm.actualizar(db));

app.post("/api/ventasOrdenadas", funciones.ventasOrdenadas(db));

app.post("/api/pedidosOrdenados", funciones.pedidosOrdenados(db));

app.post("/api/ventasOrdenadasConfirmadas", funciones.ventasOrdenadasConfirmadas(db));

app.post("/api/pedidosOrdenadosConfirmados", funciones.pedidosOrdenadosConfirmados(db));

app.post("/api/ventasOrdenadasNoConfirmadas", funciones.ventasOrdenadasNoConfirmadas(db));

app.post("/api/pedidosOrdenadosNoConfirmados", funciones.pedidosOrdenadosNoConfirmados(db));

app.post("/api/productosConStock", funciones.productosConStock(db));

 
/* -------------------------------------------------------------- */
 
 app.listen(8080, function () {
  console.log('APP READY!');
});