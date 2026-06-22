// Securely loaded from .env
const API_TOKEN = process.env.EXPO_PUBLIC_APIFOOTBALL_TOKEN; 

// The new API-Football base URL
const BASE_URL = 'https://v3.football.api-sports.io';

export const fetchPlayerList = async () => {
    if (!API_TOKEN) {
        console.error("API Token is missing. Check your .env file.");
        return [];
    }

    try {
        // Fetching the current squad for Team 33.
        // The token is passed securely in the headers, not the URL.
        const response = await fetch(`${BASE_URL}/players/squads?team=33`, {
        method: 'GET',
        headers: {
            'x-apisports-key': API_TOKEN
        }
        });
        
        const data = await response.json();
        
        // Safety check matching API-Football's payload structure
        if (!data || !data.response || !Array.isArray(data.response) || data.response.length === 0) {
        console.error("API Error or no data returned:", data.errors || "Unknown error");
        return [];
        }
        
        // API-Football nests the entire squad array inside the first response object
        const squad = data.response[0].players;

        return squad.map((player: any) => ({
        PLAYER_ID: player.id,
        FULL_NAME: player.name || 'Unknown',
        POSITION: player.position || 'Unknown',
        IMAGE_URL: player.photo || '',
        // The squads endpoint rarely returns nationality directly, but we map it just in case
        NATIONALITY: player.nationality || 'N/A', 
        }));

    } catch (error) {
        console.error("Network error fetching player data:", error);
        return [];
    }
};