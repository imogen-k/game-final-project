import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import Ball from './Ball' 
import Floor from './Floor' 
import Physics from './Physics';
import Slope from './Slope';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      running: true
  };

    this.gameEngine = null;
    this.entities = this.setupWorld();

    this.MAX_WIDTH = 300
    this.MAX_HEIGHT = 300
  }

  // Constants = {
  //   MAX_WIDTH: Dimensions.get("screen").width,
  //   MAX_HEIGHT: Dimensions.get("screen").height
  // }

  setupWorld = () => {

    let engine = Matter.Engine.create({ enableSleeping: false })
    let world = engine.world;

    let ball = Matter.Bodies.circle( 500, 850, 50, 50);
    let floor = Matter.Bodies.rectangle(100, 900, 10000, 600, { isStatic: true });
    let slope = Matter.Bodies.trapezoid(900, 550, 200, 55, 5, {isStatic: true});

    


    

    Matter.World.add(world, [ball, floor, slope]);
    // Matter.Body.setVelocity(ball, 1)
    // Matter.world.setBounds(0, 0, 1800, 1800, 15)
  
    return {
      physics: { engine: engine, world: world },
      ball: { body: ball, size: [50, 50], color: 'red', renderer: Ball },
      floor: { body: floor, size: [10000, 600],isStatic: true, color: 'blue', renderer: Floor },
      slope: { body: slope, size: [200, 55, 0.8], isStatic: true, color: 'green', renderer: Slope }

   }
   
  }

  render() {
  return (
    <View style={styles.container}>

      <GameEngine ref={(ref) => { this.gameEngine = ref; }}
      style={styles.gameContainer}
      running={this.state.running}

      systems={[Physics]}
      entities={this.entities} />

      <Text>Hello its me</Text>
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
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
},
});
