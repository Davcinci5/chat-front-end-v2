import React  from 'react';
import ImageLoaderComponent  from './ImageLoaderComponent';
import moment from 'moment';

const MEComponent = (props) =>{

    const createDateWithCurrentYear = (date) => {
        if (!date) return moment(moment().format("YYYY MM DD"));
        let currentYear = moment().format("YYYY");
        let actualDate = moment(date,"YYYY MM DD").format("MM DD");
        return moment(`${currentYear} ${actualDate}`)
    }
    
    const getDaysBirthday = (birthday)=>{
        birthday = createDateWithCurrentYear(birthday)
        let dateNow = createDateWithCurrentYear();
        let remainDays = birthday.diff(dateNow,'days');
        if(remainDays < 0){
             remainDays = birthday.add(1,"year").diff(dateNow,'days');
        }
         return remainDays === 0 ? `HAPPY BIRTHDAY IT'S TODAY` : remainDays === 1 ? `Tomorrow is ${props.fullName}'s Birhtday` : 
         ('Birthday in '+remainDays +' days');
    }

    const getAge = (birthday) =>{
        return moment(birthday, "YYYY MM DD").fromNow(true);
    }


    return(
        <>
        <ImageLoaderComponent src={props.src}/>
        <h1>{props.fullName}</h1>
        <p> {getDaysBirthday(props.birthday)}</p>
        <p>Age {getAge(props.birthday)}</p>
        <p>Gender {props.gender}</p>
    <p>Email: {props.email}</p>
        
        </>
    );
}

export default MEComponent;