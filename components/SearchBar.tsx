import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { NewNewsDataType } from '@/types'


type Props = {
  onSearchFunction:Function
}

const SearchBar = ({onSearchFunction}: Props) => {
  const [searchText, setSearchText] = useState('')
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons 
        name="search-outline" 
        size={20} 
        color={Colors.darkGrey} 
        />
        <TextInput
        placeholder='search'
        autoCapitalize='none'
        placeholderTextColor={Colors.lightGrey}
        style={styles.searchBarText}
        value={searchText}
        onChangeText={query => {onSearchFunction(query)
          setSearchText(query)
        }
          

        }
        />
      </View>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
       marginHorizontal: 20,
       marginTop: 20,
    },
    searchBar: {
        backgroundColor: "rgba(97, 96, 96, 0.1)",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    searchBarText:{
        flex: 1,
        color: Colors.lightGrey,
        fontSize: 15,
        
    }
})