import React from "react";
import { ButtonGroup, Button, FormGroup, MuiThemeProvider, FormControl, InputLabel, InputAdornment, IconButton, Input, Typography }  from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AppNavBar from "./AppNavBar.js";


class PasswordEntry extends React.Component {
    state={
        showPassword:false,
        password:this.props.values.authentification.password,
        confirmPassword:this.props.values.authentification.password,
        errorPassword:"",
        errorConfirmPassword:""
    }

    goNext = value => e =>{
        e.preventDefault()
        if(this.state.errorPassword.length===0&&this.state.password.length>0&&this.state.errorConfirmPassword.length===0&&this.state.confirmPassword.length>0){
            this.props.manageUpdates("authentification",{password:this.state.password});
            this.props.pageManager(true,value);
        }
    }
    
    goBack = value => e =>{
        e.preventDefault()
        this.props.pageManager(false,value);
    }


    updatePassword = field => e =>{
        this.setState({
            [`${field}`]: e.target.value
        },()=>{
            //Check for one uppercase, one lowercase, one number and one symbol. Minimum 8 characters long.
            const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
            if(regex.test(String(this.state.password))){
                this.setState({
                    errorPassword:""
                })
            }else{
                this.setState({
                    errorPassword:"Passwords must contain 1 uppercase, 1 lowercase, 1 number and 1 symbol. Minimum 8 characters."
                })
            }
        });
    }

    updateConfirmPassword = field => e =>{
        this.setState({
            [`${field}`]: e.target.value
        },()=>{
            if(this.state.password===this.state.confirmPassword){
                this.setState({
                    errorConfirmPassword:""
                })
            }else{
                this.setState({
                    errorConfirmPassword:"Passwords do not match"
                })
            }
        });
    }

    handleClickShowPassword = () => {
        this.setState({ ...this.state, showPassword: !this.state.showPassword });
      };
    
    handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    render(){
        const { values } = this.props;
        return(
            <MuiThemeProvider>
                <React.Fragment>
                    <AppNavBar pageTitle="Password Details"/>
                    <div className="formContainer">
                    <h3>Password</h3>
                    <FormGroup>
                        <FormControl>
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="passwordInput"
                                type={this.state.showPassword ? 'text' : 'password'}
                                defaultValue={values.authentification.password} 
                                onChange={this.updatePassword('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                        >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                            />
                        </FormControl>
                        <Typography style={styles.errorText}>{this.state.errorPassword}</Typography>
                    </FormGroup>

                    <FormGroup>
                        <FormControl>
                            <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                            <Input
                                id="confirmPasswordInput"
                                type={this.state.showPassword ? 'text' : 'password'}
                                defaultValue={values.authentification.password} 
                                onChange={this.updateConfirmPassword('confirmPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                        >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                            />
                        </FormControl>
                        <Typography style={styles.errorText}>{this.state.errorConfirmPassword}</Typography>
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
    errorText:{
        color:'#E51D5B'
    }
}

export default PasswordEntry