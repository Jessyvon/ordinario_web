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

		_self.menu_producto = ko.observableArray([]);
		_self.producto_pedido = ko.observableArray([]);


		_self.CargarCategoriaComida = function(){
				CargarTODOespecifico("comida").done(function(res){
					if(res.error){
						console.log(res.msg);
						return false;
					}
					//localStorage.setItem("id_comida", res.datos.ID);
					//localStorage.setItem("Categoria", res.datos.Categoria);
					//localStorage.setItem("Categoria", res.datos.ID);
					//NO SE QUE ONDA CON LA DISPONIBILIDAD DEBERIA SER VALIDADO EN EL API
					_self.menu_producto(res.datos);
				});
		}


		_self.CargarCategoriaBebida = function(){
				CargarTODOespecifico("bebida").done(function(res){
					if(res.error){
						console.log(res.msg);
						return false;
					}
					//localStorage.setItem("id_comida", res.datos.ID);
					//localStorage.setItem("Categoria", res.datos.Categoria);
					//localStorage.setItem("Categoria", res.datos.ID);
					//NO SE QUE ONDA CON LA DISPONIBILIDAD DEBERIA SER VALIDADO EN EL API
					_self.menu_producto(res.datos);
				});
		}

		_self.CargarCategoriaPostre = function(){
				CargarTODOespecifico("postre").done(function(res){
					if(res.error){
						console.log(res.msg);
						return false;
					}
					//localStorage.setItem("id_comida", res.datos.ID);
					//localStorage.setItem("Categoria", res.datos.Categoria);
					//localStorage.setItem("Categoria", res.datos.ID);
					//NO SE QUE ONDA CON LA DISPONIBILIDAD DEBERIA SER VALIDADO EN EL API
					_self.menu_producto(res.datos);
				});
		}

		_self.AgregarPedido = function(datos){
			console.log(datos);
			var temp=[];
			if(datos.Categoria=="comida")
				temp[0]=datos;
			if(datos.Categoria=="bebida")
				temp[1]=datos;
			if(datos.Categoria=="postre")
				temp[2]=datos;
			_self.producto_pedido(temp);
		}







	};


	var VM = new ViewModel()
	ko.applyBindings(VM);
});