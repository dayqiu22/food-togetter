import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window')

const NewGroup = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NewGroup</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Aligns items at the top
    alignItems: 'center',
    paddingTop: height * 0.07, // 5% of screen height
  },
  title: {
    fontSize: width * 0.05, // 5% of screen width
    fontWeight: 'bold',
  },
})

export default NewGroup