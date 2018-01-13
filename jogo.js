var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;


$(document).ready( function(){

	$('#btn_iniciar').click(function(){

		//## VALIDANDO OS NOMES DOS JOGADORES
		if($('#nome_jogador1').val() ==''){
			alert('Nome do Jogador 1 Inválido');
			return false;
		}

		if($('#nome_jogador2').val() ==''){
			alert('Nome do Jogador 2 Inválido');
			return false;
		}

		//## EXIBIR NOMES DOS JOGADORES EM BAIXO
		$('#nome2_jogador1').html($('#nome_jogador1').val());
		$('#nome2_jogador2').html($('#nome_jogador2').val());

		//## EXIBINDO E REMOVENDO CONTEÚDOS
		$('#pagina_inicial').hide();
		$('#pagina_jogo').show();

	});

	$('.jogada').click ( function(){

		var id_campo = this.id;
		$('#' + id_campo).off();
		jogada(id_campo);


	});

	function jogada(id){
		var icone = '';
		var ponto = 0;

		if((rodada % 2) ==1){
			icone = 'url("imagens/marcacao_1.png")';
			ponto = -1;
		}

		else{
			icone = 'url("imagens/marcacao_2.png")';
			ponto = 1;
		}

		rodada++;

		$('#'+id).css('background-image',icone);

		var linha_coluna = id.split('-');

		matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

		verifica_combinacao();

	}

	//## VERIFICNADO O VENCEDOR
	function verifica_combinacao(){

		//verifica na horizontal
		var pontos = 0;
		for(var i = 1; i <= 3; i++){
			pontos = pontos + matriz_jogo['a'][i];
		}
		ganhador(pontos);

		pontos = 0;
		for(var i = 1; i <= 3; i++){
			pontos = pontos + matriz_jogo['b'][i];
		}
		ganhador(pontos);

		pontos = 0;
		for(var i = 1; i <= 3; i++){
			pontos = pontos + matriz_jogo['c'][i];
		}
		ganhador(pontos);

		//verifica na vertical
		for(var l = 1; l <= 3; l++){
			pontos = 0;
			pontos += matriz_jogo['a'][l];
			pontos += matriz_jogo['b'][l];
			pontos += matriz_jogo['c'][l];
		
			ganhador(pontos);
		}

		//verificar na diagonal
		pontos = 0;
		pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
		ganhador(pontos);

		pontos = 0;
		pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
		ganhador(pontos);


	}

	function ganhador(pontos){

		if (pontos == -3) {
			var jogada_1 = $('#nome_jogador1').val();
			alert(jogada_1 + ' é o Vencedor');
			$('.jogada').off(); // DESABILITA A FUNÇÃO CLICK
		} else if (pontos == 3){
			var jogada_2 = $('#nome_jogador2').val();
			alert(jogada_2 + ' é o Vencedor');
			$('.jogada').off(); // DESABILITA A FUNÇÃO CLICK
		}
	}

});