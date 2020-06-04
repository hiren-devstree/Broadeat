import React, { PureComponent } from "react";
import {
    Image
} from "react-native";
import StyleConfig from '../../assets/styles/StyleConfig';
import { ViewX, TextX } from '../../components/common';

class FoodResultRow extends PureComponent {

    render() {
        const { data, index } = this.props;
        return (
            <>
                <Image
                    resizeMode="cover"
                    style={{ width: StyleConfig.width * 0.94, height: StyleConfig.convertHeightPerVal(205) }} source={data}
                />
                <ViewX style={{ flexDirection: "row", paddingVertical: StyleConfig.convertHeightPerVal(12) }} >
                    <Image
                        style={{ width: StyleConfig.convertHeightPerVal(50), aspectRatio: 1, borderRadius: StyleConfig.convertHeightPerVal(50) }}
                        source={data}
                    />
                    <ViewX style={{ flex: 1, alignItems: 'flex-start' }} >
                        <TextX style={{ paddingHorizontal: 10 }} color={"#8A8A8F"} fontSize={StyleConfig.fontSizeH2}>{'Food Title'}</TextX>
                        <ViewX style={{ flex: 1, flexDirection: "row" }} >
                            <TextX
                                style={{ flex: 1, paddingHorizontal: 10, textAlign: "left" }}
                                color={"#8A8A8F"}
                                fontSize={StyleConfig.fontSizeH3_4}>{'Mark Driven'}
                            </TextX>
                            <ViewX style={{ flexDirection: "row" }}>
                                <TextX style={{ paddingRight: 5 }} color={"#8A8A8F"} fontSize={StyleConfig.fontSizeH3_4}>{'Time'}</TextX>
                                <TextX color={"#8A8A8F"} fontSize={StyleConfig.fontSizeH3_4}>{'Food Type'}</TextX>
                            </ViewX>
                        </ViewX>
                    </ViewX>
                </ViewX>
            </>
        );
    }
}
export default FoodResultRow;
