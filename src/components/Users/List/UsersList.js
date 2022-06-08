import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { userService } from "../../../services/CommonServices";

const UserList=(props)=>{
    
    let history=useHistory()
    const[users_list, set_users_list]=useState([])

    useEffect(()=>{
        userService.user_list_api().then(response=>{
            if(response.status==200){
                set_users_list(response.data.list)
            }
        })
    },[])

    function blockUnblockUser(event, user, status) {
        event.preventDefault();
        var formData = {
			"userId" : user.id,
            "status" : status
		}
        
		userService.blockUnblockUser(formData).then(response=>{
			
            if(response.status===200){
				alert(response.data.message);
                var temp = [...users_list];
                for(var i = 0; i < temp.length; i++) {
                    if(temp[i].id == user.id) {
                        temp[i].status = !temp[i].status;
                    }
                }
                set_users_list(temp);
           	} else{
               	alert(response);
           	}
       	}).catch(function(err){
			   console.log({err})
			// alert(err.response.data.message);
		})
    }

    function removeUser(event, user) {
        event.preventDefault();
        var formData = {
			"id" : user.id
		}
        
		userService.removeUser(formData).then(response=>{
            if(response.status===200){
				alert(response.data.message);
                var temp = [...users_list];
                for(var i = 0; i < temp.length; i++) {
                    if(temp[i].id == user.id) {
                        temp.splice(i, 1);
                        break;
                    }
                }
                set_users_list(temp);
           	} else{
               	alert(response);
           	}
       	}).catch(function(err){
			   console.log({err})
			// alert(err.response.data.message);
		})
    }

    function editUser(event, user) {
        event.preventDefault();    
        history.push('/edit_user?id=' + user.id);
	}


    function Add_User(){
      history.push('/add_user')
    }

    
    


  
return(

            <div class="content_area">
                        
                        <div class="tables_area">
                            <h2 class="pull-left">Users List</h2>
                            <div class="clear"></div>
                            <div class="white_box">
                                <div class="table-responsive">
                                    <table width="100%" cellspacing="0" cellpadding="0">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Email Address</th>
                                                {/* <th>password</th> */}
                                                {/* <th>Remove User</th> */}
                                                <th>Edit User</th>
                                                <th>Block User</th>
                                                <th>Remove User</th>
                                                {/* <th>Post by User</th> */}

                                            </tr>
                                        </thead>
                                        <tbody>
                                            { users_list.length>0 && users_list.map((item)=>
                                                <tr>
                                                    <td>{item.id}</td>
                                                    <td>{item.firstName}</td>
                                                    <td>{item.lastName}</td>
                                                    <td>{item.email}</td>
                                                    {/* <td>{item.password}</td> */}
                                                    <td><a href="" onClick={(event) => {editUser(event, item)}}>Edit</a></td>
                                                    <td>
                                                        {item.status == true ?
                                                            <a href="" onClick={(event) => {blockUnblockUser(event, item, false)}}>Block User</a>
                                                        :
                                                            <a href="" onClick={(event) => {blockUnblockUser(event, item, true)}}>Unblock User</a>
                                                        }
                                                        
                                                    </td>
                                                    <td><a href="" onClick={(event) => {removeUser(event, item)}}>Remove</a></td>
                                                    {/* <td><div class="javascript">
                                                    <button type="button" onclick="">View Post List</button></div></td> */}
                                                </tr>
                                             )}
                                            
                        
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* <div class="tables_area">
                            <h2 class="pull-left">Friendship Status</h2>
                            <div class="clear"></div>
                            <div class="white_box">
                                <div class="table-responsive">
                                    <table width="100%" cellspacing="0" cellpadding="0">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Email Address</th>
                                                <th>unfriend</th>
                                                <th>rejected friend requests</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { users_list.length>0 && users_list.map((item)=>
                                                <tr>
                                                    <td>{item.id}</td>
                                                    <td>{item.firstName}</td>
                                                    <td>{item.lastName}</td>
                                                    <td>{item.email}</td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                             )}
                                             
                                            
                        
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div> */}

                    

                    </div>
);
};
export default UserList;