import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { styled } from 'nativewind'
import CustomButton from '@/components/CustomButton'
import MainContent from '@/components/MainContent'
import { useRouter } from 'expo-router'
import Place from '@/models/place'

const App = () => {
  const router = useRouter()
  const [places, setPlaces] = useState<Place[]>([]);

  const findPlace = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/food-search?cuisine=Chinese&priceRange=${encodeURIComponent('$10-20')}`);
      const data = await response.json();
      
      if (data.candidates && data.candidates.length > 0) {
        setPlaces(data.candidates);
      } else {
        setPlaces([]); // Clear places if no results
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  }

  return (
    <MainContent>
      <View>
        <Text className='text-center text-black font-bold text-4xl'>FoodTogetter</Text>
        <Text className='text-center text-black font-normal text-2xl mt-3'>Decisiveness clicks away!</Text>
      </View>
      <View>
        <CustomButton 
          onPress={findPlace}
          title='TEST'
          containerStyles='bg-black'
        />
        <FlatList
          data={places}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
              <Text>{item.formatted_address}</Text>
            </View>
          )}
        />
        <CustomButton 
          onPress={() => router.push('/groups')}
          title='Sign In'
          containerStyles='bg-[#0C3B2E]'
        />
      </View>
    </MainContent>
  )
}

export default App