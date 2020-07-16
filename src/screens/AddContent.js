
import React, { Component } from 'react';
import {
  TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView,
  ScrollView, TextInput, TextInputProps, TouchableWithoutFeedback, Alert
} from 'react-native';
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';
import AsyncStorage from '@react-native-community/async-storage'
import DropDownPicker from 'react-native-dropdown-picker'
import Icon from 'react-native-vector-icons/Feather'

import AppImages from '../assets/images';
import StyleConfig from '../assets/styles/StyleConfig';
import { SafeAreaView, TextX, ViewX } from '../components/common';
import FoodResultRow from '../components/common/FoodResultRow';
import styled, { withTheme, ThemeConsumer } from 'styled-components';

import { addContentApiCalling } from './../apiManager'

import imgBack from '../assets/images/ic_back.png'


const IngredientTextInput = (props: TextInputProps) => <InputTextX {...props} >{props.children}</InputTextX>

const InputTextX = styled.TextInput`
    paddingVertical: ${StyleConfig.convertHeightPerVal(10)}px;
    font-size: ${StyleConfig.fontSizeH3}px;
    background: ${props => props.theme.textInputBac2};
    color:${props => props.theme.text};
    text-align: center;
    border-width: 0.5px;
    border-radius: 5px;
    border-color: ${props => props.theme.borderAlt};

`
const MultiTextInputX = (props: TextInputProps) => <MultiTextInput multiline {...props}>{props.children}</MultiTextInput>
const MultiTextInput = styled.TextInput`
    color: ${props => props.theme.text};
    border-radius: ${StyleConfig.convertHeightPerVal(10)}px;
    paddingVertical: ${StyleConfig.convertHeightPerVal(10)}px;
    font-size: ${StyleConfig.fontSizeH3_4}px;
    background: ${props => props.theme.tabBackground};
    padding: 10px;
`

const IngredientsWrapper = withTheme(({ theme, idx, _onChangeIngredients, ...props }) => {
  return (<ViewX style={{
    flex: 1,
    marginVertical: StyleConfig.convertHeightPerVal(5),
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row"
  }} >
    <IngredientTextInput
      style={{
        width: StyleConfig.convertWidthPerVal(80)
      }}
      placeholder={"Qty"}
      keyboardType={'numeric'}
      onChangeText={(text) => _onChangeIngredients(idx, 'q', text)}
    />
    <IngredientTextInput
      style={{
        width: StyleConfig.convertWidthPerVal(StyleConfig.width / 3.2),
        textAlign: "center"
      }}
      placeholder={"Measure"}
      onChangeText={(text) => _onChangeIngredients(idx, 'm', text)}
    />
    <IngredientTextInput
      style={{
        width: StyleConfig.convertWidthPerVal(StyleConfig.width / 3.2),
        textAlign: "center"
      }}
      placeholder={"Ingredient"}
      onChangeText={(text) => _onChangeIngredients(idx, 'i', text)}
    />
  </ViewX>)
})

const MethodWrapper = withTheme(({ theme, idx, _onChangeMethods, ...props }) => {
  return (
    <ViewX style={{
      flex: 1,
      marginVertical: StyleConfig.convertHeightPerVal(5),
      alignItems: "flex-start",
    }} >

      <TextX
        style={{
          textAlign: "left",
          color: theme.text,
          fontSize: StyleConfig.fontSizeH3_4,
          padding: StyleConfig.convertWidthPerVal(10),
          paddingVertical: StyleConfig.convertHeightPerVal(10),
        }}
      >Step {idx + 1}</TextX>
      <MultiTextInputX
        style={{
          minHeight: StyleConfig.convertHeightPerVal(50),
          marginHorizontal:12,
          marginVertical:4,
          width: StyleConfig.width-24
        }}
        onChangeText={(text) => _onChangeMethods(idx, text)}
      />
    </ViewX>
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
    }
  }

  componentDidMount() {
    const _ = this.props.route.params;
    
    this.setState({ images: _.images })
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
  showAlert =(msg) => Alert.alert(msg)
  _doneButtonPressed = async () => {
    const {
      ingredients, methods, images, title, description,
      mealPreference, noOfPerson, nutritionCalories,
      nutritionProtein, nutritionFat, nutritionCarbs, timeDuration
    } = this.state
    const { loader } = this.props
    let token = await AsyncStorage.getItem('user_token')
    let hasError = false ;
   
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "multipart/form-data");

    var formdata = new FormData();
    if(title.length == 0){
      hasError = true ;
      this.showAlert("Please Enter Title")
      return ;
    }
    formdata.append("recipe_title", title);
    formdata.append("meal_preference", mealPreference);
   
    if(description.length == 0){
      hasError = true ;
      this.showAlert("Please Enter Description")
      return ;
    }
   
    formdata.append("description", description);
    formdata.append("recipe_tags[]", "1");
    formdata.append("recipe_tags[]", "3");
    let hasAnyIngredients = false ;
    ingredients.forEach((item, index) => {
      if(item.qty.length > 0 || item.measuremnt.length > 0 || item.ingredient.length > 0){
        hasAnyIngredients = true ;
        formdata.append(`recipe_ingredients[${index}][quantity]`, item.qty)
        formdata.append(`recipe_ingredients[${index}][measure]`, String(item.measuremnt))
        formdata.append(`recipe_ingredients[${index}][ingredient]`, String(item.ingredient))
      }
      
    })
    if(!hasAnyIngredients){
      hasError = true ;
      this.showAlert("Please Enter Ingredients")
      return ;
    }

    let hasAnyMethod = false ;
    methods.forEach((item) => {
      if(item.text.length > 0){
        hasAnyMethod = true ;
        formdata.append("recipe_method[]", item.text)
      }
    })
    if(!hasAnyMethod){
      hasError = true ;
      this.showAlert("Please Enter Cooking Method.")
      return ;
    }
    
    if(nutritionCalories.length == 0 ){
      hasError = true ;
      this.showAlert("Please Enter Nutrition Calories")
      return ;
    } else  if(Number(nutritionCalories).toString() == "NaN" ){
      hasError = true ;
      this.showAlert("Please Enter Valid Nutrition Calories")
      return ;
    }
    formdata.append("nutrition_calories", nutritionCalories)

    if(nutritionProtein.length == 0 ){
      hasError = true ;
      this.showAlert("Please Enter Nutrition Protein")
      return ;
    } else  if(Number(nutritionProtein).toString() == "NaN" ){
      hasError = true ;
      this.showAlert("Please Enter Valid Nutrition Protein")
      return ;
    }
    formdata.append("nutrition_protein", nutritionProtein)
    if(nutritionFat.length == 0 ){
      hasError = true ;
      this.showAlert("Please Enter Nutrition Fat")
      return ;
    } else  if(Number(nutritionFat).toString() == "NaN" ){
      hasError = true ;
      this.showAlert("Please Enter Valid Nutrition Fat")
      return ;
    }
    formdata.append("nutrition_fat", nutritionFat)
    if(nutritionCarbs.length == 0 ){
      hasError = true ;
      this.showAlert("Please Enter Nutrition Carbs")
      return ;
    } else  if(Number(nutritionCarbs).toString() == "NaN" ){
      hasError = true ;
      this.showAlert("Please Enter Valid Nutrition Carbs")
      return ;
    }
    formdata.append("nutrition_carbs", nutritionCarbs)
    if(timeDuration.length == 0 ){
      hasError = true ;
      this.showAlert("Please Enter Time Duration")
      return ;
    } 
    formdata.append("time_duration", timeDuration)
    if(noOfPerson.length == 0 ){
      hasError = true ;
      this.showAlert("Please Enter No Of Person")
      return ;
    } else  if(Number(noOfPerson).toString() == "NaN" ){
      hasError = true ;
      this.showAlert("Please Enter Valid No Of Person")
      return ;
    }
    formdata.append("no_of_person", noOfPerson)

    let recipe_media = []
    let mainImage = null;
    for (let ind in images) {
      if (images[ind].path != '') {
        let IMAGE_CROP = images[ind].path.slice(images[ind].path.lastIndexOf("/"));
        let myImage = StyleConfig.isIphone ?
          { "uri": images[ind].path, "filename": IMAGE_CROP, "name": IMAGE_CROP } :
          { "uri": images[ind].path, "name": IMAGE_CROP, "type": images[ind].mime };

        if (mainImage == null) {
          mainImage = myImage;
          formdata.append("image", myImage)
        } else {
          formdata.append("recipe_media[]", myImage)
        }

      }
    }
    console.log(formdata)
    if(!hasError){
      loader(true)
      const response = await fetch("http://3.20.100.25/broadeat/api/recipe/add", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        body: formdata
      });
      console.log({ response })
      loader(false)
      const json = await response.json();
      console.log({ json })
      if(json.code == 1){
        Alert.alert(
          "Receipe Added Successfully",
          "",
          [
            { text: "OK", onPress: () => this.props.navigation.navigate('PhotoRecipeDetails', { data: json.data.id }) }
          ],
          { cancelable: false }
        );
      }else{
        Alert.alert(json.message)
      }
    }
  }

  render() {
    const { images, ingredients, methods } = this.state;
    const { theme } = this.props;

    return (
      <SafeAreaView {...this.props}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={{ flex: 1 }}>
          <ScrollView style={{ paddingBottom: 20 }}>

            <ViewX style={styles.headerTopView}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image source={imgBack} style={styles.backBtn} />
              </TouchableOpacity>
              <TextX
                fontSize={StyleConfig.countPixelRatio(16)}
                style={{ marginLeft: 15 }}
              >
                {'Add Content'}
              </TextX>
            </ViewX>

            <ViewX style={{
              paddingVertical: 5,
              width: StyleConfig.width,
              flexWrap: "wrap",
              // justifyContent: "flex-start",
              flexDirection: "row"
            }} >
              {
                images.map((itm, idx) => <ViewX
                  style={{
                    borderRadius: 2,
                    width: StyleConfig.convertWidthPerVal(120),
                    height: StyleConfig.convertWidthPerVal(120)
                  }}>
                  <Image
                    key={`images-${idx}`}
                    style={{ width: "95%", height: "95%" }}
                    source={{ uri: itm.path }}
                  />
                </ViewX>)
              }
            </ViewX>
            <TextInput
              style={{
                color: theme.text,
                fontSize: StyleConfig.fontSizeH3,
                padding: StyleConfig.convertWidthPerVal(10)
              }}
              placeholderTextColor={theme.textHint}
              onChangeText={(text) => this.setState({ title: text })}
              placeholder={"Write a title..."}

            />
            <TextInput
              multiline
              style={{
                color: theme.text,
                fontSize: StyleConfig.fontSizeH3,
                padding: StyleConfig.convertWidthPerVal(10)
              }}
              placeholderTextColor={theme.textHint}
              onChangeText={(text) => this.setState({ description: text })}
              placeholder={"Description"}
            />

            <TextX
              style={{
                textAlign: "left",
                color: theme.text,
                fontSize: StyleConfig.fontSizeH3,
                padding: StyleConfig.convertWidthPerVal(10)
              }}
            >Add Ingredients</TextX>
            <ViewX style={{
              flex: 1,
              paddingVertical: 20,
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row"
            }} >
              <TextX style={{ width: StyleConfig.convertWidthPerVal(80), fontSize: StyleConfig.fontSizeH3 }}>Qty</TextX>
              <TextX style={{
                // flex: 1,
                width: StyleConfig.convertWidthPerVal(StyleConfig.width / 3.2),
                fontSize: StyleConfig.fontSizeH3
              }} >Measure</TextX>
              <TextX style={{
                // flex: 1,
                width: StyleConfig.convertWidthPerVal(StyleConfig.width / 3.2),
                fontSize: StyleConfig.fontSizeH3
              }} >Ingredient</TextX>
            </ViewX>
            {
              ingredients.map((item, idx) => <IngredientsWrapper {...{ idx }} _onChangeIngredients={this._onChangeIngredients} />)
            }
            <TouchableWithoutFeedback onPress={() => {
              this.setState((prevState, props) => {
                return {
                  ingredients: [...prevState.ingredients, { qty: '', measuremnt: '', ingredient: '' }]
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
                fontSize: StyleConfig.fontSizeH3,
                padding: StyleConfig.convertWidthPerVal(10),
                paddingVertical: StyleConfig.convertHeightPerVal(10),
              }}
            >Cooking Method</TextX>
            {/* STEPS START */}
            {
              methods.map((item, idx) => <MethodWrapper {...{ idx }} _onChangeMethods={this._onChangeMethods} />)
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
                fontSize: StyleConfig.fontSizeH3,
                padding: StyleConfig.convertWidthPerVal(10),
                paddingVertical: StyleConfig.convertHeightPerVal(10),
              }}
            >Meal Preference</TextX>
            <DropDownPicker
              items={[
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
                  fontSize: StyleConfig.fontSizeH3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  paddingTop: StyleConfig.convertHeightPerVal(10),
                  flex: 0.5
                }}
              >No of person</TextX>

              <TextInput
                style={{
                  color: theme.text,
                  fontSize: StyleConfig.fontSizeH3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  flex: 0.5,
                  backgroundColor: theme.textInputBac2,
                  marginRight: 10,
                  borderRadius: 5,
                  borderWidth:0.5,
                  borderColor: theme.borderAlt

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
                  fontSize: StyleConfig.fontSizeH3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  paddingTop: StyleConfig.convertHeightPerVal(10),
                  flex: 0.5
                }}
              >Time Duration</TextX>

              <TextInput
                style={{
                  color: theme.text,
                  fontSize: StyleConfig.fontSizeH3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  flex: 0.5,
                  backgroundColor: theme.textInputBac2,
                  marginRight: 10,
                  borderRadius: 5,
                  borderWidth:0.5,
                  borderColor: theme.borderAlt

                }}
                placeholderTextColor={theme.textHint}
                onChangeText={(text) => this.setState({ timeDuration: text })}
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
                  fontSize: StyleConfig.fontSizeH3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  paddingTop: StyleConfig.convertHeightPerVal(10),
                  flex: 0.5
                }}
              >Nutrition Calories</TextX>

              <TextInput
                style={{
                  color: theme.text,
                  fontSize: StyleConfig.fontSizeH3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  flex: 0.5,
                  backgroundColor: theme.textInputBac2,
                  marginRight: 10,
                  borderRadius: 5,
                  borderWidth:0.5,
                  borderColor: theme.borderAlt

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
                  fontSize: StyleConfig.fontSizeH3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  paddingTop: StyleConfig.convertHeightPerVal(10),
                  flex: 0.5
                }}
              >Nutrition Protein</TextX>

              <TextInput
                style={{
                  color: theme.text,
                  fontSize: StyleConfig.fontSizeH3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  flex: 0.5,
                  backgroundColor: theme.textInputBac2,
                  marginRight: 10,
                  borderRadius: 5,
                  borderWidth:0.5,
                  borderColor: theme.borderAlt

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
                  fontSize: StyleConfig.fontSizeH3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  paddingTop: StyleConfig.convertHeightPerVal(10),
                  flex: 0.5
                }}
              >Nutrition Fat</TextX>

              <TextInput
                style={{
                  color: theme.text,
                  fontSize: StyleConfig.fontSizeH3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  flex: 0.5,
                  backgroundColor: theme.textInputBac2,
                  marginRight: 10,
                  borderRadius: 5,
                  borderWidth:0.5,
                  borderColor: theme.borderAlt

                }}
                placeholderTextColor={theme.textHint}
                keyboardType='number-pad'
                returnKeyType='done'
                onChangeText={(text) => this.setState({ nutritionFat: text })}
                placeholder={"Nutrition Protein"}
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
                  fontSize: StyleConfig.fontSizeH3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  paddingTop: StyleConfig.convertHeightPerVal(10),
                  flex: 0.5
                }}
              >Nutrition Carbs</TextX>

              <TextInput
                style={{
                  color: theme.text,
                  fontSize: StyleConfig.fontSizeH3,
                  padding: StyleConfig.convertWidthPerVal(10),
                  flex: 0.5,
                  backgroundColor: theme.textInputBac2,
                  marginRight: 10,
                  borderRadius: 5,
                  borderWidth:0.5,
                  borderColor: theme.borderAlt

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

          </ScrollView>
        </KeyboardAvoidingView>

        <ViewX style={styles.bottomView}>
          <TouchableOpacity style={styles.bottomBtn}>
            <TextX fontSize={16}>Preview</TextX>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomBtn} onPress={() => this._doneButtonPressed()}>
            <TextX fontSize={16}>Done</TextX>
          </TouchableOpacity>

        </ViewX>
      </SafeAreaView >
    );
  }
}


export default withTheme(withLoader(withToast(AddContent)));
const styles = StyleSheet.create({
  headerTopView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    paddingHorizontal: 15,
    paddingVertical: 10,
  }
});