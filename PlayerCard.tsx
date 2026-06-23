import { Ionicons } from '@expo/vector-icons'; // 1. Import the Icon library
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from './ThemeContext';

type PlayerProps = {
    playerData: {
        PLAYER_ID: string;
        FULL_NAME: string;
        POSITION: string;
        IMAGE_URL: string;
        NATIONALITY: string;
    };
    };

    export default function PlayerCard({ playerData }: PlayerProps) {
    const navigation = useNavigation<any>();
    const { theme } = useContext(ThemeContext);

    // 2. The Logic: Is it a real photo, or is it empty/our old placeholder?
    const hasRealPhoto = 
        playerData.IMAGE_URL && 
        playerData.IMAGE_URL.trim() !== '' && 
        !playerData.IMAGE_URL.includes('placeholder.com');

    return (
        <TouchableOpacity 
        style={[styles.cardContainer, { backgroundColor: theme.card }]}
        onPress={() => navigation.navigate('Profile', { player: playerData })}
        activeOpacity={0.7}
        >
        {/* 3. Conditional Rendering: Draw the image OR the icon */}
        {hasRealPhoto ? (
            <Image 
            source={{ uri: playerData.IMAGE_URL }} 
            style={styles.headshot} 
            resizeMode="contain" 
            />
        ) : (
            <View style={[styles.headshot, styles.iconFallback]}>
            <Ionicons name="person-circle-outline" size={80} color={theme.text} />
            </View>
        )}

        <View style={styles.infoContainer}>
            <Text style={[styles.nameText, { color: theme.text }]}>{playerData.FULL_NAME}</Text>
            <Text style={[styles.detailText, { color: theme.text }]}>Position: {playerData.POSITION}</Text>
            <Text style={[styles.detailText, { color: theme.text }]}>Nationality: {playerData.NATIONALITY}</Text>
        </View>
        </TouchableOpacity>
    );
    }

    const styles = StyleSheet.create({
    cardContainer: {
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
    },
    // New style to perfectly center the icon in the same 80x80 box
    iconFallback: {
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5, // Makes the icon look slightly faded/subtle
    },
    infoContainer: {
        marginLeft: 16,
        flex: 1,
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    detailText: {
        fontSize: 14,
        marginTop: 2,
    },
});