import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { userService } from "../../services/CommonServices";


const Dashboard = (props) => {
     var dashboardData=useContext(GlobalContext)

     const[active_user_count, set_active_user_count]=useState([])
     const[deactive_user_count, set_deactive_user_count]=useState([])
     const[post_count, set_post_count]=useState([])

    useEffect(() => {
        userService.getDashboardData().then(response=>{
            if(response.status==200){
                set_active_user_count(response.data.activeUserCount);
                set_deactive_user_count(response.data.deactiveUserCount);
                set_post_count(response.data.postCount);
            }
        })
    }, []);

    const state = {
        labels: ['Active Users', 'Deactive Users', 'Posts'],
        datasets: [
          {
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [active_user_count, deactive_user_count, post_count]
          }
        ]
      }

    return (
        <div class="content_area">
            <b>Total number of active users : {active_user_count}</b> <br />
            <b>Total number of deactive users : {deactive_user_count}</b> <br />
            <b>Total number of posts : {post_count}</b> <br /><br /><br /><br /><br />
			Welcome Admin

        

		</div>
        );
    };
    export default Dashboard;