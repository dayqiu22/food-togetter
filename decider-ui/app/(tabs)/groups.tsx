import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';

interface Group {
  id: string;
  name: string;
}

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([
    { id: '1', name: 'Group with Alice and Bob' },
    { id: '2', name: 'Family Chat' },
  ]);
  const router = useRouter();

  const renderGroup = ({ item }: { item: Group }) => (
    <CustomButton
      title={item.name}
      onPress={() => router.push(`/${item.id}`)}
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
});
