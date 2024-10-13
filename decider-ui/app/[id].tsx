import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import usersData from '../mock-data/users.json'; // Import user data
import groupsData from '../mock-data/groups.json'; // Import groups data
import { CuisineType, PriceRange, CurrentStatus } from '../mock-data/categories'; // Adjust the path as needed
import Place from '@/models/place';

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
    const [members, setMembers] = useState<{ name: string; status: CurrentStatus; cuisine?: string; priceRange?: string }[]>([]);
    const navigation = useNavigation();
    const [places, setPlaces] = useState<Place[]>([]);

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
                const status = member[memberId];

                // If status is "Accepted", add cuisine and price-range
                const preference = status === CurrentStatus.Accepted
                    ? selectedGroup['user-preferences'][memberId]
                    : null;

                return {
                    name: user ? user.name : 'Unknown',
                    status,
                    cuisine: preference ? preference.cuisine : undefined,
                    priceRange: preference ? preference['price-range'] : undefined,
                };
            });
            setMembers(memberDetails);
        }
    }, [id]);

    

    const findPlace = async () => {
        try {
          const response = await fetch(`http://10.0.2.2:3000/food-search?cuisine=Korean&priceRange=${encodeURIComponent('$30-45')}`);
          const data = await response.json();
          
          if (data.candidates && data.candidates.length > 0) {
            setPlaces(data.candidates);
          } else {
            setPlaces([]); // Clear places if no results
          }
        } catch (error) {
          console.error('Error fetching places:', error);
        }
    }

    useEffect(() => {
        if (id == '5') findPlace();
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Group ID: {id}</Text>
            {members.length > 0 ? (
                <FlatList
                    data={members}
                    renderItem={({ item }) => (
                        <View style={styles.memberContainer}>
                            <Text style={styles.memberName}>
                                {item.name}: {item.status}
                            </Text>
                            {item.status === CurrentStatus.Accepted && (
                                <Text style={styles.memberPreference}>
                                    Cuisine: {item.cuisine}, Price Range: {item.priceRange}
                                </Text>
                            )}
                        </View>
                    )}
                    keyExtractor={(item) => item.name}
                />
            ) : (
                <Text>No members found for this group.</Text>
            )}
            {id == '5' ? (
                <>
                    <Text className='font-bold text-lg'>
                        Recommended restaurant for the group:
                    </Text>
                    <FlatList
                        data={places}
                        keyExtractor={(item) => item.place_id}
                        renderItem={({ item }) => (
                        <View style={{ padding: 10, borderBottomWidth: 1 }}>
                            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                            <Text>{item.formatted_address}</Text>
                        </View>
                        )}
                    />
                </>
            ) : (
                <Text>Waiting for friends to submit preferences...</Text>
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
    memberContainer: {
        marginVertical: 10,
    },
    memberName: {
        fontSize: 18,
    },
    memberPreference: {
        fontSize: 16,
        color: 'gray',
    },
});
