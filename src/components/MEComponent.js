import React  from 'react';
import ImageLoaderComponent  from './ImageLoaderComponent';
import moment from 'moment';

const MEComponent = (props) =>{
    
    let date =  moment(props.birthday);
    
    const getDaysBirthday = ()=>{
     let dateNow = moment(),
         year = dateNow.format("YYYY"),//date.format("MM") > dateNow.format("MM") ? dateNow.format("YYYY")  : parseInt(dateNow.format("YYYY"))+1,
         countdown = moment(`${year} ${date.format("MM DD")}`),
         remaining = countdown.diff(dateNow, 'days');
         
         return remaining === 0 ? `HAPPY BIRTHDAY IT'S TODAY` : remaining === 1 ? `Tomorrow is ${props.fullName}'s Birhtday` : 
         ('Birthday in '+moment(`${parseInt(year)+1} ${date.format("MM DD")}`).diff(dateNow,'days') + ' days');
    }

    const getAge = () =>{
        return date.fromNow(true);
    }


    return(
        <>
        <ImageLoaderComponent src={props.src}/>
        <h1>{props.fullName}</h1>
        <p> {getDaysBirthday()}</p>
        <p>Age {getAge()}</p>
        <p>Gender {props.gender}</p>
    <p>Email: {props.email}</p>
        
        </>
    );
}

export default MEComponent;