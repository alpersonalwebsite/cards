import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { white, purple, gray } from '../utils/colors';
import { addDeck } from '../actions';
import { addDeckLocal } from '../utils/api';
import { connect } from 'react-redux';
import { SubmitBtn } from '../utils/helpers';

class AddDeck extends Component {

  state = {
    text: ''
  }

  nameNormalizer = (deckName) => {
    return deckName.toLowerCase().replace(/\s/g,'');
  }

  checkIfDeckExcist = (deckName) => {
    return Object.keys(this.props.decks).filter((name) => this.nameNormalizer(name) === this.nameNormalizer(deckName)).length;

  }

  submit = () => {
    if(this.checkIfDeckExcist(this.state.text) !== 0 ) {
      Alert.alert('Wrong Deck Name', 'Please, select other title for your new Deck. It looks like we have that Deck', [
        { text: 'I will try my best!' }
      ]);
    } else if (this.state.text.length < 3 || this.state.text.length > 25) {
      Alert.alert('Wrong Deck Name','Your new Deck name length should be greater than 3 chars and less than 25', [
        { text: 'I will try my best!' }
      ]);
    } else {
      const formattedDeck = {
        [this.state.text]: {
          title: this.state.text,
          questions: []
        }
      };

      addDeckLocal(formattedDeck);
      this.props.dispatch(addDeck(formattedDeck));

      this.props.navigation.navigate('DeckDetails', { title: this.state.text });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={ styles.container }>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 35, textAlign: 'center', marginBottom: 30, paddingLeft: 10, paddingRight: 10 }}>What is the title of your new deck?</Text>
          <TextInput underlineColorAndroid='transparent'
            style={{ height: 40, borderColor: gray, borderWidth: 1, padding: 5, marginBottom: 40 }}
            onChangeText={ (text) => this.setState({ text }) }
            value={ this.state.text } placeholder='Deck Title'/>
            <SubmitBtn onPress={ this.submit } onLabel='Add Deck' />
          </View>
        </KeyboardAvoidingView>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: white
    },
    iosSubmitBtn: {
      backgroundColor: purple,
      padding: 10,
      borderRadius: 7,
      height: 45,
      marginLeft: 40,
      marginRight: 40
    },
    AndroidSubmitBtn: {
      backgroundColor: purple,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      height: 45,
      borderRadius: 2,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    },
    submitBtnText: {
      color: white,
      fontSize: 22,
      textAlign: 'center'
    }
  });

  function mapStateToProps (decks) {
    return { decks }
  }
  export default connect(mapStateToProps)(AddDeck);
