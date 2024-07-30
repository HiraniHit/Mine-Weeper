let globalArray;
2;

function generateGame(sizeOfBox, mine) {
    let boxArray = [];
    let mineArray = [];
    globalArray = boxArray;
    let beginnerDiv = document.querySelector(".beginner-main");
    let game = "";

    while (mineArray.length < mine) {
        let mineRow = Math.floor(Math.random() * sizeOfBox);
        let mineCol = Math.floor(Math.random() * sizeOfBox);
        if (!mineArray.includes(mine)) {
            mineArray.push(`${mineRow}-${mineCol}`);
        }
    }

    for (let i = 0; i < sizeOfBox; i++) {
        game += `<div class="row">`;
        for (let j = 0; j < sizeOfBox; j++) {
            let isMine = mineArray.includes(`${i}-${j}`) ? "mine" : "";
            game += `<div class="box ${isMine}" id="${i}-${j}" onclick="openDiv('${i}-${j}')"></div>`;
            boxArray.push([`${i}-${j}`]);
        }
        game += `</div>`;
    }
    beginnerDiv.innerHTML = game;

    let mineBox = document.querySelectorAll(".mine");
    mineBox.forEach((value) => {
        value.textContent = "M";
    });
    console.log(mineArray);

    aroundNumber(sizeOfBox, mineArray);
}

function aroundNumber(sizeOfBox, mineArray) {
    for (let i = 0; i < sizeOfBox; i++) {
        for (let j = 0; j < sizeOfBox; j++) {
            let box = document.getElementById(i + "-" + j);
            if (box.classList.contains("mine")) {
            } else {
                let count = 0;

                if (i > 0) {
                    if (j > 0) {
                        if (mineArray.indexOf(i - 1 + "-" + (j - 1)) !== -1)
                            count++;
                    }
                    if (mineArray.indexOf(i - 1 + "-" + j) !== -1) count++;
                    if (j < sizeOfBox - 1) {
                        if (mineArray.indexOf(i - 1 + "-" + (j + 1)) !== -1)
                            count++;
                    }
                }

                if (j > 0) {
                    if (mineArray.indexOf(i + "-" + (j - 1)) !== -1) count++;
                }
                if (j < sizeOfBox - 1) {
                    if (mineArray.indexOf(i + "-" + (j + 1)) !== -1) count++;
                }

                if (i < sizeOfBox - 1) {
                    if (j > 0) {
                        if (mineArray.indexOf(i + 1 + "-" + (j - 1)) !== -1)
                            count++;
                    }
                    if (mineArray.indexOf(i + 1 + "-" + j) !== -1) count++;
                    if (j < sizeOfBox - 1) {
                        if (mineArray.indexOf(i + 1 + "-" + (j + 1)) !== -1)
                            count++;
                    }
                }
                if (count > 0) {
                    box.textContent = count;
                }
            }
        }
    }
}
function openDiv(id) {
    let clickedDiv = id.split("-");
    console.log(clickedDiv);

    let totalRow = document.querySelectorAll(".row").length;

    for (let i = 0; i < totalRow; i++) {
        for (let j = 0; j < totalRow; j++) {
            let box = document.getElementById(
                `${clickedDiv[0]}-${clickedDiv[1]}`
            );
            if (box.classList.contains("mine")) {
                let allMines = document.querySelectorAll(".mine");
                allMines.forEach((value) => {
                    value.style.backgroundColor = "red";
                    box.style.color = "white";
                });
                box.style.color = "white";
                box.style.backgroundColor = "red";
            } else if (box.textContent == "") {
                blankAllSmellerWhiteDiv(i,j,totalRow ,clickedDiv);
            } else {
                box.style.color = "black";
                box.style.backgroundColor = "white";
            }
        }
    }
}

function blankAllSmellerWhiteDiv(row,col,totalRow , currentDiv) {

    // let div = document.querySelector(`.box[id='${currentDiv[0]}-${currentDiv[1]}']`);
    // div.style.backgroundColor = "white"
    let arrayGlo = [...globalArray].flat(2)
    // for (let i = 0; i < totalRow; i++) {
    //     for (let j = 0; j < totalRow; j++) {

            
    //             if(arrayGlo.includes(`${i + 1}-${j + 1}`) !== -1){
    //                 let div = document.querySelector(`.box[id='${parseInt(currentDiv[0]) + i}-${parseInt(currentDiv[1])+j}']`)
    //                 if(div != undefined && div.textContent == ""){
    //                     div.style.backgroundColor = "white"
    //                 console.log(div.id);
    //                 }
    //             }
            
 
    //     }
    // }
   

    if(arrayGlo.includes(`${row + 1}-${col + 1}`) !== -1){
        let div = document.querySelector(`.box[id='${currentDiv[0]}-${currentDiv[1]}']`);
        div.style.backgroundColor = "white"
    }
    if(arrayGlo.includes(`${(row +1 ) + 1}-${(col + 1) + 1}`) !== -1){
        let div = document.querySelector(`.box[id='${parseInt(currentDiv[0]) + 1}-${parseInt(currentDiv[1])+1}']`)
        if(div != undefined ){
            div.style.backgroundColor = "white"
        }
    }
    if(arrayGlo.includes(`${(row -1 ) + 1}-${(col + 1) - 1}`) !== -1){
        let div = document.querySelector(`.box[id='${parseInt(currentDiv[0]) - 1}-${parseInt(currentDiv[1])-1}']`)
        if(div != undefined ){
            div.style.backgroundColor = "white"
            
        }
    }
     if(arrayGlo.includes(`${(row -1 ) + 1}-${(col) - 1}`) !== -1){
        let div = document.querySelector(`.box[id='${parseInt(currentDiv[0]) - 1}-${parseInt(currentDiv[1])}']`)
        if(div != undefined ){
            div.style.backgroundColor = "white"
        }
    }
    if(arrayGlo.includes(`${(row -1 ) + 1}-${(col + 1) + 1}`) !== -1){
        let div = document.querySelector(`.box[id='${parseInt(currentDiv[0]) - 1}-${parseInt(currentDiv[1])+ 1}']`)
        if(div != undefined ){
            div.style.backgroundColor = "white"
        }
    }
    if(arrayGlo.includes(`${(row) + 1}-${(col - 1) + 1}`) !== -1){
        let div = document.querySelector(`.box[id='${parseInt(currentDiv[0])}-${parseInt(currentDiv[1])- 1}']`)
        if(div != undefined ){
            div.style.backgroundColor = "white"
        }
    }
    if(arrayGlo.includes(`${(row) + 1}-${(col + 1) + 1}`) !== -1){
        let div = document.querySelector(`.box[id='${parseInt(currentDiv[0])}-${parseInt(currentDiv[1])+ 1}']`)
        if(div != undefined ){
            div.style.backgroundColor = "white"
        }
    }
    if(arrayGlo.includes(`${(row + 1) + 1}-${(col - 1) + 1}`) !== -1){
        let div = document.querySelector(`.box[id='${parseInt(currentDiv[0]) + 1}-${parseInt(currentDiv[1])- 1}']`)
        if(div != undefined ){
            div.style.backgroundColor = "white"
        }
    }
    if(arrayGlo.includes(`${(row + 1) + 1}-${(col ) + 1}`) !== -1){
        let div = document.querySelector(`.box[id='${parseInt(currentDiv[0]) + 1}-${parseInt(currentDiv[1])}']`)
        if(div != undefined ){
            div.style.backgroundColor = "white"
        }
    }

}
