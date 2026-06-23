import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, SectionList, StyleSheet, Text, TextInput, View } from 'react-native';
import { fetchPlayerList } from './api';
import PlayerCard from './PlayerCard';
import { ThemeContext } from './ThemeContext';

export default function HomeScreen() {
    const { theme } = useContext(ThemeContext);
    
    const [originalSections, setOriginalSections] = useState<any[]>([]);
    const [filteredSections, setFilteredSections] = useState<any[]>([]);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
        const data = await fetchPlayerList();
        setOriginalSections(data);
        setFilteredSections(data);
        setLoading(false);
        };
        loadData();
    }, []);

    // Updated Search Logic for Nested Data
    const handleSearch = (text: string) => {
        setSearchQuery(text);
        
        if (text === '') {
        setFilteredSections(originalSections);
        return;
        }
        
        const lowerCaseSearch = text.toLowerCase();
        
        // Map through each section, filter the players inside,
        // and then remove sections that end up completely empty.
        const filtered = originalSections.map(section => ({
        ...section,
        data: section.data.filter((player: any) =>
            player.FULL_NAME.toLowerCase().includes(lowerCaseSearch)
        )
        })).filter(section => section.data.length > 0);
        
        setFilteredSections(filtered);
    };

    const renderItem = ({ item }: { item: any }) => (
        <PlayerCard playerData={item} />
    );

    // New function to draw the bold category headers
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
            <ActivityIndicator size="large" color="#0000ff" />
            </View>
        ) : filteredSections.length > 0 ? (
            // Swapped FlatList for SectionList!
            <SectionList
            sections={filteredSections}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item) => item.PLAYER_ID.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            stickySectionHeadersEnabled={true} // Creates the nice native iOS push effect
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