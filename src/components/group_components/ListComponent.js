import React from 'react';

const ListComponent = ({handler,groups,friends}) =>{
    
    const renderListFriends = (friends) =>(
        <div>
        List Friends:
        <ol>{friends.map(friend=>(<li key={friend.email} ><a href="/" id={friend.email} onClick={handler} >{friend.fullName}</a></li>))}</ol>
        </div>
    )

    const renderListgroups = (groups) =>(
        <div>
        List Groups:
        <ol>{groups.map(group=>(<li key={group.id} ><a href="/" id={group.id} onClick={handler} >{group.name}</a></li>))}</ol>
        </div>
    )
    
    return(<>
     {renderListFriends(friends)}
     {renderListgroups(groups)}
    </>)
};
export default ListComponent;