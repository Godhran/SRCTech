import React from "react";
import { ButtonGroup, Button, MuiThemeProvider }  from "@material-ui/core";
import AppNavBar from "./AppNavBar.js";

class Industries extends React.Component {
    industryList=['Automotive','Accounting','Technology','Food Services','Agriculture','Banking','Education','Electronics','Health','Manufacturing','Other']

    goNext = value => e =>{
        e.preventDefault()
        this.props.pageManager(true,value);
    }
    
    goBack = value => e =>{
        e.preventDefault()
        this.props.pageManager(false,value);
    }

    activateIndustry(industry){
        return this.props.values.industries.includes(industry);
    }

    toggleIndustry = industry => e =>{
        e.preventDefault();
        this.props.updateIndustries(industry);
    }

    render(){
        return(
            <MuiThemeProvider>
                <React.Fragment>
                    <AppNavBar pageTitle="Select Industries"/>
                    <div className="formContainer">
                    <h3>Industries</h3>
                    <div style={styles.industries}>
                    {this.industryList.map((entry, index) => {
                        return <Button variant="outlined" color={this.activateIndustry(entry)?"primary":"default"} key={index} onClick={this.toggleIndustry(entry)} style={styles.button}>{entry}</Button>
                    })}
                    </div>
                    <ButtonGroup className="pageControlButtons" disableElevation variant="contained" color="primary">
                        <Button onClick={this.goBack(2)}>Back</Button>
                        <Button onClick={this.goNext(1)}>Next</Button>
                    </ButtonGroup>
                    </div>
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

const styles={
    button:{
        borderRadius:'100px',
        // padding:'1em',
        fontFamily:"Oswald",
        textTransform:"capitalize",
        margin:'0.25em'
    },
    industries:{
        width:'250px',
        margin:'auto'
    }
}

export default Industries