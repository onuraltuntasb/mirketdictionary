import alertify from "alertifyjs"

export const createProject = (project) => {
    return (dispatch, getState,{getFirebase,getFirestore}) =>{


        const firestore = getFirestore();
        firestore.collection('entries').add({
            ...project
        }).then(()=>{
            dispatch({type:'CREATE_PROJECT',project});
            alertify.success('Entrie is Added');
        }).catch((err)=>{
            dispatch({type:'CREATE_PROJECT_ERROR'},err)
            alertify.error('Something is wrong please try later');
        })
    }
};