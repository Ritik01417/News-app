import { StyleSheet, View } from 'react-native'
import React from 'react'
import { NewNewsDataType } from '@/types'
import Animated, { SharedValue } from 'react-native-reanimated'
import { Colors } from '@/constants/Colors'

type Props = {
    items:NewNewsDataType[];
    pageIndex:number;
    scrolling:SharedValue<number>;
}

const Pagination = ({items,pageIndex,scrolling}: Props) => {
  return (
    <View style={styles.container}>
        {items.map((_,index) => {
            return <Animated.View  style={[styles.point,{backgroundColor:pageIndex===index?Colors.tint:Colors.darkGrey}]} key={index}></Animated.View>
        })}
      
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        height:40
    },
    point:{
        backgroundColor:"#333",
        height:8,
        width:8,
        borderRadius:8,
        marginHorizontal:2, 
        
    }
})