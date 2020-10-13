import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import Ball from './Ball' 
import Physics from './Physics';


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

    let ball = Matter.Bodies.circle( 8000 / 25 / 2, 50, 50);
    let ground = Matter.Bodies.rectangle(100, 380, 810, 60, { isStatic: true, angle: Math.PI * 0.20 });


    world.gravity.y = 0.1;

    Matter.World.add(world, [ball]);
    Matter.Body.setAngularVelocity(ball, 1.19)

  
    return {
      physics: { engine: engine, world: world },
      ball: { body: ball, size: [50, 50], color: 'red', renderer: Ball }

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
