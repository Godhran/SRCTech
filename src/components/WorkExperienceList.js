import React from "react";
import { ButtonGroup, Button, MuiThemeProvider, Typography }  from "@material-ui/core";
import AppNavBar from "./AppNavBar.js";


class WorkExperienceList extends React.Component {
    goNext = value => e =>{
        e.preventDefault()
        this.props.pageManager(true,value);
    }

    goBack = value => e =>{
        e.preventDefault()
        this.props.pageManager(false,value);
    }

    deleteEntry = index => e =>{
        e.preventDefault()
        this.props.deleteWorkExperience(index);
    }

    handleChange = input => e =>{
        this.setstate({
            [`${input}`]: e.target.value
        });
    }

    render(){
        const { values } = this.props;
        return(
            <MuiThemeProvider>
                <React.Fragment>
                    <AppNavBar pageTitle="Work Experience"/>
                    <div className="formContainer">
                    <h3>Work Experience</h3>
                    <div>
                    {values.workExperience.map((entry, index) => {
                        return(
                        <div style={styles.workExperienceContainer} key={index}>
                        <Typography  variant="h6" style={styles.roleTitle}>{entry.role}</Typography>
                        <Typography  variant="body1" style={styles.dates}>{entry.startDate} - {entry.endDate}</Typography>
                        <Typography  variant="body1">{entry.roleDescription}</Typography>
                        <Button onClick={this.deleteEntry(index)} variant="outlined" color="secondary">Delete</Button>
                        </div>
                        )
                    })
                    }
                    </div>
                    <ButtonGroup className="pageControlButtons" disableElevation variant="contained" color="primary">
                        <Button onClick={this.goBack(1)}>Back</Button>
                        <Button onClick={this.goNext(1)}>Add</Button>
                        <Button onClick={this.goNext(2)}>Next</Button>
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
    workExperienceContainer:{
        textAlign:'left',
        borderRadius:'25px',
        padding:'1.5em',
        marginBottom:'1.5em',
        fontFamily:'Oswald'
    },
    dates:{
        fontStyle:'italic'
    },
    roleTitle:{
        textTransform:'Uppercase',
    }
}
export default WorkExperienceList