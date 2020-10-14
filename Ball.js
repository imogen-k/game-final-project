import React, { Component } from "react";
import { View, Image } from "react-native";
import Player from './3_player';
import Images from './assets/turtle1.png';

export default class Ball extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width;
        const y = this.props.body.position.y - height;

        let image = Images
        return (
            <Image
                style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                }}
                resizeMode="stretch"
                source={image} />
            // <View
            //     style={{
            //         position: "absolute",
            //         left: x,
            //         top: y,
            //         width: width,
            //         height: height,
            //         backgroundColor: this.props.color,
            //     }} />
    );
  }
}