import React, { memo } from 'react'
import { Media } from 'reactstrap'
import url from '../../../route/DevUrl';
import { dateTimeToString } from '../../../utils/commonMethod';

const MainComment=memo((props) =>{
    const {item} = props;
    const {writer} = item
    return (
        <div className="your-msg">
            <Media>
                <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={`${url}/${writer.profileImage}`} style={{height:'50px'}}/>
                <Media body>
                    <span className="f-w-600">{writer.name} 
                        <span style={{marginLeft:'1%'}}>
                            {dateTimeToString(item.createdAt,'ss') }
                            {/* <i className="fa fa-reply font-primary"></i> */}
                        </span>
                     </span>
                    <p>{item.content}</p>
                </Media>
            </Media>
        </div>
    )
})

export default MainComment
