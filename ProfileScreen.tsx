import { Ionicons } from '@expo/vector-icons'; // 1. Import the Icon library
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from './ThemeContext';
import { fetchPlayerDetails } from './api';

export default function ProfileScreen({ route }: any) {
    const { player } = route.params; 
    const { theme } = useContext(ThemeContext);

    const [details, setDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDetails = async () => {
        const fullData = await fetchPlayerDetails(player.PLAYER_ID);
        setDetails(fullData);
        setLoading(false);
        };
        
        loadDetails();
    }, [player.PLAYER_ID]);

    // 2. The Logic for the big profile header
    const hasRealPhoto = 
        player.IMAGE_URL && 
        player.IMAGE_URL.trim() !== '' && 
        !player.IMAGE_URL.includes('placeholder.com');

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
        
        <View style={styles.header}>
            {/* 3. Conditional Rendering: Big Image OR Big Icon */}
            {hasRealPhoto ? (
            <Image 
                source={{ uri: player.IMAGE_URL }} 
                style={styles.headshot} 
                resizeMode="contain"
            />
            ) : (
            <View style={[styles.headshot, styles.iconFallback]}>
                <Ionicons name="person-circle-outline" size={160} color={theme.text} />
            </View>
            )}

            <Text style={[styles.nameText, { color: theme.text }]}>{player.FULL_NAME}</Text>
            <Text style={[styles.subText, { color: 'gray' }]}>{player.POSITION}</Text>
        </View>

        {loading ? (
            <ActivityIndicator size="large" color="#D50032" style={styles.loader} />
        ) : (
            <View style={styles.content}>
            
            <View style={[styles.statsCard, { backgroundColor: theme.card }]}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Player Profile</Text>
                
                <View style={styles.statRow}>
                <Text style={[styles.statLabel, { color: theme.text }]}>Nationality:</Text>
                <Text style={[styles.statValue, { color: theme.text }]}>{details?.strNationality || player.NATIONALITY}</Text>
                </View>
                
                <View style={styles.statRow}>
                <Text style={[styles.statLabel, { color: theme.text }]}>Date of Birth:</Text>
                <Text style={[styles.statValue, { color: theme.text }]}>{details?.dateBorn || 'N/A'}</Text>
                </View>

                <View style={styles.statRow}>
                <Text style={[styles.statLabel, { color: theme.text }]}>Birthplace:</Text>
                <Text style={[styles.statValue, { color: theme.text }]}>{details?.strBirthLocation || 'N/A'}</Text>
                </View>

                <View style={styles.statRow}>
                <Text style={[styles.statLabel, { color: theme.text }]}>Height:</Text>
                <Text style={[styles.statValue, { color: theme.text }]}>{details?.strHeight || 'N/A'}</Text>
                </View>

                <View style={styles.statRow}>
                <Text style={[styles.statLabel, { color: theme.text }]}>Weight:</Text>
                <Text style={[styles.statValue, { color: theme.text }]}>{details?.strWeight || 'N/A'}</Text>
                </View>
            </View>

            {details?.strDescriptionEN && (
                <View style={[styles.bioCard, { backgroundColor: theme.card }]}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Biography</Text>
                <Text style={[styles.bioText, { color: theme.text }]}>
                    {details.strDescriptionEN}
                </Text>
                </View>
            )}

            </View>
        )}
        </ScrollView>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { alignItems: 'center', paddingTop: 30, paddingBottom: 20 },
    headshot: { width: 180, height: 180, marginBottom: 15 },
    // Center the big icon
    iconFallback: { justifyContent: 'center', alignItems: 'center', opacity: 0.5 },
    nameText: { fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
    subText: { fontSize: 18, marginTop: 5 },
    loader: { marginTop: 50 },
    content: { paddingHorizontal: 20, paddingBottom: 40 },
    statsCard: { padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 5 },
    statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    statLabel: { fontSize: 16, fontWeight: '600', opacity: 0.8 },
    statValue: { fontSize: 16, flexShrink: 1, textAlign: 'right', marginLeft: 15 },
    bioCard: { padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    bioText: { fontSize: 15, lineHeight: 24 }
});