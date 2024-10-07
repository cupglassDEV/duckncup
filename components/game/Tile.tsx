import React, { MutableRefObject, ReactElement, useEffect, useRef } from 'react';
import * as common from "./common";
import styles from './styles';
import DuckPng from "../assets/images/Duck.png";
import FlyingDuckPng from "../assets/images/FlyingDuck.png";
import { Image, StyleSheet, View } from 'react-native';
import Cup, { CupProp } from './Cup';
import { TileRowProp } from './TileRow';

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
 * - nearDuck: Near the throne of duck itself, opps can eat like normal
 * - outer (deprecated, use undefined instead): Between the base and the throne of duck, opps can eat, enter, even you can
 */
export type TileLevel = "base"|"semi"|"nearDuck"|undefined
export interface CoreTileProp <init extends Function = (tile:typeof Tile)=>void> {
  /** the index, usually starts with the white team */
  index:common.IndexNumber;
  colored?:boolean;
  onCupMounted?:init;
  onCupDismounted?:init;
  hasDuck?:boolean;
  children?:ReactElement<CupProp>;
  team?:common.Team;
  level?:TileLevel;
}
export type Parent = TileRowProp;
export type BaseTileProp<T extends (...args: any) => void = (tile:typeof Tile) => void> = common.PropWithParent<T, Parent> & CoreTileProp<T>
export interface TileProp extends BaseTileProp {
  hasDuck?: false;
  level?:TileLevel;
  team:common.Team;
}
export interface TilePropNearDuck extends BaseTileProp {
  hasDuck?: false;
  level:"nearDuck";
  team?:undefined;
}
export interface TilePropWithDuck<init = (tile:typeof Tile, duck:Duck)=>void> extends BaseTileProp<(tile:typeof Tile, duck:Duck)=>void> {
  hasDuck:true;
  level?:undefined;
  children?:undefined;
  team?:undefined;
  onCaptured?:init;
}
export type TileProps = TileProp|TilePropNearDuck|TilePropWithDuck
export type TileAction = common.ActionWithParent<TileProps,Parent>
const Tile:React.FC<TileProps> = (opt)=> {
  if (!(opt.hasDuck??false) && opt.children?.type !== "Cup") {
    throw new common.DuckncupErr("Tile only accepts a single Cup when 'hasDuck' is false")
  }
  const mounted = useRef(false)
  let p:MutableRefObject<TileRowProp> = useRef({})
  const elem:ReturnType<React.FC<TileProp>> =  ( 
    <View
      style={{...styles.tile, ...(opt.colored?styles.tileColor:styles.tileColorNeutral)}}
    >
      {(opt.hasDuck??false)?
      <Image source={FlyingDuckPng} style={styles.duck}/>:opt.children}
    </View>
  );
  const action = useRef<TileAction>({
    mounted:false,
    element:elem,
    parent:
  })
  useEffect(()=>{
    mounted.current = true;
    action.current.mounted = true;
    opt.onMounted?.(action.current, duck);
    return () => {
        mounted.current = false;
        action.current.mounted = false;
        opt.onDismounted?.(action.current, duck);
    };
  },[])
  return elem
};
export default Tile;