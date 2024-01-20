import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, connectStorageEmulator } from 'firebase/storage';
import db, { storage } from '../firebase'
import './UloardFile.css'
import FileCard from './FileCard';

const UploadFile =(props)=>{
    //console.log(props)
    
    const [uploadurl, setUploadUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    
    useEffect(() => {
    },[])
    
    const handleFileSelect = (e) =>{
      setSelectedFile(e?.target?.files[0])
    }

    const handleSubmit= async (e)=>{

        e.preventDefault();
        try{
          const fileName = selectedFile?.name;
          console.log(selectedFile.type);
        // pending catches
        const imageRef = ref(storage, `files/${fileName}`)
        uploadBytes(imageRef, selectedFile)
            .then((result) => {
              console.log(result.ref);
                getDownloadURL(result.ref).then(async (url) => {
                  //console.log(url);
                  setUploadUrl(url)
                    const backendUrl = `${process.env.REACT_APP_API_URL}/submit/addFile`
                    const response = await fetch(backendUrl, {
                      method: 'POST',
                      credentials: 'include',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        client_id:props.client_id,
                        download_link: url,
                        file_type: selectedFile?.type,
                        file_name: selectedFile?.name,
                      })
                    });
                    if(response?.status === 200){
                      alert("Uploaded Successfully");
                      props?.getUser();
                      setSelectedFile("")
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
        catch(error){

        }
    };

    //console.log(uploadurl);

    return (

        <div >
         <form className="upload"onSubmit={handleSubmit}>
         <div className='file-input'>
        <input type='file' onChange={handleFileSelect} />
        <span className='button'>Choose</span>
        <span className='label' data-js-label><label>{selectedFile?.name?selectedFile.name:"No File selected"}</label></span>
        </div>
        <button className='fileButton' type="submit">SUBMIT</button>
         </form>
         <div className='upload__file__grid'>
            {
              props?.files?.map((d,i) => {
                return (
                  <FileCard data={d} />
                )
              })
            }
         </div>
        </div>
    )
    

}

export default UploadFile;