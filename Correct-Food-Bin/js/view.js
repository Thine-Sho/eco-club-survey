let main = {
    "choice":""
}

setTimeout(function(){
    const all_q_options = document.querySelectorAll(".bin-options li");
    // console.log(all_q_options);

    all_q_options.forEach((item, i) =>{
    item.addEventListener("click", function() {
            // console.log("click");
            main.choice = "";
            main.choice = this.className;
            loadJson_questions(1, 2, evaluate_choice);
            // console.log("CLICK ADDED");
        }, false);
    });
    console.log("CLICK ADDED");
}, 1000);


function updateButtonStatus(isCorrect, className, q){
    const element = document.getElementsByClassName(className)[0];
    const parent = document.getElementsByClassName("bin-options")[q];
    element.classList.remove("correct","incorrect");

    if(isCorrect){
        element.classList.add("correct");
        parent.classList.add("disabled");
        console.log("disabled");
    }else{
        element.classList.add("incorrect");
        setTimeout(function(){
            element.classList.remove("incorrect");
        }, 1000);
    }
    console.log("UPDATE BTN COMPLETED");
}