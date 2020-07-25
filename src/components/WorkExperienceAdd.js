import React from "react";
import { TextField, ButtonGroup, Button, FormGroup, MuiThemeProvider }  from "@material-ui/core";
import AppNavBar from "./AppNavBar.js";

class WorkExperienceAdd extends React.Component {
    state={
        startDate:undefined,
        endDate:undefined,
        role:undefined,
        roleDescription:undefined
    }
    
    goNext = value => e =>{
        e.preventDefault()
        this.props.pageManager(true,1);
    }

    goBack = value => e =>{
        e.preventDefault()
        this.props.pageManager(false,1);
    }

    addWorkExperience = e =>{
        e.preventDefault()
        this.props.addWorkExperience(this.state);
    }

    handleChange = input => e =>{
        this.setstate({
            [`${input}`]: e.target.value
        });
    }

    getCurrentDate() {
        let date = new Date(),
            month = '' + (date.getMonth() + 1),
            day = '' + date.getDate(),
            year = date.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        return `${year}-${month}-${day}`;
    }

    updateTempData = field => e =>{
        this.setState({[field]:e.target.value});
    }

    setStartDate(){

    }

    render(){
        return(
            <MuiThemeProvider>
                <React.Fragment>
                    <AppNavBar pageTitle="Add Work Experience"/>
                    <div className="formContainer">
                    <FormGroup>
                        <TextField
                            id="startDate"
                            label="Start Date"
                            type="date"                        
                            max={ this.getCurrentDate() }
                            onChange={this.updateTempData("startDate")}
                            InputProps={{inputProps: { min: "1920-05-01", max: this.getCurrentDate()} }}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <TextField
                            id="endDate"
                            label="End Date"
                            type="date"                        
                            max={ this.getCurrentDate() }
                            onChange={this.updateTempData("endDate")}
                            InputProps={{inputProps: { min: this.state.startDate, max: this.getCurrentDate()} }}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </FormGroup>

                    <FormGroup>
                        <TextField 
                            id="standard-basic" 
                            label="Role" 
                            onChange={this.updateTempData("role")}
                        />
                    </FormGroup>
                    <FormGroup>
                        <TextField 
                            id="standard-basic" 
                            label="Role Description" 
                            onChange={this.updateTempData("roleDescription")}
                            multiline
                            rows={4}
                        />
                    </FormGroup>
                    <ButtonGroup className="pageControlButtons" disableElevation variant="contained" color="primary">
                        {/* <Button onClick={this.updateWorkExperience(false)}>Cancel</Button> */}
                        <Button onClick={this.addWorkExperience}>Save</Button>
                    </ButtonGroup>
                    </div>
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

export default WorkExperienceAdd