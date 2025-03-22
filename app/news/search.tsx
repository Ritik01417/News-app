import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { NewNewsDataType } from '@/types'
import axios from 'axios'
import { NewsListItem } from '@/components/NewsCategories'
import { Colors } from '@/constants/Colors'

type Props = {}

const Page = (props: Props) => {
  const [newsList,setNewsList]=useState<NewNewsDataType[]>([])
  const [isLoading,SetIsLoading]=useState(true);
  const {query,country,category} = useLocalSearchParams<{query:string,country:string,category:string}>();


  const getNewsList=async()=>{
    // console.log(`${country}${category}`)
    try {
      let categorySearch="";
      let querySearch="";
      let countrySearch= "";
      if(category.length!==0){
        categorySearch=`&category=${category}`
      }
      if(query.length!==0){
        querySearch=`&q=${query}`
      }
      if(country.length!==0){
        countrySearch=`&country=${country}`
      }
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}${querySearch}${categorySearch}${countrySearch}&language=en&image=1&size=10`;
      const response = await axios.get(URL); 
      if(response&&response.data){
        setNewsList(response.data.results);
        SetIsLoading(false)
        // console.log(response.data)
      }
    } catch (error:any) {
      console.log(`Error: ${error.message}`);
      
    }
  }
useEffect(()=>{
  getNewsList();
},[])
  return (
    <>
      <Stack.Screen options={{
        title: '',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
        ),

      }}/>
    
    <View style={styles.container}>
     
     {
      isLoading?(<ActivityIndicator size={"large"} style={styles.customLoader} />)
      :(
        <FlatList data={newsList} 
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `list_item${index}`}
        renderItem={({item})=>{
          return (
            <TouchableOpacity onPress={()=>router.push({
              pathname:`/news/[id]`,
              params:{id:item.article_id}
            })}>
              <NewsListItem item={item}/>
            </TouchableOpacity>
          )
    
        }
          
        }/>
      )
     }
    </View>
    </>
  )
}

export default Page
// Compare this snippet from app/news/searchScreen.tsx:

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginHorizontal:18,
    marginVertical:18,
  },
  customLoader:{
    marginTop:60,
    color:Colors.tint
  }
})