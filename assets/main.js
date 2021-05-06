"use strict"

const botaoConverter = document.getElementById("btnConverter");
const resultado = document.getElementById("btnResult");
resultado.disabled = true;
botaoConverter.addEventListener("click", converteMoeda)
function converteMoeda() {

    const moedaEntrada = document.getElementById("selectEntrada").value;
    const moedaSaida = document.getElementById("selectSaida").value;
    const valor = document.getElementById("valorInserido").value;
    
    let conversao = 0;

    if (moedaEntrada === moedaSaida) {
        exibeResultado(moedaSaida, valor)
    }
    else {
        fetch(`http://economia.awesomeapi.com.br/json/last/${moedaEntrada}-${moedaSaida}`)
            .then(T => T.json())
            .then(resposta => {
                for (const cotacoes in resposta) {
                    if (resposta.hasOwnProperty.call(resposta, cotacoes)) {
                        const cotacao = resposta[cotacoes];
                        conversao = (parseFloat(valor) * parseFloat(cotacao.ask)).toFixed(2);
                        console.log(conversao)
                        exibeResultado(moedaSaida, conversao);
                    }
                }
            }
            )
    }
}

function exibeResultado(tipoDeMoeda, valor) {
    const resultado = document.getElementById("btnResult");
   
    if (tipoDeMoeda == "BRL") {
        resultado.innerText = `R$${valor}`;
    } else if (tipoDeMoeda == "USD") {
        resultado.innerText = `$${valor}`;
    } else if (tipoDeMoeda == "EUR")
        resultado.innerText = `${valor}€`;

}
