import React from 'react';
import './Tile.css';

const tile = (props) => {
    let myColor = props.color;
    if(myColor === null){
        myColor = {
            r: 255,
            g: 0,
            b: 0,
        }
    }
    let newSize = 50;
    let newBorder = 0;
    if(props.selected){
        newSize = 46;
        newBorder = 2;
    }
    const style = {
        backgroundColor : 'rgb('+myColor.r+','+myColor.g+','+myColor.b+')',
        width: newSize,
        height: newSize,
        border: newBorder+'px solid rgb('+(255-myColor.r)+','+(255-myColor.g)+','+(255-myColor.b)+')'
    }
    return (
        <div className="Tile" style={style} onClick={props.clicked}>
            
        </div>
    );
};

export default tile;