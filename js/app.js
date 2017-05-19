$(function() {

	function CargarTODOmenu(){
		return $.ajax({
			url: 'http://ipm.esy.es/public/menu',
			type: 'GET',
			dataType: 'json'
		});
	};








	ViewModel = function(){
		var _self = this;

		_self.menu_producto = ko.observableArray([]);
		_self.producto_pedido = ko.observableArray([]);


		_self.CargarCategoriaComida = function(){
				CargarTODOmenu().done(function(res){
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
			var temp=[];
			if(data.Categoria=="rico")
				temp[0]=data;
			if(data.Categoria=="masriko")
				temp[1]=data;
			if(data.Categoria=="sabrosos")
				temp[2]=data;
			_self.producto_pedido(temp);
		}







	};


	var VM = new ViewModel()
	ko.applyBindings(VM);
});