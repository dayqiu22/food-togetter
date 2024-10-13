import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import usersData from '../mock-data/users.json'; // Import user data
import groupsData from '../mock-data/groups.json'; // Import groups data
import { CuisineType, PriceRange } from '../mock-data/categories'; // Adjust the path as needed

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

interface User {
    id: number;
    name: string;
    email: string;
}

const Status = () => {
    const { id } = useLocalSearchParams<{ id: string }>(); // Access the route parameter
    const [group, setGroup] = useState<Group | null>(null); // Initialize group state
    const [members, setMembers] = useState<string[]>([]); // Initialize members state

    // Fetch and transform the group data based on the ID
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

        const selectedGroup = transformedGroups.find((group) => group.owner === parseInt(id)); // Find the group by owner ID
        setGroup(selectedGroup || null);

        if (selectedGroup) {
            const memberNames = selectedGroup.members.map((memberId: number) => {
                const user: User | undefined = usersData.find((user) => user.id === memberId);
                return user ? user.name : ''; // Get the member's name
            });
            setMembers(memberNames); // Set the members state
        }
    }, [id]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Group ID: {id}</Text>
            {members.length > 0 ? (
                <FlatList
                    data={members}
                    renderItem={({ item }) => <Text style={styles.memberName}>{item}</Text>} // Display member names
                    keyExtractor={(item) => item} // Use member name as key
                />
            ) : (
                <Text>No members found for this group.</Text> // Handle case where no members exist
            )}
        </View>
    );
};

export default Status;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    memberName: {
        fontSize: 18,
        marginVertical: 5,
    },
});