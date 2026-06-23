const API_KEY = process.env.EXPO_PUBLIC_SPORTSDB_API_KEY || '3';
const BASE_URL = 'https://www.thesportsdb.com/api/v1/json';

export const fetchPlayerList = async () => {
    try {
        const MAIN_TEAM_ID = '133612';
        const U21_TEAM_ID = '140199';
        const YOUTH_TEAM_ID = '147970'; // Example youth team ID, replace with actual if available

        const [mainResponse, u21Response, youthResponse] = await Promise.all([
            fetch(`${BASE_URL}/${API_KEY}/lookup_all_players.php?id=${MAIN_TEAM_ID}`),
            fetch(`${BASE_URL}/${API_KEY}/lookup_all_players.php?id=${U21_TEAM_ID}`),
            fetch(`${BASE_URL}/${API_KEY}/lookup_all_players.php?id=${YOUTH_TEAM_ID}`)
        ]);

        const mainData = await mainResponse.json();
        const u21Data = await u21Response.json();
        const youthData = await youthResponse.json(); 
        // Format helper function to keep code clean
        const formatPlayers = (playersArray: any[]) => {
            if (!playersArray) return [];

            return playersArray
                .filter((player: any) => {
                    const position = player.strPosition ? player.strPosition.toLowerCase() : '';
                    return !position.includes('assistant coach'); // Exclude assistant coaches
                })
                .map((player: any) => ({
                    PLAYER_ID: player.idPlayer,
                    FULL_NAME: player.strPlayer || 'Unknown',
                    POSITION: player.strPosition || 'Unknown',
                    IMAGE_URL: player.strCutout || player.strThumb || '',
                    NATIONALITY: player.strNationality || 'N/A',
            }));
        };

        // THIS is the exact structure a SectionList requires:
        // An array of objects, where each object has a "title" and a "data" array.
        return [
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