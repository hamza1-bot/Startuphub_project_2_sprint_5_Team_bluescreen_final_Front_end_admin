import React, { useState, useEffect } from 'react';
import {userService} from'../../services/CommonServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import { useHistory } from "react-router";

// Forgot password component
const ForgotPassword = (props) => {

    const history = useHistory();

    const [email, setEmail] = useState('');

    // method to send forgot password request to server
    function forgotPassword() {

        if(email == '') {
            toast.error("Please Enter Email", {hideProgressBar: true})
            return false;
        }
        var formData = {
            "email" : email,
            "role" : 1
        }
        userService.forgotPassword(formData).then(response=>{
			alert(JSON.stringify(response));
            if(response.status===200){
                alert(response.data.message);
				history.push('/login')
           	} else{
               	alert(response);
           	}
       	}).catch(function(err){
               alert("Email is not registered with us");
               console.log({err})
			// alert(err.response.data.message);
		})
    }

    return (
      <div class="container">
        <div class="login_form_outer">
            <div class="login_form">
                <h2>Forgot Password</h2>
                <div class="form-group">
                    <label>Email</label>
                    <input type="text" value={email} onChange={(event) => {setEmail(event.target.value);}} placeholder="" class="form-control for_username" />
                </div>
                <a href="" class="blue_btn" onClick={forgotPassword}>Submit</a>
                <a href="" class="right" style={{float:"right", margin:20}} onClick={(event) => {event.preventDefault(); history.goBack();}}>Back to login</a>
            </div>
            <img src="images/shadow.png" alt="" class="shadow" />
        </div>
      </div>
    );
  };
  
export default ForgotPassword;