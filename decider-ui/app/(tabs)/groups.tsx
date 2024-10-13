import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';

// Define the type for the group item
interface Group {
  id: string;
  name: string;
}

const Groups = () => {
  // Example data for groups (can be an empty array initially)
  const [groups, setGroups] = useState([
    { id: '1', name: 'Group with Alice and Bob' },
    { id: '2', name: 'Family Chat' },
    // Add more groups or keep empty for the empty state
  ]);

  // Function to render each group item
  const renderGroup = ({ item }: { item: Group }) => (
    <View style={styles.groupItem}>
      <Text style={styles.groupText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {groups.length === 0 ? (
        // Empty state when there are no groups
        <Text style={styles.emptyStateText}>Add friends to begin!</Text>
      ) : (
        // List of groups when groups are available
        <FlatList
          data={groups}
          renderItem={renderGroup}
          keyExtractor={item => item.id}
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
  groupItem: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    marginVertical: 5,
  },
  groupText: {
    fontSize: 16,
  },
});
