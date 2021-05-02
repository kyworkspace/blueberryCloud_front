import React, { memo, useContext, useState } from 'react'
import { Search } from 'react-feather';
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
    NavbarText,
    Form,
    FormGroup,
    Input,
  } from 'reactstrap';
import { setFolderRoute } from '../../../../../redux/folder/_actions/folder_actions';
import { CloudBoardContext } from '../CloudViewer';
import FolderCreateModal from './Sections/Folder/FolderCreateModal';
import PictureUploadModal from './Sections/Picture/PictureUploadModal';
import VideoUploadModal from './Sections/Video/VideoUploadModal';
import DatePicker from "react-datepicker";
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CloudSearch from './Sections/Search/CloudSearch';

const BoardNavbar= memo(()=> {
    const {setSelectionMode,SelectionMode,Files,setFiles,selectedFileDelete,searchContents,setSearchContents} = useContext(CloudBoardContext);
    const dispatch = useDispatch(null);
    const [isOpen, setIsOpen] = useState(false);
    // 사진 모달
    const [pictureModal, setPictureModal] = useState(false);
    // 폴더 모달
    const [folderModal, setFolderModal] = useState(false);
    // 동영상 모달
    const [videoModal, setVideoModal] = useState(false);
    // 현재 폴더 상 경로
    const folderPath = useSelector(state => state.folder.path)
    // 검색 모드
    const [searchModal, setSearchModal] = useState(false);
    

    const toggle = () => setIsOpen(!isOpen);

    const onPictureUploadModalOpen = (flag) =>{
        setPictureModal(flag);
    }
    const onVideoUploadModalOpen =(flag)=>{
        setVideoModal(flag)
    }
    const onCreateNewFolderModalOpen=(flag)=>{ // 새폴더 모달
      setFolderModal(flag)
    }
    const onSearchModalOpen=(flag)=>{ //검색모달
      setSearchModal(flag)
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
      
      let selectedFiles = Files.filter((item)=>item.selected);
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
    const onAllFileSelection=()=>{
      let selectedFiles = [...Files];
      selectedFiles.forEach((item)=>{
        if(item.mimetype !=="Folder"){
          item.selected = true;
        }
      })
      setFiles(selectedFiles);
      setSelectionMode(true);
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
                    {SelectionMode ? 
                      "선택 모드 해제"
                    : 
                      "선택 모드"
                    }
                  </DropdownItem>
                  <DropdownItem onClick={onAllFileSelection}>
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
                  <DropdownItem onClick={()=>onVideoUploadModalOpen(true)}>
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
                    공유 기능은 기획 중입니다.
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink onClick={()=>onSearchModalOpen(true)}>파일 검색</NavLink>
              </NavItem>
              {
              Object.keys(searchContents).length > 0 &&
              <NavItem>
                <NavLink onClick={()=>setSearchContents({})}>검색 초기화</NavLink>
              </NavItem>
              }
              
            </Nav>
            <NavbarText>경로 : {`${folderPath}/`}</NavbarText>
          </Collapse>
        </Navbar>
        {pictureModal && <PictureUploadModal ModalHandler = {onPictureUploadModalOpen} isOpen={pictureModal}/>}
        {folderModal && <FolderCreateModal ModalHandler = {onCreateNewFolderModalOpen} isOpen={folderModal}/>}
        {videoModal && <VideoUploadModal ModalHandler = {onVideoUploadModalOpen} isOpen={videoModal}/>}
        {searchModal && <CloudSearch ModalHandler = {onSearchModalOpen} isOpen={searchModal}/> }
      </div>
    )
})

export default BoardNavbar
