import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { userService } from "../../../services/CommonServices";
import default_image from "../../../assets/images/default_image.jpg";

const EditProfile=(props)=>{
    
    let history=useHistory()
    
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [location, setLocation] = useState('');
    const [mobile, setMobile] = useState('');
    const [bio, setBio] = useState('');
    const [imgData, setImgData] = useState(null);
    const [profilePic, setProfilePic] = useState(null);

    useEffect(()=>{
        viewProfile();
        
    },[])

    function viewProfile() {
        var formData = {
          "secretId" : sessionStorage.getItem('token')
        };

        userService.viewProfile(formData).then(response=>{
			
            if(response.status===200){
                setId(response.data.user.id != null ? response.data.user.id : '');
                setFirstName(response.data.user.firstName != null ? response.data.user.firstName : '');
                setLastName(response.data.user.lastName != null ? response.data.user.lastName : '');
                setEmail(response.data.user.email != null ? response.data.user.email : '');
                setCity(response.data.user.city != null ? response.data.user.city : '');
                setState(response.data.user.state != null ? response.data.user.state : '');
                setCountry(response.data.user.country != null ? response.data.user.country : '');
                setLocation(response.data.user.location != null ? response.data.user.location : '');
                setMobile(response.data.user.mobile != null ? response.data.user.mobile : '');
                setBio(response.data.user.bio != null ? response.data.user.bio : '');
                if(response.data.user.userImage != null) {
                    setImgData(window.$mediaURL + response.data.user.userImage);
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
            "city" : city,
            "state" : state,
            "country" : country,
            "location" : location,
            "mobile" : mobile,
            "bio" : bio,
            "secretId" : sessionStorage.getItem('token')
    	}
        if(profilePic != null) {
            formData.append("userImage", profilePic);
        }

        formData.append("data", JSON.stringify(formData2));
    	
        userService.editProfile(formData).then(response=>{
            if(response.status===200){
                    setFirstName("")
                    setLastName("")
                    setEmail("")
                    setCity("")
                    setState("")
                    setCountry("")
                    setLocation("")
                    setMobile("")
                    setBio("")
                    alert(response.data.message);
                    history.push('/dashboard');
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
			<h2>Edit Profile</h2>
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
								<label>City</label>
								<input value={city} onChange={(event) => {setCity(event.target.value);}} required class="form-control" type="text" />
							</aside>
						</div>
					</aside>

                    <aside class="col-lg-4 text-center">
					</aside>
                    <aside class="col-lg-8">
						<div class="row">
							<aside class="col-sm-6">
								<label>State</label>
								<input value={state} onChange={(event) => {setState(event.target.value);}} required class="form-control" type="text" />
							</aside>
                            <aside class="col-sm-6">
								<label>Country</label>
								<input value={country} onChange={(event) => {setCountry(event.target.value);}} required class="form-control" type="text" />
							</aside>
						</div>
						<div class="row">
							<aside class="col-sm-6">
								<label>Address</label>
								<textarea name="" id="" value={location} onChange={(event) => {setLocation(event.target.value);}} class="form-control" required ></textarea>
							</aside>
                            <aside class="col-sm-6">
								<label>Mobile</label>
								<input value={mobile} onChange={(event) => {setMobile(event.target.value);}} required class="form-control" type="text" />
							</aside>
						</div>
					</aside>
                    <aside class="col-lg-4 text-center">
					</aside>
                    <aside class="col-lg-8">
						<div class="row">
							<aside class="col-sm-6">
								<label>Bio</label>
								<textarea name="" id="" value={bio} onChange={(event) => {setBio(event.target.value);}} class="form-control" required ></textarea>
							</aside>
						</div>
						<button type="submit" class="blue_btn text-uppercase" onClick={event => {updateProfile(event)}}>Update</button>
					</aside>
				</div>
			</div>
		</div>
	
);
};
export default EditProfile;