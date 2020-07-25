import React from "react";
import { AppBar, Toolbar, Typography} from "@material-ui/core";

class AppNavBar extends React.Component {

    render(){
        return(
            <React.Fragment>
                <AppBar position="static" style={styles.AppBar}>
                    <Toolbar style={styles.Toolbar}>
                        <Typography  style={styles.PageTitle}>
                        {this.props.pageTitle}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        )
    }
}

const styles = {
    AppBar:{
        backgroundColor:'#E51D5B',
        alignItems: 'center'
    },
    Brand:{
        color:'#FDEF6C',
        fontSize:'2em'
    },
    PageTitle:{
        color:'white',
        fontSize:'1.5em',
        fontFamily:'Oswald',
    }
}

export default AppNavBar