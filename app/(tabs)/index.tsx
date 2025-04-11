import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import axios from 'axios'
import { NewNewsDataType } from '@/types'
import News from '@/components/News'
import Categories from '@/components/Categories'
import { Colors } from '@/constants/Colors'
import NewsCategories from '@/components/NewsCategories'
import {AppProvider} from './context/AppContext'

type Props = {}

const Page = (props: Props) => {
  const {top:safeTop}=useSafeAreaInsets();
  const [news,setNews]=useState<NewNewsDataType[]>([]);
  const [newsList,setNewsList]=useState<NewNewsDataType[]>([]);
  const [isLoading,SetIsLoading]=useState(true) 
  // const [searchQuery, setSearchQuery] = useState('')

  useEffect(()=>{
    getNews();
    getNewsList()
  },[])

  const getNewsList=async(category:string="")=>{
    try {
      let categorySearch="";
      if(category.length!==0){
        categorySearch=`&category=${category}`
      }
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}${categorySearch}&language=en&image=1&removeduplicate=1&size=10`;
      const response = await axios.get(URL); 
      if(response&&response.data){
        setNewsList(response.data.results);
        SetIsLoading(false)
      }
    } catch (error:any) {
      console.log(`Error: ${error.message}`);
      
    }
  }
  const getNews=async()=>{
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&q=tesla,spaceX&image=1&removeduplicate=1&size=5`;
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
        SetIsLoading(false)
      }
    } catch (error:any) {
      console.log(`Error: ${error.message}`);
      
    }
  }
const onChangeCategories=(category:string)=>{
  console.log(`category: ${category}`)
  setNewsList([])
  getNewsList(category)
}

  return (
    <AppProvider>
    <ScrollView style={[styles.container, {paddingTop:safeTop}]}> 
      <Header />
      {/* <SearchBar/> */}
      {
        isLoading?<ActivityIndicator style={styles.customLoader}
        color={Colors.tint} size={"large"}/>:<News data={news}/>
        
      }
      <Categories onChangeCategories={onChangeCategories}/>
      <NewsCategories data={newsList}/>
    </ScrollView>
    </AppProvider>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  customLoader:{
    marginTop:20
  }
})