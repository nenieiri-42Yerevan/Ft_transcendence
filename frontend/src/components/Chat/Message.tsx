import React, {useState} from 'react';


const Message = (props) =>{
  const {messageContent, index, userInfo} = props;
    const [hidden, setHidden] = useState(true);
    return (
        <ul className="space-y-2" key={index}>
          {messageContent.author.id != userInfo?.user?.id ?
              userInfo?.user?.blocked.includes(messageContent.author.id) ?
                <li className="flex justify-start">
                  <div className="relative max-w-xl px-4 py-2  text-white rounded shadow">
                    <button className="block" onClick={()=>{hidden ? setHidden(false) : setHidden(true)}}>&#9940; {hidden ? "Hidden Message" : messageContent.content}</button>
                  </div>
                </li>
                :
                <li className="flex justify-start">
                  <div className="relative max-w-xl px-4 py-2 text-white rounded shadow">
                    <span className="block">{messageContent.content}</span>
                  </div>
                </li>
            :
            <li className="flex justify-end">
              <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                <span className="block">{messageContent.content}</span>
              </div>
            </li>
          }
        </ul>
    )
}

export default Message;