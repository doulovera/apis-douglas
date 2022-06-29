const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || null;

const getRapidApi = async (API_URL: string) => {
  if (!RAPIDAPI_KEY) throw new Error('RAPIDAPI_KEY is not defined');
  try {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
      },
    };
  
    const response = await fetch(API_URL, options);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const data = await response.json();
    return data;

  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export default getRapidApi;
