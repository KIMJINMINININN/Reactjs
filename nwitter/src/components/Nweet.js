import { dbService } from "fbase";
import React, {useState} from "react";

const Nweet = ({nweetObj, isOwner}) => {
    //true and false editing mode or not
    const [editing, setEditing] = useState(false);
    //input text update
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        console.log("ok : ", ok);
        if(ok){
            dbService.doc(`nweets/${nweetObj.id}`).delete();
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) =>{
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text:newNweet
        })
        setEditing(false);
    }
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNweet(value);
    }
    return (
    <div>
       {
           editing ? (
            <>
           <form onSubmit={onSubmit}>
               <input type="text" placeholder="Edit your nweet" value={newNweet} required onChange={onChange}/>
               <input type="submit" value="Update Nweet" />
           </form>
           <button onClick={toggleEditing}>Cancel</button>
           </>
            ): 
           (
            <>
                <h4>{nweetObj.text}</h4>
                {isOwner && (
                    <>
                        <button onClick={onDeleteClick}>Delete Nweet</button>
                        <button onClick={toggleEditing}>Edit Nweet</button>
                    </>
                )}
           </>
           )
       }
    </div>
    )
}

export default Nweet;