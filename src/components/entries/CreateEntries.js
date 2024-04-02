import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject } from "../../redux/actions/createEntriesActions";
import { Redirect, Link } from "react-router-dom";

class AddOrUpdateProduct extends Component {
  state = {
    title: "",
    detail: "",
    date: "",
    author: "",
  };
  handleChange = (e) => {
    const date = this.getDateNow();

    this.setState({
      [e.target.id]: e.target.value,
      date: date,
      author: this.props.auth.email,
    });

   
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.title!=="" && this.state.detail!==""){
      if (this.state.title.length>90 || this.state.detail.length>1000){
        alert("Be watchout  with length of title and details! (hint: Title : 90, Details : 1000)");
      }else{
        this.props.createProject(this.state);
        return <Redirect to="/" />
      }
     
    }
    else{
      alert("Please dont leave any empty area!");
    }
  
  };

  getDateNow = () => {
    var today = new Date();
    var day = today.getDate() + "";
    var month = today.getMonth() + 1 + "";
    var year = today.getFullYear() + "";
    var hour = today.getHours() + "";
    var minutes = today.getMinutes() + "";
    var seconds = today.getSeconds() + "";

    const date =day +"/" +month + "/" + year +" "+hour +":" +minutes +":" +seconds;
    return date;
  };

  render() {
    return (
      <div className="container">
        <h2>
          <span class="badge badge-pill badge-light">Create Entrie</span>
        </h2>
        <form>
          <div class="form-group">
            <label for="title">Header</label>
            <input
              type="text"
              class="form-control"
              id="title"
              aria-describedby="title"
              onChange={this.handleChange}
            ></input>
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Details</label>
            <textarea
              class="form-control"
              id="detail"
              rows="3"
              onChange={this.handleChange}
            ></textarea>
          </div>
          <Link to='/' >  
          <button
          style={{ background: "#F20746" }}
          type="submit"
          class="btn btn-primary"
          onClick={this.handleSubmit}
        >
          Submit
        </button> </Link>
         
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project)),
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
