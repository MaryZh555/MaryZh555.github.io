// Getting data from JSON file
const data = require('./response.json');
console.log(data);

// Main  populate function
async function populate() {
    // Getting API converting to json
    // const requestURL = 'https:';
    // const requestURL = '../response.json';
    // const request = new Request(requestURL);
    // const response = await fetch(request);
    // jobList = await response.json();
    
    const jobList = data;
    //Calling other functions
    populateArticles(jobList);
}

function populateArticles(obj) {
    const section = document.querySelector('section');
    section.className = "space-y-2";

    for (let item in obj) {
        const myArticle = document.createElement('article');
        myArticle.className = "md:flex-row flex flex-col-reverse drop-shadow-md p-6 justify-between hover:bg-gray-50 hover:shadow-xl transition-all duration-300";

        //divContent
        const divContent = document.createElement('div');
        divContent.className = "gap-x-6 flex";
        //Image 
        const myImage = document.createElement('img');
        // Getting different image
        async function getImg() {
            const requestURL = obj[item].pictures[0];
            const request = new Request(requestURL);
            const response = await fetch(request);
            myImage.setAttribute("src", `${response.url} `);
            myImage.className = "shrink-0 object-cover"
        }
        getImg();

        // divText
        const divText = document.createElement('div');
        divText.className = "space-y-2";


        // Title link element
        const myAnchor = document.createElement('a');
        myAnchor.textContent = obj[item].title;
        myAnchor.className = "lg:font-bold lg:text-xl font-normal text-lg leading-6";
        myAnchor.setAttribute("id", obj[item].id);
        myAnchor.setAttribute("target", "_blank");
        myAnchor.setAttribute("href", "descriptionPage.html");
        myAnchor.setAttribute("onClick", `choose("${obj[item].id}")`);

        //Department Name
        const myName = document.createElement('p')
        myName.className = "nameEl";
        myName.textContent = `Department name \u{2022} ${obj[item].name}`;

        // Address paragraph
        const myPara1 = document.createElement('p');
        myPara1.className = "flex flex-row-reverse justify-end items-baseline gap-x-2";
        const iconLoc = document.createElement('i');
        myPara1.textContent = `  ${obj[item].address}`;
        iconLoc.className = "fa-solid fa-location-dot";

        // divAside
        const divAside = document.createElement('div');
        divAside.className = "flex flex-col justify-between items-end shrink-0";
        const bookLink = document.createElement('button');
        bookLink.className = "hidden md:inline";
        bookLink.href = "#";
        const iconBook = document.createElement('i');
        iconBook.className = "fa-regular fa-bookmark";

        const postedDate = document.createElement("p");
        postedDate.textContent = `Posted: ${obj[item].createdAt.slice(0, 10)}`;
        postedDate.className = "text-sm md:text-base"

        // Appending all
        myArticle.appendChild(divContent);
        divContent.appendChild(myImage);
        divContent.appendChild(divText);

        divText.appendChild(myAnchor);
        divText.appendChild(myName);
        divText.appendChild(myPara1);
        myPara1.appendChild(iconLoc);

        myArticle.appendChild(divAside);
        divAside.appendChild(bookLink);
        bookLink.appendChild(iconBook);
        divAside.appendChild(postedDate);

        section.appendChild(myArticle);
    }
}
populate();

// Saving clicked item id to send it to description.js
let final;
function choose(choise) {
    final = choise;
    localStorage.setItem("id", `${final}`);
    location.href = "descriptionPage.html";
}





