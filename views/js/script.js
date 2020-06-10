function animationHover(element, animation){
    element = $(element);
    element.hover(
        function() {
            element.addClass('animated ' + animation);
        },
        function(){
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);
        });
}
$(document).ready(function(){
    $('#animacion').each(function() {
        animationHover(this, 'bounce');
    });
		$('#animacion1').each(function() {
				animationHover(this, 'bounce');
		});
		$('#animacion2').each(function() {
				animationHover(this, 'bounce');
		});
		$('#animacion3').each(function() {
				animationHover(this, 'bounce');
		});
		$('#animacion5').each(function() {
				animationHover(this, 'flipInX');
		});
		$('#animacion6').each(function() {
				animationHover(this, 'flipInX');
		});
		$('#animacion7').each(function() {
				animationHover(this, 'flipInX');
		});
		$('#animacion8').each(function() {
				animationHover(this, 'bounceIn');
		});
		$('#animacion9').each(function() {
				animationHover(this, 'tada');
		});
		$('#animacion10').each(function() {
				animationHover(this, 'tada');
		});
		$('#animacion11').each(function() {
				animationHover(this, 'tada');
		});
		$('#animacion12').each(function() {
				animationHover(this, 'bounceInUp');
		});
		$('#animacion13').each(function () {
			animationHover(this, 'tada');
		});
		$('#animacion14').each(function () {
			animationHover(this, 'tada');
		});



// check if a checkbox where cliked
	// $("#Dvlinea input[name='lineaPr']").on("click",function(){
	$("body").on("click","#Dvlinea input[name='lineaPr']",function(){
		var valorRb = $(this).val();
		var netTabla = "sublinea";
		var linTabla = "linea";
		var enviarDatos= [];
		var radio='';
		enviarDatos.push({'tabla':netTabla,'tabla2':linTabla,'valorrb':valorRb});
			var datos = {"datosS":enviarDatos};
			var valorDatos = JSON.stringify(datos);

		$.ajax({
			method:"POST",
			url: "views/modules/ajax.php",
			data:{"valor":valorDatos},
			cache:false,
			/*beforeSend:function(){
				document.getElementById("loguinLock").innerHTML='<div><img src="views/images/load.gif"  width="30px" height="30px" /></div>';
			},*/
			success:function(nextValue){
				console.log(nextValue);
				if(nextValue != 0){
					$.each(nextValue,function (i,item) {
						// radio += '<div class="form-check col-lg-6"><input type="radio" name="subLineaRadio" class="form-check-input" value="'+item.idSubLn+'"><label class="form-check-label" for="exampleCheck1">'+item.nombre+'</label></div>';
						radio += '<div class="form-check col-lg-6"><input type="radio" name="subLineaRadio" class="form-check-input" value="'+item.nombre+'"><label class="form-check-label" for="exampleCheck1">'+item.nombre+'</label></div>';
					});
					$("#Sublinea").html(radio);
					$("#btnBuscarPreciso").css("display","block");
				}else{
					$("#Sublinea").html('<div class="form-check col-lg-6"><label class="form-check-label" for="exampleCheck1">!LO SIENTO NO TENGO INFORMACIÓN¡</label></div>');					
				}
			},
			error:function(jqXHR,estado,error){
				document.getElementById("Sublinea").innerHTML=error;
			},
			complete:function(jqXHR,estado){
			},
			timeout:10000
		});
	});

	$("#btnBuscarPreciso").on("click",function(e){
		e.preventDefault()
		var sublinea,url;
		var radioSublinea = $("#Sublinea input[name='subLineaRadio']:checked").val();
		var validarRdio = expRegular("nombre",radioSublinea);
		
		if($("#Sublinea input[name='subLineaRadio']:radio").is(":checked")){
			if(validarRdio !=0){
				sublinea = $("#Sublinea input[name='subLineaRadio']:checked").val();
				url = 'catalogo-productos?sublinea='+sublinea.toLowerCase();
				$(location).attr('href',url);
			}else{
				alert("verifica");
			}
		}else{alert("debes elegir una categoria");}

		
	})
});

/**************************mostrar password************************************/
$(document).ready(function(){
	$("#showPass").on("click",function(e){
		e.preventDefault();
		var showP = document.getElementById("passUser");

		if(showP.type == "password"){
			showP.type = "text";
			$(".icon").removeClass('fas fa-eye-slash fa-3x').addClass('far fa-eye fa-3x');
		}else{
			showP.type = "password";
			$(".icon").removeClass('far fa-eye fa-3x').addClass('fas fa-eye-slash fa-3x');
		}
	});

/**************************añadir carrito************************************/
	$("#btnAddCart").on("click",function(e){
		e.preventDefault();
		var idProducto = $("#codProdUnico").html();
		var validarProdId = expRegular("nombre",idProducto);

		if (validarProdId != 0){
			$.ajax({
				
				url: "../views/modules/ajax.php",
				method:"POST",
				data:{"idProducto":idProducto},
				cache:false,
				beforeSend:function(){
					$('.spinnerWhite').html('<i class="fas fa-sync fa-spin"></i>');
				},
				success:function(artUno){
					console.log(artUno);
					if(artUno == 1){
						window.location.href = "http://localhost/final-catalogo/catalogo";
					}else if(artUno == 0){
						alert("Hubo un error porfavor intente mas tarde no es array");
					}else if(artUno == 2){
						alert("no sumo");
					}
				}
			});

		}
	});
});