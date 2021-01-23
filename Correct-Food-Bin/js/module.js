window.onload = (event) => {
    renderComponents();
};

const sheetInfo = {
    "google_sheet_id":"1sG_uOSlDI_R8uA72DZiYRLh4IcsZTLKKsAHS_SEQCXE",
    "sheet": function(id){
        return "https://spreadsheets.google.com/feeds/cells/"+this.google_sheet_id+"/"+id+"/public/full?alt=json";
    },
    "last_update":""
};

function loadJson_questions(sheet_id, mode, callback) {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200) {
//         moderator(mode, this.responseText, callback);
//     }
//   };
//   xhttp.open("GET", sheetInfo.sheet(sheet_id), true);
//   xhttp.send();
    return fetch(sheetInfo.sheet(sheet_id)).then(
        function(response){
            return moderator(mode, response, callback);
        }
    );
}

function moderator(item, responseText, callback){
    switch(item){
        case 0:
            gateway(responseText, callback);
            break;
        case 1:
            bin_gateway(responseText, callback);
            // console.log("Hello");
            break;
        case 2:
            // console.log("KILALS");
            gateway(responseText, callback);
            break;
    }
}

// create_options_object(json, callback)
function gateway(json, callback){
    json = JSON.parse(json);
    let row = 2;
    const table = [];
    const amnt = json.feed["gs$rowCount"]["$t"];

    for(let x=2; x<parseInt(amnt)+1; x++){
        const group = [];
        json.feed.entry.map((item) => {
            if(item["gs$cell"].row == x)
            {
                group.push(item["gs$cell"]["$t"]);
            }
        });
        table.push(group);
        // console.log("Break");
    }
    // console.log(table[0]);
    //IMPORTANT DO NOT REMOVE OR EDIT ANYTHING CHILDREN WITHIN
    callback(create_object(0, table));
}

function create_object(mode, table){

    const main_obj = [];
    // console.log(table[0]);
    table.forEach((item, i) => {
        switch(mode){
            case 0:
                const obj = {};
                obj["problem-id"] = i;
                obj["correct_bin"] = item[5];
                obj["problem-question"] = item[0];
                obj["problem-answers"] = createAnswerArray(table[i], item[6]);
                main_obj.push(obj);
                break;
            case 1:
                const obj_b = {};
                obj_b["id"] = i;
                obj_b["name"] = item[0];
                main_obj.push(obj_b);
                break;
        }
    });

    // console.log(main_obj[1]);

    return main_obj;
}

function createAnswerArray(item, string){
    const main = [];
    string = string.split(",");
    string.map((val, i) => {
        main.push([i, item[i+1], val]);
    });
    return main;
}

// loadJson_questions(1, 0, test);
// loadJson_questions(2, 1, test);

function bin_gateway(json, callback){
    // console.log("Hello");

    json = JSON.parse(json);
    let row = 2;
    const table = [];
    const amnt = json.feed["gs$rowCount"]["$t"];

    for(let x=2; x<parseInt(amnt)+1; x++){
        const group = [];
        json.feed.entry.map((item) => {
            if(item["gs$cell"].row == x)
            {
                group.push(item["gs$cell"]["$t"]);
            }
        });
        table.push(group);
        // console.log("Break");
    }
    // console.log(table[0]);
    callback(create_object(1, table));
}


function evaluate_choice(json){
    json.some((item, i) => {
        let decode="bin-option_"+i+item["correct_bin"];
        const className = main.choice.split(" ");
        if(className[1] === decode){
            setTimeout(function(){
                updateButtonStatus(true, className[1], i);
            }, 100);
            return true;
        }else if(className[1] !== decode){
            setTimeout(function(){
                updateButtonStatus(false, className[1], i);
            }, 50);
        }
    });
    console.log("CHOICE CHOSEN");
}