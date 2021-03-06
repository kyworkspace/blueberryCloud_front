import React, { memo, useEffect, useState } from 'react'
import { Media } from 'reactstrap';
import { errorMessage } from '../../../../utils/alertMethod';
import { changeProfileImage, profileInsert } from '../../../../utils/commonMethod';
import url from '../../../../route/DevUrl';

const UserProfileImage=memo((props) =>{
    const {imageUrl, self} = props
    const [profileUrl, setProfileUrl] = useState();

    useEffect(() => {
      setProfileUrl(imageUrl)
    }, [imageUrl])

    const readProfileUrl = (event) => {
        profileInsert(event.target.files)
        .then(response=>{
          if(response.data.success){
            const {fileInfo} = response.data;
            // console.log(fileInfo)
            changeProfileImage(fileInfo,'avatar')
            .then(response=>{
              if(response.data.success){
                setProfileUrl(response.data.url)
              }
            }).catch(err=>{
              errorMessage('오류가 발생하였습니다.')    
            })
          }
        }).catch(err=>{
          errorMessage('오류가 발생하였습니다.')
        })
      }
    return (
        <div className="user-image">
            <div className="avatar"><Media body alt="" src={`${url}/${profileUrl}`}/></div>
              {
                self &&
                <div className="icon-wrapper">
                  <i className="icofont icofont-pencil-alt-5">
                      <input className="upload" type="file" accept="image/*" onChange={(e) => readProfileUrl(e)} />
                  </i>
                </div>
              }
        </div>
    )
})

export default UserProfileImage
