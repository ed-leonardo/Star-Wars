import React, { useState } from 'react';
import logo from '../assets/logo.svg'
import './Results.css'
import { Link } from 'react-router-dom'
import { getUrl } from '../services/Utilities'

export default function Results ({ responseGet, onClick }) {
  const [world, setWorld] = useState(null);

  function handleDta() {
    let result = []
    for (const key in responseGet) {
      if (Array.isArray(responseGet[key])) {
        result.push(<li>{key}:</li>)
        result.push(<ul>{makeResult(responseGet[key])} </ul>);
        continue;
      }
      else if (key === 'homeworld') {
        result.push(<li>{key}: <Link onClick={() => showWorld(responseGet[key])}>Clique aqui para saber mais sobre o planeta!
          </Link>
        </li>)
      }
      else {
        (responseGet[key].includes('http')) ? 
          (result.push(<li>{key}: <a href={responseGet[key]} target="_blank">{responseGet[key]}
            </a>
          </li>)) 
          :
          result.push(<li>{key}: {responseGet[key]}</li>)
      }
    }
      
    return result
  }
  
  async function showWorld(url) {
    setWorld(await getUrl(url));
  }
  
  function makeResult(resultado) {
    let result = [];
    for (const key in resultado) {
      (resultado[key].includes('http')) ? 
        (result.push(<li><a href={resultado[key]} target="_blank">{resultado[key]}
          </a>
        </li>)) 
        :
        result.push(<li>{resultado[key]}</li>)
      }
    
    return result
  }

  function renderWorld(planet) {
    let result = [];
    for (const key in planet) {
      if (key !== '0') result.push(<li>{planet[key]}</li>);
    }
    return result;
  }

  return (
    <div>
      {
        world === null && (
          <div className="results-container">
            <img src={logo} alt="Star Wars" />
            <ul>
              {
                handleDta()
              }
            </ul>
            <button className="back" type="button" onClick={onClick}>VOLTAR</button>
          </div>
      )}
      {
        world && (
          <div className="world-container">
            <img src={logo} alt="Star Wars" />
            <strong> Planet: {world[0]} </strong>
            <h2> Residentes</h2>
            <ul>
              {
                renderWorld(world)
              }
            </ul>
            <button className="back" type="button" onClick={() => setWorld(null)}>FECHAR</button>
          </div>
      )}
    </div>
  );
}