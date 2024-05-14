import {env} from "../../global.js";

const url = `https://${env.RAPID_API_HOST}/recommendations/?limit=10&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry`;

export const getAlbumsTracks = async (ids) => {
    const options = {
        method: 'GET',
        params: {
            ids: ids
        },
        headers: {
            'X-RapidAPI-Key': `${env.RAPID_API_KEY}`,
            'X-RapidAPI-Host': `${env.RAPID_API_HOST}`
        }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data.albums;
    } catch (error) {
      console.error('Error:', error);
    }
}