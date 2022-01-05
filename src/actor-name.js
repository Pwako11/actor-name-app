let element = document.createElement('div')
document.body.appendChild(element)

var cleanActorList = [];
var onlyNames = [];

const uniqueCountFullName = document.querySelector('.uniqueCountFullName');
const uniqueCountLastName = document.querySelector('.uniqueCountLastName');
const uniqueCountFirstName = document.querySelector('.uniqueCountFirstName');
const topTenLastName = document.querySelector('.topTenLastName');
const topTenFirstName = document.querySelector('.topTenFirstName');
const topSpecialUniqueName = document.querySelector('.topSpecialUniqueName'); 
const topModifiedName = document.querySelector('.topModifiedName')

function previewFile() {
 
  const content = document.querySelector('.content').style.visibility = "hidden";
  const [file] = document.querySelector('input[type=file]').files;  
  const reader = new FileReader();
  var downloaded;

  reader.addEventListener("load", () => {
    downloaded = reader.result;
    content.innerText = downloaded;
    editList(downloaded)
  }, false);
  
  if (file) {
    reader.readAsText(file);
  }
}

function editList(rawData){
  
  let actorName = rawData.split(/\n/ );
  let arrayofNames = Object.values(actorName);

  for( let i = 0; i < arrayofNames.length; i++) {
      
    if(arrayofNames[i][0] !== " "){
      onlyNames.push(arrayofNames[i]);
      let sn = arrayofNames[i].split('--')[0];
      if(arrayofNames[i] !== ""){
        cleanActorList.push(sn.trim());
      } 
    }  
  }

  uniqueFullNames(cleanActorList);
  buildNameObject(cleanActorList);
  speciallyuniquenames(cleanActorList);

}
  
function uniqueFullNames(cleanActorList){
  var counts = {};
  for (let i = 0; i <cleanActorList.length; i++ ){
    counts[cleanActorList[i]] = 1 + (counts[cleanActorList[i]] || 0);
  };

  let result = Object.keys(counts).length;

  uniqueCountFullName.innerText = `The unique count of full names is: ${result}`   

}

function buildNameObject(cleanActorList) {
  let detailedList = [];

  for(let i = 0; i < cleanActorList.length; i++){
    let actorName = {};
    let splitName= cleanActorList[i].split(',');
    
    actorName.lastName = splitName[0];
    actorName.firstName = splitName[1];
    detailedList.push(actorName);
  }
  
  UniqueLastName(detailedList);
  UniqueFirstName(detailedList);
  topTenLName(detailedList);
  topTenFName(detailedList);
  
}

function UniqueLastName(detailedList){
  var counts = new Set();

  for (let i = 0; i < detailedList.length; i++){
    if(detailedList[i].lastName !== ""){
      counts.add(detailedList[i].lastName);
    }
  }

  let result = counts.size;
  uniqueCountLastName.innerText = `The unique count of last names is: ${result} `;  

}

function UniqueFirstName(detailedList){
  var counts = new Set();

  for (let i = 0; i < detailedList.length; i++){
    if(detailedList[i].firstName !== ""){
      if(detailedList[i].firstName === undefined){
        return uniqueCountFirstName.innerText = `The unique count of first names is: 0 ` 
      } else{
        counts.add(detailedList[i].fisrtName);
      } 
    }   
  }
  let result = counts.size;
  uniqueCountFirstName.innerText = `The unique count of first names is: ${result} `  

}

function topTenLName(detailedList){
  function compare(a, b) {
    if(a.lastName < b.lastName){
      return -1;
    }
    if(a.lastName > b.lastName){
      return 1;
    }
    return 0;
  }

  detailedList.sort(compare)


  let counts = {};

  detailedList.forEach( (actor) =>{
    counts[actor.lastName] = (counts[actor.lastName] || 0) +1;
  })

  let sortedList = [];

  for( var actor in counts){
    sortedList.push([actor, counts[actor]])
  }

  sortedList.sort(function (b, a){
    return a[1] - b[1];
  })

  topTenLastName.innerText = `Here is a list of Topten Common last names: `

  for( let i = 0; i < 10; i++) {

    const ol = document.createElement('ul');
    const li = document.createElement('li');

    li.innerText = sortedList[i]
    ol.appendChild(li)
    topTenLastName.appendChild(ol)    
  }

}

function topTenFName(detailedList){
  function compare(a, b) {
    if(a.firstName < b.firstName){
      return -1;
    }
    if(a.firstName > b.firstName){
      return 1;
    }
    return 0;
  }

  detailedList.sort(compare)

  let counts = {};

  detailedList.forEach( (actor) =>{
    counts[actor.firstName] = (counts[actor.firstName] || 0) +1;
  })

  let sortedList = [];

  for( var actor in counts){
    sortedList.push([actor, counts[actor]]);
  }

  sortedList.sort(function (b, a){
    return a[1] - b[1];
  })

  topTenFirstName.innerText = `Here is a list of Topten Common first names: `

  for( let i = 0; i < 10; i++) {

    const ol = document.createElement('ul');
    const li = document.createElement('li');

    li.innerText = sortedList[i];
    ol.appendChild(li);
    topTenFirstName.appendChild(ol);  
  }

}

function speciallyuniquenames(cleanActorList){

  var firstNameList = new Set();
  var lastNameList = new Set();
  
  var uniqueNames = [];

  for (var name of cleanActorList) {

    var firstName = name.split(", ")[1];
    var lastName = name.split(", ")[0];
  
    if (!firstNameList.has(firstName) && !lastNameList.has(lastName)) {
      uniqueNames.push(lastName + ", " + firstName);
    }

    if(firstName || lastName !== undefined){
      firstNameList.add(firstName);
      lastNameList.add(lastName);
    }   
  }

  topSpecialUniqueName.innerText = `Here is a list of 25 specially unique names: `

  let modifiedNames = [];
  for( let i = 0; i < 25; i++) {

    modifiedNames.push(uniqueNames[i]);
    const ul = document.createElement('ul');
    const li = document.createElement('li');

    li.innerText = uniqueNames[i];
    ul.appendChild(li);
    topSpecialUniqueName.appendChild(ul);    
  }

  speciallyModifiedNames(modifiedNames);

}

function speciallyModifiedNames(modifiedNames) {

  topModifiedName.innerText = `Here is a list of 25 modified names`

  var modifiedFullNames = [];
  let firstNames = [];
  let lastNames = []; 

  for ( let i = 0; i < modifiedNames.length; i++){
    firstNames.push(modifiedNames[i].split(", ")[1]);
    lastNames.push(modifiedNames[i].split(", ")[0]);
  }

  var randomElemList = new Set();

  for ( let i = 0; i < modifiedNames.length; i++){
    
    randomNumberGen()
    function randomNumberGen(){
      let randomElement = Math.floor(Math.random() *25);
      assingRandomName(randomElement)
    }
      
    function assingRandomName(randomElement) {
      if ( !randomElemList.has(randomElement)){
        modifiedFullNames.push(lastNames[i] + ", " + firstNames[randomElement]);
        randomElemList.add(randomElement);
      }else{
        randomNumberGen()
      }
    }
        
  } 

  for(let i = 0; i< modifiedFullNames.length; i++){
        
    const ul = document.createElement('ul');
    const li = document.createElement('li');

    li.innerText = modifiedFullNames[i];
    ul.appendChild(li);
    topModifiedName.appendChild(ul);

  }
}