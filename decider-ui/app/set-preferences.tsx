import { View, Text, StyleSheet, ScrollView} from 'react-native'
import React, { useState } from 'react';
import MainContent from '@/components/MainContent'
import CustomButton from "@/components/CustomButton"
import { useRouter } from 'expo-router'

import FoodMultiSelector from '@/components/FoodMultiSelector'
import PriceMultiSelector from '@/components/PriceMultiSelector'

const SetPreferences = () => {
  const [showPriceSelector, setShowPriceSelector] = useState(false)

  const handlePress = () => {
    setShowPriceSelector(true) // Show PriceMultiSelector when button is pressed
  };

  const router = useRouter()

  return (
    <View style={styles.container}>
      <View className="items-center z-10 top-[90%]">
            <CustomButton 
                onPress={() => {
                  showPriceSelector ? router.push('/groups') : handlePress()
                }}
                title='ENTER'
                containerStyles="w-[100%] justify-center items-center bg-[#0C3B2E] padding-[10%]]"
            />
      </View>
      {showPriceSelector ? 
      ( <View style={styles.selectorContainer}>
          <PriceMultiSelector />
        </View>) : 
      ( <View style={styles.selectorContainer}>
          <FoodMultiSelector />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B46617',
    alignItems: 'center',
    paddingTop: '5%',
    paddingBottom: '10%',
  },
  selectorContainer: {
    flex: 1,
    width: '90%',
    marginTop: '10%',
    marginBottom: '10%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: '10%',
    paddingRight: '2%',
    paddingLeft: '2%',
    paddingBottom: '20%',
  },
});

export default SetPreferences