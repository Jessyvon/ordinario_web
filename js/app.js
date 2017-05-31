$(function() {

	function CargarTODOmenu(){
		return $.ajax({
			url: 'http://ipm.esy.es/public/menu',
			type: 'GET',
			dataType: 'json'
		});
	};

	function CargarTODOespecifico(categoria){
		return $.ajax({
			url: 'http://ipm.esy.es/public/menu/'+categoria,
			type: 'GET',
			dataType: 'json'
		});
	};

	function EnviarPEDIDO(pedido){
		return $.ajax({
			url: 'http://ipm.esy.es/public/pedir',
			type: 'POST',
			dataType: 'json',
			data: pedido
		});
	}

	 function VerEstado(usuario){
                return $.ajax({
                    url: 'http://ipm.esy.es/public/pedido/'+usuario,
                    type: 'GET',
                    dataType: 'json'
                });
            };








	ViewModel = function(){
		var _self = this;

	    var temp=[];
	    var id_comida=0;
	    var id_bebida=0;
	    var id_postre=0;
	    var id_usuario_cafe=4;
	    var pedido="no";
	    var total=parseInt(0);

	    //localStorage.setItem("id_cliente", id_usuario_cafe);

	    //localStorage.setItem("ExistePedido", "no");


		_self.menu_producto = ko.observableArray([]);
		_self.producto_pedido = ko.observableArray([]);
		_self.confirmacion_producto_pedido = ko.observableArray([]);



		_self.CargarCategoriaComida = function(){
				CargarTODOespecifico("comida").done(function(res){
					if(res.error){
						console.log(res.msg);
						return false;
					}
					_self.menu_producto(res.datos);
				});
		}


		_self.CargarCategoriaBebida = function(){
				CargarTODOespecifico("bebida").done(function(res){
					if(res.error){
						console.log(res.msg);
						return false;
					}
					_self.menu_producto(res.datos);
				});
		}

		_self.CargarCategoriaPostre = function(){
				CargarTODOespecifico("postre").done(function(res){
					if(res.error){
						console.log(res.msg);
						return false;
					}
					_self.menu_producto(res.datos);
				});
		}

		_self.AgregarPedido = function(datos){
			console.log(datos);



			if(datos.Categoria=="comida")
			{
				temp[0]=datos;
				$('#botonBebida').removeClass('disabled');
				$('#botonBebida').removeAttr('disabled');
			}
			if(datos.Categoria=="bebida")
			{
				temp[1]=datos;
				$('#botonPostre').removeClass('disabled');
				$('#botonPostre').removeAttr('disabled');
			}
			if(datos.Categoria=="postre")
			{
				temp[2]=datos;
			}
			console.log(temp);
			_self.producto_pedido(temp);
			
		}

		_self.ConfirmarPedido= function(){
			console.log(temp);
			var PrecioComida=parseInt(temp[0].Precio);
			var PrecioBebida=parseInt(temp[1].Precio);
			var PrecioPostre=parseInt(temp[2].Precio);
			total=PrecioComida+PrecioBebida+PrecioPostre;
			id_comida=temp[0].ID;
			id_bebida=temp[1].ID;
			id_postre=temp[2].ID;
			console.log(total);
			_self.confirmacion_producto_pedido(temp);
			$('#total').html(total.toString());
			
		}

		_self.casiPagar=function(){
			$('#total2').html(total.toString());
		}

		_self.Pagar= function(){

			var datos_pedido = {
				idu: id_usuario_cafe,
				idc: id_comida,
				idb: id_bebida,
				idp: id_postre,
				tt: total
			};

			
			EnviarPEDIDO(datos_pedido).done(function(res){
				console.log(datos_pedido);
				if(res.error){
					$("#myModalErrorPAGADO").modal()
					console.log(res.msg);
					return false;
				}else{
					localStorage.setItem("ExistePedido", "si");
					$("#myModalPAGADO").modal();
					console.log(res.msg);
				}
			})

			
		}

		_self.Cerrar= function(){
			window.location="home.html";
		}

		_self.Estado = function(){

                        VerEstado(id_usuario_cafe).done(function(res){
                        if(res.datos[0].Estatus=="Enviado"){
                            console.log("Tu pedido se ha enviado");
                            $('#estado_pedido').html("Tu pedido se ha enviado a la cafeteria");
                        }
                        if(res.datos[0].Estatus=="Procesando"){
                            console.log("Tu Pedido se esta haciendo");
                            $('#estado_pedido').html("Tu pedido se esta cocinando");
                        }
                        if(res.datos[0].Estatus=="Listo"){
                            console.log("Tu Pedido esta listo");
                             $('#estado_pedido').html("Tu pedido esta listo, para entrega");
                        }
                        if(res.datos[0].Estatus=="Cancelado"){
                        	localStorage.setItem("ExistePedido", "no");
                            console.log("Tu Pedido esta listo");
                            $('#estado_pedido').html("Tu pedido se cancelo, por distintos motivos, veras tu dinero de vuelta en tu tarjeta");
                        }
                        if(res.datos[0].Estatus=="Entregado"){
                        	localStorage.setItem("ExistePedido", "no");
                            console.log("Tu Pedido esta listo");
                            $('#estado_pedido').html("Pedido entregado con éxito");
                        }
                    });
                }







	};


	var VM = new ViewModel()
	ko.applyBindings(VM);
});