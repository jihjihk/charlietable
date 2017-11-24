//we still haven't decided on a database scheme, so this is to set out the matching algorithms given a certain format of data
//	More specifically, I'm assuming that for each person, we have a separate "preference" object that lists out the
//  types of preferences and values as was pointed out before hand. 
//  Furthermore, each person has an object called "weightPreference", which will work as a correlation
//  to determine how much each of the preferences have an impact on the user's satisfaction

/*

This following code works as following, to render to a single individual events that are of high-relevance.

High-relevance is determined as following.
1. We first divide out events that do not satisfy the current user's highest preference weight, or the current user's
info doesn't satisfy the preference weights of the previous users.

(i.e.) if a user A feels very strongly about dining with same-gender users, then events with male participants should be pushed
to non-priority. && if A is placed inside an event, a user B that is of different gender than user A should not see this event 
as a priority, as it would violate the priority condition of the user A.

-> even with this, there would be cases where user's biggest priorities are not met. We should consider
giving users an option to "opt-out"? 

2. Having rid of the extreme cases, match preference score is generated as the following:


User's matchscore to a particular event 

 =  Sigma( each of the preference's score generation calculation * associated preferenceWeight ) / Number of Match Types

Each preference's score generation is calculated within the range of 0 ~ 100, although through each's unique criteria.

Some criteria, such as language, genderPreference, generalInterence, hobby, job_industry, religion will need to be calibrated 
according to the other users present in the group, and will also affect the matching scores of the other people within the group.

Some criteria, such as mealType, location, preferred_time, will be set and be largely individual.


**The options rendered to the user will be options that will increase the average matching score of the group.

*/

//sample user preference

var preference={
	location : "Abu Dhabi",
	age: 34,
	mealType: "dinner",
	genderPreference: "female", //can be ["female", "male", "ambivalent"]
	language: "English",
	preferred_Time: 1200, //the value is represented as the number of mintues since the day started. So 1200/60 = 20 : 8 O'clock
	generalInterest: ["painting", "jazz", "technology" ],
	hobbies:["dune-watching"],
	job_industry: ["homeMaker", "writer"],
	religion: "Islam"
};


var preferenceWeight={
	location : 100,
	age: 80,
	mealType: 90,
	gender: 100,
	language: 80,
	preferred_Time: 65, //the value is represented as the number of mintues since the day started. So 1200/60 = 20 : 8 O'clock
	generalInterest: 10,
	hobbies: 79,
	job_industry: 20,
	religion: 15
};


//BASIC CONFIGURATIONS FOR THE MATCHING ALGORITHM

const aFarTooLongDistance = 300; //in kms
const aFarTooLongTime = 12000; //in miliseconds, currently representing 20 minutes




/*
	From each user object, I expect

	var user = {

		name : John Doe 
		baseLocation : "somewhere"
		gender : Male | Female | Other
		preferenceObj : {a preference object}
		preferenceWeight: {a preference weight object}
		
	}

	From each event object, I expect

	var event = {

		name : eventName
		location: restaurant/coffee-shop/etc (Geo-Coordinate?)
		startTime: number in terms of the getTime() (milliseconds since January 1, 1970)
		//not sure if we should have a duration/ end time?
		currentAttendee: [ a list of user objects ]
		currentMatchingScoreAvg: floatValue	  //indicates the match average score before the user joins
		potentialMatchingScoreAvg: floatValue //indicates the match average score after the user joins
	
	}

*/






//filter By Time
function isInGoodTime(userDate, eventDate){

	return Math.abs(userDate.getTime() - eventDate.getTime()) < aFarTooLongTime;

}



//calculate the crow flies distance. 
function getDistance( geoCoord1, geoCoord2) {
  var earthRadius = 6371; 
  var degreeLatitude = (geoCoord2.lat-geoCoord1.lat) * (Math.Pi/180) ;  
  var degreeLongitude = (geoCoord2.lon-geoCoord1.lon) * (Math.Pi/180) ; 

  var crowFlies = 
    Math.sin(degreeLatitude/2) * Math.sin(degreeLatitude/2) +
    Math.cos( geoCoord1.lat * Math.Pi/180 ) * Math.cos( geoCoord2.lat * Math.Pi/180  ) * 
    Math.sin(degreeLongitude/2) * Math.sin(degreeLongitude/2); 
  var distance = R * 2 * Math.atan2(Math.sqrt(crowFlies), Math.sqrt(1-crowFlies));
  return distance;

}

function wayTooFar(geoCoord1, geoCoord2){

	return getDistance(geoCoord1, geoCoord2) > aFarTooLongDistance;

}


//filter By User Preferences

function userFilter(queryingUser, event ){

	//we will discuss and specify what exactly are the fields that the users can be filtered out based on.

	return true;


}







function sortEvents(event1, event2){

	//if the difference is not that big, we will return the one on which the user is having a positive influence on
	if( Math.abs( event1.potentialMatchingScoreAvg - event2.potentialMatchingScoreAvg ) < 3 ){

		return (event1.potentialMatchingScoreAvg - event1.currentMatchingScoreAvg ) > (event2.potentialMatchingScoreAvg - event2.currentMatchingScoreAvg ) ? event1: event2;

	}
	//else we return the one that will make the night best.
	return event1.potentialMatchingScoreAvg > event2.potentialMatchingScoreAvg ? event1: event2;


}



function returnMatchingEvents(currentUser, userTimeSelection, userLocationSelection, eventsTakingPlace, numMatchesRequired){


	var feasibleEvents = [];
	var userLocation = currentUser.baseLocation;

	//basic filter by time, distance and non-negotiable filters that the users of the events are giving. 
	for(var i=0; i<eventsTakingPlace.length; i++){
 
		if ( isInGoodTime(userTimeSelection, eventsTakingPlace[i].startTime) && ! wayTooFar(localEvents, eventsTakingPlace[i] )  &&  userFilter(currentUser, eventsTakingPlace[i]) ){

			feasibleEvents.append(eventsTakingPlace[i]);

		}

	}


	if(numMatchesRequired >= feasibleEvents.length){

		//we could throw an error here, but let's just return all the events available.
		return feasibleEvents;

	}



	//calculate matching scores of each events.
	for(var j=0; j<feasibleEvents.length; j++){

		calculateMatchingScore(localEvents[j], currentUser);

	}

	//sort events by user's matching scores & other considerations
	feasibleEvents.sort(sortEvents);


	return feasibleEvents.splice(0, numMatchesRequired > feasibleEvents.length ? numMatchesRequired : feasibleEvents.length);


}












