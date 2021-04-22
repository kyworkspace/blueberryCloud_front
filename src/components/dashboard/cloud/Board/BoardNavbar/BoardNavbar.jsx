import axios from 'axios';
import React, { memo, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
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
import { setFolderRoute } from '../../../../../redux/folder/_actions/folder_actions';
import { CloudBoardContext } from '../CloudViewer';
import FolderCreateModal from './Sections/FolderCreateModal';
import PictureUploadModal from './Sections/PictureUploadModal';
import url from '../../../../../route/DevUrl'
import { CLOUD_API } from '../../../../../route/Apis';



const BoardNavbar= memo(()=> {
    const {setSelectionMode,SelectionMode,Files,setFiles,selectedFileDelete} = useContext(CloudBoardContext);
    const [isOpen, setIsOpen] = useState(false);
    const [pictureModal, setPictureModal] = useState(false);
    const dispatch = useDispatch(null);
    // 폴더 모달
    const [folderModal, setFolderModal] = useState(false);
    // 현재 폴더 상 경로
    const folderPath = useSelector(state => state.folder.path)

    const toggle = () => setIsOpen(!isOpen);

    const onPictureUploadModalOpen = (flag) =>{
        setPictureModal(flag);
    }
    const onVideoUploadModalOpen =()=>{
        alert("비디오 업로드")
    }
    const onCreateNewFolderModalOpen=(flag)=>{ // 새폴더 모달
      setFolderModal(flag)
    }

    const onMoveToPrevFolder =()=>{ //이전 폴더 가기
      let splitedPath = folderPath.split("/");

      splitedPath.pop(); //맨뒤에 폴더 제거

      let newPath = splitedPath.join("/");

      dispatch(setFolderRoute(newPath));
    }
    const onChangeSelectionMode=()=>{
      if(!SelectionMode){
        let objList = [...Files];
        objList.forEach((obj)=>{
          obj.selected = false;
        });
        setFiles(objList);
      }
      
      setSelectionMode(!SelectionMode);
      
    }
    const onSelectedFileDelete=()=>{
      
      let selectedFiles = Files.filter((item)=>item.selected)
      selectedFiles = selectedFiles.map(file=>file._id);
      let count = selectedFiles.length;
      if(count===0){
          alert("선택된 파일이 없습니다.");
        return;
      }
      let body={
        fileList : selectedFiles,
      }
      selectedFileDelete(body);
      
    }

    return (
        <div>
        <Navbar light expand="md">
          {folderPath === "ALL" ?
          <NavbarBrand>관리</NavbarBrand>
          :
          <NavbarBrand onClick={onMoveToPrevFolder}>뒤로가기</NavbarBrand>
          }
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>              
              <NavItem>
                <NavLink href="#" onClick={()=>onCreateNewFolderModalOpen(true)}>새폴더</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  파일 선택
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={onChangeSelectionMode}>
                    선택 모드
                  </DropdownItem>
                  <DropdownItem onClick={()=>{alert("전체 선택")}}>
                    전체 선택
                  </DropdownItem>
                  <DropdownItem/>
                </DropdownMenu>
              </UncontrolledDropdown>
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
              { SelectionMode
                &&
              <NavItem>
                <NavLink onClick={onSelectedFileDelete}>선택파일 삭제</NavLink>
              </NavItem>
              }
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
            <NavbarText>경로 : {`${folderPath}/`}</NavbarText>
          </Collapse>
        </Navbar>
        {pictureModal && <PictureUploadModal ModalHandler = {onPictureUploadModalOpen} isOpen={pictureModal}/>}
        {folderModal && <FolderCreateModal ModalHandler = {onCreateNewFolderModalOpen} isOpen={folderModal}/>}
      </div>
    )
})

export default BoardNavbar
