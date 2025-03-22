import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NewNewsDataType } from '@/types'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'

type Props = {
    data:NewNewsDataType[]
}

const NewsCategories = ({data}: Props) => {
    
  return (
    <View style={styles.container}>
        {
            data.length==0?
            (<ActivityIndicator 
                color={Colors.tint}
                size={"large"} 
                style={styles.customLoader}/>):
           ( data.map((item,index)=>(
            <TouchableOpacity key={index} onPress={() => router.push({ pathname: `/news/[id]`, params: { id: item.article_id } })}>
                <NewsListItem item={item}/>
                </TouchableOpacity>
            )))
        }
      
    </View>
  )
}
export const NewsListItem =({item}:{item:NewNewsDataType})=>{
    return (
        <View  style={styles.itemWrapper}>
                    <Image source={{uri:item.image_url}} style={styles.itemImage}/>
                    <View style={styles.infoWrapper}>
                    <Text style={styles.category}>{item.category}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.sourceWrapper}>
                        <Image source={{uri:item.source_icon}} style={styles.icon}/>
                        <Text style={styles.sourceName}>{item.source_name}</Text>
                    </View>
                    </View>    
                </View>
    )
}
export default NewsCategories

const styles = StyleSheet.create({
    container:{
        marginBottom:50,
        marginHorizontal:20
    },
    itemWrapper:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:20,
        flex:1,
        gap:10,


    },
    itemImage:{
            width:90,
            height:100,
            borderRadius:20,
            marginRight:10
    },
    infoWrapper:{
        flex:1,
        gap:10,
        justifyContent:"space-between"
    },
    category:{
        fontSize:12,
        color:Colors.darkGrey,
        textTransform:"capitalize"
    },
    title:{
        fontSize:12,
        fontWeight:"bold",
        color:Colors.black
    },
    sourceWrapper:{
        flexDirection:"row",
        gap:8,
        alignItems:"center"
    },
    icon:{
        width:20,
        height:20,
        borderRadius:20,

    },
    sourceName:{
        fontSize:10,
        fontWeight:"500",
        color:Colors.darkGrey
    },
    customLoader:{
        marginTop:40,
      }
})