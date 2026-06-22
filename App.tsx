import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import PlayerCard from './PlayerCard';
import { fetchPlayerList } from './api';

export default function App() {
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

      // This function tells FlatList how to render each item
    const renderItem = ({ item }: { item: any }) => (
      <PlayerCard playerData={item} />
    );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : players.length > 0 ? (
          <FlatList
            data={players}
            renderItem={renderItem}
            // FlatList needs a unique string key for every item
            keyExtractor={(item) => item.PLAYER_ID.toString()} 
            // Adds a bit of padding to the bottom of the list so the last card isn't cut off
            contentContainerStyle={{ paddingBottom: 20 }} 
          />
        ) : (
          <View style={styles.center}>
            <Text>No players found.</Text>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
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