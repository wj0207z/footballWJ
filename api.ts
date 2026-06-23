const API_KEY = process.env.EXPO_PUBLIC_SPORTSDB_API_KEY || '3'; 
const BASE_URL = 'https://www.thesportsdb.com/api/v1/json';

export const fetchPlayerList = async () => {
    try {
        const MANAGER_ID = '34145649';
        const MAIN_TEAM_ID = '133612';
        const U21_TEAM_ID = '140199';
        const YOUTH_TEAM_ID = '147970';

        const [managerResponse, mainResponse, u21Response, youthResponse] = await Promise.all([
        fetch(`${BASE_URL}/${API_KEY}/lookupplayer.php?id=${MANAGER_ID}`),
        fetch(`${BASE_URL}/${API_KEY}/lookup_all_players.php?id=${MAIN_TEAM_ID}`),
        fetch(`${BASE_URL}/${API_KEY}/lookup_all_players.php?id=${U21_TEAM_ID}`),
        fetch(`${BASE_URL}/${API_KEY}/lookup_all_players.php?id=${YOUTH_TEAM_ID}`)
        ]);

        const managerData = await managerResponse.json();
        const mainData = await mainResponse.json();
        const u21Data = await u21Response.json();
        const youthData = await youthResponse.json();
        
        const formatPlayers = (playersArray: any[]) => {
        if (!playersArray) return [];
        
        return playersArray
            .filter((player: any) => {
            const position = player.strPosition ? player.strPosition.toLowerCase() : '';
            return !position.includes('assistant coach');
            })
            .map((player: any) => {
            let finalImage = player.strCutout || player.strThumb || '';
            
            if (finalImage.trim() === '') {
                finalImage = 'https://via.placeholder.com/150/1e1e1e/ffffff?text=No+Photo';
            }

            return {
                PLAYER_ID: player.idPlayer,
                FULL_NAME: player.strPlayer || 'Unknown',
                POSITION: player.strPosition || 'Unknown',
                IMAGE_URL: finalImage,
                NATIONALITY: player.strNationality || 'N/A',
            };
            });
        };

        return [
        {
            title: 'Manager',
            data: formatPlayers(managerData?.players)
        },
        {
            title: 'First Team',
            data: formatPlayers(mainData?.player)
        },
        {
            title: 'Under-21s',
            data: formatPlayers(u21Data?.player)
        },
        {
            title: 'Youth Team',
            data: formatPlayers(youthData?.player)
        }
        ];

    } catch (error) {
        console.error("Network error fetching combined player data:", error);
        return [];
    }
};

// NEW FUNCTION: Fetch deep details for a single player
export const fetchPlayerDetails = async (playerId: string) => {
    try {
        const response = await fetch(`${BASE_URL}/${API_KEY}/lookupplayer.php?id=${playerId}`);
        const data = await response.json();
        
        // THE BULLETPROOF FIX: 
        // We tell it to look for 'player' OR 'players' since the API is inconsistent!
        const playerArray = data.player || data.players;

        return playerArray ? playerArray[0] : null;

    } catch (error) {
        console.error("Error fetching detailed player data:", error);
        return null;
    }
};