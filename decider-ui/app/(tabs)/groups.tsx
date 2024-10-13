import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import groupsData from '../../mock-data/groups.json'; // Adjust the path to groups.json
import { CuisineType, PriceRange } from '../../mock-data/categories'; // Adjust the path to categories


interface Group {
  title: string;
  date: string;
  members: number[];
  accepted: number[];
  owner: number;
  "user-preferences": {
    [key: string]: {
      cuisine: CuisineType;
      "price-range": PriceRange;
    };
  };
}

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>(groupsData); // Load initial groups from JSON
  const router = useRouter();

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
});
