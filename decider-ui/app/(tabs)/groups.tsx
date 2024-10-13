import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import groupsData from '../../mock-data/groups.json'; // Adjust the path as necessary
import { CuisineType, PriceRange } from '../../mock-data/categories'; // Adjust the path as necessary
import MainContent from '@/components/MainContent';

interface UserPreference {
    cuisine: CuisineType; // Ensure this uses the CuisineType enum
    'price-range': PriceRange; // Ensure this uses the PriceRange enum
}

interface Group {
    title: string; // Group title
    date: string; // Date of the group event
    members: number[]; // Array of member IDs
    accepted: number[]; // Array of accepted member IDs
    owner: number; // Owner's ID
    'user-preferences': {
        [key: string]: UserPreference; // User preferences keyed by user ID (string)
    };
    result: string; // Result field, can be any type you need (string)
}

const Groups = () => {
    const [groups, setGroups] = useState<Group[]>([]); // Initialize with an empty array
    const router = useRouter();

    useEffect(() => {
        const transformedGroups: Group[] = groupsData.map((group: any) => ({
            ...group,
            'user-preferences': Object.entries(group['user-preferences']).reduce(
                (acc: { [key: string]: UserPreference }, [key, value]: [string, any]) => {
                    acc[key] = {
                        cuisine: value.cuisine as CuisineType, // Assert to CuisineType
                        'price-range': value['price-range'] as PriceRange, // Assert to PriceRange
                    };
                    return acc;
                },
                {}
            ),
        }));

        setGroups(transformedGroups); // Set the transformed groups
    }, []);

    const renderGroup = ({ item }: { item: Group }) => (
        <CustomButton
            title={item.title}
            onPress={() => router.push(`/${item.owner}`)} // Navigate to the group owner ID
            containerStyles='bg-[#0C3B2E]'
        />
    );

    return (
        <View style={styles.container}>
            {groups.length === 0 ? (
                <Text style={styles.emptyStateText}>Add friends to begin!</Text>
            ) : (
                <FlatList
                    data={groups}
                    renderItem={renderGroup}
                    keyExtractor={(item) => item.title} // Use title as key
                />
            )}
        </View>
    );


export default Groups;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyStateText: {
        fontSize: 18,
        color: 'gray',
    },
});
