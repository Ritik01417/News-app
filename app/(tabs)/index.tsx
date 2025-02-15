import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import axios from 'axios'
import { NewNewsDataType } from '@/types'
import News from '@/components/News'

type Props = {}

const Page = (props: Props) => {
  const {top:safeTop}=useSafeAreaInsets();
  const [news,setNews]=useState<NewNewsDataType[]>([]);

  useEffect(()=>{
    getNews();
  },[])
  const getNews=async()=>{
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&q=tesla,spaceX&image=1&removeduplicate=1`;
      const response = await axios.get(URL);
      // const response = await axios.get('https://newsapi.org/v2/everything', {
      //   params: {
      //     q: 'tesla',
      //     from: '2025-01-12',
      //     sortBy: 'publishedAt',
      //     image: 1,
      //     removeduplicate: 1,
      //     apiKey: `${process.env.EXPO_PUBLIC_API_KEY}`,
      //     pageSize: 5,  // <-- This limits the response to only 5 articles
      //   }
      // }); 
      if(response&&response.data){
        setNews(response.data.results);
        console.log(response.data)
      }
    } catch (error:any) {
      console.log(`Error: ${error.message}`);
      
    }

  }
  return (
    <View style={[styles.container, {paddingTop:safeTop}]}> 
      <Header />
      <SearchBar />
      <News data={news}/>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
})