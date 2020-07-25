import React from "react";
import { ButtonGroup, Button, MuiThemeProvider }  from "@material-ui/core";
import AppNavBar from "./AppNavBar.js";


class Success extends React.Component {
    reset = e =>{
        e.preventDefault()
        this.props.restartApplication();
    }

    render(){
        const { values } = this.props;
        return(
            <MuiThemeProvider>
                <React.Fragment>
                    <AppNavBar pageTitle={`Thanks ${values.personalData.firstName}!`}/>
                    <div className="formContainer" style={styles.container}>
                        <h1>Your application is complete!</h1>
                        <p>Thank you for taking an interest in us, {values.personalData.firstName}!</p>
                        <p>We will get in touch with you at <strong>{values.personalData.emailAddress}</strong> when we process your application.</p>
                    <ButtonGroup className="pageControlButtons" disableElevation variant="contained" color="primary">
                        <Button onClick={this.reset}>Restart Application</Button>
                    </ButtonGroup>
                    </div>
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

const styles =  {
    container:{
        textAlign:'center'
    }
}

export default Success