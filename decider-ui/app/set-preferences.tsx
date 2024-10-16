import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import icons for back button
import CustomButton from '@/components/CustomButton';
import FoodMultiSelector from '@/components/FoodMultiSelector';
import PriceMultiSelector from '@/components/PriceMultiSelector';

const SetPreferences = () => {
  const [showPriceSelector, setShowPriceSelector] = useState(false);
  const router = useRouter();

  const handlePress = () => {
    setShowPriceSelector(true); // Show PriceMultiSelector when button is pressed
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <View className="items-center z-10 top-[90%]">
            <CustomButton 
                onPress={() => {
                  showPriceSelector ? router.push('/new-group') : handlePress()
                }}
                title='ENTER'
                containerStyles="w-[100%] justify-center items-center bg-[#0C3B2E] padding-[10%]]"
            />
      </View>
      {showPriceSelector ? (
        <View style={styles.selectorContainer}>
          <PriceMultiSelector />
        </View>
      ) : (
        <View style={styles.selectorContainer}>
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
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

export default SetPreferences;
