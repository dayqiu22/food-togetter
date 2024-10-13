import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { CuisineType } from '@/mock-data/categories';

export default function FoodMultiSelector() {
    const [expanded, setExpanded] = useState(true);
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

    const toggleCuisine = (cuisine: string) => {
        setSelectedCuisines(prevSelected => 
            prevSelected.includes(cuisine) 
                ? prevSelected.filter(item => item !== cuisine) 
                : [...prevSelected, cuisine]
        );
    };

    return (
        <View>
            <TouchableOpacity>
                <Text className='bg-0C3B2E text-center text-0C3B2E font-bold text-lg'>
                    SELECT PREFERRED FOOD CATEGORIES
                </Text>
            </TouchableOpacity>
            {expanded && (
                <FlatList
                    data={Object.values(CuisineType)}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            onPress={() => toggleCuisine(item)} 
                            style={{
                                padding: 10,
                                marginBottom: 5,
                                borderRadius: 10,
                                backgroundColor: selectedCuisines.includes(item) ? '#FFBA00' : '#FFFFFF',
                            }}
                        >
                            <Text>{item.toUpperCase()}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}
