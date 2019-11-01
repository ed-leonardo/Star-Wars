import React from 'react';
import logo from '../assets/logo.svg'
import './Search.css'

export default function Search({ handleSubmit, setarPersonagem}) {
   
    return (
        <div className="search-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Star Wars" />
                <input
                    placeholder="Digite o nome do personagem"
                    name="character"
                    onChange={(e) => setarPersonagem(e.target.value)} />
                <button type="submit">Buscar</button>
            </form>
        </div>
    );
}
