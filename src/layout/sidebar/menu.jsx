import {Home,Anchor,Headphones} from 'react-feather'
export const MENUITEMS = [
    {
        menutitle:"CLOUD",
        menucontent:"Save Your Memories",
        Items:[
            {
                title: 'Dashboard', icon: Home, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/dashboard/default`, title: 'CLOUD PLAN', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/cloud/pictures`, title: 'Pictures', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/cloud/videos`, title: 'Videos', type: 'link' },
                ]
            }
        ]
       
    },
    {
        menutitle:"SNS",
        menucontent:"Check Your Friend's TimeLine",
        Items:[
            {
                title: '모아보기', icon: Anchor , type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/starter-kits/sample-page`, title: '게시물 전체', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/starter-kits/sample-page`, title: '사진', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/starter-kits/sample-page`, title: '동영상', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/starter-kits/sample-page`, title: '날짜', type: 'link' },
                ]
            }
        ]
    },
    {
        menutitle:"Account Infomation",
        menucontent:"Community",
        Items:[
            {
                title: '회원 정보', icon: Anchor , type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/starter-kits/sample-page`, title: 'Sample Page', type: 'link' },
                ]
            }
        ]
    },
    {
        menutitle:"Support",
        menucontent:"If you need Technical Support or want to change Plan, Click this",
        Items:[
            {
                title: '개발자 정보', icon: Headphones, type: 'sub',active: false, children: [
                        { title: 'Contact Me', type: 'exteral_link', path: 'http://support.pixelstrap.com/help-center' },
                ]
            },
            {
                title: 'Raise Support', icon: Headphones, type: 'sub',active: false, children: [
                    { title: 'Raise Ticket', type: 'exteral_link', path: 'http://support.pixelstrap.com/help-center' },
                ]
            }
        ]          
    },
    
            
]