// dashbaord
import Default from '../components/dashboard/default'
import CloudDashBoard from '../components/dashboard/cloud/Dashboard/CloudDashBoard'
import Ecommerce from '../components/dashboard/ecommerce'

// starter kits 
import Starterkits from '../components/starter-kits'



export const routes = [
        { path:`${process.env.PUBLIC_URL}/cloud/dashboard`, Component:CloudDashBoard},
        { path:`${process.env.PUBLIC_URL}/dashboard/ecommerce`, Component:Ecommerce},
        { path:`${process.env.PUBLIC_URL}/starter-kits/sample-page`, Component:Starterkits},

        
]