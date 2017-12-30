
function inputFocus(){
        chatInput.html("");
        chatInput.css("color", "#000");
}
function inputBlur(i){
    if (chatInput.text() === ""){
        chatInput.html("Enter to chat");
        chatInput.css("color", "#888");
    }
}

