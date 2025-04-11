import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { NewNewsDataType } from "@/types";
import { Colors } from "@/constants/Colors";
import Moment from "moment";
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()
type Props = {};

const NewsPage = (props: Props) => {
  const [newsList, setNewsList] = useState<NewNewsDataType[]>([]);
  const [isLoading, SetIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();
  

  useEffect(()=>{
    !isLoading?renderSavedArticle():null
    
  },[isLoading])
 

  useEffect(()=>{
    fetchNews()
  },[])
  const fetchNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
      const response = await axios.get(URL);
      if (response && response.data) {
        // console.log(response.data);
        
        setNewsList(response.data.results);
        SetIsLoading(false);
      }
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
    }
  };

  // GPT suggested code
  const checkSavedArticle = (newsID: string) => {

    setLiked(true); //  UI state
  
    // Fetch saved data
    const raw = storage.getString('savedArticle') || '[]';
  
    let savedArticleArray: string[] = [];
  
    try {
      const parsed = JSON.parse(raw);
      //  it's an array
      savedArticleArray = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn('Failed to parse saved articles:', e);
      savedArticleArray = [];
    }
  
    // Check if already saved
    if (savedArticleArray.includes(newsID)) {
      alert("Already saved");
      return;
    }
  
    // Save new article
    savedArticleArray.push(newsID);
    storage.set('savedArticle', JSON.stringify(savedArticleArray));
  
    alert("News Saved");
  };

  // remove the article from the saved list


  const removeSavedArticle = (newsID: string) => {
    setLiked(false); //  UI state
    // Get saved data 
    const savedData = storage.getString('savedArticle') || '[]';
    const parsedData = JSON.parse(savedData) as string[];
    const filteredData = parsedData.filter((id) => id !== newsID);
    storage.set('savedArticle', JSON.stringify(filteredData));
    alert("News Removed");
   
  }
  
  // This is origanal code written by me 

// const checkSavedArticle= (newsID:string)=>{
//   setLiked(!liked)
//     // another try 
//     console.log("Pre-fetch:",storage.getString('savedArticle'))
//     const savedArticle = storage.getString('savedArticle') || '[]'
//     if(savedArticle.length===0){// if empty 
//       const savedArticleArray = JSON.parse(savedArticle) as string[];
//       savedArticleArray.push(newsID);
//       storage.set('savedArticle', JSON.stringify(savedArticleArray));
//       console.log("Saved if Empty:",storage.getString('savedArticle'))
//       alert("News Saved")
//     }
//     else{
//       const parsedArticle = JSON.parse(storage.getString('savedArticle') || '[]')
//       if(parsedArticle===newsID){
//         console.log("Already saved")
//         alert("Already saved")
//       }
//       else{
//         storage.set('savedArticle', JSON.stringify(newsID));
//         console.log("Saved by Else:",storage.getString('savedArticle'))
//         alert("News Saved")
//       }
//     }
    
// // 1. check if the savedArticle is empty or not
// // 2. if empty, push the newsID to the savedArticle
// // 3. if not empty, check if the newsID is already in the savedArticle
// // 4. if not, push the newsID to the savedArticle
// // 5. if yes, remove the newsID from the savedArticle
// // 6. save the savedArticle to the storage 
// }

// check if the savedArticle is already in the storage
const renderSavedArticle = () => {
  const parsedSavedArticle = JSON.parse(storage.getString('savedArticle') || '[]')
  if(parsedSavedArticle.includes(newsList[0].article_id)){
    setLiked(true)
  }
  else{
    setLiked(false)
  }
    
}

  return (
    <>
      <Stack.Screen
        options={{
          title:"",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
               liked?removeSavedArticle(newsList[0].article_id):checkSavedArticle(newsList[0].article_id)
              }}
            >
              <Ionicons
                name={liked ? "heart" : "heart-outline"}
                size={25}
                color={liked ? "red" : "black"}
              />
            </TouchableOpacity>
          ),
          
        }}
      />
      {isLoading?<ActivityIndicator size={"large"} color={Colors.tint}/>:(
         <ScrollView contentContainerStyle={styles.container}>
         <Text style={styles.title}>{newsList[0].title}</Text>
         <View style={styles.newsInfo}>
         <Text style={styles.infoText}>{Moment(newsList[0].pubDate).format('MMMM DD hh:mm a')}</Text>
         <Text style={styles.infoText}>{newsList[0].source_name}</Text>
         </View>
         

         <Image source={{uri:newsList[0].image_url}} style={styles.img}/>
         {newsList[0].content.length!==0?( <Text style={styles.contentStyle}>{newsList[0].description}</Text>): (<Text style={styles.contentStyle}>{newsList[0].content}</Text>)}
       </ScrollView>
      )}
     
    </>
  );
};

export default NewsPage;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Colors.white,
    marginHorizontal:20,
    paddingBottom:30,
  },
  img:{
    width:"100%",
    height:300,
    borderRadius:8,
    marginBottom:20
  },
  newsInfo:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginLeft:10,
    marginBottom:5,
    marginTop:10

  },
  infoText:{
    fontSize:14,
    color:Colors.darkGrey
  },
  title:{
    fontSize:18,
    fontWeight:"700",
    color:Colors.tint,
  },
  contentStyle:{
    fontSize:14,
    lineHeight:20,
    color:Colors.darkGrey,
    textAlign:"justify",

  }
});
