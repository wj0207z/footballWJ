import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type PlayerProps = {
    playerData: {
        PLAYER_ID: number;
        FULL_NAME: string;
        POSITION: string;
        IMAGE_URL: string;
        NATIONALITY: string;
    };
    };

    const PlayerCard: React.FC<PlayerProps> = ({ playerData }) => {
    return (
        <View style={styles.cardContainer}>
        <Image source={{ uri: playerData.IMAGE_URL }} style={styles.headshot} />
        <View style={styles.infoContainer}>
            <Text style={styles.nameText}>{playerData.FULL_NAME}</Text>
            <Text style={styles.detailText}>Position: {playerData.POSITION}</Text>
            <Text style={styles.detailText}>Nationality: {playerData.NATIONALITY}</Text>
        </View>
        </View>
    );
    };

    const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headshot: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f0f0f0',
    },
    infoContainer: {
        marginLeft: 16,
        flex: 1,
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    detailText: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
});

export default PlayerCard;