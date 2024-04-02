import React, { useState } from "react"
import { connect } from "react-redux"
import { createSubEntries } from '../../redux/actions/createSubEntriesActions';
import "../../index.css"


const  CreateSubEntries=(props)=>{
   
       const initialState = {
            title: '',
            detail: '',
            date: '',
            author: ''
        }

        const [state, setstate] = useState(initialState)
        
    const handleChange = (e) => {
        const date=getDateNow()
        setstate({
            [e.target.id]: e.target.value,
            date:date,
            author:props.auth.email
            
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

       /*  if(initialState.detail!==""){
            if (initialState.detail.length>1000){
              alert("Be watchout  with length of title and details! (hint: Title : 90, Details : 1000)");
            }else{
                props.createSubEntries(state)
            }
           
          }
          else{
            alert("Please dont leave any empty area!");
          } */

          props.createSubEntries(state)
    }

    const getDateNow = () => {
        var today = new Date();
        var day = today.getDate() + "";
        var month = (today.getMonth() + 1) + "";
        var year = today.getFullYear() + "";
        var hour = today.getHours() + "";
        var minutes = today.getMinutes() + "";
        var seconds = today.getSeconds() + "";
        
        const date = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds
        return date;
    }

  
        //console.log(props.topicId)
        return (
            props.auth.email ?  <div>
            <form>
        
            <div class="form-group">
            <label for="exampleFormControlTextarea1">Details</label>
            <textarea class="form-control" id="detail" rows="3"  onChange={handleChange}></textarea>
          </div>
            <button style={{ background: '#F20746' }} type="submit" class="btn btn-primary"  onClick={handleSubmit}>Submit</button>
          </form>
                </div>  : null
           
        )
    }

const mapDispatchToProps = (dispatch,props) => {
    //console.log(props.topicId)
    return {
        createSubEntries: (project) => dispatch(createSubEntries(project,props.topicId))
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSubEntries)

