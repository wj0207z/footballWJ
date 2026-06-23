import { Image, StyleSheet, Text, View } from 'react-native';

// The 'route' prop is passed automatically by React Navigation
export default function ProfileScreen({ route }: any) {
  // Extract the specific player data that was passed from the card
    const { player } = route.params;

    return (
        <View style={styles.container}>
        <Image source={{ uri: player.IMAGE_URL }} style={styles.headshot} />
        <Text style={styles.nameText}>{player.FULL_NAME}</Text>
        
        <View style={styles.statsCard}>
            <Text style={styles.detailText}>Player ID: {player.PLAYER_ID}</Text>
            <Text style={styles.detailText}>Position: {player.POSITION}</Text>
            <Text style={styles.detailText}>Nationality: {player.NATIONALITY}</Text>
        </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingTop: 40,
    },
    headshot: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#e0e0e0',
        marginBottom: 20,
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    statsCard: {
        backgroundColor: '#fff',
        width: '90%',
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    detailText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
});