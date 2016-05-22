$('.collection-item').on('click', function(){
	var $badge = $('.badge', this);
	if($badge.length == 0){
		$badge = $('<span class="badge brown-text">0</span>').appendTo(this);
	}

	var produto = this.firstChild.textContent;
	Materialize.toast(produto + ' adicionado', 1000);

	$badge.text( parseInt($badge.text()) + 1);
});

$('#botao-confirmar').on('click', function(){
	var texto = '';
	$('.badge').parent().each(function(){
		var produto = this.firstChild.textContent;
		var quantidade = this.lastChild.textContent;
		texto += produto + ': ' + quantidade + ',';
	});

	$('#resumo').empty().text(texto);
});


$('.collection').on('click', '.badge', function(){
	this.remove();
	return false;
});


$('.acao-limpar').on('click', function(){
	$('#numero-mesa').val('');
	$('.badge').remove();
});

$('.modal-trigger').leanModal();


$('.scan-qr-code').on('click', function(){
	cordova.plugins.barcodeScanner.scan(function(resultado){
		if(resultado.text){
			Materialize.toast('Mesa ' + resultado.text, 2000);
			$('#numero-mesa').val(resultado.text);
		}
	},
	function(erro){
		Materialize.toast(erro, 2000, 'red-text');
	});
});


$('.acao-finalizar').on('click', function(){
	$.ajax({
		url: 'http://cozinhapp.sergiolopes.org/novo-pedido',
		data: {
			mesa: $('#numero-mesa').val(),
			pedido: $('#resumo')
		},
		success: function(resposta){
			Materialize.toast(resposta, 2000);
			$('#numero-mesa').val('');
			$('.badge').remove();
		},
		error: function(erro){
			Materialize.toast(erro.responseText, 3000, 'red-text');
		}
	});
});