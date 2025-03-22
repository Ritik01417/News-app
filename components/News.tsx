import { FlatList, StyleSheet, Text, View, ViewToken, Dimensions, useWindowDimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import { NewNewsDataType } from "@/types";
import SliderItem from "@/components/SliderItem";
import Animated, {
  runOnJS,
  runOnUI,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import Pagination from "@/components/Pagination";

type Props = {
  data: Array<NewNewsDataType>;
};

const SCREEN_WIDTH = Dimensions.get("window").width;

const News = ({ data }: Props) => {
 
  const [newsData, setNewsData] = useState(data);
  const [pageIndex, setPageIndex] = useState(0);
  const scrolling = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const [isAutoUpdate,SetISAutoUpdate] =useState(true);
  const interval = useRef<NodeJS.Timeout>();
  const offset = useSharedValue(0);
  const ScreenWidth=useWindowDimensions().width;
  
  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrolling.value = event.contentOffset.x;
    },
    onMomentumEnd:(event) =>{
      offset.value=event.contentOffset.x;
    },
   
  });

  const onEndReached = () => {
    setNewsData((prevData) => [...prevData, ...data]); // Duplicates data
  };
  useEffect(()=>{
    if(isAutoUpdate===true){
      interval.current=setInterval(()=>{
        offset.value=offset.value+ScreenWidth;
      },5000)
    }else{
      clearInterval(interval.current);
    }
    return ()=> {
      clearInterval(interval.current);
    }
  },[isAutoUpdate,offset,ScreenWidth]);

  useDerivedValue (()=>{
    scrollTo(ref, offset.value, 0, true)
  });

  const  onViewableItemsChanged=({
    viewableItems,
  }:{
    viewableItems:ViewToken[];
  }) =>{
    // console.log("Viewable Items:", viewableItems[0].index )
    if(
      viewableItems[0].index !==undefined &&
    viewableItems[0].index !==null
    ){
      // console.log("Updated pageIndex:", viewableItems[0].index % data.length);
      setPageIndex(viewableItems[0].index );
    }   
  }

  const viewabilityConfig ={
    itemVisiblePercentThreshold:50,
  }

  const viewabilityConfigCallbackPairs=useRef([
    {
      viewabilityConfig,onViewableItemsChanged
    },
  ]
);
   
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breaking News</Text>
      <View style={styles.slider}>
        <Animated.FlatList
          data={data}
          ref={ref}
          keyExtractor={(_, index) => `list_item${index}`}
          renderItem={({ item, index }) => (
            <SliderItem slider={item} index={index} scrolling={scrolling} />
          )}
          horizontal
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          pagingEnabled
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          onScrollBeginDrag={()=>{
            SetISAutoUpdate(false);
          }}
          onScrollEndDrag={()=>{
            SetISAutoUpdate(true);
          }
          }
        />
        <Pagination scrolling={scrolling} items={data} pageIndex={pageIndex}/>
      </View>
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  slider: {
     justifyContent: "center",
  },
});
