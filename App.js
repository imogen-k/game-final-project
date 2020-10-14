import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import Ball from './Ball' 
import Floor from './Floor' 
import Physics from './Physics';
import Slope from './Slope';
import Turtle from './Turtle';
import Tile from './1_tile';
import Sprite from './2_sprite';
import Player from './3_player';
import { render } from 'react-dom';

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

    let Engine = Matter.Engine
    // let engine = Engine.create( { enableSleeping: false})
    
   
    let ball = Matter.Bodies.circle(500, 850, 50, 50);
    let Bounds = Matter.Bounds
    let Render = Matter.Render
    let Constraint = Matter.Constraint
    let engine = Engine.create(document.body, {
      enableSleeping: false, // def = false
      render: {
        options: {
          showAngleIndicator : true,
          wireframes         : true,
          showVelocity       : true,
          showCollisions     : true,
          enableSleeping     : true,
          hasBounds          : true
        }
      }
    });
    let world = engine.world;
   

  

  
  
    let floor = Matter.Bodies.rectangle(100, 900, 10000, 600, { isStatic: true });
    let slope = Matter.Bodies.trapezoid(100, 550, 200, 55, 5, {isStatic: true});

    let initialEngineBoundsMaxX = engine.render.bounds.max.x
    let initialEngineBoundsMaxY = engine.render.bounds.max.y
     let centerX = - 200
    let centerY = - 200

    
    engine.render.bounds.min.x = centerX + ball.bounds.min.x
    engine.render.bounds.max.x = centerX + ball.bounds.min.x + initialEngineBoundsMaxX
    
    engine.render.bounds.min.y = centerY + ball.bounds.min.y
    engine.render.bounds.max.y = centerY + ball.bounds.min.y + initialEngineBoundsMaxY

    

    Matter.World.add(world, [ball, floor, slope]);
    // Matter.Body.setVelocity(ball, 1)
    // Matter.world.setBounds(0, 0, 1800, 1800, 15)
  
    return {
      physics: { engine: engine, world: world },
      ball: { body: ball, size: [48, 40], color: 'red', renderer: Ball },
      floor: { body: floor, size: [10000, 600],isStatic: true, color: 'blue', renderer: Floor },
      slope: { body: slope, size: [200, 55, 0.8], isStatic: true, color: 'green', renderer: Slope },
      

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
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
},
});
