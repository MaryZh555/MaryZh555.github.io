// Getting an id by item in index.html
// let myId = localStorage.getItem("id");
let myId = sessionStorage.getItem("id");
console.log(`YOU GOT A VAR/DATA: ${myId}, it is a ${typeof (myId)}`);

// Getting data from JSON file
const data = require('./response.json');
console.log(data);

// Main populate function
async function populate() {
    /*Getting an API
    const requestURL = 'https://';
    const request = new Request(requestURL);
    const response = await fetch(request);
    const jobList = await response.json();
*/

const jobList = data;
    // Finding index of clicked element
    const myIndex = jobList.findIndex(item => `${item.id}` == `${myId}`);
    console.log(`Clicked index is: ${myIndex}`);

    // Other Functions
    populateMain(jobList[myIndex]);
    populateAside(jobList[myIndex]);
}

function populateMain(obj) {
    ////Header
    const myH2 = document.querySelector('h2#title');
    myH2.textContent = obj.title;
    const salaryP = document.querySelector('p#salary');
    salaryP.textContent = `\u{20AC} ${obj.salary}`;
    const postedDate = document.querySelector("p#postedAt");
    postedDate.textContent = `Posted: ${obj.createdAt.slice(0, 10)}`;
    
    ////Body
    const descrP = document.querySelector("p#descr");
    descrP.textContent = obj.description;

    ////Footer
    //Employment
    const divEmployment = document.querySelector("div#employment-type");
    for (let index in obj.employment_type) {
        const employmentEl = document.createElement('p');
        employmentEl.className = "employment-type-el";
        employmentEl.textContent = obj.employment_type[index];
        divEmployment.appendChild(employmentEl);
    }
    //Benefits
    const divBenefits = document.querySelector("div#benefits");
    for (let index in obj.benefits) {
        const benefitsEl = document.createElement('p');
        benefitsEl.className = "benefits-el";
        benefitsEl.textContent = obj.benefits[index];
        divBenefits.appendChild(benefitsEl);
    }

    const divImages = document.querySelector("div#images");
    for (let index in obj.pictures) {
        const imgEl = document.createElement('img');
        imgEl.className = "img-el object-cover";
        async function getImg() {
            const requestURL = obj.pictures[0];
            const request = new Request(requestURL);
            const response = await fetch(request);
            imgEl.setAttribute("src", `${response.url} `);
        }
        getImg();
        divImages.appendChild(imgEl);
    }
}

    function populateAside(obj){
        //converting coordinates
        let myLat = obj.location.lat;
        let myLong = obj.location.long;
        console.log(`Your coordinates are: Lat: ${myLat} ${myLong}`);
    
        //Aside Content
        const depNameP = document.querySelector('p#dep-name');
        depNameP.textContent = `Department name: ${obj.name}`;
    
        const addressP = document.querySelector('p#address');
        addressP.textContent = obj.address;
    
        const phoneP = document.querySelector('p#phone');
        phoneP.textContent = obj.phone;
    
        const emailP = document.querySelector('p#email');
        emailP.textContent = obj.email;
     
    // Map
        const divMap = document.querySelector('div#map');
        const myMap = document.createElement('iframe');
        myMap.className = "m-auto rounded-b-lg"
        myMap.setAttribute("width", "100%"); //402(fixed)
        myMap.setAttribute("height", "85%"); //250(fixed)
        myMap.setAttribute("frameborder", 0);
        myMap.setAttribute("marginheight", 0);
        myMap.setAttribute("marginwidth", 0);
        myMap.setAttribute("scrolling", "no");
        myMap.setAttribute("src", `https://maps.google.com/maps?q=${myLat}+${myLong}&hl=en&z=14&output=embed`);
        divMap.appendChild(myMap);
    }


    populate();




