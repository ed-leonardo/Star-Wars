const axios = require('axios');

export async function getPerson(props) {
  let response = await axios.get('https://swapi.dev/api/people/');
  let personagem = response.data.results.find(parameter => {
    return parameter.name.toLowerCase().includes(props.toLowerCase())
  })
  console.log(personagem)
  
  while (personagem === undefined && response.data.next !== null) {
    console.log(personagem)
    response = await axios.get(response.data.next);
    personagem = response.data.results.find(parameter => {
      return parameter.name.toLowerCase().includes(props.toLowerCase())
    })
  } ;
  
  
  return personagem;
}

export async function getUrl(url) {
  const response = await axios.get(url);
  const residents = response.data.residents;
  const result =[];
  result.push(response.data.name)
	
	for (const key in residents) {
    const response = await axios.get(residents[key]);
    result.push(response.data.name);
	}
	
  return result
}
