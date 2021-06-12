import React, { memo, useState } from 'react'
import { Edit } from 'react-feather';
import { useSelector } from 'react-redux';
import { Button, Form, Input, InputGroup, InputGroupAddon, Media } from 'reactstrap'
import url from '../../../route/DevUrl';
import { confirmMessage, errorMessage } from '../../../utils/alertMethod';
import { commentDelete, commentUpdate, dateTimeToString } from '../../../utils/commonMethod';

const MainComment=memo((props) =>{
    const {item,refreshList} = props;
    const {writer} = item;
    const [updateState, setUpdateState] = useState(false);
    const user = useSelector(state => state.user);
    const [content, setContent] = useState(item.content);

    let body = {
        id: item._id
    }

    const commentUpdateHandler = (e)=>{
        e.preventDefault();
        body.content = content;
        commentUpdate(body)
        .then(response=>{
            item.content = content;
            setUpdateState(false);
        })
        .catch(err=>{
            errorMessage("댓글 수정에 실패하였습니다.")
        })

    }
    const commentDeleteHandler =()=>{
        body.content = content;
        confirmMessage("댓글을 삭제 하시 겠습니까?","실행","취소",()=>{
            commentDelete(body)
            .then(response=>{
                refreshList();
            })
            .catch(err=>{
                errorMessage("댓글 삭제에 실패하였습니다.")
            })
        })
    }
    return (
        <div className="your-msg">
            <Media>
                <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={`${url}/${writer.profileImage}`} style={{height:'50px'}}/>
                <Media body>
                    <span className="f-w-600">{writer.name} 
                    {
                            !updateState && writer._id === user.userData._id && (
                                <>
                                <span style={{marginLeft:'1%'}}>
                                    <a href="javascript:void(0)" onClick={()=>setUpdateState(true)}>
                                        수정
                                    </a>
                                </span>
                                <span style={{marginLeft:'1%'}}>
                                    <a href="javascript:void(0)" onClick={commentDeleteHandler}>
                                        삭제
                                    </a>
                                </span>
                                </>
                            )
                        }
                        
                        {
                            updateState && (
                            <>
                                <span style={{marginLeft:'1%'}}>
                                    <a href="javascript:void(0)" onClick={commentUpdateHandler}>
                                        저장
                                    </a>
                                </span>
                                <span style={{marginLeft:'1%'}}>
                                    <a href="javascript:void(0)" onClick={()=>setUpdateState(false)}>
                                        취소
                                    </a>
                                </span>
                            </>
                            )
                        }
                        <span style={{marginLeft:'1%'}} className="d-none d-sm-block d-md-block">
                            {dateTimeToString(item.createdAt,'ss') }
                            {/* <i className="fa fa-reply font-primary"></i> */}
                        </span>
                     </span>
                     {
                         updateState ? 
                         <Form onSubmit={commentUpdateHandler}>
                            <InputGroup className="text-box" >
                                <Input className="form-control input-txt-bx" type="text" name="message-to-send" placeholder="댓글을 입력해주세요" value={content} onChange={(e)=>setContent(e.currentTarget.value)}/>
                                <InputGroupAddon addonType="append">
                                    <Button color="transparent" onClick={commentUpdateHandler}><Edit/></Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </Form>
                        :
                        <p>{item.content}</p>
                     }
                    

                </Media>
            </Media>
        </div>
    )
})

export default MainComment
