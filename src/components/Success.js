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
                        <div style={styles.logoContainer}>
                            <svg version="1.1" x="0px" y="0px" viewBox="0 0 400 400">
                                    <path className="drawLineSuccess" fill="transparent" stroke="#1ae2a4" strokeWidth="20" d="M374,199.5c0,95.82-77.68,173.5-173.5,173.5S27,295.32,27,199.5c0-73.61,45.84-136.51,110.52-161.72 C157.05,30.18,178.29,26,200.5,26C296.32,26,374,103.68,374,199.5z"/>
                                <g>
                                    <path className="drawLineSuccess" fill="transparent" stroke="#1ae2a4" strokeWidth="10" d="M144.42,276.14c-11.09,0-19.87-1.95-26.33-5.85c-6.46-3.9-11.09-9.51-13.89-16.82
                                        c-2.8-7.31-4.2-16.03-4.2-26.14V172.3c0-10.24,1.4-18.95,4.2-26.14c2.8-7.19,7.43-12.71,13.89-16.54
                                        c6.46-3.84,15.23-5.76,26.33-5.76c11.21,0,20.08,1.92,26.6,5.76c6.52,3.84,11.18,9.35,13.99,16.54c2.8,7.19,4.2,15.91,4.2,26.14
                                        v55.03c0,10.12-1.4,18.83-4.2,26.14c-2.81,7.31-7.47,12.92-13.99,16.82C164.5,274.19,155.64,276.14,144.42,276.14z M144.42,252.93
                                        c3.41,0,5.91-0.85,7.5-2.56c1.58-1.71,2.62-3.9,3.11-6.58c0.49-2.68,0.73-5.42,0.73-8.23v-71.3c0-2.92-0.25-5.7-0.73-8.32
                                        c-0.49-2.62-1.53-4.78-3.11-6.49c-1.59-1.71-4.08-2.56-7.5-2.56c-3.17,0-5.55,0.85-7.13,2.56c-1.59,1.71-2.62,3.87-3.11,6.49
                                        c-0.49,2.62-0.73,5.39-0.73,8.32v71.3c0,2.8,0.21,5.55,0.64,8.23c0.43,2.68,1.4,4.88,2.92,6.58
                                        C138.54,252.07,141.01,252.93,144.42,252.93z"/>
                                    <path className="drawLineSuccess" fill="transparent" stroke="#1ae2a4" strokeWidth="10" d="M209.14,273.95V125.87h32.72v60.51l24.86-60.51h31.99l-27.42,66.91l28.7,81.17h-33.27l-21.39-65.45l-3.47,5.85
                                        v59.6H209.14z"/>
                                </g>
                            </svg>
                        </div>
                        <h1>Your application is complete!</h1>
                        <p>Thank you for taking an interest in us {values.personalData.firstName}!</p>
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
    },
    logoContainer:{
        maxWidth:400,
        width:'100%',
        margin:'auto'
    }
}

export default Success