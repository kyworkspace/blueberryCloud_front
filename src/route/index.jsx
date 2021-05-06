// dashbaord
import CloudDashBoard from '../components/cloud/Dashboard/CloudDashBoard'

// starter kits 
import CloudViewer from '../components/cloud/Board/CloudViewer'



export const routes = [
        { path:`${process.env.PUBLIC_URL}/cloud/dashboard`, Component:CloudDashBoard},
        { path:`${process.env.PUBLIC_URL}/cloud/viewer/:theme`, Component:CloudViewer},
]