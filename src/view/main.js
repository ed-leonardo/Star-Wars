import React, { useState } from 'react'
import Search from './Search';
import { getPerson } from '../services/Utilities'
import Results from './Results';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Main() {
  const [activeView, setActiveView] = useState('Search')
  const [personagem, setPersonagem] = useState('')
  const [responseGet, setResponseGet] = useState([])
  
  async function handleSubmit(e) {
    e.preventDefault();
    if (personagem.length < 3) {
      toast.warn('Digite ao menos três letras')
      return 
    }

    const response = await getPerson(personagem)
    setResponseGet(response);
      
    if (response !== undefined) {
      setActiveView('Result')
      return
    }
      
    toast.error('Personagem não encontrado!')
  }

  function setarPersonagem(props) {
    setPersonagem(props);
  }
  
  return (
    <>
      {
        activeView === 'Search' ?
          <Search handleSubmit={handleSubmit} setarPersonagem={setarPersonagem} />
          :
          <Results responseGet={responseGet} onClick={() => setActiveView('Search')} />
      }
      <ToastContainer />
      
    </>
  );
}