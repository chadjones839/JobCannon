import React, { useState, useEffect } from 'react';
import FriendManager from "../modules/FriendManager.jsx";
import ChatManager from "../modules/ChatManager.jsx";

const EmployerDiscoveryCard = props => {
  
  const sessionUser = JSON.parse(sessionStorage.getItem("user")) 
  const [friends, setFriends] = useState([]) 
  const [newFriend, setNewFriend] = useState({ 
    userId: "", 
    activeUserId: "", 
    mutualInterest: false})

  const friendHandler = () => { 
    console.log('CLICKED FRIEND HANDLER')

    const editedFriend = {
      userId: props.user.id,
      activeUserId: sessionUser.id,
      mutualInterest: true
    };

    const newChat = {
      activeUserId: sessionUser.id,
      userId: props.user.id
    }

    console.log('FRIENDS', friends)

    const friend = friends.find(friend => {
      if (props.user.id === friend.userId && sessionUser.id === friend.activeUserId) {
        return friend
      }
    })
    console.log('BEFORE', friend)
      
      if (friend === undefined) {
        createFriend(props.user.id)
        return newFriend
      }
      else if (friend.userId === props.user.id && friend.mutualInterest !== true) {
        if (friend.userId === props.user.id &&
        friend.activeUserId === sessionUser.id &&
        friend.mutualInterest === false
        ) {
          console.log('FRIEND TO EDIT', friend)
          editedFriend.id = friend.id
          FriendManager.editFriend(editedFriend)
          .then(()=> {
            ChatManager.postChat(newChat)
            console.log('EDITED FRIEND', editedFriend)
            return friend
        })}
      }     
  }
  
  const createFriend = (id) => {
    newFriend.userId = sessionUser.id
    newFriend.activeUserId = id
    newFriend.mutualInterest = false
    FriendManager.postFriend(newFriend)
    .then(()=> {
      console.log('NEW FRIEND', newFriend)
      return newFriend
    })
  }
  
  useEffect(() => {
    FriendManager.getAllFriends()
      .then((response) => {
        setFriends(response)
    })
  }, [])

  if (props.user.accountType === "employer") {
    return (
      <React.Fragment>
        <section className="employerCard">
          <div className="employerCard__image">
            <img src={require(`../images/users/${props.user.image}`)}  alt={props.user.companyName} className="employerCard__logo"/>
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
          <div className="interestButtons__container">
            <div className="interestBtn__false">
              <button type="submit" className="falseBtn">
                Hard Pass
              </button> 
            </div>
            <div className="interestBtn__true">
              <button 
                type="submit" 
                className="trueBtn" 
                onClick={() => friendHandler(props.user.id)}>
                  Let's Talk
              </button> 
            </div>
          </div>
        </section>
        <br />
        <br />
        <div className="cardBreak"></div>
        <br />
        <br />
      </React.Fragment>
    )
  }
  else {
    return null
  }
}


export default EmployerDiscoveryCard;

// ,
//     {
//       "userId": 1,
//       "activeUserId": 5,
//       "mutualInterest": false,
//       "id": 2
//     },
//     {
//       "userId": 5,
//       "activeUserId": 4,
//       "mutualInterest": false,
//       "id": 3
//     }