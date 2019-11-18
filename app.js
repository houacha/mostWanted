"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/
// app is the function called to start the entire application
function app(people) {
	let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
	let searchResults;
	switch (searchType) {
		case 'yes':
			searchResults = searchByName(people);
			break;
		case 'no':
			promptFor("Do you know the traits of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
			break;
		default:
			app(people); // restart app
			break;
	}

	let filterResutl = people.filter(function (person) {
		if (person.eyeColor == "Green") {
			return true;
		} else {
			return false;
		}
	})

	// Call the mainMenu function ONLY after you find the SINGLE person you are looking for
	mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {

	/* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

	if (!person) {
		alert("Could not find that individual.");
		return app(people); // restart
	}
	// let searchPerson = person.firstName + " " + person.lastName;
	let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

	switch (displayOption) {
		case "info":
			displayPerson(person);
			// TODO: get person's info
			break;
		case "family":
			displayPeople(person, people);
			let response = promptFor("Would you like to look up other info? Enter 'yes' or 'no':", yesNo).toLowerCase();
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
			let answer = promptFor("Would you like to look up other info? Enter 'yes' or 'no':", yesNo).toLowerCase();
			switch (answer) {
				case 'yes':
					mainMenu(person, people);
					break;
				case 'no':
					break;
			}
			// TODO: get person's descendants
			break;
		case "restart":
			app(people); // restart
			break;
		case "quit":
			return; // stop execution
		default:
			mainMenu(person, people); // ask again
	}
}

function searchByTraits(people) {

}

//Finds the descendants of current person

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

	//ask the user to either continue the search for other children or go back to main menu if no kids were found

	else {
		if (iterate > 0) {
			alert("No descendants were found for " + parent.firstName + " " + parent.lastName + ". Continue with the next person.");
		}
		else {
			let continueSearch = promptFor("No descendants were found for " + parent.firstName + " " + parent.lastName + ". Would you like to go back? Enter 'yes' or 'no'", yesNo).toLowerCase();
			switch (continueSearch) {
				case 'yes':
					break;
				case 'no':
					alert("This person has no siblings. Go back to previous menu.")
					break;
				default:
					alert("Invalid response. Go back to previous menu.")
					break;
			}
		}
	}
}

function searchByName(people) {
	let firstName = promptFor("What is the person's first name?", chars).toLowerCase();
	let lastName = promptFor("What is the person's last name?", chars).toLowerCase();

	let foundPerson = people.filter(function (person) {
		if (person.firstName.toLowerCase() == firstName && person.lastName.toLowerCase() == lastName) {
			return true;
		}
		else {
			return false;
		}
	});
	// TODO: find the person using the name they entered
	return foundPerson[0];
}

// alerts a list of people
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
	// print all of the information about a person:
	// height, weight, age, name, occupation, eye color.
	let personInfo = "First Name: " + person.firstName + "\n";
	personInfo += "Last Name: " + person.lastName + "\n";
	personInfo += "ID: " + person.id + "\n";
	personInfo += "Gender: " + person.gender + "\n";
	personInfo += "D.O.B: " + person.dob + "\n";
	personInfo += "Height: " + person.height + "\n";
	personInfo += "Weight: " + person.weight + "\n";
	personInfo += "Eye Color: " + person.eyeColor + "\n";
	personInfo += "Occupation: " + person.occupation;
	// TODO: finish getting the rest of the information to display
	alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid) {
	do {
		var response = prompt(question).trim();
	} while (!response || !valid(response));
	return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input) {
	return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input) {
	return true; // default validation only
}
