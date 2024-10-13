import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import usersData from '../mock-data/users.json'; // Import user data
import groupsData from '../mock-data/groups.json'; // Import groups data
import { CuisineType, PriceRange } from '../mock-data/categories'; // Import necessary enums

interface UserPreference {
    cuisine: CuisineType; // Ensure this uses the CuisineType enum
    'price-range': PriceRange; // Ensure this uses the PriceRange enum
}

interface Group {
    title: string; // Group title
    date: string; // Date of the group event
    members: { [key: number]: string }; // Updated to reflect new structure
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
    const [currentStatus, setCurrentStatus] = useState<{ name: string; status: string }[]>([]); // Initialize state for members with status

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
            const membersWithStatus = Object.entries(selectedGroup.members).map(([memberId, status]) => {
                const user: User | undefined = usersData.find((user) => user.id === parseInt(memberId));
                return user ? { name: user.name, status } : { name: 'Unknown', status }; // Create an object with name and status
            });
            setCurrentStatus(membersWithStatus); // Set the current status state
        }
    }, [id]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Group ID: {id}</Text>
            {currentStatus.length > 0 ? (
                <FlatList
                    data={currentStatus}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <Text style={styles.memberName}>{item.name}</Text>
                            <Text style={styles.status}>{item.status}</Text> {/* Wrap with Text component */}
                        </View>
                    )}
                    keyExtractor={(item) => item.name} // Use member name as key
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    memberName: {
        fontSize: 18,
        flex: 1, // Allow it to take up remaining space
    },
    status: {
        fontSize: 18,
        flex: 1,
        textAlign: 'right', // Align status text to the right
    },
});






// import { View, Text, StyleSheet, FlatList } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useLocalSearchParams } from 'expo-router';
// import usersData from '../mock-data/users.json'; // Import user data
// import groupsData from '../mock-data/groups.json'; // Import groups data
// import { CuisineType, PriceRange, CurrentStatus } from '../mock-data/categories'; // Import necessary enums

// interface UserPreference {
//     cuisine: CuisineType; // Ensure this uses the CuisineType enum
//     'price-range': PriceRange; // Ensure this uses the PriceRange enum
// }

// interface Group {
//     title: string; // Group title
//     date: string; // Date of the group event
//     members: { [key: number]: string }[]; // Updated to reflect new structure
//     owner: number; // Owner's ID
//     'user-preferences': {
//         [key: string]: UserPreference; // User preferences keyed by user ID (string)
//     };
//     result: string; // Result field, can be any type you need (string)
// }

// interface User {
//     id: number;
//     name: string;
//     email: string;
// }

// const Status = () => {
//     const { id } = useLocalSearchParams<{ id: string }>(); // Access the route parameter
//     const [group, setGroup] = useState<Group | null>(null); // Initialize group state
//     const [currentStatus, setCurrentStatus] = useState<{ name: string; status: string }[]>([]); // Initialize state for members with status

// // Fetch and transform the group data based on the ID
// useEffect(() => {
//   const transformedGroups: Group[] = groupsData.map((group: any) => ({
//       ...group,
//       'user-preferences': Object.entries(group['user-preferences']).reduce(
//           (acc: { [key: string]: UserPreference }, [key, value]: [string, any]) => {
//               acc[key] = {
//                   cuisine: value.cuisine as CuisineType, // Assert to CuisineType
//                   'price-range': value['price-range'] as PriceRange, // Assert to PriceRange
//               };
//               return acc;
//           },
//           {}
//       ),
//   }));

//   const selectedGroup = transformedGroups.find((group) => group.owner === parseInt(id)); // Find the group by owner ID
//   setGroup(selectedGroup || null);

//   if (selectedGroup) {
//       const membersWithStatus = selectedGroup.members.map((member: { [key: string]: string }) => {
//           const memberId = Object.keys(member)[0]; // Get the member ID (as a string)
//           const status = member[memberId]; // Get the corresponding status

//           const user: User | undefined = usersData.find((user) => user.id === parseInt(memberId));
//           return user ? { name: user.name, status } : { name: 'Unknown', status }; // Create an object with name and status
//       });
//       setCurrentStatus(membersWithStatus); // Set the current status state
//   }
// }, [id]);

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Group ID: {id}</Text>
//             {currentStatus.length > 0 ? (
//                 <FlatList
//                     data={currentStatus}
//                     renderItem={({ item }) => (
//                         <View style={styles.row}>
//                             <Text style={styles.memberName}>{item.name}</Text>
//                             <Text style={styles.status}>{item.status}</Text> {/* Display member name and status */}
//                         </View>
//                     )}
//                     keyExtractor={(item) => item.name} // Use member name as key
//                 />
//             ) : (
//                 <Text>No members found for this group.</Text> // Handle case where no members exist
//             )}
//         </View>
//     );
// };

// export default Status;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         padding: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     row: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '100%',
//         paddingVertical: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     memberName: {
//         fontSize: 18,
//         flex: 1, // Allow it to take up remaining space
//     },
//     status: {
//         fontSize: 18,
//         flex: 1,
//         textAlign: 'right', // Align status text to the right
//     },
// });
