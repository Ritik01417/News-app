import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

type Props = {
    label:String,
    checked:Boolean
    oncheck:()=>void
}

const CheckList = ({label,checked,oncheck}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelList}>{label}</Text>
    </View>
  )
}

export default CheckList

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:10,
        borderWidth:1,
        borderColor:Colors.tint,
        borderRadius:10,
        padding:10
    },
    labelList:{
        fontSize:15,
        color:Colors.tint,
    }
})