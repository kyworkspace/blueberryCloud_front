import React, { memo, useContext } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { SNSContext } from '..'

const SNSNavbar=memo((props) =>{
    const {activeTab,setActiveTab,userInfo} = useContext(SNSContext);
    if(userInfo){
        return (
            <Nav tabs className="border-tab tabs-scoial">
                <NavItem className="nav" id="myTab" role="tablist">
                    <NavLink tag="a" href="#javascript" className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                        TimeLine
                </NavLink>
                </NavItem>
                <NavItem className="nav" id="myTab" role="tablist">
                    <NavLink tag="a" href="#javascript" className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                        About
                </NavLink>
                </NavItem>
                <NavItem>
                    <div className="user-designation"></div>
                    <div className="title"><a target="_blank" href="#javascripts">{userInfo.name}</a></div>
                    <div className="desc mt-2">{userInfo.greeting}</div>
                </NavItem>
                <NavItem className="nav" id="myTab" role="tablist">
                    <NavLink tag="a" href="#javascript" className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
                        Friends
                </NavLink>
                </NavItem>
                <NavItem className="nav" id="myTab" role="tablist">
                    <NavLink tag="a" href="#javascript" className={activeTab === '4' ? 'active' : ''} onClick={() => setActiveTab('4')}>
                        Photos
                </NavLink>
                </NavItem>
            </Nav>
        )
    }else{
        return <div>로딩중</div>
    }
    
})

export default SNSNavbar
