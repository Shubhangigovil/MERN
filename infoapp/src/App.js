import React from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import './App.css';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      phone: 0,
      path: "",

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.Updatestate = this.Updatestate.bind(this);
    this.uploadImg = this.uploadImg.bind(this);
    this.onImgChange = this.onImgChange.bind(this);

  }

  validateForm() {
    return this.state.email.length > 0 && this.state.firstname.length > 0 && this.state.phone.length > 0 && this.state.lastname.length > 0;
  }

  Updatestate(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append(
      "myFile",
      this.state.path,
      this.state.path.name
    );
    const userObj = {
      name: this.state.firstname + this.state.lastname,
      email: this.state.email,
      phone: this.state.phone,
      path : formData
    }
    console.log(userObj.path.path+"!!!!!!!!!!!!!!!!!!!!!!!!!!")

    axios.post('http://localhost:5000/api/user/register', userObj).then(res => {
      alert("SUCCESS!")
      this.setState({
        firstname: "",
        lastname: "",
        email: "",
        phone: ""
        //path : ""
      })
    })

  }

  onImgChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        path: img
      });
    }
  }

  uploadImg = () => {
    const formData = new FormData();
    formData.append(
      "myFile",
      this.state.path,
      this.state.path.name
    );
    console.log(this.state.path);
    console.log(formData)

    // const userObj = {
    //   name: this.state.firstname + this.state.lastname,
    //   email: this.state.email,
    //   phone: this.state.phone,
    //   path: formData
    // }

    axios.post("http://localhost:5000/api/user/uploadfile", formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      alert("upload done!!")
      console.log(res.path + "path" + res.data + "datA")
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <div className="Login">
          <form onSubmit={this.handleSubmit} className="form" method="post" >
            <FormGroup controlId="fn" bssize="large" className="frmgrp">
              <label className="lbl">First Name</label>
              <FormControl
                autoFocus
                type="name"
                value={this.state.firstname}
                onChange={this.Updatestate}
                name="firstname"
              />
            </FormGroup>
            <FormGroup controlId="ln" bssize="large" className="frmgrp">
              <label className="lbl">Last Name</label>
              <FormControl
                type="name"
                value={this.state.lastname}
                onChange={this.Updatestate}
                name="lastname"
              />
            </FormGroup>
            <FormGroup controlId="email" bssize="large" className="frmgrp">
              <label className="lbl">Email</label>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.Updatestate}
                className="txtemail"
                name="email"
              />
            </FormGroup>
            <FormGroup controlId="phonenumber" bssize="large" className="frmgrp">
              <label className="lbl">Phone no.</label>
              <FormControl
                type="number"
                value={this.state.phone}
                onChange={this.Updatestate}
                name="phone"
              />
            </FormGroup>
            <div>
              <input
                type="file"
                onChange={this.onImgChange}
                name="myFile"
              />
            </div>
            {/* <Button block bssize="large" onClick={this.uploadImg} className="submit"> Upload </Button> */}
            <Button block bssize="large" onClick={this.validateForm} type="submit" className="submit">
              Submit
        </Button>
          </form>
        </div>


      </div>
    );
  }
}


export default App;
