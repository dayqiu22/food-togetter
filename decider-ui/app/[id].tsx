import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import usersData from '../mock-data/users.json'; // Import user data
import groupsData from '../mock-data/groups.json'; // Import groups data
import { CuisineType, PriceRange, CurrentStatus } from '../mock-data/categories'; // Adjust the path as needed

interface UserPreference {
    cuisine: CuisineType;
    'price-range': PriceRange;
}

interface Group {
    title: string;
    date: string;
    members: { [key: string]: CurrentStatus }[];
    owner: number;
    'user-preferences': { [key: string]: UserPreference };
    result: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

const Status = () => {
    const { id } = useLocalSearchParams<{ id: string }>(); // Access the route parameter
    const [group, setGroup] = useState<Group | null>(null);
    const [members, setMembers] = useState<{ name: string; status: CurrentStatus }[]>([]); // Track both names and statuses
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ title: 'Group Status' });

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

        const selectedGroup = transformedGroups.find((group) => group.owner === parseInt(id));
        setGroup(selectedGroup || null);

        if (selectedGroup) {
            const memberDetails = selectedGroup.members.map((member: { [key: string]: CurrentStatus }) => {
                const memberId = Object.keys(member)[0];
                const user: User | undefined = usersData.find((user) => user.id === parseInt(memberId));
                return {
                    name: user ? user.name : 'Unknown',
                    status: member[memberId],
                };
            });
            setMembers(memberDetails);
        }
    }, [id]);

    

    // const findPlace = async () => {
    //     try {
    //       const response = await fetch(`http://10.0.2.2:3000/food-search?cuisine=Chinese&priceRange=${encodeURIComponent('$10-20')}`);
    //       const data = await response.json();
          
    //       if (data.candidates && data.candidates.length > 0) {
    //         setPlaces(data.candidates);
    //       } else {
    //         setPlaces([]); // Clear places if no results
    //       }
    //     } catch (error) {
    //       console.error('Error fetching places:', error);
    //     }
    // }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Group ID: {id}</Text>
            {members.length > 0 ? (
                <FlatList
                    data={members}
                    renderItem={({ item }) => (
                        <Text style={styles.memberName}>
                            {item.name}: {item.status}
                        </Text>
                    )}
                    keyExtractor={(item) => item.name}
                />
            ) : (
                <Text>No members found for this group.</Text>
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
