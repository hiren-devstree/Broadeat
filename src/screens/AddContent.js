
import React, { Component } from 'react';
import {
  TouchableOpacity, Image, StyleSheet,
  ScrollView, TextInput, TextInputProps, TouchableWithoutFeedback
} from 'react-native';
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';
import AsyncStorage from '@react-native-community/async-storage'

import AppImages from '../assets/images';
import StyleConfig from '../assets/styles/StyleConfig';
import { SafeAreaView, TextX, ViewX } from '../components/common';
import FoodResultRow from '../components/common/FoodResultRow';
import styled, { withTheme, ThemeConsumer } from 'styled-components';

import { addContentApiCalling } from './../ApiManager'

import imgBack from '../assets/images/ic_back.png'


const IngredientTextInput = (props: TextInputProps) => <InputTextX {...props} >{props.children}</InputTextX>

const InputTextX = styled.TextInput`
    paddingVertical: ${StyleConfig.convertHeightPerVal(10)}px;
    font-size: ${StyleConfig.fontSizeH3}px;
    background: ${props => props.theme.text};
    text-align: center;
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
      onChangeText={(text) => _onChangeIngredients(idx, 'q', text)}
    />
    <IngredientTextInput
      style={{
        width: StyleConfig.convertWidthPerVal(StyleConfig.width / 3.2),
        backgroundColor: theme.text,
        textAlign: "center"
      }}
      placeholder={"Measure"}
      onChangeText={(text) => _onChangeIngredients(idx, 'm', text)}
    />
    <IngredientTextInput
      style={{
        width: StyleConfig.convertWidthPerVal(StyleConfig.width / 3.2),
        backgroundColor: theme.text,
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
          margin: 5,
          width: '97%'
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
      description: ''
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

  _doneButtonPressed = async () => {
    const { ingredients, methods, images, title, description } = this.state
    let token = await AsyncStorage.getItem('user_token')

    // let data = {}

    // data.recipe_title = title
    // data.meal_preference = 'vegetarian'
    // data.description = description
    // data.recipe_tags = 1

    // methods.forEach((item) => {
    //   data.recipe_method = item.text
    // })

    // ingredients.forEach((item, index) => {
    //   data[`recipe_ingredients[${index}][quantity]`] = item.qty
    //   data[`recipe_ingredients[${index}][measure]`] = item.measuremnt
    //   data[`recipe_ingredients[${index}][ingredient]`] = item.ingredient
    // })

    // images.forEach((item) => {
    //   var photo = {
    //     uri: item.path,
    //     type: 'image/jpeg',
    //     name: 'image',
    //   };
    //   data.image = photo
    // })

    // images.forEach((item) => {
    //   var photo = {
    //     uri: item.path,
    //     type: 'image/jpeg',
    //     name: 'image',
    //   };
    //   data.recipe_media = photo
    // })

    // var formdata = new FormData()
    // formdata.append("recipe_title", title)
    // formdata.append("meal_preference", "vegetarian")
    // formdata.append("description", description)
    // formdata.append('recipe_tags', 1)

    // methods.forEach((item) => {
    //   formdata.append("recipe_method", item.text)
    // })

    // ingredients.forEach((item, index) => {
    //   formdata.append(`recipe_ingredients[${index}][quantity]`, item.qty)
    //   formdata.append(`recipe_ingredients[${index}][measure]`, item.measuremnt)
    //   formdata.append(`recipe_ingredients[${index}][ingredient]`, item.ingredient)
    // })

    // images.forEach((item) => {
    //   var photo = {
    //     uri: item.path,
    //     type: 'image/jpeg',
    //     name: 'image',
    //   };
    //   formdata.append('image', photo)
    // })

    // images.forEach((item) => {
    //   var photo = {
    //     uri: item.path,
    //     type: 'image/jpeg',
    //     name: 'image',
    //   };
    //   formdata.append('recipe_media', photo)
    // })

    // console.log(token)
    // // console.log(data)

    const { loader } = this.props
    loader(true)

    // // let dataa = this.formDataToJSON(formdata)

    // let response = await addContentApiCalling(formdata, token)
    // console.log(response)
    // if (response.code === 1) {
    //   console.log('COMPLETEDDDDDDDD')
    // } else {
    //   console.log('FAILED')

    // }

    // loader(false)


    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDZlMjdmY2JmNTg2M2IzYTEyNWJkODk5YjVjYWU4YmU5Zjk5MmU3OTFmMmIyMWZmYTAxYWEwM2VjM2QxMDc1NTExMTZiYjBiZDViY2ZjNmQiLCJpYXQiOjE1OTI0ODY4MjgsIm5iZiI6MTU5MjQ4NjgyOCwiZXhwIjoxNjI0MDIyODI4LCJzdWIiOiIzMSIsInNjb3BlcyI6W119.PCwD8jOV1ZjVdnN4q4NGNKpTnXNWhIDT_a6c3tiF7qJ76cQ9jWv91z94Bn12DIzNogY5KJJtu0GOCARlBuNcOPdWX3-xxj-MMCdMGH485gnXKg60k0KlZ0By701Z7Ls8mrzApB9TAkLxZSGpUHAIDlJSoy7oYJ_8nCxHyQG2G3lxNCHCDipJSqvP1DrAaOlG0MSpFjB9EbbFzypp3QzNVqOb2L6oH0Zk_Deo2Q6r8VnQ8fEIKagTY8nv7nsXE6Rg-oe1DQWFffITJrOMfQE-LZs6IKw0AR72uwraDj9ETAkkUQGeVTyvWfMpiYdSoc5_1crPDqMwlUb1DUzMoibN97KF-TKLpJcwbTNc3kwTd50KmwGwqkzHv5SjFWFD809iWu6EWrNMGfnEKWJM-P9gewft_GzUrf-j8-XolLBi_xdK8dFqvj_VsPUkmgNqiyj3GvFh3QziGle8_RLVFAQpaZNh-3As9ICWwAnXVsUMi-k3e0F861i4FvfUJ8NLf7ep3aKuQVcD7WsbDgRjqxPHR4wY-Pfd2j5-abSICym25wgFKHByDjXZowwv_FBvN4qMw3lcJqhuq__QBpLdku-tWNtouNAsI62jYzkcrm77uXc-UGYCll6WGdpSKIOZybvsxk3xoUnw5oG9CPWTvYtYhvO25ioTHP032Y3G2pS9Og8");

    var formdata = new FormData();
    formdata.append("recipe_title", "New tecipe");
    formdata.append("meal_preference", "vegetarian");
    // images.map((item, index) => {
    //   var photo = {
    //     uri: item.path,
    //     type: 'image/jpeg',
    //     name: `recipe_media${index}`,
    //   };
    //   formdata.append('recipe_media[]', photo)
    // })

    let recipe_media = []

    for (let ind in images) {
      if (images[ind].path != '') {
        debugger
        let IMAGE_CROP = images[ind].path.slice(images[ind].path.lastIndexOf("/"));
        let image1 = StyleConfig.isIphone ?
          { "uri": images[ind].path, "filename": IMAGE_CROP, "type": images[ind].mime } :
          { "uri": images[ind].path, "name": IMAGE_CROP, "type": images[ind].mime };
        // recipe_media.push(image1)
        formdata.append('recipe_media', image1)
      }
    }


    // var photo1 = {
    //   uri: images[0].path,
    //   type: 'image/png',
    //   name: 'image',
    // };
    // formdata.append('image', photo1)

    formdata.append("description", "Test test");

    formdata.append("recipe_method[]", "Test1 Test1");
    formdata.append("recipe_method[]", "Test2 Test2");
    formdata.append("recipe_tags[]", "1");
    // formdata.append("recipe_tags[]", "3");
    formdata.append("recipe_ingredients[0][quantity]", "1.5");
    formdata.append("recipe_ingredients[0][measure]", "unit");
    formdata.append("recipe_ingredients[0][ingredient]", "Eggs");

    console.log(formdata)


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://3.20.100.25/broadeat/api/recipe/add", requestOptions)
      .then(response => response.text())
      .then(result => {
        loader(false)
        console.log('result ', result)
      })
      .catch(error => {
        loader(false)
        console.log('error', error)
      });

  }

  render() {
    const { images, ingredients, methods } = this.state;
    const { theme } = this.props;

    return (
      <SafeAreaView {...this.props}>
        <ScrollView>

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
        </ScrollView>

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
    backgroundColor: '#151515',
  },
  bottomBtn: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  }
});