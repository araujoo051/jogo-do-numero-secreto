let listaDeNumSorteados = [];
let numLimite = 10
let numeroSecreto = gerarNum();
let tentativas = 1

function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
};

function resetTexto(){
    exibirTexto('h1', "Jogo do número secreto")
    exibirTexto('p', "Escolha um número de 1 a 10.")
}

resetTexto();


function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTexto('h1', 'Parabéns!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if (chute < numeroSecreto) {
            exibirTexto('h1', 'Você errou!')
            exibirTexto('p', 'O número secreto é maior que ' + chute)
        }
        else {
            exibirTexto('h1', 'Você errou!')
            exibirTexto('p', 'O número secreto é menor que ' + chute)
        }
        tentativas++
        limparCampo();
    }
    
};

function gerarNum(){
    let numeroEscolhido = parseInt(Math.random() * numLimite + 1);
    let qntdNumEscolhidos = listaDeNumSorteados.length;
    if (qntdNumEscolhidos == numLimite) {
        listaDeNumSorteados = [];
    }
    if (listaDeNumSorteados.includes(numeroEscolhido)) {
        return gerarNum();
    } else {
        listaDeNumSorteados.push(numeroEscolhido)
        return numeroEscolhido;
    }
};

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo(){
    numeroSecreto = gerarNum();
    limparCampo();
    tentativas = 1;
    resetTexto();
    document.getElementById('reiniciar').setAttribute('disabled'), true;
}