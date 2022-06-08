import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { userService } from "../../../services/CommonServices";

const PostsList=(props)=>{
    
    let history=useHistory()
    const[users_list, set_users_list]=useState([])

    useEffect(()=>{
        userService.post_list_api().then(response=>{
            if(response.status==200){
                var tempList = response.data.list;
                for(var i = 0; i < tempList.length; i++) {
                    if(tempList[i].image != null) {
                      tempList[i].image = window.$mediaURL + tempList[i].image;
                    }
                }
                set_users_list(tempList);
            }
        })
    },[])

    function deletePost(event, user, status) {
        event.preventDefault();
        var formData = {
			"postId" : user.id
		}
        
		userService.deletePost(formData).then(response=>{
			
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


    function Add_User(){
      history.push('/add_user')
    }

    
    


  
return(

            <div class="content_area">
                        
                        <div class="tables_area">
                            <h2 class="pull-left">Posts List</h2>
                            <div class="clear"></div>
                            <div class="white_box">
                                <div class="table-responsive">
                                    <table width="100%" cellspacing="0" cellpadding="0">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Image</th>
                                                <th>Description</th>
                                                <th>user</th>
                                                <th>Created On</th>
                                                {/* <th>Remove User</th> */}
                                                <th>Action</th>
                                                {/* <th>Post by User</th> */}

                                            </tr>
                                        </thead>
                                        <tbody>
                                            { users_list.length>0 && users_list.map((item)=>
                                                <tr>
                                                    <td>{item.id}</td>
                                                    <td><img src={item.image} height={50} width={50}></img></td>
                                                    <td>{item.description}</td>
                                                    <td>{item.user.email}</td>
                                                    <td>{item.createdOn}</td>
                                                    <td><div class="javascript">
                                                    <a href="" onClick={(event) => {deletePost(event, item)}}>Delete Post</a></div></td>
                                                </tr>
                                             )}
                                            
                        
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
);
};
export default PostsList;