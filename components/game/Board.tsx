import { View } from "react-native";
import * as common from "./common"
import TileRow, {TileRowProp} from "./TileRow";
import Tile, { TileLevel, TileProps } from "./Tile";
import Cup from "./Cup";
import { ReactElement, useEffect, useRef } from "react";

export const Preset:{standart:React.ReactElement<TileRowProp>[]} = {
  // TODO: Make a small generator to simplify these
  standart: (()=>{
    return [
    <TileRow index={"A"}>
      <Tile index={4} team={"black"} level={"base"}>
        <Cup></Cup>
      </Tile>
      <Tile index={5} team={"black"} level={"base"}></Tile>
      <Tile index={6} team={"black"} level={"base"}>
        <Cup></Cup>
      </Tile>
    </TileRow>,
    <TileRow index={"B"}>
      <Tile index={4} team={"black"} level={"semi"}>
      </Tile>
      <Tile index={5} team={"black"} level={"semi"}></Tile>
      <Tile index={6} team={"black"} level={"semi"}>
      </Tile>
    </TileRow>,
    <TileRow index={"C"}>
      <Tile index={4} team={"black"}>
      </Tile>
      <Tile index={5} team={"black"}></Tile>
      <Tile index={6} team={"black"}>
      </Tile>
    </TileRow>,
    <TileRow index={"D"}>
      <Tile index={1} team={"white"} level={"base"}>
        <Cup></Cup>
      </Tile>
      <Tile index={2} team={"white"} level={"semi"}></Tile>
      <Tile index={3} team={"white"}></Tile>
      <Tile index={4} level={"nearDuck"}>
      </Tile>
      <Tile index={5} level={"nearDuck"}></Tile>
      <Tile index={6} level={"nearDuck"}></Tile>
      <Tile index={7} team={"black"}>
      </Tile>
      <Tile index={8} team={"black"} level={"semi"}></Tile>
      <Tile index={9} team={"black"} level={"base"}>
      <Cup></Cup>
      </Tile>
    </TileRow>,
    <TileRow index={"E"}>
      <Tile index={1} team={"white"} level={"base"}>
      <Cup></Cup>
      </Tile>
      <Tile index={2} team={"white"} level={"semi"}></Tile>
      <Tile index={3} team={"white"}></Tile>
      <Tile index={4} level={"nearDuck"}>
      </Tile>
      <Tile index={5} hasDuck={true}></Tile>
      <Tile index={6} level={"nearDuck"}></Tile>
      <Tile index={7} team={"black"}>
      </Tile>
      <Tile index={8} team={"black"} level={"semi"}></Tile>
      <Tile index={9} team={"black"} level={"base"}>
      <Cup></Cup>
      </Tile>
    </TileRow>,
    <TileRow index={"F"}>
      <Tile index={1} team={"white"} level={"base"}>
      <Cup></Cup>
      </Tile>
      <Tile index={2} team={"white"} level={"semi"}></Tile>
      <Tile index={3} team={"white"}></Tile>
      <Tile index={4} level={"nearDuck"}>
      </Tile>
      <Tile index={5} level={"nearDuck"}></Tile>
      <Tile index={6} level={"nearDuck"}></Tile>
      <Tile index={7} team={"black"}>
      </Tile>
      <Tile index={8} team={"black"} level={"semi"}></Tile>
      <Tile index={9} team={"black"} level={"base"}>
      <Cup></Cup>
      </Tile>
    </TileRow>,
    <TileRow index={"G"}>
      <Tile index={4} team={"white"}>
      </Tile>
      <Tile index={5} team={"white"}></Tile>
      <Tile index={6} team={"white"}>
      </Tile>
    </TileRow>,
    <TileRow index={"H"}>
      <Tile index={4} team={"white"} level={"semi"}>
      </Tile>
      <Tile index={5} team={"white"} level={"semi"}></Tile>
      <Tile index={6} team={"white"} level={"semi"}>
      </Tile>
    </TileRow>,
    <TileRow index={"I"}>
        <Tile index={4} team={"white"} level={"base"}>
          <Cup></Cup>
        </Tile>
        <Tile index={5} team={"white"} level={"base"}></Tile>
        <Tile index={6} team={"white"} level={"base"}>
          <Cup></Cup>
        </Tile>
      </TileRow>
  ]})()
}

export interface CoreBoardProp <init extends Function = (board:typeof Board)=>void> {
    onCaptured?:init;
    onEaten?:init;
    onMove?:init;
    children: React.ReactElement<TileRowProp> | React.ReactElement<TileRowProp>[];
}
export type BoardProp = common.Prop<(action:BoardAction)=>void> & CoreBoardProp
//for later
// export interface BaseBoardAction {
// }
export type BoardAction = common.Action<BoardProp>
const Board:React.FC<BoardProp> = (opt)=> {
    const mounted = useRef(false);
    const elem:ReturnType<React.FC<BoardProp>> =  (
      <View>
        {opt.children}
      </View>
    );
    const action = useRef<BoardAction>({
      mounted:false,
      element:elem
    })
    useEffect(()=>{
      mounted.current = true;
      action.current.mounted = true;
      opt.onMounted?.(action.current);
      return () => {
          mounted.current = false;
          action.current.mounted = false;
          opt.onDismounted?.(action.current);
      };
    },[])
    return elem;
  };
  
export default Board;
  