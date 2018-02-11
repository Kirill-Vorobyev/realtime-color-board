import React, { Component } from 'react';
import * as firebase from 'firebase';
import { CompactPicker, SliderPicker} from 'react-color';
import Tile from '../Tile/Tile';
import './Layout.css';

class Layout extends Component {
    constructor(props){
        super(props);
        this.state = {
            theGrid: null,
            selected: null,
            lastColor: {r: 0, g:0, b:0}
        }
        //this.initGrid();
    }

    componentDidMount () {
        const gridRef = firebase.database().ref().child('grid');
        gridRef.on('value',snap => {
            this.setState({
                theGrid: snap.val()
            })
        })
    }

    tileClickedHandler = (index) => {
        this.setState(prevState => {
            return {
                selected: index,
                lastColor: prevState.theGrid[index]
            }
        });
    }

    deselectHandler = () => {
        this.setState({
            selected: null
        });
    }

    initGrid() {
        let grid = [];
        let gridLine = [];
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                let color={
                    r: i*32 + 32,
                    g: 0,
                    b: j*32 + 32
                }
                if(color.r === 256){ color.r = 255; }
                if(color.g === 256){ color.g = 255; }
                if(color.b === 256){ color.b = 255; }
                gridLine = [...gridLine,color];
            }
            //console.log(gridLine);
            grid = [...grid,gridLine];
            gridLine = [];
        }
        let tileArray = [].concat.apply([],grid);
        this.state = {
            theGrid: null,
            selected: null,
            lastColor: {r: 0, g:0, b:0}
        }
        const gridRef = firebase.database().ref().child('grid');//reset the grid state
        gridRef.set(tileArray);//reset the grid state
    }

    setTileColor = (color, event) => {
        if(this.state.selected !== null){
            const gridRef = firebase.database().ref().child('grid');
            const newGridArray = this.state.theGrid;
            const newPixelColor = {
                r: color.rgb.r,
                g: color.rgb.g,
                b: color.rgb.b
            };
            newGridArray[this.state.selected] = newPixelColor;
            gridRef.child(this.state.selected).set(newPixelColor);
            this.setState(prevState => {
                return {
                    lastColor: prevState.theGrid[prevState.selected]
                }
            });
        }else{
            this.setState(prevState => {
                return {
                    lastColor: color
                }
            });
        }
    }

    render() {
        let allTiles = <h1>Loading...</h1>
        let colorPicker = null;
        if(this.state.theGrid !== null){
            allTiles = this.state.theGrid.map((gridRow,i)=>{
                const tileColor = {
                    r: gridRow.r,
                    g: gridRow.g,
                    b: gridRow.b
                }
                let isSelected = false;
                if(i===this.state.selected){
                    isSelected = true;
                }
                return <Tile 
                        key={i}
                        color={tileColor} 
                        clicked={() => this.tileClickedHandler(i)}
                        selected={isSelected} />
            });
            let changeColorCallback = this.setTileColor;
            if(this.state.selected !== null){
                changeColorCallback = this.setTileColor;
            }
            let colorForPickers = this.state.lastColor;
            if(this.state.selected !== null){
                colorForPickers = this.state.theGrid[this.state.selected];
            }
            colorPicker =   
                <div className={this.state.theGrid ? "Pickers" : null}>
                    <div className="Picker" style={{paddingTop: '25px'}}>
                        <SliderPicker 
                            onChangeComplete={changeColorCallback} 
                            color={colorForPickers}/>
                    </div>
                    <div style={{paddingTop: '15px'}}>
                        <CompactPicker 
                            onChangeComplete={changeColorCallback}
                            color={colorForPickers}/>
                    </div>
                </div>;
        } 

        return (
            <div className="Container">
                <div className={this.state.theGrid ? "Grid" : null}>
                    {allTiles}
                </div>
                {colorPicker}
                <div className="Deselect" onClick={this.deselectHandler} />
            </div>
        );
    }
}

export default Layout;