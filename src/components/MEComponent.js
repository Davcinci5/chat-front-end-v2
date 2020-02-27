import React  from 'react';
import ImageLoaderComponent  from './ImageLoaderComponent';
import moment from 'moment';
import translate from '../i18n/translate';

const MEComponent = (props) =>{

    const createDateWithCurrentYear = (date) => {
        if (!date) return moment(moment().format("YYYY MM DD"));
        let currentYear = moment().format("YYYY");
        let actualDate = moment(date,"YYYY MM DD").format("MM DD");
        return moment(`${currentYear} ${actualDate}`)
    }
    
    const getDaysBirthday = (birthday)=>{
        //
        birthday = createDateWithCurrentYear(birthday)
        let dateNow = createDateWithCurrentYear();
        let remainDays = birthday.diff(dateNow,'days');
        if(remainDays < 0){
             remainDays = birthday.add(1,"year").diff(dateNow,'days');
        }
    return remainDays === 0 ? <p>{translate("happyBirthday")}</p> : remainDays === 1 ? <p>{translate("tomorrowIs")}{props.fullName}{translate("sbirthday")}</p> : 
    <p>{remainDays}{translate("daysbirthday")}</p>
    }

    const getAge = (birthday) =>{
        return moment(birthday, "YYYY MM DD").fromNow(true);
    }


    return(
        <>
        <ImageLoaderComponent src={props.src}/>
        <h1>{props.fullName}</h1>
         {getDaysBirthday(props.birthday)}
        <p>{translate("age")} : {getAge(props.birthday)}</p>
        <p>{translate("gender")} : {translate(props.gender)}</p>
         <p>{translate("email")} : {props.email}</p>
        
        </>
    );
}

export default MEComponent;