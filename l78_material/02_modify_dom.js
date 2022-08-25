function addParagraph () {
    var para = document.createElement("p");
    var paraId = document.createAttribute("id");
    paraId.textContent = "newPara";
    para.setAttributeNode(paraId);
    var paraText = document.createTextNode("My new paragraph!");
    para.appendChild(paraText);
    document.body.appendChild(para);
}

function addParagraphBefore () {
    var para = document.createElement("p");
    var paraId = document.createAttribute("id");
    paraId.value = "newPara";
    doesSth();
    para.setAttributeNode(paraId);
    var paraText = document.createTextNode("My new paragraph!");
    para.appendChild(paraText);
    var insertionPoint = document.getElementById("buttonq");
    document.body.insertBefore(para, insertionPoint);
}

function doesSth () {
    console.log("My funct");
}