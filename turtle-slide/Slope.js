import React, { Component } from "react";
import { View } from "react-native";

export default class Slope extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width;
        const y = this.props.body.position.y - height;

        return (
            <View
                style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                    backgroundColor: this.props.color
                }} />
    );
  }
}