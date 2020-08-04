/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import FriendManager from "../modules/FriendManager.jsx";
import ChatManager from "../modules/ChatManager.jsx";

const EmployerDiscoveryCard = props => {
  
  const sessionUser = JSON.parse(sessionStorage.getItem("user"));
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState({ 
    userId: "", 
    activeUserId: "", 
    mutualInterest: false});

  const mapFriend = friends.find(obj => {
    if ((props.user.id === obj.userId && sessionUser.id === obj.activeUserId && obj.mutualInterest === true) || (props.user.id === obj.activeUserId && sessionUser.id === obj.userId && obj.mutualInterest === true))  {
      return obj
    }
  });
 
  const halfFriend = friends.find(obj => {
    if (props.user.id === obj.activeUserId && sessionUser.id === obj.userId && obj.mutualInterest === false) {
      return obj
    }
  });

  const friendHandler = () => { 

    const editedFriend = {
      userId: props.user.id,
      activeUserId: sessionUser.id,
      mutualInterest: true
    };

    const newChat = {
      activeUserId: sessionUser.id,
      userId: props.user.id
    };

    const friend = friends.find(friend => {
      if (props.user.id === friend.userId && sessionUser.id === friend.activeUserId) {
        return friend
      }
    });
      
    if (friend === undefined) {
      createFriend(props.user.id)
      window.location.reload(true);
      return newFriend
    }
    else if (
    friend.userId === props.user.id && 
    friend.mutualInterest !== true &&
    friend.activeUserId === sessionUser.id ) {
      editedFriend.id = friend.id
      FriendManager.editFriend(editedFriend)
      .then(()=> {
        ChatManager.postChat(newChat)
        window.location.reload(true);
        return friend
      })
    };     
  };
  
  const createFriend = (id) => {
    newFriend.userId = sessionUser.id
    newFriend.activeUserId = id
    newFriend.mutualInterest = false
    FriendManager.postFriend(newFriend)
    .then(()=> {
      return newFriend
    })
  }
  
  useEffect(() => {
    FriendManager.getAllFriends()
      .then((response) => {
        setFriends(response)
    })
  }, [])

  if (props.user.accountType === "employer" && mapFriend) {
    return null
  }
  else if (props.user.accountType === "employer" && halfFriend) {
    return null
  }
  else if (props.user.accountType === "employer") {
    return (
      <React.Fragment>
        <section className="employerCard">
          <div className="employerCard__image">
            <img src={props.user.image}  alt={props.user.companyName} className="employerCard__logo"/>
          </div>
          <div className="employerDetails">
            <h2 className="employerCard__name">{props.user.companyName}</h2>
            <h4 className="employerCard__industry">{props.user.industry}</h4>
          </div>
          <div className="employerCard__body">
            {props.user.bio}
          </div>
          <br />
        </section>
        <section className="interestButtons">
          {/* <div className="interestButtons__container"> */}
            {/* <div className="interestBtn__false">
              <button type="submit" className="falseBtn">
                Hard Pass
              </button> 
            </div> */}
            {/* <div className="interestBtn__true"> */}
              <button 
                type="submit" 
                className="trueBtn" 
                onClick={() => friendHandler(props.user.id)}>
                  Let's Talk
              </button> 
            {/* </div> */}
          {/* </div> */}
        </section>
        <br />
        <br />
        <br />
        <br />
      </React.Fragment>
    )
  }
  else {
    return null
  }
};

export default EmployerDiscoveryCard;