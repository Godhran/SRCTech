import React from "react";
import { ButtonGroup, Button, MuiThemeProvider, Typography, List, ListItem, ListItemText }  from "@material-ui/core";
import AppNavBar from "./AppNavBar.js";

// let testData={authentification: {
//     password: "rester!t2R"},
//     industries:["Education", "Agriculture", "Technology", "Automotive"], 
//     personalData: {firstName: "Odhran", lastName: "Gormley", dateOfBirth: "2020-07-01", emailAddress: "gorodhran@gmail.com", postCode: "F93 Y6H3",address:"Yadadadadaa"},
//     workExperience: []
// };
class DataReview extends React.Component {
    goNext = value => e =>{
        e.preventDefault()
        this.props.pageManager(true,value);
    }
    
    goBack = value => e =>{
        e.preventDefault()
        this.props.pageManager(false,value);
    }

    render(){
        const { values } = this.props;
        return(
            <MuiThemeProvider>
                <React.Fragment>
                    <AppNavBar pageTitle="Review Your Data"/>
                    <div className="formContainer">
                    <h3>Review your Data</h3>
                    <div>
                        <h2>Personal Details</h2>                    
                            <Typography variant="h6">Name</Typography>
                            <ListItem button>
                                <ListItemText key={"firstName"} primary={`${values.personalData.firstName} ${values.personalData.lastName}`}/>
                            </ListItem>

                            <Typography variant="h6">Email</Typography>
                            <ListItem button>
                                <ListItemText key={"emailAddress"} primary={values.personalData.emailAddress}/>
                            </ListItem>

                            <Typography variant="h6">Date of Birth</Typography>
                            <ListItem button>
                                <ListItemText key={"dateOfBirth"} primary={values.personalData.dateOfBirth}/>
                            </ListItem>

                            <Typography variant="h6">Post Code</Typography>
                            <ListItem button>
                                <ListItemText key={"postCode"} primary={values.personalData.postCode}/>
                            </ListItem>

                            <Typography variant="h6">Address</Typography>
                            <ListItem button>
                                <ListItemText key={"address"} primary={values.personalData.address}/>
                            </ListItem>
                            <Button variant="contained" color="secondary" onClick={this.goBack(5)}>Update</Button>
                    </div>
                    <div>
                    {/* {
                        Object.keys(testData.personalData).forEach((key)=>{
                            return(
                                <ListItem button>
                                    <ListItemText key={key} primary={testData.personalData[key]}/>
                                </ListItem>
                            )                          
                          })
                    } */}
                    <h2>Security</h2>
                        <Typography variant="h6">Password</Typography>
                        <ListItem button>
                            <ListItemText key={"password"} primary={values.authentification.password}/>
                        </ListItem>
                        <Button variant="contained" color="secondary" onClick={this.goBack(4)}>Update</Button>
                    </div>
                    <div>
                    <h2>Work Experience</h2>
                    {values.workExperience.map((job, index) => {
                        return(
                            <ListItem button>
                                <ListItemText key={index} primary={`${job.startDate} - ${job.endDate}\n${job.role}\n${job.roleDescription}`}/>
                            </ListItem>
                        )
                    })}
                    <Button variant="contained" color="secondary" onClick={this.goBack(3)}>Update</Button>
                    </div>
                    <div>
                    <h2>Industries</h2>
                    <List component="nav" aria-label="secondary mailbox folders">
                    {values.industries.map((industry, index) => {
                        return(
                            <ListItem button>
                                <ListItemText key={index} primary={industry}/>
                            </ListItem>
                        )
                    })}
                    </List>
                    <Button variant="contained" color="secondary" onClick={this.goBack(1)}>Update</Button>
                    </div>
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

export default DataReview