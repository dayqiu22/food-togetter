import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import MainContent from '@/components/MainContent';

const Status = () => {
  const { id } = useLocalSearchParams<{ id: string }>(); // Access the route parameter

  return (
    <MainContent>
      <View style={styles.container}>
        <Text style={styles.title}>Group ID: {id}</Text>
        {/* You can add more details or components related to the group here */}
      </View>
    </MainContent>
  );
};

export default Status;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
