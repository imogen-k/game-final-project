import React, { Component } from "react";
import { View } from "react-native";
import Player from "./3_player";

export default class Turtle extends Component {
    render() {
        // const width = this.props.size[0];
        // const height = this.props.size[1];
        // const x = this.props.body.position.x - width;
        // const y = this.props.body.position.y - height;

        return (
            <Player
                style={{
                    position: "absolute",
                    // left: x,
                    // top: y,
                    // width: width,
                    // height: height,
                    backgroundColor: this.props.color
                }} />
    );
  }
}