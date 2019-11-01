const axios = require('axios');

export async function getPerson(props) {
    const response = await axios.get('https://swapi.co/api/people/');
    const personagem = response.data.results.find(parameter => {
        return parameter.name.toLowerCase().includes(props.toLowerCase())
    })
    return personagem;

}

export async function getUrl(url) {
    const response = await axios.get(url);
    const residents = response.data.residents;
    const result =[];
    result.push(response.data.name);
    for (const key in residents) {
        const response = await axios.get(residents[key]);
        result.push(response.data.name);
    }
    return result
    

}


