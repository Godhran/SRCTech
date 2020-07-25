import React from "react";
import { ButtonGroup, Button, MuiThemeProvider}  from "@material-ui/core";
import "../Register.css";


class Register extends React.Component {
    goNext = value => e =>{
        e.preventDefault()
        this.props.pageManager(true,value);
    }

    handleChange = input => e =>{
        this.setstate({
            [`${input}`]: e.target.value
        });
    }

    render(){
        return(
            <MuiThemeProvider>
                <React.Fragment>
                    <div style={styles.landingPage}>
                        <div style={styles.logoContainer}>
                            <svg version="1.1" x="0px" y="0px" viewBox="0 0 400 400">
                            <path id="LeftArm" style={styles.svgShape} d="M241,182h-20.14h-63.27c-17.4,0-31.5-14.1-31.5-31.5s14.1-31.5,31.5-31.5h63.32H241
                                c10.49,0,19-8.51,19-19s-8.51-19-19-19h-83.41v0.04c-37.7,0.75-68.04,31.53-68.04,69.41s30.34,68.66,68.04,69.41V220H241
                                c10.49,0,19-8.51,19-19S251.49,182,241,182z"/>
                            <path id="RightArm" style={styles.svgShape} d="M242.41,131.79v-0.14H159c-10.49,0-19,8.51-19,19s8.51,19,19,19h20.14h63.27
                                c17.4,0,31.5,14.1,31.5,31.5s-14.1,31.5-31.5,31.5h-63.32h-13.23l27.39,38h49.16v-0.04c37.7-0.75,68.04-31.53,68.04-69.41
                                S280.11,132.54,242.41,131.79z"/>
                            <circle id="FullStop" style={styles.svgShape} cx="241" cy="302.31" r="19"/>
                            </svg>
                        </div>
                    <ButtonGroup className="pageControlButtons" disableElevation variant="contained" color="primary">
                        <Button onClick={this.goNext(1)} style={styles.registerButton}>Register</Button>
                    </ButtonGroup>
                    </div>
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

const styles = {
    landingPage:{
        backgroundColor:'#FDEF6C',
        minHeight:'100vh',
        textAlign:'center'
    },
    logoContainer:{
        maxWidth:700,
        width:'100%',
        margin:'auto'
    },
    svgShape:{
        fill:'#E51D5B'
    },
    registerButton:{
        backgroundColor:'#E51D5B',
        fontWeight:'bold',
        fontFamily:'Oswald',
        fontSize:'1.5em',
        borderRadius:'50px'
    }
}

export default Register