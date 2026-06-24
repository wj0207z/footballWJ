import React, { useContext, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    SectionList,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { fetchPlayerList } from './api';
import PlayerCard from './PlayerCard';
import { ThemeContext } from './ThemeContext';

    export default function HomeScreen() {
    const { theme } = useContext(ThemeContext);
    
    const [originalSections, setOriginalSections] = useState<any[]>([]);
    const [filteredSections, setFilteredSections] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchPlayerList();
            
            // Safety check: ensure data is an array
            if (data && Array.isArray(data)) {
            setOriginalSections(data);
            setFilteredSections(data);
            } else {
            throw new Error("Invalid data format received from API");
            }
        } catch (err) {
            console.error("HomeScreen Error:", err);
            setError("Failed to load players. Please try again.");
        } finally {
            setLoading(false);
        }
        };
        loadData();
    }, []);

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        if (text === '') {
        setFilteredSections(originalSections);
        return;
        }
        
        const lowerCaseSearch = text.toLowerCase();
        const filtered = originalSections.map(section => ({
        ...section,
        data: section.data.filter((player: any) =>
            player.FULL_NAME?.toLowerCase().includes(lowerCaseSearch)
        )
        })).filter(section => section.data.length > 0);
        
        setFilteredSections(filtered);
    };

    const renderItem = ({ item }: { item: any }) => (
        <PlayerCard playerData={item} />
    );

    const renderSectionHeader = ({ section: { title } }: any) => (
        <View style={[styles.headerContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.headerText, { color: theme.text }]}>{title}</Text>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
        
        <View style={[styles.searchContainer, { backgroundColor: theme.card }]}>
            <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search for a player..."
            placeholderTextColor="gray"
            value={searchQuery}
            onChangeText={handleSearch}
            clearButtonMode="always"
            />
        </View>

        {loading ? (
            <View style={styles.center}>
            <ActivityIndicator size="large" color="#D50032" />
            </View>
        ) : error ? (
            <View style={styles.center}>
            <Text style={{ color: theme.text }}>{error}</Text>
            </View>
        ) : filteredSections.length > 0 ? (
            <SectionList
            sections={filteredSections}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item) => item.PLAYER_ID?.toString() || Math.random().toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            stickySectionHeadersEnabled={true}
            />
        ) : (
            <View style={styles.center}>
            <Text style={{ color: theme.text }}>No players match your search.</Text>
            </View>
        )}
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    searchContainer: {
        padding: 10,
        margin: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    searchInput: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    headerContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});