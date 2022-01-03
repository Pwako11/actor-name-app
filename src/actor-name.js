var cleanActorList = [];
var onlyNames = [];
var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)" )

let element = document.createElement('div')
document.body.appendChild(element)

const uniqueCountFullName = document.querySelector('.uniqueCountFullName');
const uniqueCountLastName = document.querySelector('.uniqueCountLastName');
const uniqueCountFirstName = document.querySelector('.uniqueCountFirstName');
const topTenLastName = document.querySelector('.topTenLastName');
const topTenFirstName = document.querySelector('.topTenFirstName');
const topSpecialUniqueName = document.querySelector('.topSpecialUniqueName'); 
const topModifiedName = document.querySelector('.topModifiedName')

// const reader = new FileReader()

// reader.readAsText(YeswareCodeTestData.txt)

// console.log(reader)

// function uniqueCount(){
//     let ul, li;

// }


function previewFile() {
 
  const content = document.querySelector('.content');
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

    let actorName = rawData.split(/\n/ )
    
    let arrayofNames = Object.values(actorName)

    for( let i = 0; i < arrayofNames.length; i++) {

      if(arrayofNames[i][0] !== " "){
        onlyNames.push(arrayofNames[i])
        let sn = arrayofNames[i].split('--')[0]
        cleanActorList.push(sn.trim())
      }
      
    }

    uniqueFullNames(cleanActorList);
    
    buildNameObject(cleanActorList);
    
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
    let detailedList = []

    for(let i = 0; i < cleanActorList.length; i++){
      let actorName = {}
      let splitName= cleanActorList[i].split(',')
      
      actorName.lastName = splitName[0]
      actorName.firstName = splitName[1]
      detailedList.push(actorName)
    }
    
    UniqueLastName(detailedList)
    UniqueFirstName(detailedList)
    topTenLName(detailedList)

  }


  function UniqueLastName(detailedList){
    var counts = new Set();

    for (let i = 0; i < detailedList.length; i++){
      if(detailedList[i].lastName !== ""){
        counts.add(detailedList[i].lastName);
      }
    }

    console.log(counts.size)
    let result = counts.size;
    uniqueCountLastName.innerText = `The unique count of last names is: ${result} `  

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

  

  console.log("Here is a list of Counts" , counts)

  sortedList.sort(function (b, a){
    return a[1] - b[1];
  })
  console.log("Here is a list of sortedList" , sortedList)

  }
