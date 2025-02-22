import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors } from '@/constants/Colors'
import newsCategory from '@/constants/Categories'


type Props = {
    onChangeCategories:(category:string)=>void
}

const Categories = ({onChangeCategories}: Props) => {
    const scrollRef =useRef<ScrollView>(null);
    const [activeCategory, setActiveCategory] = useState(0);
    const itemRef =useRef<TouchableOpacity[]|null[]>([]);


    const handleCategory=(index:number)=>{
        const selected=itemRef.current[index];
        setActiveCategory(index);
        selected?.measure((x)=>{
            scrollRef.current?.scrollTo({x:x-20,y:0,animated:true})
        })
        onChangeCategories(newsCategory[index].slug)
    }
  return (
    <View>
      <Text style={styles.title}>Treding News </Text>
      <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.itemContainer}>
        {newsCategory.map((item,index)=>(
            <TouchableOpacity 
            ref={(element)=>(itemRef.current[index]=element)} 
            key={index} style={[styles.itemBtn, activeCategory===index&& styles.activeItem]}
            onPress={()=>handleCategory(index)}>
            <Text style={[styles.itemHeading,activeCategory===index&&styles.activeItemText]}>{item.title}</Text>
        </TouchableOpacity>
        ))}
        

      </ScrollView>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
    title: {
         fontSize: 20,
            fontWeight: "bold",
            color: Colors.black,
            marginBottom: 10,
            marginLeft: 20,
    },
    itemContainer:{
        gap:20,
        paddingVertical:10,
        paddingHorizontal:20,
        marginBottom:10,
    },
    itemBtn:{
        borderWidth:1,
        borderColor:Colors.darkGrey,
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:10

    },
    itemHeading:{
        fontSize:15,
        color:Colors.darkGrey,
        letterSpacing:0.8,
        // justifyContent:"center",
        // paddingRight:20
    },
    activeItem:{
        backgroundColor:Colors.tint,
        fontWeight:"bold"
    },
    activeItemText:{
        fontWeight:"bold",
        color:Colors.white,
      
        
    }
})