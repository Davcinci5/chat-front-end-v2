import React,{useState, useEffect} from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPLOADIMG } from '../schema/mutations';
import ShowImageComponent from '../components/ShowImageComponent'


const ImageLoaderComponent = ({src}) => {
    //Hooks
    const[imagesrc,setImagesrc]= useState("");

    useEffect(()=>{
        setImagesrc(src)
    },[src]);
    
    //Mutation
    const [upload] = useMutation(UPLOADIMG);
    
    const showFile = (e)=>{
        let file = e.target.files[0];
        upload({ variables: { file }}).then(res=>{      
            setImagesrc(res.data.uploadFile);
        }).catch(e=>{
            throw new Error(e);
        });
    }

return(
    <React.Fragment>
     <ShowImageComponent src={imagesrc} height="185" width="210"/><br/>
    <input type="file" onChange={showFile} accept="image/*"/><br/>
    </React.Fragment>
);
}

export default ImageLoaderComponent;