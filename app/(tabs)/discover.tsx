import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NewNewsDataType } from '@/types'
import SearchBar from '@/components/SearchBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import newsCategory from '@/constants/Categories'
import CheckList from '@/components/CheckList'


type Props = {}

const Page = (props: Props) => {
  const {top:safeTop}=useSafeAreaInsets();

  //   const [searchText, setSearchText] = useState('')
  //   const [articles, setArticles] = useState<NewNewsDataType[]>([]);

  // useEffect(()=>{
  //   if(searchText){
      
  //     const getNews = async () => {
  //       const newsArticles = await searchNews(searchText);
  //       setArticles(newsArticles);
  //     };
  //     getNews();

  //   }
    
  // },[searchText])

  // const searchNews = async (searchNews:String)=>{
  //   const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&q=${searchNews}&image=1&removeduplicate=1&size=5`;
  //   try {
  //     const response = await axios.get(URL)
  //     return response.data.results
  //   } catch (error:any) {
  //     console.log(`Error Fetching`);
  //     // return
      
  //   }
  // }
  return (
    <View style={[styles.container,{paddingTop:safeTop}]}>
  <SearchBar  />
  <Text style={styles.title}>Categories</Text>
  <View style={styles.listContent}>
    {
      newsCategory.map((item,index)=>(
        <CheckList key={index} label={item.title} checked={item.selected} oncheck={()=>{}}/>
      ))
    }
  </View>
  
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
   flex:1,
  //  marginLeft:20
  },
  title:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:10,
    color:"black",
    marginLeft:20,
    marginTop:20
  },
  listContent:{
    marginBottom:20,
    marginTop:10,
    gap:10,
    flexDirection:"row",
    flexWrap:"wrap",
    marginLeft:20,
    
  }
})