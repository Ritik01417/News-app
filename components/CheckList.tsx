import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { duration } from 'moment'

type Props = {
    label:String,
    checked:Boolean
    oncheck:()=>void
}

const CheckList = ({label,checked,oncheck}: Props) => {

  const rnAnimantedStyleContainer=useAnimatedStyle(()=>{
    return {
      backgroundColor:
      withTiming(
      checked?"#94caff":"transparent",
      {duration:200}),

      borderColor:
      withTiming(
      checked?Colors.tint:Colors.black,
      {duration:200}),
    }
  },[checked])


  const rnAnimantedStyleText=useAnimatedStyle(()=>{
    return{
      fontWeight:
      withTiming(checked?"bold":"normal",{duration:200}),
      color:
      withTiming(checked?Colors.tint:Colors.black,{duration:200}),

    }
  },[checked])
  return (
    <Animated.View style={[styles.container,rnAnimantedStyleContainer]}
    onTouchEnd={oncheck}>
      <Animated.Text style={[styles.labelList,rnAnimantedStyleText]}>{label}</Animated.Text>
    </Animated.View>
  )
}

export default CheckList

const styles = StyleSheet.create({
    container:{
        
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:10,
        borderWidth:1,
        borderColor:Colors.black,
        borderRadius:10,
        padding:10
    },
    labelList:{
        fontSize:15,
        color:Colors.black,
    }
})