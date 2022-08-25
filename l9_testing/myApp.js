function square(x) {
    return x*x;
}

function squareAsync(param, callback) {
    setTimeout(function(){
      callback(param*param);
    }, 3000);
}   