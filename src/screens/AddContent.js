
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView,
  ScrollView, TextInput, TextInputProps, TouchableWithoutFeedback, Alert
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';
import AsyncStorage from '@react-native-community/async-storage'
import DropDownPicker from 'react-native-dropdown-picker'
import Icon from 'react-native-vector-icons/Feather'
import Video from 'react-native-video';
import AppImages from '../assets/images';
import StyleConfig from '../assets/styles/StyleConfig';
import { SafeAreaView, TextX, ViewX, CTextColor } from '../components/common';
import FoodResultRow from '../components/common/FoodResultRow';
import styled, { withTheme, ThemeConsumer } from 'styled-components';
import { CommonActions } from '@react-navigation/native';
import { addContentApiCalling, getTagList } from './../apiManager'
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import imgBack from '../assets/images/ic_back.png'
const HASH_TAGS = [
  { _id: 1, name: "Pastas", isSelected: false },
  { _id: 2, name: "Salads", isSelected: false },
  { _id: 3, name: "Desserts", isSelected: false },
  { _id: 4, name: "Vegetarian", isSelected: false }
]

const AddX = withTheme(({ theme }) => <Octicons name={"plus"} size={StyleConfig.countPixelRatio(30)} color={theme.text} />)

const IngredientTextInput = (props: TextInputProps) => <InputTextX {...props} >{props.children}</InputTextX>

const InputTextX = styled.TextInput`
    paddingVertical: ${StyleConfig.convertHeightPerVal(4)}px;
    font-size: ${StyleConfig.fontSizeH2_3}px;
    color:${props => props.theme.text2};
    text-align: center;
    border-width: 0.5px;
    border-color: ${props => props.theme.borderAlt2};

`
const MultiTextInputX = (props: TextInputProps) => <MultiTextInput multiline {...props}>{props.children}</MultiTextInput>
const MultiTextInput = styled.TextInput`
    color: ${props => props.theme.text};
    border-radius: ${StyleConfig.convertHeightPerVal(10)}px;
    paddingVertical: ${StyleConfig.convertHeightPerVal(10)}px;
    font-size: ${StyleConfig.fontSizeH2_3}px;
    background: ${props => props.theme.tabBackground};
    padding: 10px;
`

const IngredientsWrapper = withTheme(({ item, theme, idx, showBackground, _onChangeIngredients, ...props }) => {
  return (<ViewX style={{
    flex: 1,
    marginVertical: StyleConfig.convertHeightPerVal(2),
    paddingVertical: StyleConfig.convertHeightPerVal(4),
    paddingHorizontal: StyleConfig.convertHeightPerVal(12),
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: showBackground ? "#ffffff2f" : "#00000000"
  }} >
    <IngredientTextInput
      style={{
        width: StyleConfig.convertWidthPerVal(40),
        backgroundColor: theme.tabBackground,
        color: theme.textInputBac2
      }}
      placeholder={"Qty"}
      placeholderTextColor={theme.textHint}
      value={item.qty}
      onChangeText={(text) => _onChangeIngredients(idx, 'q', text)}
    />
    <IngredientTextInput
      style={{
        width: StyleConfig.convertWidthPerVal(StyleConfig.width / 3.9),
        textAlign: "center",
        backgroundColor: theme.tabBackground,
        color: theme.textInputBac2
      }}
      placeholder={"Measure"}
      placeholderTextColor={theme.textHint}
      value={item.measuremnt}
      onChangeText={(text) => _onChangeIngredients(idx, 'm', text)}
    />
    <IngredientTextInput
      style={{
        width: StyleConfig.convertWidthPerVal(StyleConfig.width / 3.2),
        textAlign: "center",
        backgroundColor: theme.tabBackground,
        color: theme.textInputBac2
      }}
      placeholder={"Ingredient"}
      placeholderTextColor={theme.textHint}
      value={item.ingredient}
      onChangeText={(text) => _onChangeIngredients(idx, 'i', text)}
    />
  </ViewX>)
})

const MethodWrapper = withTheme(({ desc, theme, idx, _onChangeMethods, ...props }) => {
  return (
    <ViewX style={{
      flex: 1,
      marginVertical: StyleConfig.convertHeightPerVal(2),
      alignItems: "flex-start",
    }} >

      <TextX
        style={{
          textAlign: "left",
          color: theme.text,
          fontSize: StyleConfig.fontSizeH3_4,
          padding: StyleConfig.convertWidthPerVal(10),
          //paddingVertical: StyleConfig.convertHeightPerVal(10),
        }}
      >Step {idx + 1}</TextX>
      <MultiTextInputX
        style={{
          minHeight: StyleConfig.convertHeightPerVal(50),
          marginHorizontal: StyleConfig.convertWidthPerVal(12),
          marginBottom: StyleConfig.convertWidthPerVal(10),
          width: StyleConfig.width - StyleConfig.convertWidthPerVal(24)
        }}
        value={desc}
        onChangeText={(text) => _onChangeMethods(idx, text)}
      />
    </ViewX>
  )
})

const FilterBubble = withTheme(({ theme, ...props }) => {
  const { name, onPress, isSelected } = props
  return (
    <TouchableWithoutFeedback onPress={onPress} >
      <ViewX style={{
        borderRadius: StyleConfig.convertWidthPerVal(20),
        padding: StyleConfig.convertWidthPerVal(10),
        margin: StyleConfig.convertWidthPerVal(5),
        backgroundColor: isSelected ? theme.filterOn : theme.filterOff
      }} >
        <TextX style={{ fontWeight: "bold", fontSize: StyleConfig.fontSizeH3 }} >{name}</TextX>
      </ViewX>
    </TouchableWithoutFeedback>
  )
})
class AddContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      ingredients: [{ qty: '', measuremnt: '', ingredient: '' }],
      methods: [{ text: '' }],
      title: '',
      description: '',
      mealPreference: 'vegetarian',
      noOfPerson: '',
      nutritionCalories: '',
      nutritionProtein: '',
      nutritionFat: '',
      nutritionCarbs: '',
      timeDuration: '',
      tagData: [],
      hashTag: HASH_TAGS,
      id: null
    }
  }


  componentDidMount = async () => {
    const _ = this.props.route.params;
    const { loader } = this.props;
    console.log({ params: this.props.route.params })
    let token = await AsyncStorage.getItem('user_token')

    let response = await getTagList(token)
    let tempArr = []
    let images = [];

    if (_.hasOwnProperty('mode') && _.mode == "edit") {
      images.push({ uri: _.data.Recipe.image, type: _.data.Recipe.image_type })
      for (let ind in _.data.Media) {
        images.push({
          uri: _.data.Media[ind].media_name,
          id: _.data.Media[ind].id, type: _.data.Media[ind].media_type
        })
      }

      response.data.category_list.forEach(item => {
        let temp = []
        let tags = _.data.Rac_Tag;
        response.data.tag_list[`${item.category_type}`].forEach((ele) => {
          let isSelected = false;
          for (let ind in tags) {
            if (tags[ind].category_type == item.category_type && tags[ind].tag_name == ele.tag_name) {
              isSelected = true;
            }
          }
          temp.push({ ...ele, isSelected })
        })
        tempArr.push({ title: item.category_type, data: temp })
      })
      let ingredients = _.data.Rec_Ingredient.map((item, ind) => ({ qty: item.quantity, measuremnt: item.measure, ingredient: item.ingredient }))
      let methods = _.data.Method.map((item, ind) => ({ text: item.method_description }));
      let hashTags = _.data.recipe_hashtags;
      let hashTag = [];
      for (let ind in HASH_TAGS) {
        let isSelected = false
        for (let ind2 in hashTags) {
          if (HASH_TAGS[ind].name == hashTags[ind2].hashtag_name) {
            isSelected = true;
          }
        }
        hashTag.push({
          ...HASH_TAGS[ind],
          isSelected
        })
      }
      const { meal_preference: mealPreference,
        no_of_person: noOfPerson,
        nutrition_calories: nutritionCalories,
        nutrition_carbs: nutritionCarbs,
        nutrition_fat: nutritionFat,
        nutrition_protein: nutritionProtein,
        time_duration: timeDuration,
        id
      } = _.data.Recipe

      this.setState({
        id,
        title: _.data.Recipe.recipe_title,
        description: _.data.Recipe.description == null ? '' : _.data.Recipe.description,
        ingredients,
        methods,
        mealPreference,
        noOfPerson: noOfPerson.toString(),
        nutritionCalories,
        nutritionCarbs,
        nutritionFat,
        nutritionProtein,
        timeDuration,
        hashTag,
        images: images,
        tagData: tempArr
      })
    } else {
      images = _.images
      response.data.category_list.forEach(item => {
        let temp = []
        response.data.tag_list[`${item.category_type}`].forEach((ele) => {
          temp.push({ ...ele, isSelected: false })
        })
        tempArr.push({ title: item.category_type, data: temp })
      })
      this.setState({ images: images, tagData: tempArr })
    }

  }

  onAddPress = () => {
    let images = this.state.images;
    const options = {
      mediaType: 'mixed'
    };

    ImagePicker.launchImageLibrary(options, (image) => {
      console.log({ image })
      if (image.didCancel == true) {

      } else {
        images.push(image)
        this.setState({ images })
      }

    });
  }

  _onChangeIngredients = (index, type, text) => {
    const { ingredients } = this.state
    let tempArr = ingredients

    if (type === 'q') {
      tempArr[index].qty = text
    } else if (type === 'm') {
      tempArr[index].measuremnt = text
    } else {
      tempArr[index].ingredient = text
    }

    this.setState({ ingredients: tempArr })
  }

  _onChangeMethods = (index, text) => {
    const { methods } = this.state
    let tempMethod = methods

    tempMethod[index].text = text
    this.setState({ methods: tempMethod }, () => {
      console.log(this.state.methods)
    })
  }
  showAlert = (msg) => Alert.alert(msg)
  _doneButtonPressed = async () => {
    const {
      ingredients, methods, images, title, description,
      mealPreference, noOfPerson, nutritionCalories,
      nutritionProtein, nutritionFat, nutritionCarbs, timeDuration,
      tagData, hashTag
    } = this.state
    const { loader } = this.props
    let token = await AsyncStorage.getItem('user_token')
    let hasError = false;
    let selectedTag = [];

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "multipart/form-data");

    var formdata = new FormData();
    if (title.length == 0) {
      hasError = true;
      this.showAlert("Please Enter Title")
      return;
    }
    formdata.append("recipe_title", title);
    formdata.append("meal_preference", mealPreference);

    // if(description.length == 0){
    //   hasError = true ;
    //   this.showAlert("Please Enter Description")
    //   return ;
    // }
    if (description.length != 0) {
      formdata.append("description", description);
    }
    let hasAnyIngredients = false;
    ingredients.forEach((item, index) => {
      if (item.qty.length > 0 || item.measuremnt.length > 0 || item.ingredient.length > 0) {
        hasAnyIngredients = true;
        formdata.append(`recipe_ingredients[${index}][quantity]`, item.qty)
        formdata.append(`recipe_ingredients[${index}][measure]`, String(item.measuremnt))
        formdata.append(`recipe_ingredients[${index}][ingredient]`, String(item.ingredient))
      }

    })
    if (!hasAnyIngredients) {
      hasError = true;
      this.showAlert("Please Enter Ingredients")
      return;
    }

    let hasAnyMethod = false;
    methods.forEach((item) => {
      if (item.text.length > 0) {
        hasAnyMethod = true;
        formdata.append("recipe_method[]", item.text)
      }
    })
    if (!hasAnyMethod) {
      hasError = true;
      this.showAlert("Please Enter Cooking Method.")
      return;
    }

    // if(nutritionCalories.length == 0 ){
    //   hasError = true ;
    //   this.showAlert("Please Enter Nutrition Calories")
    //   return ;
    // } else  if(Number(nutritionCalories).toString() == "NaN" ){
    //   hasError = true ;
    //   this.showAlert("Please Enter Valid Nutrition Calories")
    //   return ;
    // }
    if (nutritionCalories.length != 0 && Number(nutritionCalories).toString() != "NaN") {
      formdata.append("nutrition_calories", nutritionCalories)
    }


    // if(nutritionProtein.length == 0 ){
    //   hasError = true ;
    //   this.showAlert("Please Enter Nutrition Protein")
    //   return ;
    // } else  if(Number(nutritionProtein).toString() == "NaN" ){
    //   hasError = true ;
    //   this.showAlert("Please Enter Valid Nutrition Protein")
    //   return ;
    // }
    if (nutritionProtein.length != 0 && Number(nutritionProtein).toString() != "NaN") {
      formdata.append("nutrition_protein", nutritionProtein)
    }

    // if(nutritionFat.length == 0 ){
    //   hasError = true ;
    //   this.showAlert("Please Enter Nutrition Fat")
    //   return ;
    // } else  if(Number(nutritionFat).toString() == "NaN" ){
    //   hasError = true ;
    //   this.showAlert("Please Enter Valid Nutrition Fat")
    //   return ;
    // }
    if (nutritionFat.length != 0 && Number(nutritionFat).toString() != "NaN") {
      formdata.append("nutrition_fat", nutritionFat)
    }

    // if(nutritionCarbs.length == 0 ){
    //   hasError = true ;
    //   this.showAlert("Please Enter Nutrition Carbs")
    //   return ;
    // } else  if(Number(nutritionCarbs).toString() == "NaN" ){
    //   hasError = true ;
    //   this.showAlert("Please Enter Valid Nutrition Carbs")
    //   return ;
    // }
    if (nutritionCarbs.length != 0 && Number(nutritionCarbs).toString() != "NaN") {
      formdata.append("nutrition_carbs", nutritionCarbs)
    }

    // if(timeDuration.length == 0 ){
    //   hasError = true ;
    //   this.showAlert("Please Enter Time Duration")
    //   return ;
    // } 

    if (timeDuration.length > 0) {
      formdata.append("time_duration", timeDuration.length == 0 ? '' : timeDuration);
    }

    // if(noOfPerson.length == 0 ){
    //   hasError = true ;
    //   this.showAlert("Please Enter No Of Person")
    //   return ;
    // } else  if(Number(noOfPerson).toString() == "NaN" ){
    //   hasError = true ;
    //   this.showAlert("Please Enter Valid No Of Person")
    //   return ;
    // }

    if (noOfPerson.length != 0 && Number(noOfPerson).toString() != "NaN") {
      formdata.append("no_of_person", noOfPerson)
    }

    for (let groupInd in tagData) {
      let groupData = tagData[groupInd].data
      for (let ind in groupData) {
        if (groupData[ind].isSelected) {
          selectedTag.push(groupData[ind].id);
        }
      }
    }

    if (selectedTag.length == 0) {
      // hasError = true ;
      // this.showAlert("Please Select one Tag")
      // return ;
    } else {
      for (let ind in selectedTag) {
        formdata.append("recipe_tags[]", String(selectedTag[ind]));
      }
    }

    let selectedHashTag = hashTag.filter((item) => item.isSelected == true);
    if (selectedHashTag.length == 0) {
      // hasError = true ;
      // this.showAlert("Please Select one Hash Tag")
      // return ;
    } else {
      for (let ind in selectedHashTag) {
        formdata.append("recipe_hashtags[]", String(selectedHashTag[ind].name));
      }
    }
    let recipe_media = []
    let mainImage = null;
    for (let ind in images) {
      if (images[ind].uri != '' && !images[ind].uri.startsWith("http://")) {
        let IMAGE_CROP = images[ind].uri.slice(images[ind].uri.lastIndexOf("/"));
        let videoMime = images[ind].uri.slice(images[ind].uri.lastIndexOf("."));
        let myImage = StyleConfig.isIphone ?
          { "uri": images[ind].uri, "filename": IMAGE_CROP, "name": IMAGE_CROP } :
          { "uri": images[ind].uri, "name": IMAGE_CROP, "type": images[ind].type ? images[ind].type : `video/${videoMime}` };
        if (mainImage == null && this.state.id == null) {
          mainImage = myImage;
          formdata.append("image", myImage)
        } else {
          formdata.append("recipe_media[]", myImage)
        }
      }
    }
    if (!hasError) {
      loader(true)
      let url;
      if (this.state.id == null) {
        url = "http://3.20.100.25/broadeat/api/recipe/add";
      } else {
        formdata.append("id", this.state.id)
        url = "http://3.20.100.25/broadeat/api/recipe/update";
      }
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          "Accept": "application/json"
        },
        body: formdata
      });
      console.log({ response })
      loader(false)
      const json = await response.json();
      console.log(`Add Receipe: ${JSON.stringify(json)}`);
      if (json.code == 1 && json.code == '1') {
        setTimeout(() => {
          Alert.alert(
            this.state.id == null ? "Receipe Added Successfully" : "Recipe updated successfully",
            "",
            [
              {
                text: "OK", onPress: () => {
                  this.props.navigation.dispatch(CommonActions.reset({
                    index: 1, routes: [{
                      name: 'PreviewReceipe', params: {
                        data: json.data.id, backKey: "AddContent"
                      }
                    }]
                  }))
                }
              }

            ],
            { cancelable: false }
          );
        }, 500)


      } else {
        Alert.alert(json.message)
      }
    }
  }
  _onPreview = () => {
    const {
      ingredients, methods, images, title, description,
      mealPreference, noOfPerson, nutritionCalories,
      nutritionProtein, nutritionFat, nutritionCarbs, timeDuration,
      tagData, hashTag
    } = this.state
    let Method = [];
    for (let ind in methods) {
      Method.push({
        "method_step": Number(ind) + 1,
        "method_description": methods[ind].text
      })
    }
    let Rac_Tag = []
    for (let ind in tagData) {
      for (let subInd in tagData[ind].data) {
        if (tagData[ind].data[subInd].isSelected) {
          Rac_Tag.push({
            "category_type": tagData[ind].title,
            "tag_name": tagData[ind].data[subInd].tag_name
          });
        }
      }
    }
    let Rec_Ingredient = [];
    for (let ind in ingredients) {
      Rec_Ingredient.push({
        "ingredient": ingredients[ind].ingredient,
        "quantity": ingredients[ind].qty,
        "measure": ingredients[ind].measuremnt
      })
    }
    let data = {
      "Recipe": {
        "id": 0,
        "user_id": 0,
        "recipe_title": title,
        "image": images[0].uri,
        "meal_preference": mealPreference,
        "description": description,
        "nutrition_calories": nutritionCalories.length > 0 ? nutritionCalories : null,
        "nutrition_protein": nutritionProtein.length > 0 ? nutritionProtein : null,
        "nutrition_fat": nutritionFat.length > 0 ? nutritionFat : null,
        "nutrition_carbs": nutritionCarbs.length > 0 ? nutritionCarbs : null,
        "time_duration": timeDuration,
        "no_of_person": noOfPerson,
        "creator_name": "",
        "creator_profilepic": images[0].uri,
        "like": false,
        "dislike": false,
        "bookmarked": true,
        "comment_count": 0
      },
      "Media": [],
      "Method": Method,
      "Rac_Tag": Rac_Tag,
      "Rec_Ingredient": Rec_Ingredient,
      "Activity": [],
      "Activity_data": []
    }
    this.props.navigation.navigate("PreviewReceipe", { data: 0, ReceipeData: data });

  }
  render() {
    const { ingredients, methods, images } = this.state;
    const { theme } = this.props;
    console.log({ images })
    return (
      <SafeAreaView {...this.props}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={{ flex: 1 }}>

          <ViewX style={styles.headerTopView}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <CTextColor
                align={'left'}
                color={theme.text}
                fontSize={StyleConfig.countPixelRatio(16)}
                style={{ marginLeft: 15 }}
              >
                {'Cancel'}
              </CTextColor>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onAddPress}>
              <Image source={AppImages.ic_add} style={[styles.backBtn, { tintColor: theme.text }]} />
            </TouchableOpacity>

          </ViewX>
          <ScrollView style={{ flex: 1, paddingBottom: 20 }}>


            <ViewX style={{
              paddingVertical: 5,
              width: StyleConfig.width,
              flexWrap: "wrap",
              justifyContent: "flex-start",
              flexDirection: "row"
            }} >
              {
                images.map((itm, idx) => <ViewX
                  style={{
                    borderRadius: 2,
                    width: StyleConfig.convertWidthPerVal(120),
                    height: StyleConfig.convertWidthPerVal(120)
                  }}>
                  {
                    itm && itm.type == "video" ?
                      <View>
                        <Video
                          ref={(ref) => {
                            this[`player${idx}`] = ref
                          }}
                          onLoad={() => { this[`player${idx}`].seek(0) }}
                          resizeMode={'contain'}
                          repeat={false}
                          controls={true}
                          playInBackground={false}
                          paused={true}
                          style={{ width: "95%", height: "95%" }}
                          source={{ uri: itm.uri }}
                        />
                        <View style={{ height: "95%", position: 'absolute', flex: 1, alignSelf: 'center', justifyContent: 'center', zIndex: 99 }}>
                          <FontAwesome5 name='play' color={'#ffffffda'} size={StyleConfig.countPixelRatio(32)} />
                        </View>
                      </View>

                      :
                      <Image
                        key={`images-${idx}`}
                        style={{ width: "95%", height: "95%" }}
                        source={{ uri: itm.uri }}
                      />
                  }
                </ViewX>)
              }

            </ViewX>
            <TextInput
              style={{
                color: theme.text,
                fontSize: StyleConfig.fontSizeH2_3,
                padding: StyleConfig.convertWidthPerVal(10)
              }}
              placeholderTextColor={theme.textHint}
              value={this.state.title}
              onChangeText={(title) => this.setState({ title })}
              placeholder={"Write a title..."}

            />
            <TextInput
              multiline
              style={{
                color: theme.text,
                fontSize: StyleConfig.fontSizeH2_3,
                padding: StyleConfig.convertWidthPerVal(10)
              }}
              value={this.state.description}
              placeholderTextColor={theme.textHint}
              onChangeText={(description) => this.setState({ description })}
              placeholder={"Description"}
            />

            <TextX
              style={{
                textAlign: "left",
                color: theme.text,
                fontSize: StyleConfig.fontSizeH2_3,
                paddingHorizontal: StyleConfig.convertWidthPerVal(12),
                paddingTop: StyleConfig.convertWidthPerVal(12)
              }}
            >Add Ingredients</TextX>
            <ViewX style={{
              flex: 1,
              paddingHorizontal: StyleConfig.convertWidthPerVal(12),
              paddingVertical: StyleConfig.convertWidthPerVal(8),
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row"
            }} >
              <TextX style={{
                width: StyleConfig.convertWidthPerVal(40),
                textAlign: 'left',
                fontSize: StyleConfig.fontSizeH2_3
              }}>Qty</TextX>
              <TextX style={{
                // flex: 1,
                textAlign: 'left',
                width: StyleConfig.convertWidthPerVal(StyleConfig.width / 3.9),
                fontSize: StyleConfig.fontSizeH2_3
              }} >Measure</TextX>
              <TextX style={{
                // flex: 1,
                textAlign: 'left',
                width: StyleConfig.convertWidthPerVal(StyleConfig.width / 3.2),
                fontSize: StyleConfig.fontSizeH2_3
              }} >Ingredient</TextX>
            </ViewX>
            {
              ingredients.map((item, idx) => <IngredientsWrapper item={item} showBackground={idx % 2 == 0} {...{ idx }} _onChangeIngredients={this._onChangeIngredients} />)
            }
            <TouchableWithoutFeedback onPress={() => {
              this.setState((prevState, props) => {
                return {
                  ingredients: [...prevState.ingredients, {
                    qty: '',
                    measuremnt: '',
                    ingredient: ''
                  }]
                }
              })
            }} >
              <TextX
                style={{
                  textAlign: "left",
                  color: theme.text,
                  fontSize: StyleConfig.fontSizeH1,
                  padding: StyleConfig.convertWidthPerVal(10),
                  paddingVertical: StyleConfig.convertHeightPerVal(10),
                }}
              >{"+"}</TextX>
            </TouchableWithoutFeedback>
            <TextX
              style={{
                textAlign: "left",
                color: theme.text,
                fontSize: StyleConfig.fontSizeH2_3,
                paddingHorizontal: StyleConfig.convertWidthPerVal(10),
                paddingVertical: StyleConfig.convertHeightPerVal(4),
              }}
            >Cooking Method</TextX>
            {/* STEPS START */}
            {
              methods.map((item, idx) => <MethodWrapper desc={item.text} {...{ idx }} _onChangeMethods={this._onChangeMethods} />)
            }
            <TouchableWithoutFeedback onPress={() => {
              this.setState((prevState, props) => {
                return {
                  methods: [...prevState.methods, { text: '' }]
                }
              })
            }} >
              <TextX
                style={{
                  textAlign: "left",
                  color: theme.text,
                  fontSize: StyleConfig.fontSizeH1,
                  padding: StyleConfig.convertWidthPerVal(10),
                  paddingVertical: StyleConfig.convertHeightPerVal(10),
                }}
              >{"+"}</TextX>
            </TouchableWithoutFeedback>
            {/* STEPS END */}

            {/* MEAL TYPE START */}

            <TextX
              style={{
                textAlign: "left",
                color: theme.text,
                fontSize: StyleConfig.fontSizeH2_3,
                padding: StyleConfig.convertWidthPerVal(10),
                paddingVertical: StyleConfig.convertHeightPerVal(10),
              }}
            >Meal Preference</TextX>
            <DropDownPicker
              items={[
                { label: 'All Meals', value: 'all_meals' },
                { label: 'Vegetarian', value: 'vegetarian' },
                { label: 'Vegan', value: 'vegan' },
              ]}
              defaultValue={this.state.mealPreference}
              containerStyle={{ height: 40, marginBottom: 0 }}
              style={{ backgroundColor: '#fafafa', marginHorizontal: 10, height: 40 }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => this.setState({
                mealPreference: item.value
              })}
            />

            {/* MEAL TYPE END */}

            {/* NO OF PERSON START */}
            <ViewX style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20
            }}>
              <TextX
                style={{
                  textAlign: "left",
                  color: theme.text,
                  fontSize: StyleConfig.fontSizeH2_3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  paddingTop: StyleConfig.convertHeightPerVal(10),
                  flex: 0.5
                }}
              >No of person</TextX>

              <TextInput
                style={{
                  color: theme.text2,
                  fontSize: StyleConfig.fontSizeH2_3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  flex: 0.5,
                  backgroundColor: theme.textInputBac2,
                  marginRight: 10,
                  borderRadius: 5,
                  borderWidth: 0.5,
                  borderColor: theme.borderAlt,
                  backgroundColor: theme.tabBackground,
                  color: theme.textInputBac2
                }}
                maxLength={3}
                keyboardType='number-pad'
                returnKeyType='done'
                placeholderTextColor={theme.textHint}
                onChangeText={(text) => this.setState({ noOfPerson: text })}
                placeholder={"No of person"}
                value={this.state.noOfPerson}
              />
            </ViewX>
            {/* NO OF PERSON END */}

            {/* TIME DURATION START */}
            <ViewX style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TextX
                style={{
                  textAlign: "left",
                  color: theme.text,
                  fontSize: StyleConfig.fontSizeH2_3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  paddingTop: StyleConfig.convertHeightPerVal(10),
                  flex: 0.5
                }}
              >Time Duration</TextX>

              <TextInput
                style={{
                  color: theme.text2,
                  fontSize: StyleConfig.fontSizeH2_3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  flex: 0.5,
                  backgroundColor: theme.textInputBac2,
                  marginRight: 10,
                  borderRadius: 5,
                  borderWidth: 0.5,
                  borderColor: theme.borderAlt,
                  backgroundColor: theme.tabBackground,
                  color: theme.textInputBac2
                }}
                placeholderTextColor={theme.textHint}
                onChangeText={(text) => this.setState({ timeDuration: text })}
                returnKeyType='done'
                placeholder={"00:00:00"}
                value={this.state.timeDuration}
              />
            </ViewX>
            {/* TIME DURATION END */}

            {/* NUTRITION CALORIES START */}
            <ViewX style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TextX
                style={{
                  textAlign: "left",
                  color: theme.text,
                  fontSize: StyleConfig.fontSizeH2_3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  paddingTop: StyleConfig.convertHeightPerVal(10),
                  flex: 0.5
                }}
              >Nutrition Calories</TextX>

              <TextInput
                style={{
                  color: theme.text2,
                  fontSize: StyleConfig.fontSizeH2_3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  flex: 0.5,
                  backgroundColor: theme.textInputBac2,
                  marginRight: 10,
                  borderRadius: 5,
                  borderWidth: 0.5,
                  borderColor: theme.borderAlt,
                  backgroundColor: theme.tabBackground,
                  color: theme.textInputBac2
                }}
                placeholderTextColor={theme.textHint}
                onChangeText={(text) => this.setState({ nutritionCalories: text })}
                keyboardType='number-pad'
                returnKeyType='done'
                placeholder={"Nutrition Calories"}
                value={this.state.nutritionCalories}
              />
            </ViewX>
            {/* NUTRITION CALORIES END */}

            {/* NUTRITION PROTEIN START */}
            <ViewX style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TextX
                style={{
                  textAlign: "left",
                  color: theme.text,
                  fontSize: StyleConfig.fontSizeH2_3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  paddingTop: StyleConfig.convertHeightPerVal(10),
                  flex: 0.5
                }}
              >Nutrition Protein</TextX>

              <TextInput
                style={{
                  color: theme.text2,
                  fontSize: StyleConfig.fontSizeH2_3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  flex: 0.5,
                  backgroundColor: theme.textInputBac2,
                  marginRight: 10,
                  borderRadius: 5,
                  borderWidth: 0.5,
                  borderColor: theme.borderAlt,
                  backgroundColor: theme.tabBackground,
                  color: theme.textInputBac2
                }}
                placeholderTextColor={theme.textHint}
                onChangeText={(text) => this.setState({ nutritionProtein: text })}
                keyboardType='number-pad'
                returnKeyType='done'
                placeholder={"Nutrition Protein"}
                value={this.state.nutritionProtein}
              />
            </ViewX>
            {/* NUTRITION PROTEIN END */}

            {/* NUTRITION FAT START */}
            <ViewX style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TextX
                style={{
                  textAlign: "left",
                  color: theme.text,
                  fontSize: StyleConfig.fontSizeH2_3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  paddingTop: StyleConfig.convertHeightPerVal(10),
                  flex: 0.5
                }}
              >Nutrition Fat</TextX>

              <TextInput
                style={{
                  color: theme.text2,
                  fontSize: StyleConfig.fontSizeH2_3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  flex: 0.5,
                  backgroundColor: theme.textInputBac2,
                  marginRight: 10,
                  borderRadius: 5,
                  borderWidth: 0.5,
                  borderColor: theme.borderAlt,
                  backgroundColor: theme.tabBackground,
                  color: theme.textInputBac2
                }}
                placeholderTextColor={theme.textHint}
                keyboardType='number-pad'
                returnKeyType='done'
                onChangeText={(text) => this.setState({ nutritionFat: text })}
                placeholder={"Nutrition Fat"}
                value={this.state.nutritionFat}
              />
            </ViewX>
            {/* NUTRITION FAT END */}

            {/* NUTRITION CARBS START */}
            <ViewX style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TextX
                style={{
                  textAlign: "left",
                  color: theme.text,
                  fontSize: StyleConfig.fontSizeH2_3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  paddingTop: StyleConfig.convertHeightPerVal(10),
                  flex: 0.5
                }}
              >Nutrition Carbs</TextX>

              <TextInput
                style={{
                  color: theme.text2,
                  fontSize: StyleConfig.fontSizeH2_3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  flex: 0.5,
                  backgroundColor: theme.textInputBac2,
                  marginRight: 10,
                  borderRadius: 5,
                  borderWidth: 0.5,
                  borderColor: theme.borderAlt,
                  backgroundColor: theme.tabBackground,
                  color: theme.textInputBac2
                }}
                placeholderTextColor={theme.textHint}
                keyboardType='number-pad'
                returnKeyType='done'
                onChangeText={(text) => this.setState({ nutritionCarbs: text })}
                placeholder={"Nutrition Carbs"}
                value={this.state.nutritionCarbs}
              />
            </ViewX>
            {/* NUTRITION CARBS END */}


            {/* Select TAG */}
            {this.renderTag()}

          </ScrollView>
        </KeyboardAvoidingView>

        <ViewX style={styles.bottomView}>
          <TouchableOpacity onPress={this._onPreview} style={styles.bottomBtn}>
            <TextX fontSize={StyleConfig.fontSizeH2_3}>Preview</TextX>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomBtn} onPress={() => this._doneButtonPressed()}>
            <TextX fontSize={StyleConfig.fontSizeH2_3}>Done</TextX>
          </TouchableOpacity>

        </ViewX>
      </SafeAreaView >
    );
  }
  renderTag = () => {
    let { tagData, hashTag } = this.state;
    const { theme } = this.props;
    let formatedData = [];
    for(let ind in tagData){
      let {tagData:subData, ...rest} = tagData[ind];
      let newSubData= [[]];
      let currInd=0; 
      for(let subInd in tagData[ind].data){
        newSubData[currInd].push(tagData[ind]['data'][subInd]);
        if((subInd+1) %3 == 0){
          newSubData.push([]);
          currInd++;
        }
      }
      formatedData.push({...rest, data:newSubData});
    }
    console.log({formatedData})

    return (
      <ViewX style={{ marginVertical: 4, alignItems: 'flex-start' }}>
        {formatedData.map((groupItem, groupIndex) => {
          return (
            <ViewX>
              <TextX style={{
                width: StyleConfig.width,
                textAlign: "left",
                textTransform: 'capitalize',
                color: theme.text,
                backgroundColor: theme.headerBack,
                fontSize: StyleConfig.fontSizeH2_3,
                padding: StyleConfig.convertWidthPerVal(10),
                paddingVertical: StyleConfig.convertHeightPerVal(10),
              }}>{groupItem.title}</TextX>
              <View>
                {groupItem.data.map((item, itemIndex) => {
                  return(
                    <ViewX style={{ flexDirection: 'row', width: StyleConfig.width, alignItems: 'flex-start', justifyContent: 'flex-start', margin: 4 }}>
                      {
                        item.map((subItem,subIndex)=>{
                          return(
                            <TouchableOpacity onPress={() => {
                              tagData[groupIndex]["data"][(itemIndex*3)+subIndex].isSelected = !tagData[groupIndex]["data"][(itemIndex*3)+subIndex].isSelected
                              this.setState({ tagData })
                            }}>
                              <ViewX style={{
                                borderWidth: 0.8,
                                borderRadius: 8,
                                marginHorizontal: 4,
                                backgroundColor: subItem.isSelected ? theme.selectedIconColor : theme.tabBackground
                              }}>
                                <TextX style={{
                                  textAlign: "left",
                                  color: theme.text,
                                  fontSize: StyleConfig.fontSizeH3,
                                  paddingHorizontal: StyleConfig.convertWidthPerVal(10),
                                  paddingVertical: StyleConfig.convertHeightPerVal(8),
                                }}>{subItem.tag_name}</TextX>
                              </ViewX>
                            </TouchableOpacity>
                          )
                        })
                      }
                    </ViewX>
                  )}
                  
                  )}
                </View>

            </ViewX>
          )
        })}
        <TextX style={{
          width: StyleConfig.width,
          textAlign: "left",
          color: theme.text,
          backgroundColor: theme.headerBack,
          fontSize: StyleConfig.fontSizeH2_3,
          padding: StyleConfig.convertWidthPerVal(10),
          paddingVertical: StyleConfig.convertHeightPerVal(10),
        }}>Select Tag</TextX>
        <ViewX style={{ flexDirection: 'row', flexWrap: "wrap", alignItems: 'flex-start', justifyContent: 'flex-start', margin: 4 }}>
          {hashTag.map((item, itemIndex) => {
            return (
              <TouchableOpacity onPress={() => {
                hashTag[itemIndex].isSelected = !hashTag[itemIndex].isSelected;
                this.setState({ hashTag })
              }}>
                <ViewX style={{
                  borderWidth: 0.8,
                  borderRadius: 8,
                  marginHorizontal: 4,
                  backgroundColor: item.isSelected ? theme.selectedIconColor : theme.tabBackground
                }}>
                  <TextX style={{
                     textAlign: "left",
                     color: theme.text,
                     fontSize: StyleConfig.fontSizeH3,
                     paddingHorizontal: StyleConfig.convertWidthPerVal(10),
                     paddingVertical: StyleConfig.convertHeightPerVal(8),
                  }}>{item.name}</TextX>
                </ViewX>
              </TouchableOpacity>
            )
          })}
        </ViewX>
      </ViewX>
    )

  }
}


export default withTheme(withLoader(withToast(AddContent)));
const styles = StyleSheet.create({
  headerTopView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: StyleConfig.countPixelRatio(12),
    marginBottom: StyleConfig.countPixelRatio(12),
    height: StyleConfig.countPixelRatio(44)
  },
  backBtn: {
    width: StyleConfig.countPixelRatio(22),
    height: StyleConfig.countPixelRatio(22)
  },
  bottomView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 7,

  },
  bottomBtn: {
    paddingHorizontal: StyleConfig.countPixelRatio(16),
    paddingVertical: StyleConfig.countPixelRatio(6),
  }
});