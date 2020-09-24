// Global Imports
import React, { Component } from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity,
  ScrollView, FlatList, Text, Alert, Share, StatusBar
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import FastImage from 'react-native-fast-image'

// File Imports
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';
import StyleConfig from '../assets/styles/StyleConfig';
import { getRcipeDetails, postFavorite, deleteReceipe } from './../apiManager'
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';
// Component Imports
import {
  SafeAreaView, ViewX, TextX, CText, CTextColor
} from '../components/common'
import imgFood from '../assets/images/ic_food.png'
import imgBack from '../assets/images/ic_back.png'
import imgFav from '../assets/images/ic_favorites.png'
import imgMenu from '../assets/images/ic_menu.png'
import imgShare from '../assets/images/ic_share.png'
import imgLike from '../assets/images/ic_like.png'
import imgDisLike from '../assets/images/ic_dislike.png'
import imgView from '../assets/images/ic_view.png'
import imgUser from '../assets/images/ic_user.png'
import imgTimer from '../assets/images/ic_timer.png'
import imgAddCircle from '../assets/images/ic_addCircle.png'
import { CommonActions } from '@react-navigation/native';

class PhotoRecipeDetails extends Component {
  constructor(props) {
    super(props)

    console.disableYellowBox = true

    this.state = {
      noOfUser: 2,
      timer: '15-20',
      selectedTab: 1,
      data: undefined,
      token: null,
      user_id: '',
      receipeByMe: false
    }
  }

  componentDidMount() {
    let id = this.props.route.params.data
    console.log(this.props.route.params)
    if (id == 0) {
      this.setState({
        data: this.props.route.params.ReceipeData
      });
    } else {
      this._getRecipeDetailsAPICalling(id, true)
    }
    AsyncStorage.getItem("user_id").then((user_id) => this.setState({ user_id }))
  }
  componentWillUnmount = async () => {
    this.state = {
      noOfUser: 0,
      timer: '',
      selectedTab: 1,
      data: undefined,
      token: null,
      receipeByMe: false,
      showOptionMenu: false,
      xPosition: 0
    }
  }


  render() {
    return this.renderMainView()
  }

  /*
  .##........#######...######...####..######...######.
  .##.......##.....##.##....##...##..##....##.##....##
  .##.......##.....##.##.........##..##.......##......
  .##.......##.....##.##...####..##..##........######.
  .##.......##.....##.##....##...##..##.............##
  .##.......##.....##.##....##...##..##....##.##....##
  .########..#######...######...####..######...######.
  */

  _tabbarBtnPressed = (index) => {
    this.setState({ selectedTab: index })
  }

  _keyExtractor = (item, index) => index.toString()

  _getRecipeDetailsAPICalling = async (id, showLoader = false) => {
    const { loader } = this.props;
    let token = await AsyncStorage.getItem('user_token');
    let data = {
      id: id
    }
    loader(showLoader && true)
    let response = await getRcipeDetails(data, token)
    console.log({ RECEIPE: response.data })

    loader(false)
    if (response.code === 1) {
      let receipeByMe = response.data.Recipe.user_id == this.state.user_id

      this.setState({ data: response.data, token, receipeByMe }, () => {
        this.forceUpdate()
      })
    } else {
      setTimeout(() => {
        Alert.alert(response.message)
      }, 500)
    }
  }
  deleteRecipe = async () => {
    const { loader } = this.props;
    let token = await AsyncStorage.getItem('user_token');
    let reloadScreen = this.props.route.params.reloadScreen;
    loader(true)
    let response = await deleteReceipe(this.state.data.Recipe.id, token)
    loader(false)
    if (response.code == 1) {
      if (reloadScreen) {
        reloadScreen();
      }
      this.props.navigation.goBack()
    } else {

    }

  }
  _onDelete = async () => {
    await this.setState({ showOptionMenu: false })
    Alert.alert(
      "Do you want to delete recipe?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.deleteRecipe() }
      ],
      { cancelable: false }
    );
  }
  _onEdit = () => {
    this.props.navigation.navigate('AddContent', { mode: 'edit', data: this.state.data })
  }
  _postView = async () => {
    const { loader } = this.props
    let { data, token } = this.state;
    if (token == null) {
      token = await AsyncStorage.getItem('user_token')
    }
    let params = {
      "rec_id": data.Recipe.id,
      "flag": "view",
      "checkdata": "view"
    }
    loader(true)
    let response = await postFavorite(params, token)
    if (response.code === 1) {
      let id = this.props.route.params.data

      this._getRecipeDetailsAPICalling(id)
    } else {
      loader(false)
      setTimeout(() => {
        Alert.alert(response.message)
      }, 500)
    }
  }

  _postLike = async () => {
    const { loader } = this.props
    let { data, token } = this.state;
    if (token == null) {
      token = await AsyncStorage.getItem('user_token')
    }
    let params = {
      "rec_id": data.Recipe.id,
      "flag": "like",
      "checkdata": "like"
    }
    //loader(true)
    let response = await postFavorite(params, token)
    if (response.code === 1) {
      let id = this.props.route.params.data
      this._getRecipeDetailsAPICalling(id)
    } else {
      // loader(false)
      setTimeout(() => {
        Alert.alert(response.message)
      }, 500)
    }
  }


  _postDisLike = async () => {
    const { loader } = this.props
    let { data, token } = this.state;
    if (token == null) {
      token = await AsyncStorage.getItem('user_token')
    }
    let params = {
      "rec_id": data.Recipe.id,
      "flag": "dislike",
      "checkdata": "like"
    }
    //loader(true)
    let response = await postFavorite(params, token)
    if (response.code === 1) {
      let id = this.props.route.params.data
      this._getRecipeDetailsAPICalling(id)
    } else {
      //loader(false)
      setTimeout(() => {
        Alert.alert(response.message)
      }, 500)
    }
  }

  _postFavorite = async () => {
    const { loader } = this.props
    let { data, token } = this.state;
    if (token == null) {
      token = await AsyncStorage.getItem('user_token')
    }
    let params = {
      "rec_id": data.Recipe.id,
      "flag": data.Recipe.bookmarked ? "unfavorite" : "favorite",
      "checkdata": "favorite"
    }
    //loader(true)
    let response = await postFavorite(params, token)
    console.log({ response })
    if (response.code === 1) {
      // data.Activity.favorite = data.Activity.favorite == 0 ? 1 : 0 
      // Alert.alert(
      //   data.Recipe.bookmarked == false ? "Recipe removed from bookmark" :"Recipe added to bookmark",
      //   "",
      //         [{
      //           onPress: this.setState({ data }),
      //           text: 'Okay', 

      //         }],
      //         { cancelable: false }
      //       )
      let id = this.props.route.params.data
      this._getRecipeDetailsAPICalling(id)
    } else {
      //loader(false)
      setTimeout(() => {
        Alert.alert(response.message)
      }, 500)
    }
  }
  _onShare = async () => {
    let { data } = this.state;
    try {
      const result = await Share.share({
        message: `broadeat://receipe_details/${data.Recipe.id}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  /*
  ..######...#######..##.....##.########...#######..##....##.########.##....##.########..######.
  .##....##.##.....##.###...###.##.....##.##.....##.###...##.##.......###...##....##....##....##
  .##.......##.....##.####.####.##.....##.##.....##.####..##.##.......####..##....##....##......
  .##.......##.....##.##.###.##.########..##.....##.##.##.##.######...##.##.##....##.....######.
  .##.......##.....##.##.....##.##........##.....##.##..####.##.......##..####....##..........##
  .##....##.##.....##.##.....##.##........##.....##.##...###.##.......##...###....##....##....##
  ..######...#######..##.....##.##.........#######..##....##.########.##....##....##.....######.
  */

  renderMainView = () => {
    const { selectedTab, showOptionMenu } = this.state
    return (
      <SafeAreaView {...this.props} style={{ flex: 1, }}>
        {this.renderHeaderView()}
        <ScrollView style={{ flex: 1 }}>
          {this.renderItemMainImage()}
          {this.renderDescriptionView()}
          {this.renderTabButtons()}
          {selectedTab == 1 ? this.renderIngredientsView() : this.renderMethodListView()}
          {/* {this.renderMethodListView()} */}
        </ScrollView>
        {showOptionMenu && <View style={{
          position: 'absolute',
          zIndex: 999,
          alignSelf: 'flex-end',
          right: StyleConfig.countPixelRatio(16),
          marginTop: this.state.xPosition,
          paddingVertical: StyleConfig.countPixelRatio(2),
          backgroundColor: '#fff'
        }}
        >
          <TouchableOpacity onPress={this._onEdit} style={{
            height: StyleConfig.countPixelRatio(26),
            alignItems: 'center',
            paddingHorizontal: StyleConfig.countPixelRatio(12),
            paddingVertical: StyleConfig.countPixelRatio(4)
          }}>
            <CTextColor color={'#333'} fontSize={StyleConfig.fontSizeH3}>Edit</CTextColor>
          </TouchableOpacity>
          <View style={{ backgroundColor: '#666', marginVertical: StyleConfig.countPixelRatio(2), height: 0.5 }} />
          <TouchableOpacity onPress={this._onDelete} style={{
            height: StyleConfig.countPixelRatio(26),
            alignItems: 'center',
            paddingHorizontal: StyleConfig.countPixelRatio(12),
            paddingVertical: StyleConfig.countPixelRatio(4)
          }}>
            <CTextColor color={'#333'} fontSize={StyleConfig.fontSizeH3}>Delete</CTextColor>
          </TouchableOpacity>

        </View>}
      </SafeAreaView>
    )
  }
  onBack = () => {
    console.log(this.props.route.params)
    if (this.state.data && this.state.data.Recipe.id == 0) {
      this.props.navigation.navigate('AddContent')
    } else if (this.props.route.params.backKey == "AddContent") {
      this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Dashboard' }] }))
      //this.props.navigation.navigate('Dashboard')
    } else {
      this.props.navigation.goBack()
    }
  }
  renderHeaderView = () => {
    const { data } = this.state
    return (
      <>
        <ViewX style={styles.headerTopView}>
          <TouchableOpacity style={{ minWidth: 40 }} onPress={this.onBack}>
            <Image source={imgBack} style={styles.backBtn} />
          </TouchableOpacity>
          <TextX
            fontSize={StyleConfig.countPixelRatio(16)}
          >
            {data ? data.Recipe.creator_name : ''}
          </TextX>
          <View
            onLayout={(event) => {
              var { y, height } = event.nativeEvent.layout
              let statusBarHeight = StyleConfig.iPhoneX ? 44 : 20
              this.setState({ xPosition: y + height + statusBarHeight })
            }}>
            <TouchableOpacity style={{ minWidth: 40, alignItems: 'flex-end' }} disabled={!this.state.receipeByMe} onPress={() => this.setState({ showOptionMenu: true })}>
              {this.state.receipeByMe &&
                <Entypo name={'dots-three-horizontal'} size={StyleConfig.countPixelRatio(20)} color='#999' />
              }
            </TouchableOpacity>
          </View>
        </ViewX>
      </>
    )
  }

  renderHeaderBottomView = () => {
    const { noOfUser, timer, data } = this.state
    return (
      <ViewX style={styles.headerBottomView} {...this.props}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('UserAccount', {
          userDetails: {
            "profilepic": data.Recipe.creator_profilepic,
            "name": data ? data.Recipe.creator_name : '',
            "description": ''
          },
          userId: data ? data.Recipe.user_id : null
        })}>
          {data ?
            <Image source={{ uri: data.Recipe.creator_profilepic }} style={{ width: 30, height: 30, borderRadius: 15 }} />
            : <Image source={imgFood} />
          }
        </TouchableOpacity>
        <ViewX style={styles.headerContents}>
          <TextX
            fontSize={StyleConfig.countPixelRatio(20)}
            align={'left'}
          >
            {data ? data.Recipe.recipe_title : ''}
          </TextX>
          <ViewX style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <TextX
              fontSize={StyleConfig.countPixelRatio(16)}
              align={'left'}
              color={'#747373'}
            >
              {data ? data.Recipe.creator_name : ''}
            </TextX>
            <ViewX style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.navigate('Profile')}>
                <Image source={imgUser} style={{ width: 12, height: 12, marginRight: 3 }} />
                <TextX>{data ? data.Recipe.no_of_person : ''}</TextX>
              </TouchableOpacity>
              <Image source={imgTimer} style={{ width: 15, height: 15, marginLeft: 15, marginRight: 3 }} />
              <TextX>{data ? data.Recipe.time_duration : ''}</TextX>
              <TextX style={{ marginLeft: 15 }}>{data ? data.Recipe.meal_preference : ''}</TextX>
            </ViewX>
          </ViewX>
        </ViewX>
      </ViewX>
    )
  }

  renderItemMainImage = () => {
    const { data } = this.state
    let listData = [];
    if (data) {
      if (data.Recipe.image.includes("png") || data.Recipe.image.includes("jpg") || data.Recipe.image.includes("JPG") || data.Recipe.image.includes("jpeg") || data.Recipe.image.includes("JPEG") || data.Recipe.image.includes("PNG")) {
        listData.push({
          "id": 0, "media_type": "image", "media_name": data.Recipe.image
        })
      } else {
        listData.push({
          "id": 0, "media_type": "video", "media_name": data.Recipe.image
        })
      }
    }
    if (data && data.Media.length > 0) {
      listData = listData.concat(data.Media)
    }
    return (
      <FlatList
        horizontal
        data={listData}
        renderItem={({ item }) => <View style={{ width: StyleConfig.width * 1, height: StyleConfig.convertHeightPerVal(300) }} >
          {item.media_type == "image" ?
            <FastImage
              style={{ width: StyleConfig.width * 1, height: StyleConfig.convertHeightPerVal(300) }}
              source={{
                uri: item.media_name,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            /> :
            <Video
              ref={(ref) => {
                this.player = ref
              }}
              resizeMode={'contain'}
              repeat={false}
              controls={true}
              playInBackground={false}
              paused={true}
              style={{ width: StyleConfig.width * 1, height: StyleConfig.convertHeightPerVal(300) }}
              source={{ uri: item.media_name }}
            />
          }
        </View>
        }
      />
    )
  }

  renderDescriptionView = () => {
    const { noOfUser, timer, foodType, data } = this.state
    let view = 0, likes = 0, dislike = 0, isLike = false, isDisLike = false, isBookmark = false;
    if (data && data.Activity.length > 0) {
      view = data.Activity[0].view;
      likes = data.Activity[0].likes;
      dislike = data.Activity[0].dislike;
      isLike = data.Recipe.like;
      isDisLike = data.Recipe.dislike;
      isBookmark = data.Recipe.bookmarked;
    }
    let resizeMode = "contain"
    let iconSize = StyleConfig.countPixelRatio(28);
    return (
      <ViewX style={{ flex: 1, alignItems: 'flex-start' }}>
        {this.renderHeaderBottomView()}
        {data && data.Recipe.id != 0 && <ViewX style={styles.operationView}>
          <ViewX style={{ flexDirection: 'row' }}>
            <Feather name={"eye"} size={iconSize} color={"#8a8a8f"} />
            <TextX style={{ marginLeft: StyleConfig.countPixelRatio(4) }} fontSize={StyleConfig.fontSizeH2_3}>{view ? view : "0"}</TextX>
          </ViewX>
          <TouchableOpacity disabled={isLike} onPress={this._postLike}>
            <ViewX style={{ flexDirection: 'row' }}>
              <Feather name={"thumbs-up"} size={iconSize} color={isLike ? 'blue' : '#8a8a8f'} />
              <TextX style={{ marginLeft: StyleConfig.countPixelRatio(4) }} fontSize={StyleConfig.fontSizeH2_3}>{likes ? likes : '0'}</TextX>
            </ViewX>
          </TouchableOpacity>
          <TouchableOpacity disabled={isDisLike} onPress={this._postDisLike}>
            <ViewX style={{ flexDirection: 'row' }}>
              <Feather name={"thumbs-down"} size={iconSize} color={isDisLike ? 'blue' : '#8a8a8f'} />
              <TextX style={{ marginLeft: StyleConfig.countPixelRatio(4) }} fontSize={StyleConfig.fontSizeH2_3}>{dislike ? dislike : "0"}</TextX>
            </ViewX>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onShare}>
            <ViewX style={{ flexDirection: 'row' }}>
              <Feather name={"upload"} size={iconSize} color={'#8a8a8f'} />
            </ViewX>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._postFavorite}>
            <ViewX style={{ flexDirection: 'row' }}>
              <Feather name={"bookmark"} size={iconSize} color={isBookmark ? 'blue' : '#8a8a8f'} />
            </ViewX>
          </TouchableOpacity>

        </ViewX>
        }
        <TextX
          fontSize={StyleConfig.countPixelRatio(14)}
          style={{ marginLeft: 15 }}
          align={'left'}
        >{data ? data.Recipe.description : ''}
        </TextX>
      </ViewX>
    )
  }

  renderTabButtons = () => {
    const { selectedTab } = this.state
    return (
      <ViewX style={styles.tabBtnContainer}>
        <TouchableOpacity
          style={[styles.tabBtn, { backgroundColor: selectedTab == 1 ? StyleConfig.yellow : 'transparent' }]}
          onPress={() => this._tabbarBtnPressed(1)}
        >
          <TextX
            fontSize={StyleConfig.countPixelRatio(16)}
          >{'Ingredients'}
          </TextX>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, { backgroundColor: selectedTab != 1 ? StyleConfig.yellow : 'transparent' }]}
          onPress={() => this._tabbarBtnPressed(2)}
        >
          <TextX
            fontSize={StyleConfig.countPixelRatio(16)}
          >{'Method'}
          </TextX>
        </TouchableOpacity>
      </ViewX>
    )
  }

  renderIngredientsView = () => {
    const { data } = this.state
    return (
      <FlatList
        scrollEnabled={false}
        contentContainerStyle={{ paddingHorizontal: StyleConfig.countPixelRatio(15) }}
        ListFooterComponent={this.renderNutritionView}
        keyExtractor={this._keyExtractor}
        data={data ? data.Rec_Ingredient : []}
        renderItem={this.renderIngredientCellView}
      />
    )
  }

  renderIngredientCellView = ({ item, index }) => {
    return (
      <>
        <ViewX style={{ flexDirection: 'row', paddingLeft: StyleConfig.countPixelRatio(10), marginTop: StyleConfig.countPixelRatio(7) }}>
          <TouchableOpacity activeOpacity={0}>
            <Image source={imgAddCircle} style={{ width: 17, height: 17, marginRight: 3 }} />
          </TouchableOpacity>
          <TextX
            style={{ width: '35%' }}
            align='left'
            fontSize={StyleConfig.countPixelRatio(16)}
          >{`${item.quantity} ${item.measure}`}
          </TextX>
          <TextX
            style={{ flex: 1 }}
            align='left'
            fontSize={StyleConfig.countPixelRatio(16)}
          >{item.ingredient}
          </TextX>
        </ViewX>
        {/* <ViewX style={styles.shoppingCellContainer}>
          <TouchableOpacity>
            <Image source={imgRemoveCircle} style={{ width: 17, height: 17, marginRight: 3 }} />
          </TouchableOpacity>
          <TextX
            style={{ width: '35%' }}
            align='left'
            fontSize={StyleConfig.countPixelRatio(16)}
          >{'150oz'}
          </TextX>
          <TextX
            style={{ flex: 1 }}
            align='left'
            fontSize={StyleConfig.countPixelRatio(16)}
          >{'Cream '}
          </TextX>
        </ViewX> */}
      </>
    )
  }

  renderMethodListView = () => {
    const { data } = this.state
    return (
      <FlatList
        scrollEnabled={false}
        contentContainerStyle={{ paddingHorizontal: StyleConfig.countPixelRatio(15), marginTop: 15 }}
        // ListHeaderComponent={this.renderShoppingListHeader}
        keyExtractor={this._keyExtractor}
        data={data ? data.Method : []}
        renderItem={this.renderMethodListCellContainer}
        ListFooterComponent={() => {
          return (
            <TouchableOpacity style={{ marginVertical: 10 }}
              onPress={() => {
                this.props.navigation.navigate('CommentList', { recipeData: data })
              }}>
              <TextX
                align='left'
                fontSize={StyleConfig.countPixelRatio(16)}
              >{`View all ${data.Recipe.comment_count} comments`}</TextX>
            </TouchableOpacity>
          )
        }}
      />
    )
  }

  renderShoppingListHeader = () => {
    return (
      <ViewX>
        <View style={styles.separator} />
        <ViewX style={{
          flexDirection: 'row',
          marginVertical: 8,
          paddingLeft: StyleConfig.countPixelRatio(10)
        }}>
          <TextX
            style={{ width: '40%' }}
            align='left'
            fontSize={StyleConfig.countPixelRatio(16)}
          >{'4 items added'}
          </TextX>
          <Text
            style={{ flex: 1, fontSize: StyleConfig.countPixelRatio(16), color: StyleConfig.blue }}
          >{'Shopping list '}
          </Text>
        </ViewX>
        <View style={styles.separator} />
      </ViewX>
    )
  }

  renderMethodListCellContainer = ({ item, index }) => {
    return (
      <ViewX style={styles.shoppingCellContainer}>
        <TextX
          style={{ width: '5%' }}
          align='left'
          fontSize={StyleConfig.countPixelRatio(16)}
        >{index + 1}.
        </TextX>
        <TextX
          style={{ flex: 1 }}
          align='left'
          fontSize={StyleConfig.countPixelRatio(16)}
        >{item.method_description}
        </TextX>
      </ViewX>
    )
  }

  renderNutritionView = () => {
    const { data } = this.state
    return (
      <ViewX style={{ marginVertical: 15, paddingHorizontal: StyleConfig.countPixelRatio(15), }}>
        <TextX
          style={{ width: '100%' }}
          fontSize={StyleConfig.countPixelRatio(16)}
          align={'left'}
        >
          Nutrition
        </TextX>

        <ViewX style={styles.nutritionSubView}>
          <ViewX>
            <Text style={{ color: StyleConfig.grey, fontSize: 12 }}>Calories</Text>
            <TextX fontSize={StyleConfig.countPixelRatio(19)}>{data ? data.Recipe.nutrition_calories : ''}</TextX>
          </ViewX>
          <ViewX>
            <Text style={{ color: StyleConfig.grey, fontSize: 12 }}>Protein</Text>
            <TextX fontSize={StyleConfig.countPixelRatio(19)}>{data ? data.Recipe.nutrition_protein : ''}</TextX>
          </ViewX>
          <ViewX>
            <Text style={{ color: StyleConfig.grey, fontSize: 12 }}>Total Fat</Text>
            <TextX fontSize={StyleConfig.countPixelRatio(19)}>{data ? data.Recipe.nutrition_fat : ''}</TextX>
          </ViewX>
          <ViewX>
            <Text style={{ color: StyleConfig.grey, fontSize: 12 }}>Total Carbs</Text>
            <TextX fontSize={StyleConfig.countPixelRatio(19)}>{data ? data.Recipe.nutrition_carbs : ''}</TextX>
          </ViewX>
        </ViewX>
      </ViewX >
    )
  }

}

/*
..######..########.##....##.##.......########..######.
.##....##....##.....##..##..##.......##.......##....##
.##..........##......####...##.......##.......##......
..######.....##.......##....##.......######....######.
.......##....##.......##....##.......##.............##
.##....##....##.......##....##.......##.......##....##
..######.....##.......##....########.########..######.
*/

const styles = StyleSheet.create({
  headerTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: StyleConfig.countPixelRatio(12),
    marginBottom: StyleConfig.countPixelRatio(12),
    height: StyleConfig.countPixelRatio(40),
  },
  headerBottomView: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: StyleConfig.countPixelRatio(15),
    paddingVertical: StyleConfig.countPixelRatio(10),
  },
  headerContents: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: StyleConfig.countPixelRatio(12),
    paddingVertical: StyleConfig.countPixelRatio(5),
  },
  headerItemName: {
    textAlign: 'left',
    backgroundColor: 'red',
    width: '100%'
  },
  headerBtn: {
    width: 22,
    height: 22,
  },
  backBtn: {
    width: 22,
    height: 22
  },
  descriptionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: StyleConfig.countPixelRatio(15),
    paddingVertical: StyleConfig.countPixelRatio(8),
  },
  tabBtnContainer: {
    flexDirection: 'row',
    margin: StyleConfig.countPixelRatio(15),
    borderRadius: 5,
    borderColor: StyleConfig.yellow,
    borderWidth: 1.0,
    justifyContent: 'space-between'
  },
  tabBtn: {
    flex: 1,
    height: 30,
    justifyContent: 'center',
  },
  ingredientsContainer: {
    paddingHorizontal: StyleConfig.countPixelRatio(15),
    alignItems: 'flex-start',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: StyleConfig.grey,
  },
  nutritionSubView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8
  },
  shoppingCellContainer: {
    flexDirection: 'row',
    paddingLeft: StyleConfig.countPixelRatio(10),
    marginTop: StyleConfig.countPixelRatio(7),
    alignItems: 'flex-start',
  },
  operationView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: StyleConfig.countPixelRatio(15),
    marginBottom: StyleConfig.countPixelRatio(10),
    alignItems: 'flex-end',
    height: 30
  },
  iconStyle: {
    width: StyleConfig.countPixelRatio(21),
    height: StyleConfig.countPixelRatio(24)
  }
})

export default withLoader(withToast(PhotoRecipeDetails))


  // renderDescriptionView = () => {
  //   const { noOfUser, timer, foodType, data } = this.state
  //   let view = 0, likes = 0, dislike = 0, isLike = false, isDisLike = false, isBookmark = false;
  //   if (data && data.Activity.length > 0) {
  //     view = data.Activity[0].view;
  //     likes = data.Activity[0].likes;
  //     dislike = data.Activity[0].dislike;
  //     isLike = data.Recipe.like;
  //     isDisLike = data.Recipe.dislike;
  //     isBookmark = data.Recipe.bookmarked;
  //   }
  //   let resizeMode = "contain"
  //   return (
  //     <ViewX style={{ flex: 1, alignItems: 'flex-start' }}>
  //       {this.renderHeaderBottomView()}
  //       {data && data.Recipe.id != 0 && <ViewX style={styles.operationView}>
  //         <ViewX style={{ flexDirection: 'row' }}>
  //           <Image source={imgView} style={[ styles.iconStyle, {tintColor:'#8a8a8f' }]} resizeMode={resizeMode} />
  //           <TextX style={{marginLeft: StyleConfig.countPixelRatio(4)}} fontSize={StyleConfig.fontSizeH3}>{view ? view : "0"}</TextX>
  //         </ViewX>
  //         <TouchableOpacity disabled={isLike} onPress={this._postLike}>
  //           <ViewX style={{ flexDirection: 'row' }}>
  //             <Image source={imgLike} style={[ styles.iconStyle, { tintColor: isLike ? 'blue' : '#8a8a8f' }]} resizeMode={resizeMode} />
  //             <TextX style={{marginLeft: StyleConfig.countPixelRatio(4)}} fontSize={StyleConfig.fontSizeH3}>{likes ? likes : '0'}</TextX>
  //           </ViewX>
  //         </TouchableOpacity>
  //         <TouchableOpacity disabled={isDisLike} onPress={this._postDisLike}>
  //           <ViewX style={{ flexDirection: 'row' }}>
  //             <Image source={imgDisLike} style={[ styles.iconStyle, {  tintColor: isDisLike ? 'blue' : '#8a8a8f' }]} resizeMode={resizeMode} />
  //             <TextX style={{marginLeft: StyleConfig.countPixelRatio(4)}} fontSize={StyleConfig.fontSizeH3}>{dislike ? dislike : "0"}</TextX>
  //           </ViewX>
  //         </TouchableOpacity>
  //         <TouchableOpacity onPress={this._onShare}>
  //           <ViewX style={{ flexDirection: 'row' }}>
  //             <Image source={imgShare} style={ { 
  //               height: StyleConfig.countPixelRatio(23) ,
  //               width: StyleConfig.countPixelRatio(15), tintColor:'#8a8a8f' }} resizeMode={resizeMode} />
  //           </ViewX>
  //         </TouchableOpacity>
  //         <TouchableOpacity onPress={this._postFavorite}>
  //           <ViewX style={{ flexDirection: 'row' }}>
  //             <Image source={imgFav} style={{ width: 25, height: 25, marginRight: 3, tintColor: isBookmark ? 'blue' : '#8a8a8f' }} resizeMode={resizeMode} />
  //             {/* <TextX fontSize={StyleConfig.countPixelRatio(12)}>960</TextX> */}
  //           </ViewX>
  //         </TouchableOpacity>

  //       </ViewX>
  //       }
  //       <TextX
  //         fontSize={StyleConfig.countPixelRatio(14)}
  //         style={{ marginLeft: 15 }}
  //         align={'left'}
  //       >{data ? data.Recipe.description : ''}
  //       </TextX>
  //     </ViewX>
  //   )
  // }
