import React from "react";
import styled from "styled-components";
import { View } from "react-native";
import Tile from "./1_tile";
import Sprite from "./2_sprite";
import sideAnimation from "./assets/side.png";

const Container = styled.div`
  position: relative;
`;

export default class Player extends React.Component {
  render() {

    // const width = this.props.size[0];
    // const height = this.props.size[1];
    // const x = this.props.body.position.x - width;
    // const y = this.props.body.position.y - height;

    return (
      <Container>
        <Sprite
          src={sideAnimation}
          states={4}
          tile={{ width: 20, height: 24 }}
          scale={2}
          framesPerStep={8}
        />
        <View
                style={{
                    position: "absolute",
                    // left: x,
                    // top: y,
                    // width: width,
                    // height: height,
                    backgroundColor: this.props.color
                }} />
      </Container>
    );
  }
}
