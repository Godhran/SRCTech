import React from "react";
import { TextField, ButtonGroup, Button, MenuItem, FormGroup, MuiThemeProvider, Select, FormControl, Input, InputLabel, IconButton, InputAdornment, Typography }  from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search';
import AppNavBar from "./AppNavBar.js"

class PersonalDetails extends React.Component {

    state={
        personalData:this.props.values.personalData,
        addressOptions:
        [],
        errorFirstName:"",
        errorLastName:"",
        errorDateOfBirth:"",
        errorEmail:"",
        errorPostCode:"",
        errorAddress:""
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

        data.firstName = this.sanitizeString(data.firstName);
        data.lastName = this.sanitizeString(data.lastName);

        let tempErrorFirstName="";
        let tempErrorLastName="";
        let tempErrorEmail="";
        let tempErrorDateOfBirth="";
        let tempErrorPostCode="";
        let tempErrorAddress="";

        if(data.firstName.length>0){
            tempErrorFirstName="";
        }else{
            tempErrorFirstName="Enter a first name";
            allDataOk=false;
        }

        if(data.lastName.length>0){
            tempErrorLastName="";            
        }else{
            tempErrorLastName="Enter a last name";            
            allDataOk=false;
        }

        if(data.dateOfBirth.length>0){
            tempErrorDateOfBirth="";                  
        }else{
            tempErrorDateOfBirth="Select a date of birth";     
            allDataOk=false;
        }

        if(data.emailAddress.length>0){
            if(!this.validateEmail(data.emailAddress)){
                tempErrorEmail=`'${data.emailAddress}' is not a valid email address`;     
                allDataOk=false;
            }else{
                tempErrorEmail="";      
            }
        }else{
            tempErrorEmail="Enter a valid email";     
            allDataOk=false;
        }

        if(data.postCode.length>0){
            tempErrorPostCode=""; 
        }else{
            tempErrorPostCode="Post codes must be 7 characters";     
            allDataOk=false;
        }

        if(data.address.length>0){
            tempErrorAddress=""; 
        }else{
            tempErrorAddress="Select an address";     
            allDataOk=false;
        }

        this.setState({
            ...this.state,
            errorFirstName:tempErrorFirstName,
            errorLastName:tempErrorLastName,
            errorDateOfBirth:tempErrorDateOfBirth,
            errorEmail:tempErrorEmail,
            errorPostCode:tempErrorPostCode,
            errorAddress:tempErrorAddress,
         });

        return allDataOk;
    }

    validateEmail(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email));
    }

    getCurrentDate() {
        let date = new Date(),
            month = '' + (date.getMonth() + 1),
            day = '' + date.getDate(),
            year = date.getFullYear();
    
        if (month < 10) 
            month = '0' + month;
        if (day < 10) 
            day = '0' + day;

        return `${year}-${month}-${day}`;
    }

    updateTempData = field => e =>{
        e.preventDefault();
        let tempPersonalData = this.state.personalData;
        tempPersonalData[field] = e.target.value;
        this.setState({...this.state,personalData:tempPersonalData});
    }


    updatePostCode= field => e =>{
        e.preventDefault();
        let tempPostCode = e.target.value.replace(/ /g,"");
        this.setState({[field]:e.target.value});
        if(tempPostCode.length===7){
            this.getAddressFromPostCode(tempPostCode)
        }
    }
    
    getAddressFromPostCode = async(postCode) => {
        this.removeBlanks(this.state.addressOptions)

        const API_KEY = 'ah nah nah nah';
    
        const api_call = await fetch(
          `https://api.getAddress.io/find/${postCode}?api-key=${API_KEY}`
        );
    
        const data = await api_call.json();

        try {
            let tempAddresses=data.addresses;
            // Remove ' ,' from lines like 'Address 1, , , , , City, Country' to 'Address 1, City, Country'
            for(let index=0;index<tempAddresses.length;index++){
                tempAddresses[index]=`${tempAddresses[index].replace(/\ \,/g,"")}, ${postCode.toLocaleUpperCase()}`;
            }
            this.setState({...this.state,addressOptions:tempAddresses});
      } catch (error) {
      }
    }
    
    removeBlanks = (addresses) =>{
        for(let index=0;index<addresses.length;index++){
            addresses[index]=addresses[index].replace(/\ \,/g,"")+this.state.postCode;
        }
        
        this.setState({...this.state,addressOptions:addresses});
    }

    
    handleClickShowPostCode = () => {
        this.getAddressFromPostCode(this.state.personalData.postCode);
    };
    
    handleMouseDownPostCode = (event) => {
        event.preventDefault();
    };

    render(){
        
        const { values } = this.props;
        return(
            <MuiThemeProvider>
                <React.Fragment>
                    <AppNavBar pageTitle="Personal Details"/>
                    <div className="formContainer">
                    <h3>Personal Details</h3>
                    <FormGroup>
                        <TextField 
                            id="firstNameField" 
                            label="First Name"
                            defaultValue={values.personalData.firstName} 
                            onChange={this.updateTempData("firstName")}
                            style={styles.inputField}
                        />
                        <Typography style={styles.errorText}>{this.state.errorFirstName}</Typography>
                    </FormGroup>

                    <FormGroup>
                        <TextField 
                            id="lastNameField" 
                            label="Last Name" 
                            defaultValue={values.personalData.lastName} 
                            onChange={this.updateTempData("lastName")}
                            style={styles.inputField}
                        />
                        <Typography style={styles.errorText}>{this.state.errorLastName}</Typography>
                    </FormGroup>

                    <FormGroup>
                        <TextField
                            id="dateOfBirthField"
                            type="date"                        
                            max={ this.getCurrentDate() }
                            onChange={this.updateTempData("dateOfBirth")}
                            defaultValue={values.personalData.dateOfBirth}
                            InputProps={{inputProps: { min: "1920-05-01", max: this.getCurrentDate()} }}
                            InputLabelProps={{
                            shrink: true
                            }}
                            label="Date Of Birth"
                            style={styles.inputField}
                        />
                        <Typography style={styles.errorText}>{this.state.errorDateOfBirth}</Typography>
                    </FormGroup>

                    <FormGroup>
                        <TextField 
                            id="emailAddressField" 
                            label="Email Address" 
                            defaultValue={values.personalData.emailAddress} 
                            onChange={this.updateTempData("emailAddress")}
                            style={styles.inputField}
                        />
                        <Typography style={styles.errorText}>{this.state.errorEmail}</Typography>
                    </FormGroup>


                    <FormGroup>
                        <FormControl style={styles.inputField}>
                            <InputLabel htmlFor="standard-adornment-password">Enter Post Code</InputLabel>
                            <Input
                                id="postCodeField"
                                type="text"
                                defaultValue={values.personalData.postCode} 
                                onChange={this.updateTempData('postCode')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton 
                                            aria-label="search"                                                        
                                            onClick={this.handleClickShowPostCode}
                                            onMouseDown={this.handleMouseDownPostCode}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                    }
                            />
                            <Typography style={styles.errorText}>{this.state.errorPostCode}</Typography>
                        </FormControl>
                    </FormGroup>

                    <FormGroup>
                        <Select
                            labelId="addressSelect"
                            id="addressSelect"
                            onChange={this.updateTempData("address")}
                            defaultValue={values.personalData.address}
                            style={styles.selectInput}
                            >
                                {this.state.addressOptions.map((entry, index) => {
                                    return <MenuItem key={index} value={entry}>{entry}</MenuItem>
                                })}
                        </Select>
                        <Typography style={styles.errorText}>{this.state.errorAddress}</Typography>
                    </FormGroup>
                    <ButtonGroup className="pageControlButtons" disableElevation variant="contained" color="primary">
                        <Button onClick={this.goBack(1)}>Back</Button>
                        <Button onClick={this.goNext(1)}>Next</Button>
                    </ButtonGroup>
                    </div>
            </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

const styles={
    selectInput:{
        maxWidth:'100%',
        marginTop:'1em'
    },
    inputField:{
        marginTop:'1em'
    },
    errorText:{
        color:'#E51D5B'
    }
}

export default PersonalDetails