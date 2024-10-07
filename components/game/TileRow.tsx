import styles from "./styles"
import * as common from "./common"
import { View } from "react-native"
import { Children, ReactElement } from "react"
import { StrictChildren } from "../tools"
import Tile, { TileProp } from "./Tile"
export interface TileRowProp {
    index:common.IndexRow
    children: ReactElement<TileProp> | ReactElement<TileProp>[];
}
const TileRow:React.FC<TileRowProp> = (opt)=> {
    const children = opt.children instanceof Array?opt.children:[opt.children]
    children.forEach((e)=>{
          if (e.type !== "Tile") throw new common.DuckncupErr("TileRow only accepts Tile children")
          if (common.IndexRowWithSpace.includes(opt.index) 
            && common.IndexNumberNoSpace.includes(e.props.index)) throw new common.DuckncupErr(`For TileRow '${opt.index}', the only valid Tile index are ${
        common.IndexNumberWithSpace.map((v, i)=>`${i===common.IndexNumberNoSpace.length-1?"and ":""}${v.toString()}`).join(", ")}`)
    })
    return (
        <View style={styles.tileRow}>
            {children}
        </View>
    )
}
export default TileRow;

const ok:ReactElement<typeof TileRow> = <TileRow index={"A"}>
    <Tile index={1} hasDuck={true}></Tile>
</TileRow>