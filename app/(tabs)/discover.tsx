import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import SearchBar from '@/components/SearchBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import newsCategory from '@/constants/Categories'
import CheckList from '@/components/CheckList'
import CountryList from '@/constants/CountryList'
import { Colors } from '@/constants/Colors'
import { Link, router } from 'expo-router'



type Props = {}

const Page = (props: Props) => {
  const {top:safeTop}=useSafeAreaInsets();
  const [newsList, setNewsList] = useState(newsCategory)
  const [newsCountry, setNewsCountry] = useState(CountryList)
  const [searchValue, setSearchValue] = useState('')
  const [searchCountry, setSearchCountry] = useState('')
  const [searchCategory, setSearchCategory] = useState('')

  const toggelCountryCheck=useCallback((index:number)=>{
    setNewsCountry((prev)=>{
      return prev.map((item,id)=>{
        if(id===index){
          return {...item,selected:!item.selected}
        }
        return item
    })
  })
  },[])

  const toggelCategoryCheck=useCallback((index:number)=>{
    setNewsList((prev)=>{
      return prev.map((item)=>{
        if(item.id===index){
          return {...item,selected:!item.selected}
        }
        return item
      })
    })
  },[])


  return (
    <View style={[styles.container,{paddingTop:safeTop}]}>
  <SearchBar onSearchFunction={setSearchValue}  />

  {/*Category Check */}
  <Text style={styles.title}>Categories</Text>
  <View style={styles.listContent}>
    {
      newsList.map((item,index)=>(
        <CheckList key={index} label={item.title} 
         checked={item.selected}
         oncheck={()=>{
          toggelCategoryCheck(item.id)
          setSearchCategory(item.slug)
        }}/>
      ))
    }
  </View>
  

  {/* Country Check */}
  <Text style={styles.title}>Categories</Text>
  <View style={styles.listContent}>
    {
      newsCountry.map((item,index)=>(
        <CheckList key={index} label={item.name} checked={item.selected} 
        oncheck={()=>{
          toggelCountryCheck(index)
          setSearchCountry(item.code)
        }}/>
      ))
    }
    </View>

    <Link href={{
      pathname:"/news/search",
      params:{query:searchValue,
        category:searchCategory,
        country:searchCountry,
      }
    }} asChild>
    
    <TouchableOpacity  style={styles.searchBtn}>
    <Text style={styles.btnText}>Search</Text>
  </TouchableOpacity>
    </Link>

  
  </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
   flex:1,
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
    
  },
  searchBtn:{
    borderRadius:10,
    borderBlockColor:Colors.tint,
    borderWidth:1,
    justifyContent:"center",
    alignItems:"center",
    padding:10,
    marginHorizontal:20,
    backgroundColor:Colors.tint,
  },
  btnText:{
    color:Colors.white,
    fontSize:16,
    fontWeight:"bold"
  }
})