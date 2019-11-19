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

  constructor(id, firstName, lastName, dob, height, weight, eyeColor, occupation, parents, currentSpouse) {
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
function checkIfArrayAlready(arr, input) {
  let returnval = true;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == input) {
      alert("Input already exists in array. Please reenter input.")
      returnval = false;
    }
    if (returnval == false) {
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
  for (let k = 0; k < foundDescendant.length; k++) {
    if (foundDescendant[k] == undefined) {
      foundDescendant.slice(k, k + 1);
    }
    else {
      descendantsArray.push(foundDescendant[k]);
    }
  }
  if (descendantsArray.length > 0) {
    for (let i = 0; i < descendantsArray.length; i++) {
      children = children + descendantsArray[i].firstName + " " + descendantsArray[i].lastName + "\n";
    }
    alert("These are the children of " + parent.firstName + " " + parent.lastName + ":" + "\n" + children);
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
  else {
    alert("This person has no descendants.");
  }
}
function getTraitsFromUser(choicesCount, traitSearch, cont, choicesArr) {
  while (choicesCount < 5) {
    while (cont == true) {
      traitSearch = prompt("Pick a single trait from: \n 1. gender     2. eye color\n 3. height      4. weight\n 5. Occupation\n You will be asked for more information if you are able to provide it.").toLowerCase();
      while (traitSearch !="1" && traitSearch !="2" && traitSearch !="3" && traitSearch !="4" && traitSearch !="5" && traitSearch !="gender" && traitSearch !="eye color" && traitSearch !="height" && traitSearch !="weight" && traitSearch !="occupation"){
        traitSearch = prompt("Pick a single trait from: \n 1. gender     2. eye color\n 3. height      4. weight\n 5. Occupation\n You will be asked for more information if you are able to provide it.").toLowerCase();
      }
      if (checkIfArrayAlready(choicesArr, traitSearch) == false) {
        alert("Value alread in array. Please enter again.")
      } else {
        cont = false;
      }
    }
    cont = true;
    choicesArr.push(traitSearch);
    choicesCount++;
    while (cont == true) {
      traitSearch = promptFor("Would you like to choose again? enter 'yes' to pick another trait.", yesNo).toLowerCase();
      if (traitSearch == 'yes') {
        break;
      } else {
          choicesCount += 5;
          cont = false;
      }
    }
  }
}
function evalTraitsFromUser(choicesArr, caseChoice, choice, evaluatedChoicesArr) {
  for (let i = 0; i < choicesArr.length; i++) {
    if (choicesArr[i] == "1") {
      while (caseChoice != "male" && caseChoice != "female") {
        caseChoice = prompt("You have selected gender: Enter 'male' or 'female'");
      }
    } else if (choicesArr[i] == "2") {
      while (caseChoice != "brown" && caseChoice != "black" && caseChoice != "hazel" && caseChoice != "blue" && caseChoice != "green") {
        caseChoice = prompt("You have selected eye color.\nValid Eye Colors:\nBrown\nBlack\nHazel\nBlue\nGreen\n Type choice");
      }
    } else if (choicesArr[i] == "3") {
      choice = -1;
      while (choice < 0 || choice > 90) {
        choice = prompt("You have selected height. Please enter valid height in inches:");
        caseChoice = choice;
      }
    } else if (choicesArr[i] == "4") {
      choice = -1;
      while (choice < 0 || choice > 500) {
        choice = prompt("You have selected weight. Please enter valid weight in lbs:");
        caseChoice = choice;
      }
    } else if (choicesArr[i] == "5") {
      while (caseChoice != "student" && caseChoice != "architect" && caseChoice != "doctor" && caseChoice != "assistant" && caseChoice != "nurse" && caseChoice != "landscaper" && caseChoice != "programmer") {
        caseChoice = prompt("You have selected Occupation.\nValid Occupations:\n Enter doctor, student, assistant, nurse, landscaper, or programmer");
      }
    }
    evaluatedChoicesArr.push(caseChoice);
  }
}
function printChoices(evaluatedChoicesArr, arr) {
  for (let j = 0; j < evaluatedChoicesArr.length; j++) {
    arr += evaluatedChoicesArr[j] + " ";
  }
  alert("Choices: " + evaluatedChoicesArr.toString());
}
function displayInfo(person) {
  alert(person.id + " is " + person.firstName + " " + person.lastName + "'s ID.\n " + person.firstName + " " + person.lastName + "'s gender is: " + person.gender + ". \n DOB: " + person.dob + " Height: " + person.height + " Weight: " + person.weight + "\nEye Color: " + person.eyeColor + " Occupation: " + person.occupation);

}
function assignPeopleValues(p1, evaluatedChoicesArr) {
  for (let j = 0; j < evaluatedChoicesArr.length; j++) {
    if ((evaluatedChoicesArr[j] == "brown") || (evaluatedChoicesArr[j] == "black") || (evaluatedChoicesArr[j] == "hazel") || (evaluatedChoicesArr[j] == "blue") || (evaluatedChoicesArr[j] == "green")) { //if array is equal to any of the eye colors
      p1.eyeColor = evaluatedChoicesArr[j];
    } else if ((evaluatedChoicesArr[j] == "architect") || (evaluatedChoicesArr[j] == "student") || (evaluatedChoicesArr[j] == "doctor") || (evaluatedChoicesArr[j] == "assistant") || (evaluatedChoicesArr[j] == "politician") || (evaluatedChoicesArr[j] == "nurse") || (evaluatedChoicesArr[j] == "landscaper") || (evaluatedChoicesArr[j] == "programmer")) {
      p1.occupation = evaluatedChoicesArr[j];
    } else if ((evaluatedChoicesArr[j] == "male") || (evaluatedChoicesArr[j] == "female")) {
      p1.gender = evaluatedChoicesArr[j];
    } else if ((evaluatedChoicesArr[j] < 90)) {
      p1.height = evaluatedChoicesArr[j];
    } else if ((evaluatedChoicesArr[j] < 500)) {
      p1.weight = evaluatedChoicesArr[j];
    }
  }
}
function searchBasedOffProperties(p1, people, evaluatedChoicesArr) {
  let counter = 0;
  let testArr = [];
  let foundPerson = people.filter(function (person) {
    counter = 0;
    if (person.eyeColor == p1.eyeColor) {
      counter++;
    }
    if (person.occupation == p1.occupation) {
      counter++;
    }
    if (person.height == p1.height) {
      counter++;
    }
    if (person.weight == p1.weight) {
      counter++;
    }
    if (person.gender == p1.gender) {
      counter++;
    }
    if (counter == evaluatedChoicesArr.length) {

      return true;
    } else {
      return false;
    }
  });
  if (foundPerson.length < 1) {
    alert("No people were found from the attributes.")
  }
  else if (foundPerson.length == 1){
    return foundPerson[0];
  }
  else {
    for (let i = 0; i < foundPerson.length; i++) {
      testArr.push(foundPerson[i].firstName + " " + foundPerson[i].lastName + "\n");
    }
    alert("People found:" + "\n" + testArr.join(""));
    return foundPerson;
  }
}
function app(people) {
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
  switch (searchType) {
    case 'yes':
      searchResults = searchByName(people);

      break;
    case 'no':
      getTraitsFromUser(choicesCount, traitSearch, cont, choicesArr);
      evalTraitsFromUser(choicesArr, caseChoice, choice, evaluatedChoicesArr);
      printChoices(evaluatedChoicesArr, arr);
      let p1 = new peoples(0, "", "", "", 0, 0, "", "", [], "");
      assignPeopleValues(p1, evaluatedChoicesArr, choicesCount); 
      searchResults = searchBasedOffProperties(p1, people, evaluatedChoicesArr);
      break;
    default:
      app(people);
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people); //searchresults is the object of the person we found, people is the whole array
}
function mainMenu(person, people) {
  let response;
  if (Array.isArray(person)){
    alert("Cannot continue search with a list of people. Start over with a single person");
    return app(people);
  }
  else if (!person) {
    alert("Could not find that individual.");
    return app(people);
  }
  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  switch (displayOption) {
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
      app(people);
      break;
    case "quit":
      return;
    default:
      return mainMenu(person, people);
  }
}
function searchByName(people) {
  let firstName = makeFirstLetterCapital(promptFor("What is the person's first name?", chars));
  let lastName = makeFirstLetterCapital(promptFor("What is the person's last name?", chars));
  let foundPerson = people.filter(function (person) {
    if (person.firstName == firstName && person.lastName == lastName) {
      return true;
    }
    else {
      return false;
    }
  });
  return foundPerson[0];
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
function displayPerson(person) {
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  alert(personInfo);
}
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}
function chars(input) {
  return true;
}
