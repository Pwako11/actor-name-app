var cleanActorList;

let element = document.createElement('div')
document.body.appendChild(element)

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

    for( const name in arrayofNames) {
        console.log(`${name}: ${arrayofNames}`)
    }

    console.log( "what kind of data is ArrayofName", arrayofNames);

    console.log( "what kind of data is ArrayofName", typeof arrayofNames);
    // cleanActorList = actorName.trim() 

    // console.log("CleanList --->>>", cleanActorList)
  }
  