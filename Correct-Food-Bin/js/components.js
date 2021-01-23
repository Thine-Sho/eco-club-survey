let elmnt = {
    "name":"",
    "id":"",
    "className":"",
    "href":"",
    "src":"",
    "text-content":"",
    "value": "",
    "alt": ""
}

function resetElemntObject()
{
    elmnt["name"] = "";
    elmnt["id"] = "";
    elmnt["className"] = "";
    elmnt["href"] = "";
    elmnt["src"] = "";
    elmnt["text-content"] = "";
    elmnt["value"] = "";
    elmnt["alt"] = "";
}

function createElement(obj)
{
    let e = "";

    if(obj.name.length > 0){e = document.createElement(obj.name);}
    if(obj.id.length > 0){e.setAttribute("id", obj.id);}
    if(obj.className.length > 0){e.setAttribute("class", obj.className);}
    if(obj.href.length > 0){e.setAttribute("href", obj.href);}
    if(obj.src.length > 0){e.setAttribute("src", obj.src);}
    if(obj.value.length > 0){e.setAttribute("value", obj.value);}
    if(obj.alt.length > 0){e.setAttribute("alt", obj.alt);}

    if(obj["text-content"].length > 0){

        let span = document.createElement("span");
        let text = document.createTextNode(obj["text-content"]);
        span.appendChild(text);
        e.appendChild(span);
    }
    return e;
}

function removeChildren(element){
    if(element.childNodes.length > 0)
    {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}

//############################################################

function renderComponents(){
    loadJson_questions(1, 0).then(
        function(result){ render_questions(result); }
    );

    loadJson_questions(2, 1).then(
        function(result){ render_bin_options(result); }
    )
}

//############################################################

function render_questions(json){
    resetElemntObject();
    const element = document.getElementById("questions-container");

    json.forEach((item, i) => {
        elmnt.name = "div";
        elmnt["text-content"] = item["problem-question"];
        elmnt.id = "#question_&" + i;
        elmnt.className = "question";
        element.appendChild(createElement(elmnt));

        const sub_element = document.getElementById(elmnt.id);
        resetElemntObject();

        elmnt.name = "div";
        elmnt.id = "#question-options_&" + i;
        elmnt.className = "question-options";
        sub_element.appendChild(createElement(elmnt));
        
        const question_options = document.getElementById(elmnt.id);
        resetElemntObject();

        item["problem-answers"].map((answer, x) => {
            elmnt.name = "li";
            elmnt.className = "item option_" + i + x;
            elmnt["text-content"] = answer[1];

            question_options.appendChild(createElement(elmnt));

            const option_item = document.getElementsByClassName(elmnt.className);
            let image = document.createElement("img");
            image.setAttribute("src", answer[2]);
            option_item[0].appendChild(image);

            resetElemntObject();
        });
        sub_element.appendChild(question_options);
    });
}

function render_bin_options(json){
    resetElemntObject();
    const question_count = document.getElementById("questions-container");

    for(let i=0; i<question_count.childElementCount; i++){
        let current_question = document.getElementById("#question_&"+i);
        // console.log(current_question.id);
        elmnt.name = "div";
        elmnt.id = "#bin-options_&" + i;
        elmnt.className = "bin-options";
        current_question.appendChild(createElement(elmnt));

        const sub_element = document.getElementById(elmnt.id);
        resetElemntObject();

        json.map((answer, x) => {
            const nextElement = document.createElement("li");
            nextElement.setAttribute("class", "item bin-option_" + i + x);

            let span = document.createElement("span");
            let text = document.createTextNode(json[x].name);
            span.appendChild(text);
            nextElement.appendChild(span);

            setTimeout(function(obj){
                sub_element.appendChild(nextElement);
            }, 250);
            resetElemntObject();
        });
    }
    // console.log(question_count.childElementCount);
}