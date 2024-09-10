let nameInput = document.querySelector('.text');
let priceInput = document.querySelector('.price');
let numsInput = document.querySelector('.nums');
let categoryInput = document.querySelector('.category');
let createBtn = document.querySelector('.create')
let table = document.querySelector('table')

let mood = 'create';
let temp;

// create product data
let productData;

if (localStorage.product !== null) {

    productData = JSON.parse(localStorage.product);

} else {
    productData = [];

}



createBtn.onclick = function () {
    
    let product = {
        nameInput: nameInput.value.toLowerCase(),
        priceInput: priceInput.value,
        numsInput: numsInput.value,
        categoryInput: categoryInput.value.toLowerCase(),   
    };
    if (mood === 'create') {
        productData.push(product);
        localStorage.setItem('product', JSON.stringify(productData));

    } else if (mood === 'ubdat') {
        productData[temp] = product;
        createBtn.innerHTML = `Create`
   
        mood = 'create';
    }
   
    console.log(product);

    clear()

    read()

}

// clear fields after subment
function clear() {
    nameInput.value = '';
    priceInput.value = '';
    numsInput.value = '';
    categoryInput.value = '';
}
//show data in table
let tableBody = document.querySelector('.tableBody')
function read() {
    let tabl = '';
    for (let i = 0; i < productData.length; i++){
        tabl +=
        `<tr>
            <td>${i}</td>
            <td>${productData[i].nameInput}</td>
            <td>${productData[i].priceInput}</td>
            <td>${productData[i].numsInput}</td>
            <td>${productData[i].categoryInput}</td>
            <td><button  onclick="delet(${i})" >delete</button>
            <button onclick="ubdate(${i}) " >Edit</button></td>
        </tr>`
    }
    tableBody.innerHTML = tabl; 
    let deleteDiv = document.getElementById('deleteAll')

    if (productData.length > 0) {
        deleteDiv.innerHTML = `<button id='deleteAllBtn'  onclick="deletAll()">Delete All</button>`;
    } else {
        deleteDiv.innerHTML = ``;
    }
}
read()

// to delete data fro table(array) AND FROM LOCAL STORAGE

function delet(i){
    productData.splice(i, 1);
    localStorage.product = JSON.stringify(productData);
    read();
}
// to ALL delete data fro table(array) AND FROM LOCAL STORAGE
function deletAll() {
    localStorage.clear()
    productData.splice(0)
    read()
}

// to ubdate product data from array & local storage

function ubdate(i) {
    nameInput.value = productData[i].nameInput;
    priceInput.value = productData[i].priceInput;
    numsInput.value = productData[i].numsInput;
    categoryInput.value = productData[i].categoryInput;
    createBtn.innerHTML=`Ubdate`
    mood = 'ubdat';
    temp = i;
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
    

}

// search section
let titleBtn = document.getElementById('title');
let categoryBtn = document.getElementById('category');
let searchField=document.getElementById('search')
let searchMode = "title"

function searchMood(id) {
    console.log(id)
    if (id === 'title') {
        searchMode = "title";
        searchField.placeholder = 'search by name';
    } else if (id === 'category'){
        searchMode = 'category'
        searchField.placeholder = 'search by category';

    }
    searchField.focus();
    searchField.value = "";
    read();
    
    
}
function search(value) {
    let tabl = '';
    if (searchMode = "title") {
        for (let i = 0; i < productData.length; i++) {
            if (productData[i].nameInput.includes(value.toLowerCase())) {
                tabl +=
                    `<tr>
            <td>${i}</td>
            <td>${productData[i].nameInput}</td>
            <td>${productData[i].priceInput}</td>
            <td>${productData[i].numsInput}</td>
            <td>${productData[i].categoryInput}</td>
            <td><button  onclick="delet(${i})" >delete</button>
            <button onclick="ubdate(${i}) " >Edit</button></td>
        </tr>`
            }

        }
        
    } else if (searchMode = "category") {
        for (let i = 0; i < productData.length; i++) {
            if (productData[i].categoryInput.includes(value.toLowerCase())) {
                tabl +=
                    `<tr>
            <td>${i}</td>
            <td>${productData[i].nameInput}</td>
            <td>${productData[i].priceInput}</td>
            <td>${productData[i].numsInput}</td>
            <td>${productData[i].categoryInput}</td>
            <td><button  onclick="delet(${i})" >delete</button>
            <button onclick="ubdate(${i}) " >Edit</button></td>
        </tr>`
            }

        }
    }

    tableBody.innerHTML = tabl; 
    if (value === "") {
      read()
  }
   
    
}
// console.log(table)
// let selectedRow = null;
// function createTr() {
//     if (nameInput.value !== '' && priceInput.value !== '' && numsInput.value !== '' && categoryInput.value !== '') {
//         let tebelRow = document.createElement("tr")

//         let tebelName = document.createElement("td");
//         let tebelPrice = document.createElement("td");
//         let tebelNums = document.createElement("td");
//         let tebelCategory = document.createElement("td");
//         let tableActions = document.createElement("td");
//         let deleteBtn = document.createElement('button');
//         let ubdateBtn = document.createElement('button');
//         deleteBtn.classList.add('clear');
//         ubdateBtn.classList.add('edit');
//         tebelName.innerText = nameInput.value;
//         tebelPrice.innerText = priceInput.value;
//         tebelNums.innerText = numsInput.value;
//         tebelCategory.innerText = categoryInput.value;
//         deleteBtn.innerText = 'Delete'
//         ubdateBtn.innerText = 'Edit'

//         tableActions.appendChild(deleteBtn);
//         tableActions.appendChild(ubdateBtn);
//         tebelRow.appendChild(tebelName);
//         tebelRow.appendChild(tebelPrice);
//         tebelRow.appendChild(tebelNums);
//         tebelRow.appendChild(tebelCategory);
//         tebelRow.appendChild(tableActions);

//         table.appendChild(tebelRow);

//         // localStorage.setItem('Name',JSON.stringify(tebelName.value  ));

//     }
// }

// function ubdate() {
//     if (selectedRow)
//         tebelName.innerText = nameInput.value;
//         tebelPrice.innerText = priceInput.value;
//         tebelNums.innerText = numsInput.value;
//         tebelCategory.innerText = categoryInput.value;
// }


// createBtn.onclick = function () {
//     createTr()
// }
    
// document.addEventListener('click', function (e) {
//     if (e.target.className === 'clear') {
//         e.target.parentNode.parentNode.remove()
//     }
// })
// document.addEventListener('click', function (e) {
//     if (e.target.className === 'edit') {
//         tebelName.innerText = nameInput.value;
//         tebelPrice.innerText = priceInput.value;
//         tebelNums.innerText = numsInput.value;
//         tebelCategory.innerText = categoryInput.value;
//     }
// })





// let myRequest = new XMLHttpRequest()

// myRequest.onreadystatechange = function () {
//     if (myRequest.status === 200 && myRequest.readyState === 4) {
//         let jsData = JSON.parse(myRequest.responseText);
//         console.log(jsData)
//         for (let i = 0; i < jsData.length; i++){
//             let dev = document.createElement('div');
//             let text = document.createTextNode(jsData[i].name);
//             dev.appendChild(text);
//             document.body.appendChild(dev)
//         }

//     }
// }
// myRequest.open("get", "https://api.github.com/users/AhmedShoieb96/repos");
// myRequest.send()

// let myPromise = new Promise((reslvePromise, rejectPromise) => {
//     let arr = ['ahmed','mohamed','abbas','shoieb']
//     if (arr.length === 4) {
//         reslvePromise(arr)
//     } else {
//         rejectPromise(Error('there is no 4 student'))
//     }
// });
// myPromise
//     .then((resolveValue) => {
//         resolveValue.length = 2
//         return resolveValue;
//     }).then((resolveValue) => {
//         resolveValue.length = 1
//         return resolveValue;

//     }).then((resolveValue) => {
//         console.log(resolveValue)
    
//     }).catch((rejetValue) => console.log(rejetValue))
   

// // ===================
// // ==========================
// // ================================
// let car;
// let secPromise = new Promise((resolvedPromis, rejectedPromise) => { 
//      car = ["bmw1", "bmw2", "bmw3"]
//     if (car !=null) {
//         resolvedPromis( car)
//     } else {
//         rejectedPromise(Error('thereis no  cars'))
//     }
// })
// secPromise
//     .then((resolvValue) => {
//         resolvValue.push('bmw4')
//         return resolvValue;
//     })
//     .then((resolvValue) => {
//         resolvValue.push('bmw4')
//         return car;
//     })
//     .then((resolvValue) => {
//         console.log(resolvValue);
        
//     })
//     .catch((rejecValue) => {
//         console.log(rejecValue);
        
//     })
//     .finally(() => {
//         console.log("the operation is done")
        
//     });


//==========================================
// ==============================
    
console.log("hello from the other side");


// function getData(apiLink) {
//     return new Promise((resolve, reject) => {
//         let myRequest = new XMLHttpRequest()
//         myRequest.onload = function () {
//             if (myRequest.readyState === 4 && myRequest.status === 200) {
//                 resolve(JSON.parse(this.responseText))
//             } else {
//                 reject(Error('there is no data'));
//             }
//         };
       
//         myRequest.open('GET', apiLink);
//         myRequest.send();
//     })
        

// }
// getData("https://api.github.com/users/AhmedShoieb96/repos")
//     .then((rees) => {
//         rees.length = 2
//         return rees;
//     })
//     .then((rees) => {
//         console.log(rees[0].name)

//     })
//     .catch((rej) => {console.log(rej)})
//     .finally(() => console.log(' the operation is done'));





// let myRequest = new XMLHttpRequest()

// myRequest.onreadystatechange = function () {
//     if (myRequest.status === 200 && myRequest.readyState === 4) {
//         let jsData = JSON.parse(myRequest.responseText);
//         console.log(jsData)
//         for (let i = 0; i < jsData.length; i++) {
//             let dev = document.createElement('div');
//             let text = document.createTextNode(jsData[i].name);
//             dev.appendChild(text);
//             document.body.appendChild(dev)
//         }

//     }
// }
// myRequest.open("get", "https://api.github.com/users/AhmedShoieb96/repos");
// myRequest.send()

// function getData(apiLink) {
//     return new Promise((resolve, reject) => {
//         let myRequest = new XMLHttpRequest()
//         myRequest.onload = function () {
//             if (myRequest.readyState === 4 && myRequest.status === 200) {
//                 resolve(JSON.parse(this.responseText))
//             } else {
//                 reject(Error('there is no data'));
//             }
//         };

//         myRequest.open('GET', apiLink);
//         myRequest.send();
//     })


// }
// getData("https://api.github.com/users/AhmedShoieb96/repos")
//     .then((rees) => {
//         rees.length = 2
//         return rees;
//     })
//     .then((rees) => {
//         console.log(rees[0].name)

//     })
//     .catch((rej) => { console.log(rej) })
//     .finally(() => console.log(' the operation is done'));


// fetch('https://api.github.com/users/AhmedShoieb96/repos')
//     .then((result) => {
//         console.log(result);
//         return result;
//     })
//     .then((result) => {
//         let all = result.json();
//         console.log(all);
//         return all;
//     })
//     .then((allData) => {
//         allData.length = 3;
//         return allData;
//     })
//     .then((data) => {
//        console.log(data[0].name)
//    })

// const myPromise = new Promise((resolve, reject) => {
//     let student = ['ahmed'];
//     setTimeout(() => { 
//         reject("bad promise");

//     },3000)

// })  
// async function readData() {
//     console.log('before promise');
//     try {
//         console.log(await myPromise);
//     } catch (reason) { console.log(`reason: ${reason}`) } 
//     finally {
//         console.log('after promise');
//     }
//     // console.log(await myPromise);
//     // console.log('after promise');
// }

// readData()


async function readData() {
    console.log('before promise');
    try {
        let mydata = await fetch('https://api.github.com/users/AhedShoieb96/repos')
        console.log(await mydata.json());
    } catch (reason) {
        console.log(`reason: ${reason}`)
        
    }
    finally {
        console.log('after promise');
    }
    // console.log(await myPromise);
    // console.log('after promise');
}

readData()