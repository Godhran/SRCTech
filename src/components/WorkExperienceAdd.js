import React from "react";
import { TextField, ButtonGroup, Button, FormGroup, MuiThemeProvider, Typography }  from "@material-ui/core";
import AppNavBar from "./AppNavBar.js";

class WorkExperienceAdd extends React.Component {
    state={
        startDate:"",
        endDate:"",
        role:"",
        roleDescription:"",
        errorStartDate:"",
        errorEndDate:"",
        errorRole:"",
        errorRoleDescription:""
    }
    
    goNext = value => e =>{
        e.preventDefault()
        if(this.validateData(this.state.personalData)){
            this.props.manageUpdates("personalData",this.state.personalData);
            this.props.pageManager(true,value);
        }
    }

    goBack = value => e =>{
        e.preventDefault()
        this.props.pageManager(false,value);
    }

    addWorkExperience = e =>{
        e.preventDefault()
        if(this.validateData(this.state)){
            this.props.addWorkExperience(this.state);
        }
    }

    sanitizeString(str){
        if(str.length>0){
            str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
            return str.trim();
        }else{
            return "";
        }
    }

    validateData=(data)=>{
        let allDataOk=true;

        data.role = this.sanitizeString(data.role);
        data.roleDescription = this.sanitizeString(data.roleDescription);

        let tempErrorStartDate="";
        let tempErrorEndDate="";
        let tempErrorRole="";
        let tempErrorRoleDescription="";

        if(data.startDate.length>0){
            tempErrorStartDate="";
        }else{
            tempErrorStartDate="Enter a start date";
            allDataOk=false;
        }

        if(data.endDate.length>0){
            tempErrorEndDate="";            
        }else{
            tempErrorEndDate="Enter an end date";            
            allDataOk=false;
        }
        
        if(data.role.length>0){
            tempErrorRole="";            
        }else{
            tempErrorRole="Enter a role";            
            allDataOk=false;
        }       

        if(data.roleDescription.length>0){
            tempErrorRoleDescription="";            
        }else{
            tempErrorRoleDescription="Enter a role description";            
            allDataOk=false;
        }

        this.setState({
            ...this.state,
            errorStartDate:tempErrorStartDate,
            errorEndDate:tempErrorEndDate,
            errorRole:tempErrorRole,
            errorRoleDescription:tempErrorRoleDescription
         });

        return allDataOk;
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
                    <h3>Add Work Experience</h3>
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
                        <Typography style={styles.errorText}>{this.state.errorStartDate}</Typography>
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
                        <Typography style={styles.errorText}>{this.state.errorEndDate}</Typography>
                    </FormGroup>

                    <FormGroup>
                        <TextField 
                            id="standard-basic" 
                            label="Role" 
                            onChange={this.updateTempData("role")}
                        />
                        <Typography style={styles.errorText}>{this.state.errorRole}</Typography>
                    </FormGroup>
                    <FormGroup>
                        <TextField 
                            id="standard-basic" 
                            label="Role Description" 
                            onChange={this.updateTempData("roleDescription")}
                            multiline
                            rows={4}
                        />
                        <Typography style={styles.errorText}>{this.state.errorRoleDescription}</Typography>
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

const styles={
    errorText:{
        color:'#E51D5B'
    }
}
export default WorkExperienceAdd