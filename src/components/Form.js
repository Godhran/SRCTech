import React from "react";
import Register from "./Register"
import PersonalDetails from "./PersonalDetails"
import PasswordEntry from "./PasswordEntry";
import WorkExperienceList from "./WorkExperienceList";
import WorkExperienceAdd from "./WorkExperienceAdd";
import Industries from "./Industries";
import DataReview from "./DataReview";
import Success from "./Success";

class Form extends React.Component {
    state={
        page:0,
        personalData:{
            firstName:"",
            lastName:"",
            dateOfBirth:"",
            emailAddress:"",
            postCode:"",
            address:""
        },
        authentification:{
            password:""
        },
        workExperience:[],
        industries:[]
    }
    
    pageManager = (next,value)  =>{
        const { page } = this.state;
        if(next){
            this.setState({
                page:page+value
            });
        }else{
            this.setState({
                page:page-value
            });
        }
    }

    deleteWorkExperience = (index) =>{
        let clonedState = {...this.state};
        clonedState.workExperience.splice(index,1);
        this.setState({...this.state,workExperience:clonedState.workExperience});
    }

    // updatePersonalDetails = (index) =>{
    //     let clonedState = {...this.state};
    //     clonedState.workExperience.splice(index,1);
    //     this.setState({...this.state,workExperience:clonedState.workExperience});
    // }

    addWorkExperience = (workExperienceData) =>{
        let clonedState = {...this.state};
        clonedState.workExperience.push({startDate:workExperienceData.startDate,endDate:workExperienceData.endDate,role:workExperienceData.role,roleDescription:workExperienceData.roleDescription});
        this.setState({...this.state,page:3,workExperience:clonedState.workExperience});
    }

    updateIndustries=(industry)=>{
        if(this.state.industries.includes(industry)){
            let index = this.state.industries.indexOf(industry);
            let clonedIndustries = this.state.industries;
            clonedIndustries.splice(index,1);
            this.setState({...this.state,industries:clonedIndustries});
        }else{
            let clonedIndustries = this.state.industries;
            clonedIndustries.push(industry);
            this.setState({...this.state,industries:clonedIndustries});
        }
    }

    restartApplication = () =>{
        let clonedState = {...this.state};
        let resetState ={
            page:0,
            personalData:{
                firstName:"",
                lastName:"",
                dateOfBirth:"",
                emailAddress:"",
                address:""
            },
            authentification:{
                password:""
            },
            workExperience:[],
            industries:[]
        }
        clonedState=resetState;
        this.setState(clonedState);
    }

    manageUpdates = (target,newData) =>{
        let clonedState = {...this.state};
        clonedState = newData;
        this.setState({...this.state,[target]:clonedState});
    }

    render(){
        const { page } = this.state;
        const { personalData, authentification, workExperience, industries} = this.state;
        const values = { personalData, authentification, workExperience, industries};
        switch(page){
            case 0: return (
                <Register
                pageManager={this.pageManager}
                handleChange={this.handleChange}
                values={values}            
                />);
            case 1: return (
            <PersonalDetails
            pageManager={this.pageManager}
            handleChange={this.handleChange}
            manageUpdates={this.manageUpdates}
            values={values}            
            />)
            case 2: return (
                <PasswordEntry
                pageManager={this.pageManager}
                handleChange={this.handleChange}
                manageUpdates={this.manageUpdates}
                values={values}            
                />)
            case 3: return (
                <WorkExperienceList
                pageManager={this.pageManager}
                handleChange={this.handleChange}
                deleteWorkExperience={this.deleteWorkExperience}
                values={values}            
                />)
            case 4: return (
                <WorkExperienceAdd
                pageManager={this.pageManager}
                handleChange={this.handleChange}
                updateWorkExperience={this.updateWorkExperience}
                addWorkExperience={this.addWorkExperience}
                manageUpdates={this.manageUpdates}
                values={values}            
                />)
            case 5: return (
                <Industries
                pageManager={this.pageManager}
                handleChange={this.handleChange}
                updateIndustries={this.updateIndustries}
                manageUpdates={this.manageUpdates}
                values={values}            
                />)
            case 6: return (
                <DataReview
                pageManager={this.pageManager}
                handleChange={this.handleChange}
                values={values}            
                />)
            case 7: return (
                <Success
                pageManager={this.pageManager}
                handleChange={this.handleChange}
                restartApplication={this.restartApplication}
                values={values}            
                />)
            default:break;
        }
    }
}

export default Form