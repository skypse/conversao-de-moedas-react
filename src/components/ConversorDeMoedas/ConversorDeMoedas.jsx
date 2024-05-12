import React, { useState, useEffect } from 'react';

function ConversorDeMoedas() {
  const [moedas, setMoedas] = useState([]);
  const [deMoeda, setDeMoeda] = useState('USD');
  const [paraMoeda, setParaMoeda] = useState('EUR');
  const [quantidade, setQuantidade] = useState(1);
  const [resultado, setResultado] = useState(0);
  const API_KEY = '22966a870df0702931eb497b';

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${deMoeda}`)
      .then(response => response.json())
      .then(data => {
        setMoedas([...Object.keys(data.conversion_rates)]);
      })
      .catch(error => console.error('Erro ao buscar moedas:', error));
  }, [deMoeda, API_KEY]);

  const converterMoeda = () => {
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${deMoeda}/${paraMoeda}/${quantidade}`)
      .then(response => response.json())
      .then(data => {
        if (data.result === "success") {
          setResultado(parseFloat(data.conversion_result).toFixed(2));
        } else {
          console.error('Erro ao converter moeda:', data.error);
        }
      })
      .catch(error => console.error('Erro ao converter moeda:', error));
  };

  return (
    <div>
      <h2>Conversor de Moedas</h2>
      <div>
        <label>De:</label>
        <select value={deMoeda} onChange={(e) => setDeMoeda(e.target.value)}>
          {moedas.map(moeda => (
            <option key={moeda} value={moeda}>{moeda}</option>
          ))}
        </select>
        <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
      </div>
      <div>
        <label>Para:</label>
        <select value={paraMoeda} onChange={(e) => setParaMoeda(e.target.value)}>
          {moedas.map(moeda => (
            <option key={moeda} value={moeda}>{moeda}</option>
          ))}
        </select>
        <button onClick={converterMoeda}>Converter</button>
      </div>
      <div>
        <h3>Resultado:</h3>
        <p>{resultado}</p>
      </div>
    </div>
  );
}

export default ConversorDeMoedas;
