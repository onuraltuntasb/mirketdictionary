import alertify from "alertifyjs"

export const createSubEntries = (project,entriId) => {
    return (dispatch, getState,{getFirebase,getFirestore}) =>{


        const firestore = getFirestore();
        firestore.collection('entries').doc(entriId).collection('subentries').add({
            ...project
        }).then(()=>{
            dispatch({type:'CREATE_SUBENTRIES_SUCCESS',project});
            alertify.success('Entrie is Added');
        }).catch((err)=>{
            dispatch({type:'CREATE_SUBENTRIES_ERROR'},err)
            alertify.error('Something is wrong please try later');
        })
    }
};