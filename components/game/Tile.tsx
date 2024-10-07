import React, { ReactElement } from 'react';
import * as common from "./common";
import styles from './styles';
import DuckPng from "../assets/images/Duck.png";
import FlyingDuckPng from "../assets/images/FlyingDuck.png";
import { Image, StyleSheet, View } from 'react-native';
import Cup, { CupProp } from './Cup';

export class Duck {
  element: Image;
  constructor(element: Image) {
    this.element = element;
  }
  talk(content:string) {
    
  }
}
/**
 * - Base: This is protected, unless someone move to the outer one. That means, the opps cant eat our cups. 
 *   When go to 'nearDuck', this still becomes protected in all team (for one cup)
 * - Semi: Opps can eat at this area, but when u go to the Tile with 'nearDuck' level, this becomes protected. 
 *   You cant go back to these level of tile (for one cup)
 *   With any team
 * - nearDuck (or undefined): Near the throne of duck itself, opps can eat like normal
 */
export type TileLevel = "base"|"semi"
export interface BaseTileProp <init extends Function> {
  /** the index, usually starts with the black team */
  index:common.IndexNumber;
  colored?:boolean;
  onCupMounted?:init;
  onCupDismounted?:init;
  onInit?:init;
}
export interface TileProp extends BaseTileProp<(tile:typeof Tile)=>void> {
  hasDuck?: false;
  level?:TileLevel;
  team:common.Team;
  children:ReactElement<CupProp>;
}
export interface TilePropWithDuck extends BaseTileProp<(tile:typeof Tile, duck:Duck)=>void> {
  hasDuck:true;
  children?:undefined;
}
export type TileProps = TileProp|TilePropWithDuck

const Tile:React.FC<TileProps> = (opt)=> {
  if (!(opt.hasDuck??false) && opt.children.type !== "Cup") {
    throw new common.DuckncupErr("Tile only accepts Cup children when 'hasDuck' is false")
  }
  return (
    <View
      style={{...styles.tile, ...(opt.colored?styles.tileColor:styles.tileColorNeutral)}}
    >
      {(opt.hasDuck??false)?
      <Image source={FlyingDuckPng} style={styles.duck}/>:opt.children}
    </View>
  );
};
export default Tile;

const o = <Tile index={1} hasDuck={false} team={"black"}>
  <Cup></Cup>
</Tile>