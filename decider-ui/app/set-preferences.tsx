import { View, Text, StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import MainContent from '@/components/MainContent'

import FoodMultiSelector from '@/components/FoodMultiSelector'

const SetPreferences = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.selectorContainer}>
        <FoodMultiSelector />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0C3B2E',
    alignItems: 'center',
  },
  selectorContainer: {
    width: '90%',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
});

export default SetPreferences