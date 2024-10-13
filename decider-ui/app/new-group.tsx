import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import React, { useState } from 'react';
import { styled } from 'nativewind';
import MainContent from '@/components/MainContent';
import usersData from '../mock-data/users.json';

const { width, height } = Dimensions.get('window');

const NewGroup = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(usersData);

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    const filteredData = usersData.filter((user: { name: string }) => user.name.toLowerCase().includes(text.toLowerCase()));
    setFilteredUsers(filteredData);
  };

  return (
    <MainContent>
      <View style={styles.container}>
        <Text style={styles.title}>New Group</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      <View>
        {filteredUsers.map(user => (
          <Text key={user.id}>{user.name}</Text>
        ))}
      </View>
      </View>
    </MainContent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Aligns items at the top
    alignItems: 'center',
    paddingTop: height * 0.07, // 7% of screen height
  },
  title: {
    fontSize: width * 0.05, // 5% of screen width
    fontWeight: 'bold',
    marginBottom: 20, // Adds space between title and search bar
  },
  searchBar: {
    height: 40,
    width: width * 0.9, // 90% of screen width
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default NewGroup;