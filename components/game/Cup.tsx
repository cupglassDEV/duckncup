import styles from "./styles"
import * as common from "./common"
import { Image, View } from "react-native"
import { Children, ReactElement } from "react"
import { StrictChildren } from "../tools"
import Tile, { TileProp } from "./Tile"
import CupPng from "../assets/images/Cup.png"
export 
export type CupProp = common.Prop<(action:CupAction)=>void> & {
    children?:undefined
}
const Cup:React.FC<CupProp> = (opt)=> {
    return (
        <Image source={CupPng} style={styles.cup}/>
    )
}
export default Cup;
const o = <Cup></Cup>