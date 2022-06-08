import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { userService } from "../../../services/CommonServices";
import default_image from "../../../assets/images/default_image.jpg";

const ChangePassword=(props)=>{
    
    let history=useHistory()
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(()=>{
        
        
    },[])

    function changePassword() {
        var formData = {
          "currentPassword" : currentPassword,
          "password" : password,
          "secretId" : sessionStorage.getItem('token')
        };

        userService.changePassword(formData).then(response=>{
			
            if(response.status===200){
                alert(response.data.message);
           	} else{
               	alert(response);
           	}
       	}).catch(function(err){
			   alert({err})
			// alert(err.response.data.message);
		})
    }
  
return(
    	<div class="content_area">
			<h2>Change Password</h2>
			<div class="white_box my_profile">
				<div class="row">
					<aside class="col-lg-8">
						<div class="row">
							<aside class="col-sm-6">
								<label>Current Password</label>
								<input  value={currentPassword} onChange={(event) => {setCurrentPassword(event.target.value);}} required class="form-control" type="password" />
							</aside>
							<aside class="col-sm-6">
								<label>Password</label>
								<input  value={password} onChange={(event) => {setPassword(event.target.value);}} required class="form-control" type="password" />
							</aside>
						</div>
                        <button type="submit" class="blue_btn text-uppercase" onClick={event => {changePassword(event)}}>Update</button>
					</aside>
				</div>
			</div>
		</div>
	
);
};
export default ChangePassword;