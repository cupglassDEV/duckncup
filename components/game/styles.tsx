import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    tile: {
      width: 50,
      height: 50,
      //marginTop: 32,
      paddingHorizontal: 24,
    },
    tileColor: {
      backgroundColor:"#ab9100"
    },
    tileColorNeutral: {
      backgroundColor:"#635e5e"
    },
    cup: {
      width:50,
      height:50,
      left:-23.5
    },
    duck: {
      width:50,
      height:50,
      left:-23.5
    },
    tileRow:{
      flex: 1,
      flexDirection:"row"
    },
    tileRows:{
      flex: 1,
      flexDirection:"column"
    }
  });
export default styles;