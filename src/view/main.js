import React, { useState } from 'react'
import Search from './Search';
import { getPerson } from '../services/Utilities'
import Results from './Results';

export default function Main() {

    const [view, setView] = useState({
        search: true,
        result: false
    })
    async function handleSubmit(e) {
        e.preventDefault();
        if (personagem.length > 2) {
            const response = await getPerson(personagem)
            setResponseGet(response);
            console.log(response)

            if (response !== undefined) {
                setView({
                    result: true,
                    search: false,
                })
            }
        }
    }

    function setarPersonagem(props) {
        setPersonagem(props);
    }

    const [personagem, setPersonagem] = useState('');
    const [responseGet, setResponseGet] = useState([]);
    return (
        <>

            {view.search && <Search handleSubmit={handleSubmit} setarPersonagem={setarPersonagem} />}
            {view.result && <Results responseGet={responseGet} />}

        </>
    );
}