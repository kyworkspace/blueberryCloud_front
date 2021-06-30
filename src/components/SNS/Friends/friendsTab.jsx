import React, { Fragment,useState,useEffect, useCallback } from 'react';
import { Row, Col, Card, CardHeader, CardFooter, Media, Input, CardBody } from 'reactstrap';
import { Button, Space, Tooltip } from 'antd';
import Search from 'antd/lib/input/Search';
import { getFriendReceiveList, getUserList, getFriendsList } from '../../../utils/commonMethod';
import { errorMessage, successMessage } from '../../../utils/alertMethod';
import AllFriends from './Sections/AllFriends';
import ReceivedFriends from './Sections/ReceivedFriends';
import { useSelector } from 'react-redux';
import FriendNavbar from './Sections/FriendNavbar';


const FriendsTab = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [userList, setUserList] = useState([])
    const [limit, setLimit] = useState(8);
    const [skip, setSkip] = useState(0);
    const [tabType, setTabType] = useState(0);
    const user = useSelector(state => state.user);

    useEffect(() => {
        getFriendList(null);
      },[])

    const getFriendList = (value)=>{
        setSearchTerm(value)
        let body={
            searchTerm : value,
        }
        getUserList(body)
        .then(response=>{
            if(response.data.success){
                setUserList(response.data.list)
                setSkip(skip+limit);
            }
        })
        .catch(err=>{
            errorMessage("회원 정보를 불러오는데 오류가 발생하였습니다.")
        })
    }
    const onFriendReceiveList = useCallback(
        () => {
            getFriendReceiveList()
            .then(response=>{
                if(response.data.success){
                    let userFromList = response.data.list.map(item=>(item.userFrom));
                    setUserList(userFromList);
                }
            })
            .catch(err=>{
                errorMessage("통신 중 오류가 발생하였습니다. 새로고침 후 다시 시도해 주세요");
            })
        },
        [],
    )
    const onFriendsList = useCallback(
        (level) => {
            getFriendsList(level)
            .then(list=>{
                setUserList(list);
            })
            .catch(err=>{
                errorMessage("통신 중 오류가 발생하였습니다. 새로고침 후 다시 시도해 주세요");
            })
        },
        [],
    )
    
    const onTabTypeHandler=(num)=>{
        setTabType(num)
        switch (num) {
            case 0: return getFriendList(); //전체 목록
            case 1: return onFriendsList(3); //친구 목록
            case 2: return onFriendsList(2); //친구 신청 목록
            case 3: return onFriendReceiveList(); //친구 요청 목록
            case 4: return onFriendsList(1); //팔로워 목록
            case 5: break;
            default:
                setTabType(0)
                break;
        }
    }
    const renderUserCard =(user)=>{
        switch (tabType) {
            case 0: return <AllFriends user={user} key={user._id} refreshList={()=>getFriendList()}/> //전체
            case 1: return <AllFriends user={user} key={user._id} refreshList={()=>onFriendsList(3)}/> //친구목록
            case 2: return <AllFriends user={user} key={user._id} refreshList={()=>onFriendsList(2)}/> //친구신청 목록
            case 3: return <ReceivedFriends user={user} key={user._id} onFriendReceiveList={onFriendReceiveList}/>
            case 4: return <AllFriends user={user} key={user._id} refreshList={()=>onFriendsList(1)}/> //팔로워 목록
            case 5: return <AllFriends user={user} key={user._id} refreshList={()=>{}}/> //팔로잉 목록
            default:
                return <AllFriends user={user} key={user._id}/>
        }
    }

    return (
        <Fragment>
            <Card>
            <CardHeader>
                <FriendNavbar getFriendList={getFriendList} listHandler={onTabTypeHandler} setSearchTerm={setSearchTerm}/>
            </CardHeader>
            <CardBody>
                <Row>
                    {renderUserCard}
                    {userList.map((user, i) => 
                        renderUserCard(user)
                    )}
                </Row>
            </CardBody>
            </Card>
            
            
        </Fragment>
    );
};

export default FriendsTab;