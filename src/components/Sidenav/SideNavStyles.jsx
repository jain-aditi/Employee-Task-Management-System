import { blue, blueGrey, purple } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    navLinks:{
        color:blueGrey['A400'],
        '& :hover ' : {
            '& .MuiListItemIcon-root':{
                color: blue['A700']}
        },
        '& div, & span' : {
            color : blueGrey['A700']
        },

    },
    active:{
        color: "blue['A700'] ",
        '& :hover, & :hover div' : {
            color:purple[500]
        },
       
    }
}))