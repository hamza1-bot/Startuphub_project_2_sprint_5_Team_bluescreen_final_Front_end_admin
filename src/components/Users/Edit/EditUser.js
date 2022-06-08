import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { userService } from "../../../services/CommonServices";
import default_image from "../../../assets/images/default_image.jpg";

const EditUser=(props)=>{
    
    let history=useHistory()
    
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [location, setLocation] = useState('');
    const [mobile, setMobile] = useState('');
    const [bio, setBio] = useState('');
    const [imgData, setImgData] = useState(null);
    const [profilePic, setProfilePic] = useState(null);

    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        let id = params.get('id');
        getOtherUserProfileData(id);
        
    },[])

    function getOtherUserProfileData(otherUserId) {
        var formData = {
          "otherUserId" : otherUserId,
          "secretId" : sessionStorage.getItem('token')
        };

        userService.getOtherUserProfileData(formData).then(response=>{
			
            if(response.status===200){
                setId(response.data.otherUser.id != null ? response.data.otherUser.id : '');
                setFirstName(response.data.otherUser.firstName != null ? response.data.otherUser.firstName : '');
                setLastName(response.data.otherUser.lastName != null ? response.data.otherUser.lastName : '');
                setEmail(response.data.otherUser.email != null ? response.data.otherUser.email : '');
                setCity(response.data.otherUser.city != null ? response.data.otherUser.city : '');
                setState(response.data.otherUser.state != null ? response.data.otherUser.state : '');
                setCountry(response.data.otherUser.country != null ? response.data.otherUser.country : '');
                setLocation(response.data.otherUser.location != null ? response.data.otherUser.location : '');
                setMobile(response.data.otherUser.mobile != null ? response.data.otherUser.mobile : '');
                setBio(response.data.otherUser.bio != null ? response.data.otherUser.bio : '');
                setPassword("password");
                if(response.data.otherUser.userImage != null) {
                    setImgData(window.$mediaURL + response.data.otherUser.userImage);
                }
           	} else{
               	alert(response);
           	}
       	}).catch(function(err){
			   console.log({err})
			// alert(err.response.data.message);
		})
    }


    // method to handle change event of image tag
    const changeHandlerImage = (event) => {
		setProfilePic(event.target.files[0]);
	};

    // method to update profile data
    function updateProfile(event) {
        event.preventDefault();
        
        var formData = new FormData();
        var formData2 = {
    	    "firstName" : firstName,
            "lastName" : lastName,
            "email" : email,
            "password" : password == "password" ? '' : password,
    	    "city" : city,
            "state" : state,
            "country" : country,
            "location" : location,
            "mobile" : mobile,
            "bio" : bio,
            "userId" : id
    	}
        if(profilePic != null) {
            formData.append("userImage", profilePic);
        }

        formData.append("data", JSON.stringify(formData2));
    	
        userService.editProfileByAdmin(formData).then(response=>{
            if(response.status===200){
                    setFirstName("")
                    setLastName("")
                    setEmail("")
                    setPassword("")
                    setCity("")
                    setState("")
                    setCountry("")
                    setLocation("")
                    setMobile("")
                    setBio("")
                    alert(response.data.message);
                    history.push('/user_list');
            } else{
                alert(response);
            }
        }).catch(function(err){
            console.log({err})
         // alert(err.response.data.message);
        })
    }
    
  
return(
    	<div class="content_area">
			<h2>Edit User</h2>
			<div class="white_box my_profile">
				<div class="row">
					<aside class="col-lg-12 text-center">
						<input type="file" onChange={changeHandlerImage}/>
					</aside>
					<aside class="col-lg-8">
						<div class="row">
							<aside class="col-sm-6">
								<label>First Name</label>
								<input  value={firstName} onChange={(event) => {setFirstName(event.target.value);}} required class="form-control" type="text" />
							</aside>
							<aside class="col-sm-6">
								<label>Last Name</label>
								<input  value={lastName} onChange={(event) => {setLastName(event.target.value);}} required class="form-control" type="text" />
							</aside>
						</div>
						<div class="row">
							<aside class="col-sm-6">
								<label>Email Address</label>
								<input class="form-control" type="text" disabled={true} placeholder="" value={email} onChange={(event) => {setEmail(event.target.value);}} required/>
							</aside>
							<aside class="col-sm-6">
								<label>Password</label>
								<input class="form-control" type="password" value={password} onChange={(event) => {setPassword(event.target.value);}} required  />
							</aside>
						</div>
					</aside>

                    <aside class="col-lg-4 text-center">
					</aside>
                    <aside class="col-lg-8">
						<div class="row">
							<aside class="col-sm-6">
								<label>City</label>
								<input value={city} onChange={(event) => {setCity(event.target.value);}} required class="form-control" type="text" />
							</aside>
							<aside class="col-sm-6">
								<label>State</label>
								<input value={state} onChange={(event) => {setState(event.target.value);}} required class="form-control" type="text" />
							</aside>
						</div>
						<div class="row">
							<aside class="col-sm-6">
								<label>Country</label>
								<input value={country} onChange={(event) => {setCountry(event.target.value);}} required class="form-control" type="text" />
							</aside>
							<aside class="col-sm-6">
								<label>Address</label>
								<textarea name="" id="" value={location} onChange={(event) => {setLocation(event.target.value);}} class="form-control" required ></textarea>
							</aside>
						</div>
					</aside>
                    <aside class="col-lg-4 text-center">
					</aside>
                    <aside class="col-lg-8">
						<div class="row">
							<aside class="col-sm-6">
								<label>Mobile</label>
								<input value={mobile} onChange={(event) => {setMobile(event.target.value);}} required class="form-control" type="text" />
							</aside>
							<aside class="col-sm-6">
								<label>Bio</label>
								<textarea name="" id="" value={bio} onChange={(event) => {setBio(event.target.value);}} class="form-control" required ></textarea>
							</aside>
						</div>
						<button type="submit" class="blue_btn yellow_btn text-uppercase" onClick={event => {updateProfile(event)}}>Update</button>
					</aside>
				</div>
			</div>
		</div>
	
);
};
export default EditUser;