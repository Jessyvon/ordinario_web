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








	ViewModel = function(){
		var _self = this;

	    var temp=[];
	    var c_comida=0;
	    var c_bebida=0;
	    var c_postre=0;


		_self.menu_producto = ko.observableArray([]);
		_self.producto_pedido = ko.observableArray([]);



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

			// if(datos.Categoria=="comida")
			// 	temp[0]=datos;
			// if(datos.Categoria=="bebida")
			// 	temp[1]=datos;
			// if(datos.Categoria=="postre")
			// 	temp[2]=datos;
			// console.log(temp);
			// _self.producto_pedido(temp);
			if(temp.length<=2)
			{
				if(datos.Categoria=="comida" && c_comida==0)
				{
					temp.push(datos);
					c_comida=1;
				}
				if(datos.Categoria=="bebida" && c_bebida==0)
				{
					temp.push(datos);
					c_bebida=1;
				}
				if(datos.Categoria=="postre" && c_postre==0)
				{
					temp.push(datos);
					c_postre=1;
				}
				console.log(temp);
				_self.producto_pedido(temp);
			}
			else{
				console.log(temp);
				console.log("YA BASTA!!");
			}
		}







	};


	var VM = new ViewModel()
	ko.applyBindings(VM);
});