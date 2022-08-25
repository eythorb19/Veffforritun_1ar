function addElement() {
    var para = document.createElement("p");
    para.textContent = getTextInput();
    var div = document.getElementsByTagName("mainContainer");
    div.appendChild(para);
}

function getTextInput() {
    var textIn = document.getElementById("textIn");
    return textIn.value;
}