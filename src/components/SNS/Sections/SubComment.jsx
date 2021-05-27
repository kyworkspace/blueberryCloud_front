import React, { memo } from 'react'
import { Media } from 'reactstrap'
import url from '../../../route/DevUrl';


const SubComment=memo((props) =>{
    const {user} = props;
    return (
        <div className="other-msg">
            <Media>
                <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={`${url}/${user.profileImage}`} />
                <Media body>
                    <span className="f-w-600">AlexendraDhadio 
                        <span>{"1 Month Ago"} 
                        <i className="fa fa-reply font-primary"></i>
                        </span>
                    </span>
                    <p>{"ohh yeah very good car and its features i will surely vote for it"} </p>
                </Media>
            </Media>
        </div>
    )
})

export default SubComment
