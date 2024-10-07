import { View } from "react-native";
import * as common from "./common"
import TileRow from "./TileRow";
import Tile from "./Tile";
export interface BoardProps {
    index:common.Index;
    onInit?:init;
}
const Board:React.FC<BoardProps> = (opt)=> {
    return (
      <View>
        <TileRow index={"A"}>
          <Tile index={4} colored={false}></Tile>
        </TileRow>
      </View>
    );
  };
  
export default Board;
  