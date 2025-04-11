import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {  useEffect, useState } from 'react'
import { storage } from '../news/[id]'
import { NewsListItem } from '@/components/NewsCategories'
import { router, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { Colors } from '@/constants/Colors'
import { NewNewsDataType } from '@/types'




type Props = {}

const Page = (props: Props) => {
  const [newsList, setNewsList]=useState([])
  const [isLoading, SetIsLoading]=useState(true);
  const isFocused = useIsFocused()
  useEffect(()=>{
    fetchSavedArticle()
  },[isFocused])

  const fetchSavedArticle = async () => {
    SetIsLoading(true)
    const parsedData = JSON.parse(storage.getString('savedArticle') || '[]')
    const query_id = parsedData.join(",")
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${query_id}`
      const response = await fetch(URL);
      SetIsLoading(false)
      if(response){
        
        const data = await response.json()
      setNewsList(data.results)
      }
      
    } catch (error) {
      console.log("Error:", error)
      
    }
  }
  return (
  <>
  <Stack.Screen 
  options={{
    headerShown: true,
    headerTitleAlign: 'center',
    headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} />
              </TouchableOpacity>
            ),
  }}
  />
  <View style={styles.container}>

    {
      isLoading?(<ActivityIndicator size={"large"} style={styles.customLoader}/>)
      :(
        <FlatList data={newsList}
       keyExtractor={(_, index) => `list_item${index}`}
       renderItem={({item}:{item:NewNewsDataType})=>{
        return(
          <TouchableOpacity onPress={()=>router.push({
            pathname:`/news/[id]`,
            params:{id:item.article_id}
                      })}>
            <NewsListItem item={item} />
          </TouchableOpacity>
        )
       }} />
      )
    }
      
    </View>
  </>
    
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  customLoader:{
      marginTop:60,
      color:Colors.tint
    }
})