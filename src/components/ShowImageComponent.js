import React from 'react';

const ShowImageComponent = ({src,height,width}) => {
        // Get image from server
        const getImage = (img) =>{
            return  `/images/${img}`;
        }
    return(
        <img src={getImage(src)} height={height} width={width} alt="profile"/>
    )
}

export default ShowImageComponent;