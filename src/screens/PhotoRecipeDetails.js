// Global Imports
import React, { Component } from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity,
  ScrollView, FlatList, Text
} from 'react-native'

// File Imports
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';
import StyleConfig from '../assets/styles/StyleConfig';

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
    return (
      <>
        <ViewX style={styles.headerTopView}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={imgBack} style={styles.backBtn} />
          </TouchableOpacity>
          <TextX
            fontSize={StyleConfig.countPixelRatio(16)}
          >
            {'Gourmet Kitchen'}
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
    const { noOfUser, timer, foodType } = this.state
    return (
      <ViewX style={styles.headerBottomView} {...this.props}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Bookmark')}>
          <Image source={imgFood} />
        </TouchableOpacity>
        <ViewX style={styles.headerContents}>
          <TextX
            fontSize={StyleConfig.countPixelRatio(20)}
            align={'left'}
          >
            {'Tomato & Broccoli Conchi Pasta'}
          </TextX>
          <ViewX style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <TextX
              fontSize={StyleConfig.countPixelRatio(16)}
              align={'left'}
              color={'#747373'}
            >
              {'Gourmet Kitchen'}
            </TextX>
            <ViewX style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.navigate('Profile')}>
                <Image source={imgUser} style={{ width: 12, height: 12, marginRight: 3 }} />
                <TextX>{noOfUser}</TextX>
              </TouchableOpacity>
              <Image source={imgTimer} style={{ width: 15, height: 15, marginLeft: 15, marginRight: 3 }} />
              <TextX>{timer}</TextX>
              <TextX style={{ marginLeft: 15 }}>{foodType}</TextX>
            </ViewX>
          </ViewX>
        </ViewX>
      </ViewX>
    )
  }

  renderItemMainImage = () => {
    return (
      <Image
        style={{ width: StyleConfig.width * 1, height: StyleConfig.convertHeightPerVal(205) }}
        resizeMode='cover'
        source={this.props.route.params.data}
      />
    )
  }

  renderDescriptionView = () => {
    const { noOfUser, timer, foodType } = this.state
    return (
      <ViewX style={{ flex: 1, alignItems: 'flex-start' }}>
        {this.renderHeaderBottomView()}
        <ViewX style={styles.operationView}>
          <ViewX style={{ flexDirection: 'row' }}>
            <Image source={imgView} style={{ width: 25, height: 25, marginRight: 3 }} resizeMode='contain' />
            <TextX fontSize={StyleConfig.countPixelRatio(12)}>960</TextX>
          </ViewX>

          <ViewX style={{ flexDirection: 'row' }}>
            <Image source={imgLike} style={{ width: 25, height: 25, marginRight: 3 }} resizeMode='contain' />
            <TextX fontSize={StyleConfig.countPixelRatio(12)}>960</TextX>
          </ViewX>

          <ViewX style={{ flexDirection: 'row' }}>
            <Image source={imgDisLike} style={{ width: 25, height: 25, marginRight: 3, marginTop: 4, }} resizeMode='contain' />
            <TextX fontSize={StyleConfig.countPixelRatio(12)}>960</TextX>
          </ViewX>
          <ViewX style={{ flexDirection: 'row' }}>
            <Image source={imgShare} style={{ width: 25, height: 25, marginRight: 3 }} resizeMode='contain' />
            <TextX fontSize={StyleConfig.countPixelRatio(12)}>960</TextX>
          </ViewX>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <ViewX style={{ flexDirection: 'row' }}>
              <Image source={imgFav} style={{ width: 25, height: 25, marginRight: 3 }} resizeMode='contain' />
              <TextX fontSize={StyleConfig.countPixelRatio(12)}>960</TextX>
            </ViewX>
          </TouchableOpacity>

        </ViewX>
        <TextX
          fontSize={StyleConfig.countPixelRatio(14)}
          style={{ marginLeft: 15 }}
          align={'left'}
        >{'Comforting and satisfying without being too heavy, making them a great choice.'}
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
    return (
      <FlatList
        scrollEnabled={false}
        contentContainerStyle={{ paddingHorizontal: StyleConfig.countPixelRatio(15) }}
        ListFooterComponent={this.renderNutritionView}
        keyExtractor={this._keyExtractor}
        data={[1, 1, 1, 1]}
        renderItem={this.renderIngredientCellView}
      />
    )
  }

  renderIngredientCellView = () => {
    return (
      <>
        <ViewX style={{ flexDirection: 'row', paddingLeft: StyleConfig.countPixelRatio(10), marginTop: StyleConfig.countPixelRatio(7) }}>
          <TouchableOpacity>
            <Image source={imgAddCircle} style={{ width: 17, height: 17, marginRight: 3 }} />
          </TouchableOpacity>
          <TextX
            style={{ width: '35%' }}
            align='left'
            fontSize={StyleConfig.countPixelRatio(16)}
          >{'2 tablespoon'}
          </TextX>
          <TextX
            style={{ flex: 1 }}
            align='left'
            fontSize={StyleConfig.countPixelRatio(16)}
          >{'Olive Oil'}
          </TextX>
        </ViewX>
        <ViewX style={styles.shoppingCellContainer}>
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
        </ViewX>
      </>
    )
  }

  renderMethodListView = () => {
    return (
      <FlatList
        scrollEnabled={false}
        contentContainerStyle={{ paddingHorizontal: StyleConfig.countPixelRatio(15), marginTop: 15 }}
        // ListHeaderComponent={this.renderShoppingListHeader}
        keyExtractor={this._keyExtractor}
        data={[1, 1, 1, 1]}
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
        >{'Lorem ipsum dolor sit amet, consectetur adipisicin'}
        </TextX>
      </ViewX>
    )
  }

  renderNutritionView = () => {
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
            <TextX fontSize={StyleConfig.countPixelRatio(19)}>470</TextX>
          </ViewX>
          <ViewX>
            <Text style={{ color: StyleConfig.grey, fontSize: 12 }}>Protein</Text>
            <TextX fontSize={StyleConfig.countPixelRatio(19)}>40g</TextX>
          </ViewX>
          <ViewX>
            <Text style={{ color: StyleConfig.grey, fontSize: 12 }}>Total Fat</Text>
            <TextX fontSize={StyleConfig.countPixelRatio(19)}>25g</TextX>
          </ViewX>
          <ViewX>
            <Text style={{ color: StyleConfig.grey, fontSize: 12 }}>Total Carbs</Text>
            <TextX fontSize={StyleConfig.countPixelRatio(19)}>12g</TextX>
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