import styles from "./styles"
import * as common from "./common"
import { Image, View } from "react-native"
import { ReactElement, useEffect, useRef } from "react"
import { StrictChildren } from "../tools"
import { TileProps, TilePropWithDuck } from "./Tile"
import CupPng from "../assets/images/Cup.png"
export interface BaseCupAction {
   eaten:boolean,
   captured?:ReactElement<CupProp | TilePropWithDuck>;
   parent:ReactElement<TileProps>;
   move:(index:common.Index)=>void;
}
export type CupAction = BaseCupAction & common.Action<CupProp>;
// to short it, idc
export interface BaseCupProp<Init extends (...args: any) => void>{
    onCaptured?:Init;
    onEaten?:Init;
    onMove?:Init;
}
export type CupProp<T extends (...args: any) => void = (action:CupAction) => void> = common.PropWithParent<T, TileProps> & BaseCupProp<T>
const Cup:React.FC<CupProp> = (opt)=> {const mounted = useRef(false);
    
    return (
        <Image source={CupPng} style={styles.cup}/>
    )
}
export default Cup;