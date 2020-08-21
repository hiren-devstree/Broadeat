import React, { PureComponent } from "react";
import {
  Image, TouchableOpacity
} from "react-native";
import StyleConfig from '../../assets/styles/StyleConfig';
import { ViewX, TextX, CButtonColor } from '../../components/common';
import { IMAGE_PATH } from '../../helper/Constants'
import Video from 'react-native-video';
class FoodResultRow extends PureComponent {

  render() {
    const { data, index } = this.props
    return (
      <ViewX>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('PhotoRecipeDetails', { data: data.id })}
          style={{ width: StyleConfig.width * 0.94, paddingVertical: 10 }}
        >
          {data.image_type == "image" ? <Image
            resizeMode="cover"
            style={{ width: StyleConfig.width * 1, height: StyleConfig.convertHeightPerVal(205) }}
            source={{ uri: data.image }}
          /> :  <Video 
                ref={(ref) => {
                  this.player = ref
                }}    
                repeat={false}
                playInBackground={false}
                paused={true}
                style={{ width: StyleConfig.width * 1, height: StyleConfig.convertHeightPerVal(205) }}
                source={{ uri: data.image }}
              />
            }
        </TouchableOpacity>
        <ViewX style={{ flexDirection: "row", paddingVertical: StyleConfig.convertHeightPerVal(12) }} >
          <Image
            style={{ width: StyleConfig.convertHeightPerVal(50), aspectRatio: 1, borderRadius: StyleConfig.convertHeightPerVal(50) }}
            source={{ uri: data.creator_profilepic }}
          />
          <ViewX style={{ flex: 1, alignItems: 'flex-start' }} >
            <TextX style={{ paddingHorizontal: 10 }} color={"#8A8A8F"} fontSize={StyleConfig.fontSizeH2}>{data.recipe_title}</TextX>
            <ViewX style={{ flex: 1, flexDirection: "row" }} >
              <TextX
                style={{ flex: 1, paddingHorizontal: 10, textAlign: "left" }}
                color={"#8A8A8F"}
                fontSize={StyleConfig.fontSizeH3_4}>{data.creator_name}
              </TextX>
              <ViewX style={{ flexDirection: "row" }}>
                <TextX style={{ paddingRight: 5 }} color={"#8A8A8F"} fontSize={StyleConfig.fontSizeH3_4}>{data.created_at}</TextX>
                <TextX color={"#8A8A8F"} fontSize={StyleConfig.fontSizeH3_4}>{data.meal_preference}</TextX>
              </ViewX>
            </ViewX>
          </ViewX>
        </ViewX>
      </ViewX>
    );
  }
}
export default FoodResultRow;
