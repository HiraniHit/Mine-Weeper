let globalArray;
let mineArray;
function generateWithPrompt() {
    let size = prompt("Enter a size of board");
    let mine = prompt("Enter a mine amount");
    generateGame(size, mine);
}
let boxArray = [];
function generateGame(sizeOfBox, mine) {
    let mineArray = [];
    globalArray = boxArray;
    mineArray = mineArray;
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
        value.classList.add("visited");
    });

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
    let allBox = document.querySelectorAll(".box");
    allBox.forEach((item) =>
        item.textContent == "" ? item.classList.add("blank") : ""
    );
}
function openDiv(id) {
    let clickedDiv = id.split("-");

    let box = document.getElementById(`${clickedDiv[0]}-${clickedDiv[1]}`);
    if (box.classList.contains("mine")) {
        let allMines = document.querySelectorAll(".mine");
        allMines.forEach((value) => {
            value.style.backgroundColor = "red";
            box.style.color = "white";
        });
        box.style.color = "white";
        box.style.backgroundColor = "red";
        document.querySelector(".beginner-main").style.pointerEvents = "none";
        setTimeout(() => {
            document.querySelector(".beginner-main").classList.add("hide");
            document.querySelector(".playAgain").classList.remove("hide");
        }, 2000);
    } else if (box.textContent == "") {
        blankAllSmellerWhiteDiv(id);
    } else {
        box.style.color = "black";
        box.style.backgroundColor = "white";
    }
}

function blankAllSmellerWhiteDiv(divId) {
    let id = divId.toString();
    let selectedId = divId.toString().split("-");
    if (boxArray.includes(id) !== -1) {
        let div = document.querySelector(`.box[id='${id}']`);
        if (div != undefined && !div.classList.contains("mine")) {
            div.style.backgroundColor = "white";
        }
    }

    if (boxArray.includes(`${parseInt(id[0]) + 1}-${id[2] + 1}`) !== -1) {
        let div = document.querySelector(
            `.box[id='${parseInt(selectedId[0]) + 1}-${
                parseInt(selectedId[1]) + 1
            }']`
        );
        if (div != null) {
            div.style.backgroundColor = "white";
            if (
                div.textContent == "" &&
                div.classList.contains("blank") &&
                div.style.backgroundColor == "white"
            ) {
                let nextId = `${parseInt(selectedId[0]) + 1}-${
                    parseInt(selectedId[1]) + 1
                }`;
                let next = document.getElementById(nextId);
                if (!next.classList.contains("visited")) {
                    div.classList.add("visited");
                    blankAllSmellerWhiteDiv(nextId);
                }
            }
        }
    }

    if (boxArray.includes(`${parseInt(id[0]) - 1}-${id[2] - 1}`) !== -1) {
        let div = document.querySelector(
            `.box[id='${parseInt(selectedId[0]) - 1}-${
                parseInt(selectedId[1]) - 1
            }']`
        );
        if (div != null) {
            div.style.backgroundColor = "white";

            if (
                div.textContent == "" &&
                div.classList.contains("blank") &&
                div.style.backgroundColor == "white"
            ) {
                let nextId = `${parseInt(selectedId[0]) - 1}-${
                    parseInt(selectedId[1]) - 1
                }`;
                let next = document.getElementById(nextId);
                if (!next.classList.contains("visited")) {
                    div.classList.add("visited");
                    blankAllSmellerWhiteDiv(nextId);
                }
            }
        }
    }
    if (boxArray.includes(`${parseInt(id[0]) + 1}-${id[2] - 1}`) !== -1) {
        let div = document.querySelector(
            `.box[id='${parseInt(selectedId[0]) + 1}-${
                parseInt(selectedId[1]) - 1
            }']`
        );
        if (div != null) {
            div.style.backgroundColor = "white";

            if (
                div.textContent == "" &&
                div.classList.contains("blank") &&
                div.style.backgroundColor == "white"
            ) {
                let nextId = `${parseInt(selectedId[0]) + 1}-${
                    parseInt(selectedId[1]) - 1
                }`;
                let next = document.getElementById(nextId);
                if (!next.classList.contains("visited")) {
                    div.classList.add("visited");
                    blankAllSmellerWhiteDiv(nextId);
                }
            }
        }
    }
    if (boxArray.includes(`${parseInt(id[0]) - 1}-${id[2] + 1}`) !== -1) {
        let div = document.querySelector(
            `.box[id='${parseInt(selectedId[0]) - 1}-${
                parseInt(selectedId[1]) + 1
            }']`
        );
        if (div != null) {
            div.style.backgroundColor = "white";

            if (
                div.textContent == "" &&
                div.classList.contains("blank") &&
                div.style.backgroundColor == "white"
            ) {
                let nextId = `${parseInt(selectedId[0]) - 1}-${
                    parseInt(selectedId[1]) + 1
                }`;
                let next = document.getElementById(nextId);
                if (!next.classList.contains("visited")) {
                    div.classList.add("visited");
                    blankAllSmellerWhiteDiv(nextId);
                }
            }
        }
    }
    if (boxArray.includes(`${parseInt(id[0]) - 1}-${id[2]}`) !== -1) {
        let div = document.querySelector(
            `.box[id='${parseInt(selectedId[0]) - 1}-${parseInt(
                selectedId[1]
            )}']`
        );
        if (div != null) {
            div.style.backgroundColor = "white";

            if (
                div.textContent == "" &&
                div.classList.contains("blank") &&
                div.style.backgroundColor == "white"
            ) {
                let nextId = `${parseInt(selectedId[0]) - 1}-${parseInt(
                    selectedId[1]
                )}`;
                let next = document.getElementById(nextId);
                if (!next.classList.contains("visited")) {
                    div.classList.add("visited");
                    blankAllSmellerWhiteDiv(nextId);
                }
            }
        }
    }
    if (boxArray.includes(`${parseInt(id[0]) + 1}-${id[2]}`) !== -1) {
        let div = document.querySelector(
            `.box[id='${parseInt(selectedId[0]) + 1}-${parseInt(
                selectedId[1]
            )}']`
        );
        if (div != null) {
            div.style.backgroundColor = "white";

            if (
                div.textContent == "" &&
                div.classList.contains("blank") &&
                div.style.backgroundColor == "white"
            ) {
                let nextId = `${parseInt(selectedId[0]) + 1}-${parseInt(
                    selectedId[1]
                )}`;
                let next = document.getElementById(nextId);
                if (!next.classList.contains("visited")) {
                    div.classList.add("visited");
                    blankAllSmellerWhiteDiv(nextId);
                }
            }
        }
    }
    if (boxArray.includes(`${parseInt(id[0])}-${id[2] - 1}`) !== -1) {
        let div = document.querySelector(
            `.box[id='${parseInt(selectedId[0])}-${
                parseInt(selectedId[1]) - 1
            }']`
        );
        if (div != null) {
            div.style.backgroundColor = "white";

            if (
                div.textContent == "" &&
                div.classList.contains("blank") &&
                div.style.backgroundColor == "white"
            ) {
                let nextId = `${parseInt(selectedId[0])}-${
                    parseInt(selectedId[1]) - 1
                }`;
                let next = document.getElementById(nextId);
                if (!next.classList.contains("visited")) {
                    div.classList.add("visited");
                    blankAllSmellerWhiteDiv(nextId);
                }
            }
        }
    }
    if (boxArray.includes(`${parseInt(id[0])}-${id[2] + 1}`) !== -1) {
        let div = document.querySelector(
            `.box[id='${parseInt(selectedId[0])}-${
                parseInt(selectedId[1]) + 1
            }']`
        );
        if (div != null) {
            div.style.backgroundColor = "white";

            if (
                div.textContent == "" &&
                div.classList.contains("blank") &&
                div.style.backgroundColor == "white"
            ) {
                let nextId = `${parseInt(selectedId[0])}-${
                    parseInt(selectedId[1]) + 1
                }`;
                let next = document.getElementById(nextId);
                if (!next.classList.contains("visited")) {
                    div.classList.add("visited");
                    blankAllSmellerWhiteDiv(nextId);
                }
            }
        }
    }

    // if (boxArray.includes(`${id[0] + 1}-${id[2] + 1}`) !== -1) {
    //     let div = document.querySelector(
    //         `.box[id='${parseInt(id[0]) + 1}-${
    //             parseInt(id[2]) + 1
    //         }']`
    //     );

    //     if (div != undefined && !div.classList.contains("mine")) {
    //         div.style.backgroundColor = "white";
    //         let nextDivId = `${parseInt(div.id[0]) + 1}-${parseInt(div.id[2] )+1}`
    //         console.log(nextDivId);
    //         if(div.classList.contains("blank") && div.textContent == ""){
    //             blankAllSmellerWhiteDiv(row + 1, col + 1,  nextDivId)
    //         }else{
    //             return;
    //         }
    //     }else{
    //         return;
    //     }
    // }
    // if (arrayGlo.includes(`${row - 1}-${col + 1}`) !== -1) {
    //     let div = document.querySelector(
    //         `.box[id='${parseInt(currentDiv[0]) - 1}-${
    //             parseInt(currentDiv[1]) + 1
    //         }']`
    //     );
    //     if (div != undefined && !div.classList.contains("mine")) {
    //         div.style.backgroundColor = "white";
    //         let nextDivId = [`${parseInt(div.id[0]) - 1}`,`${parseInt(div.id[2]) +1}`]
    //         if(div.classList.contains("blank") && div.textContent == ""){
    //             blankAllSmellerWhiteDiv(row -1, col +1, totalRow, nextDivId)
    //         }else{
    //             return;
    //         }
    //     }else{
    //         return;
    //     }
    // }
    // if (arrayGlo.includes(`${row - 1}-${col}`) !== -1) {
    //     let div = document.querySelector(
    //         `.box[id='${parseInt(currentDiv[0]) - 1}-${parseInt(
    //             currentDiv[1]
    //         )}']`
    //     );
    //     if (div != undefined && !div.classList.contains("mine")) {
    //         div.style.backgroundColor = "white";
    //         let nextDivId = [`${parseInt(div.id[0]) - 1}`,`${parseInt(div.id[2] )}`]
    //         if(div.classList.contains("blank") && div.textContent == ""){
    //             blankAllSmellerWhiteDiv(row-1, col , totalRow, nextDivId)
    //         }else{
    //             return;
    //         }
    //     }
    // }
    // if (arrayGlo.includes(`${row - 1}-${col - 1}`) !== -1) {
    //     let div = document.querySelector(
    //         `.box[id='${parseInt(currentDiv[0]) - 1}-${
    //             parseInt(currentDiv[1]) - 1
    //         }']`
    //     );
    //     if (div != undefined && !div.classList.contains("mine")) {
    //         div.style.backgroundColor = "white";
    //     }
    // }
    // if (arrayGlo.includes(`${row}-${col - 1}`) !== -1) {
    //     let div = document.querySelector(
    //         `.box[id='${parseInt(currentDiv[0])}-${
    //             parseInt(currentDiv[1]) - 1
    //         }']`
    //     );
    //     if (div != undefined && !div.classList.contains("mine")) {
    //         div.style.backgroundColor = "white";
    //     }
    // }
    // if (arrayGlo.includes(`${row}-${col + 1}`) !== -1) {
    //     let div = document.querySelector(
    //         `.box[id='${parseInt(currentDiv[0])}-${
    //             parseInt(currentDiv[1]) + 1
    //         }']`
    //     );
    //     if (div != undefined && !div.classList.contains("mine")) {
    //         div.style.backgroundColor = "white";
    //     }
    // }
    // if (arrayGlo.includes(`${row + 1}-${col - 1}`) !== -1) {
    //     let div = document.querySelector(
    //         `.box[id='${parseInt(currentDiv[0]) + 1}-${
    //             parseInt(currentDiv[1]) - 1
    //         }']`
    //     );
    //     if (div != undefined && !div.classList.contains("mine")) {
    //         div.style.backgroundColor = "white";
    //     }
    // }
    // if (arrayGlo.includes(`${row + 1}-${col}`) !== -1) {
    //     let div = document.querySelector(
    //         `.box[id='${parseInt(currentDiv[0]) + 1}-${parseInt(
    //             currentDiv[1]
    //         )}']`
    //     );
    //     if (div != undefined && !div.classList.contains("mine")) {
    //         div.style.backgroundColor = "white";
    //         let nextDivId = [`${parseInt(div.id[0]) + 1}`,`${parseInt(div.id[2] )}`]
    //         if(div.classList.contains("blank") && div.textContent == ""){
    //             blankAllSmellerWhiteDiv(row +1, col, totalRow, nextDivId)
    //         }else{
    //             return;
    //         }
    //     }else{
    //         return;
    //     }
    // }else{return;}
}

function removeNextSpace(row, col, divId) {
    //     let posableBox = [
    //         [0,0]
    //         [-1, -1],
    //         [-1, 0],
    //         [-1, +1],
    //         [0, -1],
    //         [0 - 0],
    //         [0, +1],
    //         [+1, -1],
    //         [+1, 0],
    //         [+1, +1],
    //     ];
    // let div = document.getElementById(divId)
    // console.log(divId);
    // console.log(divId[0],divId[2]);
    // // -1 -1
    // let div1 = document.getElementById(`${parseInt(divId[0]) + 1}-${parseInt(divId[2]) + 1}`)
    // let div1Id = div1 != null ? div.id : ""
    // if(div1 != null && !(div1.classList.contains("mine"))){
    //     div1.style.backgroundColor = "white"
    //     console.log(div1Id);
    // }
    // let div2 = document.getElementById(`${parseInt(divId[0]) + 1}-${parseInt(divId[2])}`)
    // let div2Id = div1 != null ? div.id : ""
    // if(div2 != null && !(div2.classList.contains("mine"))){
    //     div2.style.backgroundColor = "white"
    //     console.log(div2Id);
    // }
    // let div3 = document.getElementById(`${parseInt(divId[0])}-${parseInt(divId[2]) + 1}`)
    // let div3Id = div3 != null ? div.id : ""
    // if(div3 != null && !(div3.classList.contains("mine"))){
    //     div3.style.backgroundColor = "white"
    //     console.log(div3Id);
    // }
    // let div1 = document.getElementById(`${parseInt(divId[0]) + 1}-${parseInt(divId[2]) + 1}`)
    // let div1Id = div1 != null ? div.id : ""
    // if(div1 != null && div1.classList.contains("blank")){
    //     div1.style.backgroundColor = "white"
    //     console.log(div1Id);
    // }
}
