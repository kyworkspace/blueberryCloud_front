import {Home,Anchor,Headphones} from 'react-feather'
export const MENUITEMS = [
    {
        menutitle:"CLOUD",
        menucontent:"Save Your Memories",
        Items:[
            {
                title: 'CLOUD', icon: Home, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/cloud/dashboard`, title: 'CLOUD PLAN', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/cloud/viewer/all`, title: '모든 파일', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/cloud/viewer/image`, title: 'Pictures', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/cloud/viewer/video`, title: 'Videos', type: 'link' },
                ]
            }
        ]
       
    },
    {
        menutitle:"SNS",
        menucontent:"Check Your Friend's TimeLine",
        Items:[
            {
                title: 'SNS HOME', icon: Anchor , type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/sns/timeline`, title: '타임라인', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/sns/userinfo`, title: '나의 이야기', type: 'link' },
                ]
            },
            // {
            //     title: '친구 관리', icon: Anchor , type: 'sub', active: false, children: [
            //         { path: `${process.env.PUBLIC_URL}/starter-kits/sample-page`, title: '친구 관리', type: 'link' },
            //         { path: `${process.env.PUBLIC_URL}/starter-kits/sample-page`, title: '그룹 관리', type: 'link' },
            //     ]
            // }
        ]
    },
    {
        menutitle:"Support",
        menucontent:"If you need Technical Support or want to change Plan, Click this",
        Items:[
            {
                title: '개발 정보', icon: Headphones, type: 'sub',active: false, children: [
                        { title: 'Contact Me', type: 'link', path: `${process.env.PUBLIC_URL}/support/developerInfo` },
                        { title: '건의함', type: 'link', path: `${process.env.PUBLIC_URL}/support/suggestion` },
                        { title: '공지사항', type: 'link', path: `${process.env.PUBLIC_URL}/support/notice` },
                ]
            }
        ]          
    },
    
            
]