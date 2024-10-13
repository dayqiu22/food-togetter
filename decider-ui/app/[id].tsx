import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import usersData from '../mock-data/users.json'; // Import user data
import groupsData from '../mock-data/groups.json'; // Import groups data
import { CuisineType, PriceRange } from '../mock-data/categories'; // Adjust the path as needed

// Updated structure of a Group
interface Group {
  title: string;
  date: string;
  members: number[];
  accepted: number[];
  owner: number;
  "user-preferences": {
    [key: number]: {
      cuisine: CuisineType; // Use CuisineType enum
      "price-range": PriceRange; // Use PriceRange enum
    };
  };
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

  // Fetch the group data based on the ID
  useEffect(() => {
    const selectedGroup = groupsData.find((group) => group.owner === parseInt(id)); // Adjust based on your data
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
