import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import GameCardComponent from './GameCardComponent';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getNextAvailableRandom(cards) {
  let nextSpot = getRandomInt(12);
  while (cards[nextSpot]) {
    if (nextSpot == cards.length - 1) {
      nextSpot = 0;
      continue;
    }
    nextSpot++;
  }

  return nextSpot;
}

const CAT_API_URL =
  'https://api.thecatapi.com/v1/images/search?mime_types=jpg,png&limit=6';

export default class GameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { cards: [] };
  }

  componentDidMount = async () => {
    const catsUrl = await this.getCatUrls();

    const cards = new Array(12);
    for (let i = 0; i < 6; i++) {
      let nextSpot = getNextAvailableRandom(cards);
      cards[nextSpot] = catsUrl[i];

      nextSpot = getNextAvailableRandom(cards);
      cards[nextSpot] = catsUrl[i];
    }

    this.setState({ cards });
  };

  getCatUrls = async () => {
    const response = await fetch(CAT_API_URL);
    const cats = await response.json();
    return cats.map(c => c.url);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.cards.map((item, index) => (
          <GameCardComponent key={index} imageUrl={item} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#292D3F',
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
});
