import { View, Text, StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import MainContent from '@/components/MainContent'

import FoodMultiSelector from '@/components/FoodMultiSelector'

const SetPreferences = () => {
  return (
    <View style={styles.container}>
      <View style={styles.selectorContainer}>
        <FoodMultiSelector />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B46617',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 60,
  },
  selectorContainer: {
    flex: 1,
    width: '90%',
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 40,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 70,
  },
});

export default SetPreferences