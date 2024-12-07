let numMaxSorteado = 3;
let listaDeNumerosSorteados = [];
let numSecreto = gerarNumAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.getElementById(tag);
    campo.textContent = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

function exibirMensagemInicial() {
    exibirTextoNaTela('titulo', 'Jogo do número secreto');
    exibirTextoNaTela('paragrafo', `Escolha um número entre 1 e ${numMaxSorteado}`);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = parseInt(document.getElementById('chute').value); //parseInt para garantir que é um número
    if (isNaN(chute) || chute < 1 || chute > numMaxSorteado) {
        exibirTextoNaTela('paragrafo', 'Por favor, digite um número válido entre 1 e ' + numMaxSorteado);
        return;
    }

    if (chute === numSecreto) {
        let palavraTentativa = tentativas === 1 ? 'tentativa' : 'tentativas';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('titulo', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numSecreto) {
            exibirTextoNaTela('paragrafo', 'O número secreto é menor que o chute ' + chute);
        } else {
            exibirTextoNaTela('paragrafo', 'O número é maior que o chute ' + chute);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumAleatorio() {
    if (listaDeNumerosSorteados.length >= numMaxSorteado) {
        listaDeNumerosSorteados = [];
    }
    do {
        var numeroEscolhido = Math.floor(Math.random() * numMaxSorteado) + 1;
    } while (listaDeNumerosSorteados.includes(numeroEscolhido));
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
}

function limparCampo() {
    document.getElementById('chute').value = '';
}

function reiniciarJogo() {
    listaDeNumerosSorteados = [];
    numSecreto = gerarNumAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);