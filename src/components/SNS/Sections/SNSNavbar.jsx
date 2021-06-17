import React, { memo, useContext } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { SNSContext } from '..'
import {withRouter} from 'react-router-dom'
const SNSNavbar=memo((props) =>{
    const {activeTab,setActiveTab,userInfo} = useContext(SNSContext);
    const tabSet =(menu)=>{
        props.history.push(`/sns/timeline/${menu}`)
    }
    if(userInfo){
        return (
            <Nav tabs className="border-tab tabs-scoial">
                <NavItem className="nav" id="myTab" role="tablist">
                    <NavLink tag="a" className={activeTab === 'list' ? 'active' : ''} onClick={() => tabSet('list')}>
                        TimeLine
                </NavLink>
                </NavItem>
                <NavItem className="nav" id="myTab" role="tablist">
                    <NavLink tag="a" className={activeTab === 'about' ? 'active' : ''} onClick={() => tabSet('about')}>
                        About
                </NavLink>
                </NavItem>
                <NavItem>
                    <div className="user-designation"></div>
                    <div className="title"><a target="_blank" >{userInfo.name}</a></div>
                    <div className="desc mt-2">{userInfo.greeting}</div>
                </NavItem>
                <NavItem className="nav" id="myTab" role="tablist">
                    <NavLink tag="a" className={activeTab === 'friends' ? 'active' : ''} onClick={() => tabSet('friends')}>
                        Friends
                </NavLink>
                </NavItem>
                <NavItem className="nav" id="myTab" role="tablist">
                    <NavLink tag="a" className={activeTab === 'photo' ? 'active' : ''} onClick={() => tabSet('photo')}>
                        Photos
                </NavLink>
                </NavItem>
            </Nav>
        )
    }else{
        return <div>로딩중</div>
    }
    
})

export default  withRouter(SNSNavbar);
