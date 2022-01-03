var cleanActorList = [];
var onlyNames = [];
var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)" )

let element = document.createElement('div')
document.body.appendChild(element)

let myArray = ["dogs", "have", "the", "best", "life"]

console.log("What type of data is myArray", typeof myArray)
console.log("What type of data is myArray", myArray)

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
      // this will then display a text file
        downloaded = reader.result;
        content.innerText = downloaded;
        editList(downloaded)
    }, false);
  
    if (file) {
      reader.readAsText(file);
    }

    
  }


  function editList(colomani){

    console.log("what kind of data is this", typeof colomani)
    const uniqueCountFullName = document.querySelector('.uniqueCountFullName');
    const uniqueCountLastName = document.querySelector('.uniqueCountLastName');
    const uniqueCountFirstName = document.querySelector('.uniqueCountFirstName');
    const topTenLastName = document.querySelector('.topTenLastName');
    const topTenFirstName = document.querySelector('.topTenFirstName');
    const topSpecialUniqueName = document.querySelector('.topSpecialUniqueName'); 
    const topModifiedName = document.querySelector('.topModifiedName')

    let actorName = colomani.split(/\n/ )
    
    let arrayofNames = Object.values(actorName)

    for( let i = 0; i < arrayofNames.length; i++) {

      if(arrayofNames[i][0] !== " "){
        onlyNames.push(arrayofNames[i])
        let sn = arrayofNames[i].split('--')[0]
        cleanActorList.push(sn.trim())
      }
      
    }
    
    uniqueFullName(cleanActorList)
    
  }
  
  function uniqueFullName(cleanActorList) {
    for(let i = 0; i < cleanActorList.length; i++){
      console.log(cleanActorList[i])
    }
  }