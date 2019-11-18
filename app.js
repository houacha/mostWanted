"use strict"
//--------------------------------------------------------------------CLASS DECLARATION______________________________________________________________
class peoples { 
  id = ""; 
  firstName = ""; 
  lastName = "";
  dob = "";
  height = 0;
  weight = 0; 
  eyeColor = "";
  occupation = "";
  parents = [];
  currentSpouse = 0; 

  constructor(id, firstName, lastName, dob, height, weight, eyeColor, occupation, parents, currentSpouse){ 
    this.id = id; 
    this.firstName = firstName; 
    this.lastName = lastName; 
    this.dob = dob; 
    this.height = height; 
    this.weight = weight; 
    this.eyeColor = eyeColor; 
    this.occupation = occupation; 
    this.parents = parents; 
    this.currentSpouse = currentSpouse; 
  }

}
//____________________________________________________________________FUNCTION DECLARATIONS__________________________________________________________
function makeFirstLetterCapital(input) {
  input = input.charAt(0).toUpperCase() + input.slice(1);
  return input; 
}
function checkIfArrayAlready(arr, input){ 
  //returns true if the number is not present in array. Returns false if else. 
  let returnval = true; 
  for(let i = 0; i < arr.length; i++){ 
    if(arr[i] == input){ 
      alert("Input already exists in array. Please reenter input.")
      returnval = false;
    } 
    if(returnval == false) { 
      return false; 
    } else { 
      return true;
    }
  }


}
function descendant(parent, people, searchPerson, iterate) {
	let descendantsArray = [];
	let children = ""
	iterate
	let foundDescendant = people.filter(function (person) {
		for (let j = 0; j < person.parents.length; j++) {
			if (person.parents[j] == parent.id) {
				return true;
			}
			else {
				return false;
			}
		}
	});

	//make sure that the returned array only has people in it

	for (let k = 0; k < foundDescendant.length; k++) {
		if (foundDescendant[k] == undefined) {
			foundDescendant.slice(k, k + 1);
		}
		else {
			descendantsArray.push(foundDescendant[k]);
		}
	}

	//checks to see if any kids were returned and shows the kids if there were any

	if (descendantsArray.length > 0) {
		for (let i = 0; i < descendantsArray.length; i++) {
			children = children + descendantsArray[i].firstName + " " + descendantsArray[i].lastName + "\n";
		}
		alert("These are the children of " + parent.firstName + " " + parent.lastName + ":" + "\n" + children);

		//finds the descendants of the descendants if the user wants to

		let grandKidSearch = promptFor("Would you like to know their children? Enter 'yes' or 'no'", yesNo).toLowerCase();
		switch (grandKidSearch) {
			case 'yes':
				for (let l = 0; l < descendantsArray.length; l++) {
					descendant(descendantsArray[l], people, searchPerson, 1);
				}
				break;
			default:
				break;
		}
	}
}
function checkCountHighEnough(count) { 
  if (count < 2) { 
    alert("Not enough traits selected to quit. Minimum is 2. Your total so far: " + count);
    return false; 
  } else { 
    return true;
  }
}
function getTraitsFromUser(choicesCount, traitSearch, cont, choicesArr){ 
  //choices menu - stores choices in array for identification, then array is accessed for user to provide information 
  while(choicesCount < 5){ 
    //first check if prompted entry is inside array
    while(cont == true) { 
      traitSearch = prompt("Pick a single trait from: \n 1. gender     2. eye color\n 3. height      4. weight\n 5. Occupation\n You will be asked for more information if you are able to provide it. Reqd: 2 search criterion.");
      if (checkIfArrayAlready(choicesArr, traitSearch) == false){
        alert("Value alread in array. Please enter again.")
      } else { 
        cont = false;
      }
    }
    //now we've validated it doesnt exist inside array. reset continueand  add it to array and incrememnt choice number 
    cont = true;
    choicesArr.push(traitSearch);
    choicesCount++;      
    //ask if they'd like to go again, and validate if the counter is high enough for them to quit if they so choose
    while(cont == true) {
      traitSearch = prompt("Would you like to choose again? enter 'yes' to pick another trait."); 
      if(traitSearch == 'yes'){ 
        break;
      } else { 
        if(checkCountHighEnough(choicesCount) == false){ 
          cont = true;
        } else { 
          choicesCount += 5;
          cont = false;
        }        
      }
    }
  }     
}
function evalTraitsFromUser(choicesArr, caseChoice, choice, evaluatedChoicesArr){
  //now iterate through array and ask about entered values 
    //go through and ask about each 
    for(let i = 0; i < choicesArr.length; i++){ 
      if(choicesArr[i] == "1"){ //gender
        while(caseChoice != "male" && caseChoice != "female") { 
          caseChoice = prompt("You have selected gender: Enter 'male' or 'female'");
        }                
      } else if (choicesArr[i] == "2"){ //eyeColor
        while(caseChoice != "brown" && caseChoice != "black" && caseChoice != "hazel" && caseChoice != "blue" && caseChoice != "green") { 
          caseChoice = prompt("You have selected eye color.\nValid Eye Colors:\nBrown\nBlack\nHazel\nBlue\nGreen\n Type choice");
        }        
      } else if (choicesArr[i] == "3"){ //height
        choice = -1;
        while (choice < 0 || choice > 90){
          choice = prompt("You have selected height. Please enter valid height in inches:");
          caseChoice = choice;
        }
      } else if (choicesArr[i] == "4"){ //weight
        choice = -1;
        while (choice < 0 || choice > 500){
          choice = prompt("You have selected weight. Please enter valid weight in lbs:");
          caseChoice = choice; 
        }
      } else if (choicesArr[i] == "5"){ //occupation` 1 
        while(caseChoice != "student" && caseChoice != "architect" && caseChoice != "doctor" && caseChoice != "assistant" && caseChoice != "nurse" && caseChoice != "landscaper" && caseChoice != "programmer"){ 
          caseChoice = prompt("You have selected Occupation.\nValid Occupations:\n Enter doctor, student, assistant, nurse, landscaper, or programmer");
        }        
      }
      evaluatedChoicesArr.push(caseChoice);
    }


}
function printChoices(evaluatedChoicesArr, arr){
  //iterate through array 
  for (let j = 0; j < evaluatedChoicesArr.length; j++){ 
    arr += evaluatedChoicesArr[j] + " ";
  }
  alert("Choices: " + evaluatedChoicesArr.toString());
}
function displayInfo(person){ 
  alert(person.id + " is " + person.firstName + " " + person.lastName + "'s ID.\n " + person.firstName + " " + person.lastName + "'s gender is: " + person.gender + ". \n DOB: " + person.dob + " Height: " + person.height + " Weight: " + person.weight + "\nEye Color: " + person.eyeColor + " Occupation: " + person.occupation);

}
function assignPeopleValues(p1, evaluatedChoicesArr){ 
  for (let j = 0; j < evaluatedChoicesArr.length; j++){//iterate through array 
    if((evaluatedChoicesArr[j] == "brown") || (evaluatedChoicesArr[j] == "black") || (evaluatedChoicesArr[j] == "hazel") || (evaluatedChoicesArr[j] == "blue") || (evaluatedChoicesArr[j] == "green")){ //if array is equal to any of the eye colors
      p1.eyeColor = evaluatedChoicesArr[j];
    } else if ((evaluatedChoicesArr[j] == "architect") || (evaluatedChoicesArr[j] == "student") || (evaluatedChoicesArr[j] == "doctor") || (evaluatedChoicesArr[j] == "assistant") || (evaluatedChoicesArr[j] == "politician") || (evaluatedChoicesArr[j] == "nurse") || (evaluatedChoicesArr[j] == "landscaper") || (evaluatedChoicesArr[j] == "programmer")){
      p1.occupation = evaluatedChoicesArr[j];
    } else if ((evaluatedChoicesArr[j] == "male") || (evaluatedChoicesArr[j] == "female")){
      p1.gender = evaluatedChoicesArr[j];
    } else if ((evaluatedChoicesArr[j] < 90)){ //height
      p1.height = evaluatedChoicesArr[j];
    } else if((evaluatedChoicesArr[j] < 500)){ //weight
      p1.weight = evaluatedChoicesArr[j];
    }  
  }
}
function searchBasedOffProperties(p1, people, evaluatedChoicesArr){ 
  let counter = 0; //if counter hits 2 or more we have a match and can return the searched for person
  let testArr = [];
  let foundPerson = people.filter(function(person){
    counter = 0;
    if(person.eyeColor == p1.eyeColor){ 
      counter++; 
    }
    if(person.occupation == p1.occupation) { 
      counter++; 
    }
    if(person.height == p1.height){ 
      counter++; 
    }
    if(person.weight == p1.weight){ 
      counter++; 
    }
    if(person.gender == p1.gender){ 
      counter++; 
    }
    if(counter == evaluatedChoicesArr.length) { 
      testArr.push(person); 
      return true; 
    } else { 
      return false;
    }
  });

  if(foundPerson[0]){ 
    alert("I've found " + foundPerson[0].firstName + " " + foundPerson[0].lastName); 
    return foundPerson[0];
  } 

}
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  let cont = true;
  let choicesArr = [];
  let choicesCount = 0;
  let traitSearch;
  let choice = ""; 
  let caseChoice = '';
  let evaluatedChoicesArr = [];
  let arr = [];
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);

      break;
    case 'no':
    //stores traits user wishes to sort by into an array.
    getTraitsFromUser(choicesCount, traitSearch, cont, choicesArr);
    evalTraitsFromUser(choicesArr, caseChoice, choice, evaluatedChoicesArr);
    printChoices(evaluatedChoicesArr, arr);
    let p1 = new peoples(0,"","","",0,0,"","",[],"");
    assignPeopleValues(p1, evaluatedChoicesArr, choicesCount); //set all properties defined by user to properties of p1. 
    searchResults = searchBasedOffProperties(p1, people, evaluatedChoicesArr); 
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people); //searchresults is the object of the person we found, people is the whole array
}
function mainMenu(person, people){
  let response;
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  switch(displayOption){
    case "info":
      displayInfo(person);
      response = promptFor("Would you like to look up other info? Enter 'yes' or 'no':", yesNo).toLowerCase();
			switch (response) {
				case 'yes':
					mainMenu(person, people);
					break;
				case 'no':
          break;
      }
    break;
    case "family":
        displayPeople(person, people);
        response = promptFor("Would you like to look up other info? Enter 'yes' or 'no':", yesNo).toLowerCase();
        switch (response) {
          case 'yes':
            mainMenu(person, people);
            break;
          case 'no':
            break;
        }
        // TODO: get person's family
        break;
    case "descendants":
      descendant(person, people, person);
      response = promptFor("Would you like to look up other info? Enter 'yes' or 'no':", yesNo).toLowerCase();
			switch (response) {
				case 'yes':
					mainMenu(person, people);
					break;
				case 'no':
          break;
      }
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}
function searchForFam(people, familyID){ 
  if(familyID == false){ 
    return "no other family";
  }
  let foundFamily = people.filter(function(person){
    if(person.id == familyID){      
      return true;      
    }
    else{
      return false;
    }
  });

  if(foundFamily[0]){
      return (foundFamily[0].firstName + " " + foundFamily[0].lastName); //returns the onbject stored in the foundperson filtered array, which only contains 1 object anyway
  } else { 
    return "no family";
  }
}
function searchForSiblings(people, person){ 
let kidsArr = [];
let siblings = people.filter(function(el){
  if(person.parents[0] == el.parents[0] || person.parents[1] == el.parents[1]){
    if(el.firstName == person.firstName){ 
    } else { 
    kidsArr = kidsArr + el.firstName + " " + el.lastName + ", "  
    }    
  }
});

return kidsArr.toString();
}
function searchForSpouse(people, familyID){ 
  let foundFamily = people.filter(function(person){
    if(person.id == familyID){      
      return true;      
    }
    else{
      return false;
    }
  });
  
  if(foundFamily[0]){
    return (foundFamily[0].firstName + " " + foundFamily[0].lastName); //returns the onbject stored in the foundperson filtered array, which only contains 1 object anyway
    } else { 
      return "no family"
    }  
}
function searchByName(people){
  let firstName = makeFirstLetterCapital(promptFor("What is the person's first name?", chars));
  let lastName = makeFirstLetterCapital(promptFor("What is the person's last name?", chars));
  let foundPerson = people.filter(function(person){
    if(person.firstName == firstName && person.lastName == lastName){      
      return true;      
    }
    else{
      //this iterates through all of list so dont include below alert for test. It will also always trigger
      //alert("searchByName returned false");
      return false;
    }
  });
  // TODO: find the person using the name they entered
  return foundPerson[0]; //returns the onbject stored in the foundperson filtered array, which only contains 1 object anyway
}
function displayPeople(currentPerson, people) {
	let newFamilyArray = [];
	let family = people.map(function (person) {
		if (person.id == currentPerson.currentSpouse) {
			return "Current spouse: " + person.firstName + " " + person.lastName + "\n";
		}
		else if (person.id == currentPerson.parents[0] || person.id == currentPerson.parents[1]) {
			return "Parents: " + person.firstName + " " + person.lastName + "\n";
		}
	})
	for (let j = 0; j < people.length; j++) {
		for (let k = 0; k < people[j].parents.length; k++) {
			if (people[j].id == currentPerson.id) {
			}
			else if (people[j].parents.length < 1) {
			}
			else if (currentPerson.parents[k] == people[j].parents[k] || currentPerson.parents[k] == people[j].parents[k + 1] || currentPerson.parents[k + 1] == people[j].parents[k]) {
				if (currentPerson.parents[k] == people[j].parents[k + 1] && people[j].parents[k + 1] == undefined) {
				}
				else {
					k++
					newFamilyArray.push("Siblings: " + people[j].firstName + " " + people[j].lastName + "\n");
				}
			}

		}
	}
	for (let i = 0; i < family.length; i++) {
		if (family[i] == undefined) {
		}
		else {
			newFamilyArray.push(family[i]);
		}
	}
	alert(newFamilyArray.join(""));
}
function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}
function chars(input){
  return true; // default validation only
}
