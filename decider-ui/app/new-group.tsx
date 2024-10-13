import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import React, { useState } from 'react';

const { width, height } = Dimensions.get('window');

const NewGroup = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Group</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
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