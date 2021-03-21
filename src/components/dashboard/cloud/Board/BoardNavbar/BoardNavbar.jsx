import React, { Fragment, memo, useState } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';
import PictureUploadModal from './Sections/PictureUploadModal';



const BoardNavbar= memo(()=> {

    const [isOpen, setIsOpen] = useState(false);
    const [pictureModal, setPictureModal] = useState(false);

    const toggle = () => setIsOpen(!isOpen);



    const onPictureUploadModalOpen = (flag) =>{
        setPictureModal(flag);
    }
    const onVideoUploadModalOpen =()=>{
        alert("비디오 업로드")
    }

    return (
        <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/cloud/viewer/all">관리</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/cloud/viewer/all">파일 전체 선택</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">새폴더</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  업로드
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={()=>onPictureUploadModalOpen(true)}>
                    사진 업로드
                  </DropdownItem>
                  <DropdownItem onClick={onVideoUploadModalOpen}>
                    비디오 업로드
                  </DropdownItem>
                  <DropdownItem/>
                  <DropdownItem>
                    파일 업로드
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  공유
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    독자적으로
                  </DropdownItem>
                  <DropdownItem>
                    움직이는건가
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>폴더 및 파일을 관리합니다.</NavbarText>
          </Collapse>
        </Navbar>
        {pictureModal && <PictureUploadModal ModalHandler = {onPictureUploadModalOpen} isOpen={pictureModal}/>}
        
      </div>
    )
})

export default BoardNavbar
