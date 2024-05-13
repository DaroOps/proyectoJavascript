import { eventBus, env } from "../../global.js";

const url = `https://${env.RAPID_API_HOST}/search/`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${env.RAPID_API_KEY}`,
		'X-RapidAPI-Host': `${env.RAPID_API_HOST}`
	}
};

export const getSearch = async (query) => {
    let searchQuery = `?q=${query}=albums&limit=4&numberOfTopResults=4`
    try {
      const response = await fetch(url+searchQuery, options);
      const data = await response.json();
      eventBus.publish('dataReceived', data);
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
}