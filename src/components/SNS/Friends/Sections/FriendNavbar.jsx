import Search from 'antd/lib/input/Search';
import React, { memo, useContext, useRef, useState } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    NavLink,
  } from 'reactstrap';
  
function FriendNavbar(props) {
    const {listHandler,getFriendList} = props;
    const [searchTerm, setSearchTerm] = useState("")
    const [listTitle, setListTitle] = useState("전체");

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const listSelect =(number)=>{
        listHandler(number);
        switch (number) {
            case 0: setListTitle("전체"); break;
            case 1: setListTitle("친구 전체"); break;
            case 2: setListTitle("보낸 요청"); break;
            case 3: setListTitle("받은 신청"); break;
            case 4: setListTitle("팔로워"); break;
            case 5: setListTitle("팔로잉"); break;
        }
    }

    return (
        <Navbar light expand="md">
          <i data-feather="user-check"></i>친구찾기
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>              
              <NavItem>
              <Search
                    placeholder="이름, 이메일, 전화번호 ..."
                    allowClear
                    enterButton="검색"
                    size="large"
                    onSearch={()=>getFriendList(searchTerm)}
                    value={searchTerm}
                    onChange={(e)=>{setSearchTerm(e.currentTarget.value)}}
                    style={{width:'100%'}}
                    />
              </NavItem>
              <NavItem>
                <NavLink onClick={()=>listSelect(0)}>사용자 전체</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={()=>listSelect(1)}>친구 전체</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={()=>listSelect(2)}>내가 보낸 친구 신청</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={()=>listSelect(3)}>내가 받은 친구 신청</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={()=>listSelect(4)}>팔로워</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={()=>listSelect(5)}>팔로잉</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>목록: {listTitle}</NavbarText>
          </Collapse>
        </Navbar>
    )
}

export default FriendNavbar
