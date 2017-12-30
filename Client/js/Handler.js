const handler = {};
/**
 *
 * @param nick
 * @param hasClass
 * @param hasClass
 */
handler.appendMessage = function(nick, hasClass, msg){

    let userImage = './Media/blue-cube.png';

    let element =
        `<div class="chat-text chat-body">
            <div class="icon-container">
                <img src="${userImage}"  class="chat-icon">
                <br/>
                <div>[${nick}]</div>
            </div>
            <p class="${hasClass}">${msg}</p>
        </div>`;
    chatBox.append(element);

};