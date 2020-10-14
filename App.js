import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import Ball from './Ball' 
import Floor from './Floor' 
import Physics from './Physics';
//import Slope from './Slope';
// import Turtle from './Turtle';
// import Tile from './1_tile';
// import Sprite from './2_sprite';
// import Player from './3_player';
import Images from './assets/Images'
import Constants from './Constants'

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
        running: true,
        score: 0,
    };

    this.gameEngine = null;

    this.entities = this.setupWorld();
 }

  // Constants = {
  //   MAX_WIDTH: Dimensions.get("screen").width,
  //   MAX_HEIGHT: Dimensions.get("screen").height
  // }

  setupWorld = () => {

    let engine = Matter.Engine.create({ enableSleeping: false })
    let world = engine.world;
    //world.gravity.y = 0.0;
    let ball = Matter.Bodies.circle(500, 850, 50, 50);
    // let turtle = Matter.Bodies.circle(400, 850, 50, 50);
  
    let floor1 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH + 4,
      50, { isStatic: true }
    );
    let floor2 = Matter.Bodies.rectangle(
        Constants.MAX_WIDTH + (Constants.MAX_WIDTH / 2),
        Constants.MAX_HEIGHT - 25,
        Constants.MAX_WIDTH + 4,
        50, { isStatic: true }
    );

    //let floor = Matter.Bodies.rectangle(100, 900, 10000, 600, { isStatic: true });
    //let slope = Matter.Bodies.trapezoid(100, 550, 200, 55, 5, {isStatic: true});

    Matter.World.add(world, [ball, floor1]);
    Matter.Body.setVelocity(ball, 1)
    // Matter.world.setBounds(0, 0, 1800, 1800, 15)
  
    return {
      physics: { engine: engine, world: world },
      ball: { body: ball, size: [48, 40], color: 'red', renderer: Ball },
      floor1: { body: floor1, renderer: Floor },
      floor2: { body: floor2, renderer: Floor },
      //floor: { body: floor, size: [10000, 600],isStatic: true, renderer: Floor },
      //slope: { body: slope, size: [200, 55, 0.8], isStatic: true, color: 'green', renderer: Slope },
      // turtle: {body: turtle, size: [50, 50], renderer: Turtle}

   }
  }

  render() {
  return (
    <View style={styles.container}>

<Image source={Images.background} style={styles.backgroundImage} resizeMode="stretch" />

        <GameEngine
            ref={(ref) => { this.gameEngine = ref; }}
            style={styles.gameContainer}
            systems={[Physics]}
            running={this.state.running}
            onEvent={this.onEvent}
            entities={this.entities}>
            <StatusBar hidden={true} />
        </GameEngine>

      <Text>Hello its me</Text>
        {/* <Player />
        <Turtle /> */}
      <StatusBar style="auto" />
    </View>
  );

  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT
  },

  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
},
});
