import React, { useState } from 'react';
import logo from '../assets/logo.svg'
import './Results.css'
import { Link } from 'react-router-dom'
import { getUrl } from '../services/Utilities'


export default function Results(responseGet, showSearch) {

    const [world, setWorld] = useState(null);

    function handleDta() {
        let result = []
        for (const key in responseGet.responseGet) {
            if (Array.isArray(responseGet.responseGet[key])) {
                result.push(<li>{key}</li>)
                result.push(<ul>{makeResult(responseGet.responseGet[key])} </ul>);
                continue;
            }
            else if (key === 'homeworld') {
                result.push(<li>{key}: <Link onClick={() => showWorld(responseGet.responseGet[key])}>Clique aqui para saber mais sobre o planeta!
                </Link>
                </li>)
            }
            else {
                (responseGet.responseGet[key].includes('http')) ? (
                    result.push(<li>{key}: <a href={responseGet.responseGet[key]}>{responseGet.responseGet[key]}
                    </a>
                    </li>)) :
                    result.push(<li>{key}: {responseGet.responseGet[key]}</li>)
            }
        }
        return result
    }

    async function showWorld(url) {
        setWorld(await getUrl(url));

        console.log(world)
    }

    function makeResult(resultado) {
        let result = [];

        for (const key in resultado) {
            (resultado[key].includes('http')) ? (

                result.push(<li><a href={resultado[key]}>{resultado[key]}
                </a>
                </li>)) :
                result.push(<li>{resultado[key]}</li>)
        }
        return result

    }

    function renderWorld(planet) {
        let result = [];
        for (const key in planet) {
            if (key !== '0')
                result.push(<li>{planet[key]}</li>);
        }
        return result;

    }

    return (
        <div>
            {world === null && (
                <div className="results-container">
                        <img src={logo} alt="Star Wars" />
                    <ul>
                        {
                            handleDta()

                        }
                    </ul>
                </div>
            )}

            {world && (
                <div className="world-container">
                    <img src={logo} alt="Star Wars" />
                    <strong>
                        Planet: {world[0]}
                    </strong>
                    <ul>
                        {
                            renderWorld(world)

                        }

                    </ul>
                    <button type="button" onClick={() => setWorld(null)}>FECHAR</button>
                </div>
            )}
        </div>
    );
}