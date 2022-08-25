let expected_result = 0;

function generate_problem() {
    let math_in = document.querySelector("#taskMsg");
    let num1 = Math.ceil(Math.random()*10);
    let num2 = Math.ceil(Math.random()*10);
}

function evaluateResult() {
    let math_in = document.querySelector("#mathIn").value;
    let result_msg = document.querySelector("#resultMsg");
}


function add_number(num,edge,output){
    if(num<edge){
        return
    }
    setTimeout(() => {
        output.innerHTML += i;
        output.innerHTML += "</br>";
        add_number(num+1,edge,output)
    }, 1000);
}
    
function printLoop() {
    let output = document.querySelector("#loopOutput");
    output.innerHTML = "";
    let input = document.querySelector("#loopInput").value;
    for (let i = 1 ; i<=input;i++) {
        setTimeout(() => {
            output.innerHTML += i;
            output.innerHTML += "</br>";
            }, 1000*i);
        
    }
}

generate_problem()