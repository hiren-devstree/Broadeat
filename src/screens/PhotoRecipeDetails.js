// Global Imports
import React, { Component } from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity,
  ScrollView, FlatList, Text, Alert
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

// File Imports
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';
import StyleConfig from '../assets/styles/StyleConfig';
import { getRcipeDetails, postFavorite } from './../apiManager'

// Component Imports
import {
  SafeAreaView, ViewX, TextX
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
import imgRemoveCircle from '../assets/images/ic_removeCircle.png'

class PhotoRecipeDetails extends Component {
  constructor(props) {
    super(props)

    console.disableYellowBox = true

    this.state = {
      noOfUser: 2,
      timer: '15-20',
      foodType: 'Vegetarian',
      selectedTab: 1,
      data: undefined, 
      token:null
    }
  }

  componentDidMount() {
    let id = this.props.route.params.data
    console.log('dataaaaaaa ', id)
    this._getRecipeDetailsAPICalling(id)
  }
componentWillUnmount=async ()=>{
  this.state = {
    noOfUser: 0,
    timer: '',
    foodType: '',
    selectedTab:1,
    data: undefined, 
    token:null
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

  _getRecipeDetailsAPICalling = async (id) => {
    const { loader } = this.props
    let token = await AsyncStorage.getItem('user_token')

    let data = {
      id: id
    }
    loader(true)
    let response = await getRcipeDetails(data, token)
    loader(false)
    console.log(response)
    if (response.code === 1) {
      this.setState({ data: response.data, token }, () => {
        this.forceUpdate()
      })
    } else {
      setTimeout(() => {
        Alert.alert(response.message)
      }, 500)
    }
  }
  _postLike= async () =>{
    const { loader } = this.props
    let {data, token} = this.state ;
    if(token == null){
      token = await AsyncStorage.getItem('user_token')
    }
    console.log({data,token})
    let params = {
      "rec_id":data.Recipe.id,
      "flag": "like",
      "checkdata":"like"
    }
    console.log({params})
    loader(true)
    let response = await postFavorite(params, token)
    loader(false)
    console.log(response)
    if (response.code === 1) {
      data.Activity.likes = 1
      this.setState({ data })
    } else {
      setTimeout(() => {
        Alert.alert(response.message)
      }, 500)
    }
  }

  
  _postDisLike= async () =>{
    const { loader } = this.props
    let {data, token} = this.state ;
    if(token == null){
      token = await AsyncStorage.getItem('user_token')
    }
    console.log({data,token})
    let params = {
      "rec_id":data.Recipe.id,
      "flag": "dislike",
      "checkdata":"like"
    }
    console.log({params})
    loader(true)
    let response = await postFavorite(params, token)
    loader(false)
    console.log(response)
    if (response.code === 1) {
      data.Activity.dislike = 1 
      this.setState({ data })
    } else {
      setTimeout(() => {
        Alert.alert(response.message)
      }, 500)
    }
  }

  _postFavorite= async () =>{
    const { loader } = this.props
    let {data, token} = this.state ;
    if(token == null){
      token = await AsyncStorage.getItem('user_token')
    }
    console.log({data,token})
    let params = {
      "rec_id":data.Recipe.id,
      "flag": data.Activity.favorite == 0 ? "favorite" : "unfavorite",
      "checkdata":"favorite"
    }
    console.log({params})
    loader(true)
    let response = await postFavorite(params, token)
    loader(false)
    console.log(response)
    if (response.code === 1) {
      data.Activity.favorite = data.Activity.favorite == 0 ? 1 : 0 
      
      Alert.alert(
        data.Activity.favorite == 0 ? "Recipe removed from bookmark" :"Recipe added to bookmark",
        "",
              [{
                onPress: this.setState({ data }),
                text: 'Okay', 
                
              }],
              { cancelable: false }
            )
    } else {
      setTimeout(() => {
        Alert.alert(response.message)
      }, 500)
    }
  }

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
    const { selectedTab } = this.state
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
      </SafeAreaView>
    )
  }

  renderHeaderView = () => {
    const { data } = this.state
    return (
      <>
        <ViewX style={styles.headerTopView}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={imgBack} style={styles.backBtn} />
          </TouchableOpacity>
          <TextX
            fontSize={StyleConfig.countPixelRatio(16)}
          >
            {data ? data.Recipe.creator_name : ''}
          </TextX>
          <ViewX>
            <TouchableOpacity>
              <Image source={imgMenu} style={styles.headerBtn} resizeMode='contain' />
            </TouchableOpacity>
          </ViewX>
        </ViewX>
      </>
    )
  }

  renderHeaderBottomView = () => {
    const { noOfUser, timer, foodType, data } = this.state

    return (
      <ViewX style={styles.headerBottomView} {...this.props}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Bookmark')}>
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
              <TextX style={{ marginLeft: 15 }}>{foodType}</TextX>
            </ViewX>
          </ViewX>
        </ViewX>
      </ViewX>
    )
  }

  renderItemMainImage = () => {
    const { data } = this.state

    return (
      <Image
        style={{ width: StyleConfig.width * 1, height: StyleConfig.convertHeightPerVal(205) }}
        resizeMode='cover'
        source={{ uri: data ? data.Recipe.image : undefined }}
      />
    )
  }

  renderDescriptionView = () => {
    const { noOfUser, timer, foodType, data } = this.state
    console.log({data})

    return (
      <ViewX style={{ flex: 1, alignItems: 'flex-start' }}>
        {this.renderHeaderBottomView()}
        <ViewX style={styles.operationView}>
          <ViewX style={{ flexDirection: 'row' }}>
            <Image source={imgView} style={{ width: 25, height: 25, marginRight: 3 }} resizeMode='contain' />
            <TextX fontSize={StyleConfig.countPixelRatio(12)}>{data ? data.Activity.view : 0}</TextX>
          </ViewX>
          <TouchableOpacity onPress={this._postLike }>
          <ViewX style={{ flexDirection: 'row' }}>
            <Image source={imgLike} style={{ width: 25, height: 25, marginRight: 3, tintColor: data && data.Activity.likes == 0 ? '#555' : 'blue' }} resizeMode='contain' />
            <TextX fontSize={StyleConfig.countPixelRatio(12)}>{data ? data.Activity.likes : 0}</TextX>
          </ViewX>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._postDisLike }>
          <ViewX style={{ flexDirection: 'row' }}>
            <Image source={imgDisLike} style={{ width: 25, height: 25, marginRight: 3, marginTop: 4, tintColor: data && data.Activity.dislike == 0 ? '#555' : 'blue'}} resizeMode='contain' />
            <TextX fontSize={StyleConfig.countPixelRatio(12)}>{data ? data.Activity.dislike : 0}</TextX>
          </ViewX>
          </TouchableOpacity>
          <ViewX style={{ flexDirection: 'row' }}>
            <Image source={imgShare} style={{ width: 25, height: 25, marginRight: 3, }} resizeMode='contain' />
            {/* <TextX fontSize={StyleConfig.countPixelRatio(12)}>960</TextX> */}
          </ViewX>
          <TouchableOpacity onPress={this._postFavorite }>
            <ViewX style={{ flexDirection: 'row' }}>
              <Image source={imgFav} style={{ width: 25, height: 25, marginRight: 3, tintColor: data && data.Activity.favorite == 0 ? '#555' : 'blue' }} resizeMode='contain' />
              {/* <TextX fontSize={StyleConfig.countPixelRatio(12)}>960</TextX> */}
            </ViewX>
          </TouchableOpacity>

        </ViewX>
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
  }
})

export default withLoader(withToast(PhotoRecipeDetails))