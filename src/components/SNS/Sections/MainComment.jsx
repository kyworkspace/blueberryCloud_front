import React, { memo } from 'react'
import { Media } from 'reactstrap'
import emptyUser from '../../../assets/images/dashboard/emptyProfile.png'
const MainComment=memo((props) =>{
    return (
        <div className="your-msg">
            <Media>
                <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={emptyUser} />
                <Media body>
                    <span className="f-w-600">JasonBorne 
                        <span>
                            {"1 Year Ago"}
                            <i className="fa fa-reply font-primary"></i>
                        </span>
                     </span>
                    <p>{"we are doing dance and singing songs, please vote our post which is very good for all young peoples"}</p>
                </Media>
            </Media>
        </div>
    )
})

export default MainComment
