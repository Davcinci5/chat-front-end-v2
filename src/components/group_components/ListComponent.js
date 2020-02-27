import React from 'react';
import translate from '../../i18n/translate';

const ListComponent = ({handler,groups,friends}) =>{
    
    const renderListFriends = (friends) =>(
        <div>
        {translate("listFriends")}
        <ol>{friends.map(friend=>(<li key={friend.email} ><a href="/" id={friend.email} onClick={handler} >{friend.fullName}</a></li>))}</ol>
        </div>
    )

    const renderListgroups = (groups) =>(
        <div>
        {translate("listGroup")}
        <ol>{groups.map(group=>(<li key={group.id} ><a href="/" id={group.id} onClick={handler} >{group.name}</a></li>))}</ol>
        </div>
    )
    
    return(<>
     {renderListFriends(friends)}
     {renderListgroups(groups)}
    </>)
};
export default ListComponent;