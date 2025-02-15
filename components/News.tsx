import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { NewNewsDataType } from "@/types";
import SliderItem from "@/components/SliderItem";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

type Props = {
  data: Array<NewNewsDataType>;
};

const News = ({ data }: Props) => {
  const [newsData, setNewsData] = useState(data);
  const [pagination, setPagination] = useState(0);
  const scrolling = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrolling.value = event.contentOffset.x;
    },
  });
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
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          pagingEnabled
        />
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
    // height:200,
    // backgroundColor:Colors.lightGrey,
    // borderRadius:10,
    justifyContent: "center",
  },
});
