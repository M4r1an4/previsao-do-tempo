import React, { useState, useEffect } from 'react';
//import {format} from 'date-fns'
import './App.css';


//App de previsão do tempo
function App() {
const [cidade, setCidade] = useState('')
//estado inicial de cidade é igual a string vazia
const[previsao, setPrevisao] = useState(null)
/* estado inicial de previsão é igual a valor nulo, ou seja, diferente de zero */
//const data = format(new Date(), 'dd/mm/aaaa')
//Date é uma biblioteca do js, importamos ela para poder mexer nos formatos de data e colocar no padrão br

const api = async () => {
  //async quer dizer que o código ´w assincrono, ou seja, pode ser carregado depois do restante do conteúdo e não há necessidade de primeiro carregar para seguir como o resto do código, é uma forma de despriorizar a função para que o sistema não lerdeie

  const chave = '3dfbc6ac607259bf51a123037c07017a'
  //chave para poder usar a api de previsão do tempo, nem sei se vai dar certo pq a proxy no sesc é bloqueada

  try{
    const response = await fetch(        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}`);
    //fetch é a função responsável por pegar o conteúdo dentro da api

    if(response.ok) {
      const data = await response.json();
      setPrevisao(data);
    } else {
      console.error('Erro ao obter os dados da previsão do tempo!');
    }
  } catch(error) {
    console.error('Erro ao fazer a requisição da API', error);
  }
}

const conversao = (kelvin) => {
  return (kelvin - 273.15).toFixed(2)
  //kelvin é o parâmetro que eu uso para converter o resultado 
  //estamos convertendo kelvin para celsius, utilizando formula matemática
  //toFixed arredonda as casas decimais para 2 casas 
}

useEffect(() => {
  api(); //executa a função api toda vez q o componente é montado(quando a cidade é chamada)
}, [])

return (
  <div className="App">
    <h1>Previsão do Tempo</h1>

    <input
    type="text"
    value={cidade}
    onChange={(e) => setCidade(e.target.value)}
    // impede a pag. de recarregar a cada mudança
     placeholder="Digite o nome da cidade"
    />

    <button onClick={api}>
      Obter Previsão do tempo 
    </button>
    {previsao && (
      <div className="info">
        {/*<p><b>Data:</b> {data}</p>*/}
        {/* se funcionasse a biblioteca 'date-fns' aqui ficaria a data no formato pt-br */}

        <h3>{previsao.weather[0].description}</h3>
         {/* propriedade do objeto 'previsao'*/}

         <b>Graus: </b> {conversao(previsao.main.temp)}°C
         <b>Vento: </b> {previsao.wind.speed}m/s
         <b>Umidade: </b> {previsao.mmin.humidity}%
   
  </div>
)
} 
</div>
)
}
  export default App;
