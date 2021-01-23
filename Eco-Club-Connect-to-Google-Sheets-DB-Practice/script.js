const sheetInfo = {
    "google_sheet_id":"1sG_uOSlDI_R8uA72DZiYRLh4IcsZTLKKsAHS_SEQCXE",
    "sheet": function(id){
        return "https://spreadsheets.google.com/feeds/cells/"+this.google_sheet_id+"/"+id+"/public/full?alt=json";
    }
};

async function loadJson_questions(sheet_id, mode, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        moderator(mode, this.responseText, callback);
    }
  };
  xhttp.open("GET", sheetInfo.sheet(sheet_id), true);
  xhttp.send();
}

function moderator(item, responseText, callback){
    switch(item){
        case 0:
            gateway(responseText, callback);
            break;
        case 1:
            bin_gateway(responseText, callback);
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
        console.log("Break");
    }

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
                obj_b["bin-option"] = item[0];
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


function test(json){
    console.log(json[1]);
}

function bin_gateway(json, callback){
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
        console.log("Break");
    }
    callback(create_object(1, table));
}




// {
//     "problem-id": 1,
//     "currect_bin": 2,
//     "problem-question":"Which Bin Do these Items Go Into?",
//     "problem-answers":[
//         [0, "Plastic Bag", "https://picsum.photos/200", true],
//         [1, "Fast Food Wrapper", "https://picsum.photos/200", false],
//         [2, "soiled paper plae", "https://picsum.photos/200", false],
//         [3, "aflimst plastic", "https://picsum.photos/200", false]
//     ]
// },