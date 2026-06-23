import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import PlayerCard from './PlayerCard';
import { fetchPlayerList } from './api';

export default function HomeScreen() {
    const [players, setPlayers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
        const data = await fetchPlayerList();
        setPlayers(data);
        setLoading(false);
        };

        loadData();
    }, []);

    const renderItem = ({ item }: { item: any }) => (
        <PlayerCard playerData={item} />
    );

    return (
        <View style={styles.container}>
        {loading ? (
            <View style={styles.center}>
            <ActivityIndicator size="large" color="#0000ff" />
            </View>
        ) : players.length > 0 ? (
            <FlatList
            data={players}
            renderItem={renderItem}
            keyExtractor={(item) => item.PLAYER_ID.toString()} 
            contentContainerStyle={{ paddingBottom: 20 }} 
            />
        ) : (
            <View style={styles.center}>
            <Text>No players found.</Text>
            </View>
        )}
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});