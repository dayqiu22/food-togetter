import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import groupsData from '../../mock-data/groups.json';
import usersData from '../../mock-data/users.json'; // Import user data
import { CuisineType, PriceRange, CurrentStatus } from '../../mock-data/categories'; // Adjust the path as necessary

interface UserPreference {
    cuisine: CuisineType;
    'price-range': PriceRange;
}

interface Group {
    title: string;
    date: string;
    members: { [key: string]: CurrentStatus }[]; // Members now includes user IDs mapped to status
    owner: number;
    'user-preferences': { [key: string]: UserPreference };
    result: string;
}

interface User {
    id: number;
    name: string;
}

const Groups = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const router = useRouter();

    useEffect(() => {
        const transformedGroups: Group[] = groupsData.map((group: any) => ({
            ...group,
            members: group.members.map((member: { [key: string]: string }) => {
                const memberId = Object.keys(member)[0];
                const status = member[memberId];
                return {
                    [memberId]: status as CurrentStatus,
                };
            }),
            'user-preferences': Object.entries(group['user-preferences']).reduce(
                (acc: { [key: string]: UserPreference }, [key, value]: [string, any]) => {
                    acc[key] = {
                        cuisine: value.cuisine as CuisineType,
                        'price-range': value['price-range'] as PriceRange,
                    };
                    return acc;
                },
                {}
            ),
        }));

        setGroups(transformedGroups);
    }, []);

    const renderGroup = ({ item }: { item: Group }) => (
        <View style={styles.groupContainer}>
            <CustomButton
                title={item.title}
                onPress={() => router.push(`/${item.owner}`)} // Navigate to the group owner ID
                containerStyles='bg-[#0C3B2E]'
            />
            {/* <FlatList
                data={item.members}
                keyExtractor={(member) => Object.keys(member)[0]} // Use member ID as key
                renderItem={({ item: member }) => {
                    const memberId = Object.keys(member)[0];
                    const user: User | undefined = usersData.find((user) => user.id === parseInt(memberId));
                    const status = member[memberId];
                    return (
                        <Text style={styles.memberText}>
                            {user ? `${user.name}: ${status}` : `Unknown user: ${status}`}
                        </Text>
                    );
                }}
            /> */}
        </View>
    );

    return (
        <View style={styles.container}>
            {groups.length === 0 ? (
                <Text style={styles.emptyStateText}>Add friends to begin!</Text>
            ) : (
                <FlatList
                    data={groups}
                    renderItem={renderGroup}
                    keyExtractor={(item) => item.title}
                />
            )}
        </View>
    );
};

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
    groupContainer: {
        marginBottom: 20,
    },
    memberText: {
        fontSize: 16,
        color: 'black',
    },
});
