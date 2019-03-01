/* eslint-disable  func-names */
/* eslint-disable  no-console */

 const Alexa = require('ask-sdk-core');
// const Alexa = require('ask-sdk');

/*
    Function to demonstrate how to filter inSkillProduct list to get list of
    all entitled products to render Skill CX accordingly
*/

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest' 
    || request.type==='Alexa.Presentation.APL.UserEvent' && request.arguments.length > 0 && request.arguments[0]=='mainmenu';
  },
  handle(handlerInput) {
    console.log('IN LAUNCHREQUEST');
   // const locale = handlerInput.requestEnvelope.request.locale;
       const speechText = 'Welcome to the General Animal Categories skill. You can ask about a particular category from Mammals, Birds, Amphibians, Reptiles, Fishes and Bugs, to know the details! For example, to choose mammals, say "mammals" or say "tell me about mammals"! So what do you want to say? ';
         const speechTextAPL = 'Welcome to the General Animal Categories skill. You can either press a particular category that is displayed on the screen. You can also ask about a particular category from Mammals, Birds, Amphibians, Reptiles, Fishes and Bugs, to know the details! For example, to choose mammals, say "mammals" or say "tell me about mammals"! So what do you want to say? ';
        if (supportsAPL(handlerInput)) {  
          return handlerInput.responseBuilder
          .speak('Welcome to the General Animal Categories skill. You can either press a particular category that is displayed on the screen. You can also ask about a particuler category from Mammals, Birds, Amphibians, Reptiles, Fishes and Bugs, to know the details! For example, to choose mammals, say "mammals" or say "tell me about mammals"! So what do you want to say? ')
          .reprompt('I didn\'t catch that. What did you say?')
          .withSimpleCard('Animal Categories', speechTextAPL)
          .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./homepage.json'),
           datasources: {
             "launchTemplateData": {
                "type": "object",
                "objectId": "launchkaraoke",
                "properties": {
                    "launchSsml": "<speak>" + speechText + "</speak>",
                    "hintString" : " 'Mammals' or 'Reptiles' or 'Bugs' or 'Birds' !"
                },
                "transformers": [
                    {
                        "inputPath": "hintString",
                        "transformer": "textToHint"
                    }
                ]
            }
            
           }
          })
          .getResponse();
        }
        else
        {
        return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard('Animal Categories', speechText)
        .getResponse();
        }
  },
}; // End LaunchRequestHandler

  

const MammalIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'MammalIntent' 
      || request.type==='Alexa.Presentation.APL.UserEvent' && request.arguments.length > 0 && request.arguments[0]=='mammals';
  },
  handle(handlerInput) {
    const speechText = 'Mammals have a back bone and they nourish their young with milk from special mammary glands. Mammals usually have hair and their lower jaw is hinged directly to the skull. Few examples of mammals are an Elephant, Cheetah, Gorilla and Whale. '
     const speechText1 = "Do you want to know about an Elephant or Gorilla or Whale or a Cheetah? Say 'Elephant' or 'Gorilla' or 'Whale' or 'Cheetah', or say 'animal categories' to go back to the main menu or say stop. "
    if (supportsAPL(handlerInput)) { 
      return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText1)
      .withSimpleCard('Mammals - Animal Categories', speechText)
      .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          token:'mammalToken',
          version:'1.0',
          document: require('./mammals.json'),
          datasources: {
            "MammalTemplateData": {
                "type": "object",
                "objectId": "Mammalkaraoke",
                "properties": {
                    "mammalSsml": "<speak>" + speechText + "</speak>",
                    "hintString" : " 'Elephant' or 'Gorilla' or 'Whale' or 'Cheetah' !"
                },
                "transformers": [
                    {
                        "inputPath": "hintString",
                        "transformer": "textToHint"
                    }
                ]
            }
            
            
          }
      })
      // slide show of the page
      .addDirective({
        type: 'Alexa.Presentation.APL.ExecuteCommands',
        token: 'mammalToken',
        commands: [
          {
            type: 'AutoPage',
            componentId: 'pagerComponentId',
            "duration": 1000
          }
        //  return handlerInput.responseBuilder
        ]
      })

      // end of slide show
      .getResponse();
    }
    else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
  },
};

const BirdsIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'BirdsIntent'
          || request.type==='Alexa.Presentation.APL.UserEvent' && request.arguments.length > 0 && request.arguments[0]=='birds';
  },
  handle(handlerInput) {
    const speechText = "Birds have a warm blooded metabolism and a toothless beak. Birds lay hard-shelled eggs. Birds have wings, which evolved from their forelimbs. This gave most of the birds an ability to fly. They have a keen eyesight but their sense of smell is not highly developed. They are usually diurnal. Few examples of birds are Cassowary, Hawk, Rhea and Hornbill. "
    const speechText1 = "Do you want to know about Cassowary or Hawk or Rhea or Hornbill? Say 'Cassowary' or 'Hawk' or 'Rhea' or 'Hornbill', or say 'animal categories' to go back to the main menu or say stop.  "
    if (supportsAPL(handlerInput))
    {
      return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText1)
      .withSimpleCard('Birds - Animal Categories', speechText)
      .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          document: require('./birds.json'),
          datasources: {
            "BirdTemplateData": {
                "type": "object",
                "objectId": "Birdkaraoke",
                "properties": {
                    "birdSsml": "<speak>" + speechText + "</speak>",
                    "hintString" : " 'Cassowary' or 'Hawk' or 'Rhea' or 'Hornbill' !"
                },
                "transformers": [
                    {
                        "inputPath": "hintString",
                        "transformer": "textToHint"
                    }
                ]
            }
            
            
          }
      })
      // slide show of the page
      .addDirective({
        type: 'Alexa.Presentation.APL.ExecuteCommands',
        token: 'pagerToken',
        commands: [
          {
            type: 'AutoPage',
            componentId: 'pagerComponentId',
            "duration": 1000
          }
        //  return handlerInput.responseBuilder

        ]
      })

      // end of slide show
      .getResponse();
    }
      else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
    
  },
};

const FishIntentHandler = {
  canHandle(handlerInput) {
     const request = handlerInput.requestEnvelope.request;
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'FishIntent'
          || request.type==='Alexa.Presentation.APL.UserEvent' && request.arguments.length > 0 && request.arguments[0]=='fishes';
    
  },
  handle(handlerInput) {
   const speechText = 'Fishes are vertebrates that have gills, fins and scales. Fishes are cold blooded and have lateral lines to detect water currents and electricity. Fishes breathe through their gills. Fishes usually lay eggs without shell under water. Few examples of fishes are Seahorse, Salmon, Shark and Manta ray. ';
    const speechText1 = "Do you want to know about Seahorse or Salmon or Shark or Manta ray? Say 'Seahorse' or 'Salmon' or 'Shark' or 'Manta ray', or say 'animal categories' to go back to the main menu or say stop. "; 
    if (supportsAPL(handlerInput))
    {
      return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText1)
      .withSimpleCard('Fishes - Animal Categories', speechText)
      .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          document: require('./fishes.json'),
          datasources: {
            "FishTemplateData": {
                "type": "object",
                "objectId": "Fishkaraoke",
                "properties": {
                    "fishSsml": "<speak>" + speechText + "</speak>",
                    "hintString" : " 'Seahorse' or 'Salmon' or 'Shark' or 'Manta ray' !"
                },
                "transformers": [
                    {
                        "inputPath": "hintString",
                        "transformer": "textToHint"
                    }
                ]
            }
          }
      })
      // slide show of the page
      .addDirective({
        type: 'Alexa.Presentation.APL.ExecuteCommands',
        token: 'pagerToken',
        commands: [
          {
            type: 'AutoPage',
            componentId: 'pagerComponentId',
            "duration": 1000
          }
        //  return handlerInput.responseBuilder

        ]
      })

      // end of slide show
      .getResponse();
    }
    else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
  },
};

const AmphibianIntentHandler = {
  canHandle(handlerInput) {
     const request = handlerInput.requestEnvelope.request;
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AmphibianIntent'  
      || request.type==='Alexa.Presentation.APL.UserEvent' && request.arguments.length > 0 && request.arguments[0]=='amphibians';
  },
  
  handle(handlerInput) {
      const speechText = 'Amphibians lead a semi-aquatic life style. The young live in water and have gills to breathe. When they enter the adult phase, they develop lungs to breathe. Amphibians have to live near water to survive. Amphibians usually have a moist skin. Few examples of Amphibians are Frog, Toad, Salamander and Newt. ';
    const speechText1 = "Do you want to know about Frog or Toad or Salamander or Newt? Say 'Frog' or 'Toad' or 'Salamander' or 'Newt', or say 'animal categories' to go back to the main menu or say stop. ";  

    if (supportsAPL(handlerInput))
    {
      return handlerInput.responseBuilder
     
      .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          document: require('./amphibians.json'),
        //  document: require('./amphibians1.json'),
          datasources: {
             "AmphiTemplateData": {
                "type": "object",
                "objectId": "Amphikaraoke",
                "properties": {
                    "AmphiSsml": "<speak>" + speechText + "</speak>",
                    "hintString" : " 'Frog' or 'Toad' or 'Salamander' or 'Newt' !"
                },
                "transformers": [
                    {
                        "inputPath": "hintString",
                        "transformer": "textToHint"
                    }
                ]
            }
        }
      })
     // slide show of the page
      .addDirective({
        type: 'Alexa.Presentation.APL.ExecuteCommands',
        token: 'pagerToken',
        commands: [
          {
            type: 'AutoPage',
            componentId: 'pagerComponentId',
            "duration": 1000
          },
       //   {
        //    type: 'SpeakItem',
       //     componentId: 'amphitext',
       //     highlightMode: 'line'
       //   }
        ]
        
        })
  
     .speak(speechText + speechText1)
    
    .reprompt(speechText  + speechText1)
    .withSimpleCard('Amphibians - Animal Categories', speechText) 
    .getResponse();
    }
    else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
  }, 
  
};

const AnimalmoreIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'animalcatmore';
  },
  
  handle(handlerInput) {
    console.log("inside amph");
    console.log("inside amph", handlerInput.requestEnvelope.request.intent.slots.animalcat.value);
    
    if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "frog" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "frogs")
    {
    const speechText = 'Frog has protruding eyes, no tail, strong and webbed hind feet that are adapted to leaping and swimming. They have smooth and a moist skin. Frog mostly lives in water but few are found living in burrows or in trees. Sedge frog  has sticky toes that help climb trees. Flying frog lives on a tree and glide 12 to 15 meters in air. '
    const speechText1 = "Do you want to know about Toad or Salamander or Newt? Say 'Toad' or 'Salamander' or 'Newt', or say 'animal categories' to go back to the main menu or say stop. "
      if (supportsAPL(handlerInput))
      {
        return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./frogs.json'),
            document: require('./frogs.json'),
            datasources: {
               
            }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
      .speak(speechText + speechText1)
      .reprompt(speechText  + speechText1)
      .withSimpleCard('Frogs - Animal Categories', speechText) 
      .getResponse();
      }
      else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
  }  // end if
  
  if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "toad" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "toads")
    {
    const speechText = 'Toad is short and fat. It has a rough skin and non webbed, long hind legs. The skin is bumpy and covered in warts. A toad has short legs and takes small hops. Some are brightly colored. A toad secretes poison from special glands that are located in the back and behind the eyes. '
    const speechText1 = "Do you want to know about Salamander or Newt or Frog ? Say 'Salamander' or 'Newt' or 'Frog', or say 'animal categories' to go back to the main menu or say stop. "
    if (supportsAPL(handlerInput))
    {
     return handlerInput.responseBuilder
      .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
        //  document: require('./toads.json'),
          document: require('./toads.json'),
          datasources: {
        }
      })
     // slide show of the page
      .addDirective({
        type: 'Alexa.Presentation.APL.ExecuteCommands',
        token: 'pagerToken',
        commands: [
          {
            type: 'AutoPage',
            componentId: 'pagerComponentId',
            "duration": 1000
          },
       //   {
        //    type: 'SpeakItem',
       //     componentId: 'amphitext',
       //     highlightMode: 'line'
       //   }
        ]
      
        })
  
    .speak(speechText + speechText1)
    .reprompt(speechText  + speechText1)
    .withSimpleCard('Toads - Animal Categories', speechText) 
    .getResponse();
    }
    else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
    } // end if
    
      if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "salamander" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "salamanders")
    {
    const speechText = 'Salamander is usually a short, four legged and moist skinned animal. Salamander usually has camouflage ability and some have brightly colored skin. Salamander usually hides during the day and feed by the night. Breeding in most salamander species is in the water. Certain species breed on land. The largest salamander is the Chinese giant salamander. '
    const speechText1 = "Do you want to know about Toad or Newt or Frog ? Say 'Toad' or 'Newt' or 'Frog', or say 'animal categories' to go back to the main menu or say stop. "
    if (supportsAPL(handlerInput))
    {
     return handlerInput.responseBuilder
      .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
        //  document: require('./salamanders.json'),
          document: require('./salamanders.json'),
          datasources: {
        }
      })
     // slide show of the page
      .addDirective({
        type: 'Alexa.Presentation.APL.ExecuteCommands',
        token: 'pagerToken',
        commands: [
          {
            type: 'AutoPage',
            componentId: 'pagerComponentId',
            "duration": 1000
          },
       //   {
        //    type: 'SpeakItem',
       //     componentId: 'amphitext',
       //     highlightMode: 'line'
       //   }
        ]
      
        })
  
  
    .speak(speechText + speechText1)
    .reprompt(speechText  + speechText1)
    .withSimpleCard('Salamanders - Animal Categories', speechText) 
    .getResponse();
    }
    else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
    } // end if
    
     if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "newt" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "newts")
    {
    const speechText = 'Newt has a rougher skin than a salamander, with few warts. A newt has a well developed limbs and a tail. A newt can regenerate it\'s body parts including eyes, spinal cord, an intestine and even heart. A salamander and a newt has an ability to produce toxins from their skin to avoid predators. '
    const speechText1 = " Do you want to know about Salamander or Toad or Frog ? Say 'Salamander' or 'Toad' or 'Frog', or say 'animal categories' to go back to the main menu or say stop. "
    if (supportsAPL(handlerInput))
    {
     return handlerInput.responseBuilder
      .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
        //  document: require('./salamanders.json'),
          document: require('./newts.json'),
          datasources: {
        }
      })
     // slide show of the page
      .addDirective({
        type: 'Alexa.Presentation.APL.ExecuteCommands',
        token: 'pagerToken',
        commands: [
          {
            type: 'AutoPage',
            componentId: 'pagerComponentId',
            "duration": 1000
          },
       //   {
        //    type: 'SpeakItem',
       //     componentId: 'amphitext',
       //     highlightMode: 'line'
       //   }
        ]
      
        })
  
  
    .speak(speechText + speechText1)
    .reprompt(speechText  + speechText1)
    .withSimpleCard('Crocodile - Animal Categories', speechText) 
    .getResponse();
    }
    else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
    } // end if
    
    if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "crocodile" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "crocodiles")
    {
    const speechText = "Crocodile is the largest and the heaviest reptile. They have powerful jaws with conical teeth. They also have short legs with webbed toes. They are the living link to the prehistoric Dinosaur. When underwater they keep their eyes, nostrils and ears above the water surface. "
    const speechText1 = "Do you want to know about an Alligator or Lizard or Turtle? Say 'Alligator' or 'Lizard' or 'Turtle', or say 'animal categories' to go back to the main menu or say stop. "
     if (supportsAPL(handlerInput))
      {
       return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./crocodiles.json'),
            document: require('./crocodiles.json'),
            datasources: {
          }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
    .speak(speechText + speechText1)
    .reprompt(speechText  + speechText1)
    .withSimpleCard('Crocodile - Animal Categories', speechText) 
    .getResponse();
      }
      else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
    }  // end if
    
    if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "alligator" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "alligators")
    {
    const speechText = "Alligator is mostly seen in the freshwater. Alligator has a powerful tail. It aides them in swimming and is also used in defense. The two living species of alligator is the American and Chinese. Alligator has a round 'U' shaped snout. The teeth in their lower jaw is entirely covered. "
    const speechText1 = "Do you want to know about a Crocodile or Lizard or Turtle? Say 'Crocodile' or 'Lizard' or 'Turtle', or say 'animal categories' to go back to the main menu or say stop. "
      if (supportsAPL(handlerInput))
      {
       return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./crocodiles.json'),
            document: require('./alligators.json'),
            datasources: {
          }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
       .speak(speechText + speechText1)
       .reprompt(speechText  + speechText1)
       .withSimpleCard('Crocodile - Animal Categories', speechText) 
       .getResponse();
      }
      else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
    }  // end if
    
    if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "lizard" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "lizards")
    {
    const speechText = "Lizard is a scaly-skinned reptile. They occupy diverse habitats ranging from warrens and burrows, land and vegetation. A lizard has a long tail and they use their tongue to sense the environment. A lizard usually can regrow their tail when a part of it is cut off. "
    const speechText1 = "Do you want to know about an Alligator or Crocodile or Turtle? Say 'Crocodile' or 'Alligator' or 'Turtle', or say 'animal categories' to go back to the main menu or say stop. "
      if (supportsAPL(handlerInput))
      {
       return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./lizard.json'),
            document: require('./lizard.json'),
            datasources: {
          }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
      .speak(speechText + speechText1)
      .reprompt(speechText  + speechText1)
      .withSimpleCard('Lizard - Animal Categories', speechText) 
      .getResponse();
      }
      else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
    }  // end if
    
    if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "turtle" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "turtles")
    {
    const speechText = "Turtle has a hard shell to protect from predators. The shell has a top and a bottom and it is an integral part of its body. The shell is mostly made up of bone and cartilage. It cannot be shed. Unlike a tortoise, which is exclusively found on land, a turtle is found  in salt and fresh water. "
    const speechText1 = "Do you want to know about an Alligator or Crocodile or Lizard? Say 'Crocodile' or 'Alligator' or 'Lizard', or say 'animal categories' to go back to the main menu or say stop. "
      if (supportsAPL(handlerInput))  
      {
       return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./turtle.json'),
            document: require('./turtle.json'),
            datasources: {
          }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
      .speak(speechText + speechText1)
      .reprompt(speechText  + speechText1)
      .withSimpleCard('Turtle - Animal Categories', speechText) 
      .getResponse();
      }
      else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
    }  // end if
    
    if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "elephant" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "elephants")
    {
    const speechText = "Elephant is the largest land animal on earth. They live in herds and are extremely intelligent. There are African savanna or bush, African forest and Asian elephant. African forest elephant is slightly smaller than the savanna elephant. The trunk plays an important role as it is used for breathing, picking up food, to sense the environment and greet other elephant. "
    const speechText1 = "Do you want to know about a Cheetah or Gorilla or a Whale? Say 'Cheetah' or 'Gorilla' or 'Whale', or say 'animal categories' to go back to the main menu or say stop. "
      if (supportsAPL(handlerInput))
      {
       return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./turtle.json'),
            document: require('./elephant.json'),
            datasources: {
          }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
      .speak(speechText + speechText1)
      .reprompt(speechText  + speechText1)
      .withSimpleCard('Elephant - Animal Categories', speechText) 
      .getResponse();
      }
      else
      {
      return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
      }
    }  // end if
    
     if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "cheetah" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "cheetahs")
    {
    const speechText = "A cheetah has superb eyesight and can spot distant prey with a pinpoint precision. Their legs are proportionately longer than other big cats and they also have an elongated spine. A cheetah is active during the day, hunting in the early morning and late afternoon. "
    const speechText1 = "Do you want to know about an Elephant or Gorilla or a Whale? Say 'Elephant' or 'Gorilla' or 'Whale', or say 'animal categories' to go back to the main menu or say stop. "
      if (supportsAPL(handlerInput))  
      {
       return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./turtle.json'),
            document: require('./cheetah.json'),
            datasources: {
          }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
      .speak(speechText + speechText1)
      .reprompt(speechText  + speechText1)
      .withSimpleCard('Cheetah - Animal Categories', speechText) 
      .getResponse();
      }
      else
      {
      return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
      }
    }  // end if
   
     if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "gorilla" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "gorillas")
    {
    const speechText = "A gorilla lives in the tropical forests of equatorial Africa. They have a bulging abdomen and hair on all parts of their body except the face, hands and feet. They are territorial and stand erect only for showing off. There are two species, the Eastern and the Western gorilla. The Mountain gorilla, a subspecies of the western gorilla, are endangered. "
    const speechText1 = "Do you want to know about an Elephant or Cheetah or a Whale? Say 'Elephant' or 'Cheetah' or 'Whale', or say 'animal categories' to go back to the main menu or say stop. "
      if (supportsAPL(handlerInput))
      {
       return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./turtle.json'),
            document: require('./gorilla.json'),
            datasources: {
          }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
      .speak(speechText + speechText1)
      .reprompt(speechText  + speechText1)
      .withSimpleCard('Gorilla - Animal Categories', speechText) 
      .getResponse();
      }
      else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
    }  // end if
    
    if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "whale" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "whales")
    {
    const speechText = "Whale is the largest mammal on Earth. They breathe air, are warm-blooded, give birth to a calf. The young feed on their mothers milk. They do not have hairs except in the fetal stage. Whales must surface regularly to breathe, release the water from their lungs with an explosive burst known as the blow. A whale uses sound to perceive the environment and to communicate. "
    const speechText1 = "Do you want to know about an Elephant or Cheetah or a Gorilla? Say 'Elephant' or 'Cheetah' or 'Gorilla', or say 'animal categories' to go back to the main menu or say stop. "
      if (supportsAPL(handlerInput))
      {
        return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./turtle.json'),
            document: require('./whale.json'),
            datasources: {
          }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
      .speak(speechText + speechText1)
      .reprompt(speechText  + speechText1)
      .withSimpleCard('Whale - Animal Categories', speechText) 
      .getResponse();
    }
      else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
    }  // end if
    
  if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "cassowary" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "cassowary bird" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "cassowaries")
    {
    const speechText = "Cassowary is a flightless bird. They help make more trees by pooping out the seed of the fruits. Cassowary has a blue head which is protected by a bony helmet. Their feet have a dagger like nail in one of their toes, which can tear apart a flesh and cause serious damage. "
    const speechText1 = "Do you want to know about a Hawk or a Rhea or a Hornbill? Say 'Hawk' or 'Rhea' or 'Hornbill', or say 'animal categories' to go back to the main menu or say stop. "
      if (supportsAPL(handlerInput))
      {
       return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./turtle.json'),
            document: require('./cassowary.json'),
            datasources: {
          }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
    .speak(speechText + speechText1)
    .reprompt(speechText  + speechText1)
    .withSimpleCard('Cassowary - Animal Categories', speechText) 
    .getResponse();
      }
      else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
    }  // end if
          if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "hawk" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "hawks" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "hawk bird")
    {
    const speechText = "Hawk has a superb eyesight and can not only perceive the visible range of colors but also the ultra violet part of the color spectrum. They are good at hunting.  Hawk usually like to live in places like deserts and fields, as it is easier to find prey. The female hawk is larger than the male. "
    const speechText1 = "Do you want to know about Cassowary or Rhea or a Hornbill? Say 'Cassowary' or 'Rhea' or 'Hornbill', or say 'animal categories' to go back to the main menu or say stop. "
     if (supportsAPL(handlerInput))
     {
       return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./turtle.json'),
            document: require('./hawk.json'),
            datasources: {
          }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
    .speak(speechText + speechText1)
    .reprompt(speechText  + speechText1)
    .withSimpleCard('Hawk - Animal Categories', speechText) 
    .getResponse();
     }
     else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
    }  // end if
  
  if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "rhea" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "rhea bird" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "rhea birds" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "rheas")
    {
    const speechText = "Rhea is a flightless bird native to South America. It has large wings that is used for balance and for changing direction when the bird runs. Rhea has three toes and brown or grayish body. They are omnivorous and eat plants and animals.  "
    const speechText1 = "Do you want to know about Cassowary or Hawk or a Hornbill? Say 'Cassowary' or 'Hawk' or 'Hornbill', or say 'animal categories' to go back to the main menu or say stop. "
      if (supportsAPL(handlerInput))
      {
       return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./turtle.json'),
            document: require('./rhea.json'),
            datasources: {
          }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
    .speak(speechText + speechText1)
    .reprompt(speechText  + speechText1)
    .withSimpleCard('Hornbill - Animal Categories', speechText) 
    .getResponse();
    }
      else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
  }  // end if
  if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "hornbill" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "hornbills")
    {
    const speechText = "Hornbill has  a massive bill and a wingspan approaching six feet. It is the king of the skies in Southeast Asia. They are large-headed, with thin necks, broad wings, and long tails. They usually nest in cavities of large trees. "
    const speechText1 = "Do you want to know about Cassowary or Hawk or a Rhea? Say 'Cassowary' or 'Hawk' or 'Rhea', or say 'animal categories' to go back to the main menu or say stop. "
      if (supportsAPL(handlerInput))
      {
       return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./turtle.json'),
            document: require('./hornbill.json'),
            datasources: {
          }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
    .speak(speechText + speechText1)
    .reprompt(speechText  + speechText1)
    .withSimpleCard('Hornbill - Animal Categories', speechText) 
    .getResponse();
    }
      else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
    }  // end if
  if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "seahorse" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "seahorses")
    {
    const speechText = "Seahorse is a small creature that moves forward slowly using its dorsal fin. The male carries the eggs in their pouch. They hide in seagrass and cling to plants and corals with their tail. They are inept swimmers and can easily die of exhaustion. "
    const speechText1 = "Do you want to know about Salmon or Shark or Manta ray? Say  'Salmon' or 'Shark' or 'Manta ray', or say 'animal categories' to go back to the main menu or say stop. "
      if (supportsAPL(handlerInput))
      {
       return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./turtle.json'),
            document: require('./seahorse.json'),
            datasources: {
          }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
    .speak(speechText + speechText1)
    .reprompt(speechText  + speechText1)
    .withSimpleCard('Seahorse - Animal Categories', speechText) 
    .getResponse();
    }
    else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
    }  // end if
  if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "salmon" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "salmons" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "salmon fish")
    {
    const speechText = "Salmon hatch in fresh water, migrate thousands of miles in to the ocean and then return to the fresh water to reproduce. They use their sense of smell to find their hatch ground in freshwater. Adult Pacific salmon die soon after spawning, but many Atlantic salmon return to the sea and after one or two years in the open water may come back for breeding. "
    const speechText1 = "Do you want to know about Seahorse or Shark or Manta ray? Say  'Seahorse' or 'Shark' or 'Manta ray', or say 'animal categories' to go back to the main menu or say stop. "
      if (supportsAPL(handlerInput))
      {
       return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./turtle.json'),
            document: require('./salmon.json'),
            datasources: {
          }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
      .speak(speechText + speechText1)
      .reprompt(speechText  + speechText1)
      .withSimpleCard('Salmon - Animal Categories', speechText) 
      .getResponse();
      }
      else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
    }  // end if
    
  if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "shark" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "sharks")
    {
    const speechText = "Shark is a cartilaginous fish and they have an acute sense of smell as they can detect blood from miles away. Shark typically has a tough skin that is dull gray in color. Shark has rough toothlike scales. Shark has no swim bladder and should keep moving to avoid sinking in to the bottom. "
    const speechText1 = "Do you want to know about Seahorse or Salmon or Manta ray? Say  'Seahorse' or 'Salmon' or 'Manta ray', or say 'animal categories' to go back to the main menu or say stop. "
      if (supportsAPL(handlerInput))
      {
       return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./turtle.json'),
            document: require('./shark.json'),
            datasources: {
          }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
      .speak(speechText + speechText1)
      .reprompt(speechText  + speechText1)
      .withSimpleCard('Salmon - Animal Categories', speechText) 
      .getResponse();
      }
      else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
    }  // end if
    
 if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "common" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "common bug" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "common bugs")
    {
    const speechText = "A few examples of common bugs are Mosquito, Bumblebee and Housefly. Male mosquito feeds on flowers. The female mosquito feeds on blood. Elephant mosquito feeds on nectar. Bumblebee drinks honey and nectar. Queen bumblebee gives birth and builds a nest in Spring. Workers and drones die in the Fall season. Housefly feeds on feces and garbage. A housefly uses it's saliva to soften food before eating.  "
    const speechText1 = "Do you want to know about True, Beetle or 'Centipede' or 'Millipede' bugs? Say 'True' or 'Beetle' or 'Centipede' or 'Millipede', or say 'animal categories' to go back to the main menu or say stop. "
      if (supportsAPL(handlerInput))
      {
       return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./turtle.json'),
            document: require('./common.json'),
            datasources: {
          }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
      .speak(speechText + speechText1)
      .reprompt(speechText  + speechText1)
      .withSimpleCard('Common - Animal Categories', speechText) 
      .getResponse();
      }
      else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }

    }  // end if
    
    if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "true" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "true bug" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "true bugs" )
    {
    const speechText = "A few examples of true bugs are Aphids, Assassin, Leaf footed and Backswimmer bugs. Aphids suck the sap from leaves, branches, roots of plants and trees. Leaf footed bugs eat plants. The legs of this bug are shaped like a leaf. These live for 3 weeks. Assassin bugs mostly eat small insects. They spit out toxic saliva when threatened. The backswimmer bugs swim upside down using their long legs as oars. "  
    const speechText1 = "Do you want to know about Common, Beetle or 'Centipede' or 'Millipede' bugs? Say 'Common' or 'Beetle' or 'Centipede' or 'Millipede', or say 'animal categories' to go back to the main menu or say stop. "
      if (supportsAPL(handlerInput))
      {
       return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./turtle.json'),
            document: require('./true.json'),
            datasources: {
          }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
      .speak(speechText + speechText1)
      .reprompt(speechText  + speechText1)
      .withSimpleCard('True - Animal Categories', speechText) 
      .getResponse();
      }
      else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
    }  // end if
  
  if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "beetle" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "beetle bug" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "beetle bugs" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "beetles")
    {
    const speechText = "A few examples of beetles are Black oil, Bombardier and Dung. Black oil beetle feeds on plants and nectar. The female lays the eggs on flowers visited by bees. The larva attach themselves to bees and hitch a ride on to the bee nest. They feed on the larva of bees. Bombardier beetle hides under rocks and other objects. It can burst out hot, smelly acid to scare enemies away. Dung beetle feeds on dung. The female lays a single egg in the ball of dung. The larva upon hatching, eats the dung. "
    const speechText1 = "Do you want to know about Common, True or 'Centipede' or 'Millipede' bugs? Say 'Common' or 'True' or 'Centipede' or 'Millipede', or say 'animal categories' to go back to the main menu or say stop. "
      if (supportsAPL(handlerInput))
       {
         return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./turtle.json'),
            document: require('./beetle.json'),
            datasources: {
          }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
      .speak(speechText + speechText1)
      .reprompt(speechText  + speechText1)
      .withSimpleCard('Beetle - Animal Categories', speechText) 
      .getResponse();
      }
      else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    } 
   }  // end if
     
   if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "centipede" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "millipede" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "millipedes" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "centipedes")
    {
    const speechText = " Centipede is a wiggly, wriggly critter in the dirt. They move very quickly. They have around 80 to 160 legs! They hunt for insects and spiders. They live in the soil and leaf litter.  When threatened, they form S-shape. Millipede is a harmless dirt-dweller that eat plants and old leaves. They move slowly. If touched, they curl up into a tight coil. The giant African millipede grows to 11 inches. It is often kept as pet. " 
    const speechText1 = "Do you want to know about Common, True or Beetle bugs? Say 'Common' or 'True' or 'Beetle', or say 'animal categories' to go back to the main menu or say stop. "
      if (supportsAPL(handlerInput))
      {
       return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./turtle.json'),
            document: require('./pede.json'),
            datasources: {
          }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
      .speak(speechText + speechText1)
      .reprompt(speechText  + speechText1)
      .withSimpleCard('Pede - Animal Categories', speechText) 
      .getResponse();
      }
      else
    {
      return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
    }  // end if   

 if (handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "manta ray" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "manta rays" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "mantaray" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "mantarays" || handlerInput.requestEnvelope.request.intent.slots.animalcat.value == "manta")
    {
    const speechText = "Manta ray has elongated pectoral fins that look like wings. They are found in the warm waters along continents and islands. They are related to shark. They swim near the water surface, propelling themselves by flapping their pectoral fins. At times, they leap out of the water. They feed on plankton and small fishes. "
    const speechText1 = "Do you want to know about Seahorse or Shark or Salmon? Say  'Seahorse' or 'Shark' or 'Salmon', or say 'animal categories' to go back to the main menu or say stop. "
      if (supportsAPL(handlerInput))
      {
       return handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
          //  document: require('./turtle.json'),
            document: require('./mantaray.json'),
            datasources: {
          }
        })
     // slide show of the page
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'pagerToken',
          commands: [
            {
              type: 'AutoPage',
              componentId: 'pagerComponentId',
              "duration": 1000
            }
       
          ]
        })
  
      .speak(speechText + speechText1)
      .reprompt(speechText  + speechText1)
      .withSimpleCard('Manta ray - Animal Categories', speechText) 
      .getResponse();
      }
      else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
    }  // end if
    
    else
    {
      console.log("inside not avail");
    const speechText = "I do not have information about the animal. Please choose from the existing category list, or say animals that are given as examples inside each category. You can also say 'animal category list' to go back to the main menu. So what do you want to say? ";
   // const speechText1 = "Do you want to know about Seahorse or Shark or Salmon? Say  'Seahorse' or 'Shark' or 'Salmon', or say 'animal categories' to go back to the main menu or say stop. "
     if (supportsAPL(handlerInput))
    {
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt("What can I help you with?")
      .withSimpleCard('Help!', speechText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        document: require('./notavail.json')
      })
      .addDirective({
              type: "Alexa.Presentation.APL.ExecuteCommands",
              token: "VideoPlayerToken",
              commands: [
                {
                  type: "ControlMedia",
                  componentId: "myVideoPlayer",
                  command: "play"
                }
              ]
            })
      .getResponse();
    }
      else
    {
     return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Animal Categories', speechText)
      .getResponse(); 
    }
    }  // end if
  }, 
};



const ReptileIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'ReptileIntent'
     || request.type==='Alexa.Presentation.APL.UserEvent' && request.arguments.length > 0 && request.arguments[0]=='reptiles';
  },
  handle(handlerInput) {
   const speechText1 = "Do you want to know about Crocodile or Alligator or Turtle or Lizard? Say 'Crocodile' or 'Alligator' or 'Lizard' or 'Turtle', or say 'animal categories' to go back to the main menu or say stop. " ;
    const speechText = "Reptiles are vertebrates that breathe air and are cold blooded. Reptiles have scales covering part or all of their body. Reptiles need to warm their skin by exposing themselves in the sun for a long time. Few examples of Reptiles are Crocodile, Alligator, Turtle and Lizard. ";
     if (supportsAPL(handlerInput))
    {
    return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText1)
      .withSimpleCard('Reptiles - Animal Categories', speechText)
      .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          document: require('./reptiles.json'),
          datasources: {
            "ReptileTemplateData": {
                "type": "object",
                "objectId": "Reptilekaraoke",
                "properties": {
                    "ReptileSsml": "<speak>" + speechText + "</speak>",
                    "hintString" : " 'Crocodile' or 'Alligator' or 'Turtle' or 'Lizard' !"
                },
                "transformers": [
                    {
                        "inputPath": "hintString",
                        "transformer": "textToHint"
                    }
                ]
            }
          }
      })
      // slide show of the page
      .addDirective({
        type: 'Alexa.Presentation.APL.ExecuteCommands',
        token: 'pagerToken',
        speech:'amphitext',
        commands: [
          {
            type: 'AutoPage',
            componentId: 'pagerComponentId',
            "duration": 1000
          }
      //    return handlerInput.responseBuilder

        ]
      })

      // end of slide show
     // .speak("ok.about frogs.");
       .getResponse();
       
    }
    else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
  },
  
};

const BugsIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'BugsIntent'
     || request.type==='Alexa.Presentation.APL.UserEvent' && request.arguments.length > 0 && request.arguments[0]=='bugs';
  },
  handle(handlerInput) {
   const speechText1 = " Do you want to know about Common, True, Beetle, Millipede or Centipede bugs? Say 'Common' or 'True' or 'Beetle' or 'Millipede', or 'Centipede' or say 'animal categories' to go back to the main menu or say stop. " ;
    const speechText = " Bugs have been around for 600 million years. Remains of early insects or bugs called 'Arthropods' can be found in stone engravings. There are various types of bugs and they all have unique characteristics. Few of the many bug categories are Beetles, Butterflies, Moths, True bugs, Common bugs, slugs and dangerous bugs. " ;  
    if (supportsAPL(handlerInput))
    {
    return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText1)
      .withSimpleCard('Bugs - Animal Categories', speechText)
      .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          document: require('./bugs.json'),
          datasources: {
             "BugsTemplateData": {
                "type": "object",
                "objectId": "Bugskaraoke",
                "properties": {
                    "ReptileSsml": "<speak>" + speechText + "</speak>",
                    "hintString" : " 'Common' or 'True' or 'Beetle' or 'Centipede'! "
                },
                "transformers": [
                    {
                        "inputPath": "hintString",
                        "transformer": "textToHint"
                    }
                ]
            }
          }
          
      })
      // slide show of the page
      .addDirective({
        type: 'Alexa.Presentation.APL.ExecuteCommands',
        token: 'pagerToken',
        speech:'amphitext',
        commands: [
          {
            type: 'AutoPage',
            componentId: 'pagerComponentId',
            "duration": 1000
          }
      //    return handlerInput.responseBuilder

        ]
      })

      // end of slide show
     // .speak("ok.about frogs.");
       .getResponse();
    }
    else
    {
     return handlerInput.responseBuilder
      .speak(speechText + speechText1)
      .reprompt(speechText + speechText1)
      .withSimpleCard('Animal Categories', speechText + speechText1)
      .getResponse(); 
    }
  },
  
};


// mod

const SoundIntentHandler = {
  canHandle(handlerInput) {
   
   var request = handlerInput.requestEnvelope.request;
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'SoundIntent' 
      || request.type==='Alexa.Presentation.APL.UserEvent' && request.arguments.length > 0  ;
         
  },

  handle(handlerInput) {
     var request = handlerInput.requestEnvelope.request;
    if (request.arguments[0]=='mammalsound')
{
   const ad = "https://s3.amazonaws.com/calendaralexaapp/mammals/mammalaudio.mp3";
    var speechText2 = "<audio src='" + ad + "'/>";
   //  const speechText1 = "Do you want to know about an Elephant or Gorilla or Whale or a Cheetah? Say 'Elephant' or 'Gorilla' or 'Whale' or 'Cheetah', or say 'animal categories' to go back to the main menu or say stop. "
  } // end if
  
   if (request.arguments[0]=='birdsound')
{
   const ad = "https://s3.amazonaws.com/calendaralexaapp/birds/birdsaudio.mp3";
     speechText2 = "<audio src='" + ad + "'/>";
   //  const speechText1 = "Do you want to know about an Elephant or Gorilla or Whale or a Cheetah? Say 'Elephant' or 'Gorilla' or 'Whale' or 'Cheetah', or say 'animal categories' to go back to the main menu or say stop. "
 
    
  } // end if
  
   if (request.arguments[0]=='amphsound')
{
   const ad = "https://s3.amazonaws.com/calendaralexaapp/amphibians/amphibianaudio.mp3";
     speechText2 = "<audio src='" + ad + "'/>";
   //  const speechText1 = "Do you want to know about an Elephant or Gorilla or Whale or a Cheetah? Say 'Elephant' or 'Gorilla' or 'Whale' or 'Cheetah', or say 'animal categories' to go back to the main menu or say stop. "
   
  } // end if
  
    if (request.arguments[0]=='reptsound')
{
   const ad = "https://s3.amazonaws.com/calendaralexaapp/reptiles/reptileaudio.mp3";
    speechText2 = "<audio src='" + ad + "'/>";
   //  const speechText1 = "Do you want to know about an Elephant or Gorilla or Whale or a Cheetah? Say 'Elephant' or 'Gorilla' or 'Whale' or 'Cheetah', or say 'animal categories' to go back to the main menu or say stop. "
   
  } // end if
  
   if (request.arguments[0]=='fishessound')
{
   const ad = "https://s3.amazonaws.com/calendaralexaapp/fishes/fishesaudio.mp3";
     speechText2 = "<audio src='" + ad + "'/>";
   //  const speechText1 = "Do you want to know about an Elephant or Gorilla or Whale or a Cheetah? Say 'Elephant' or 'Gorilla' or 'Whale' or 'Cheetah', or say 'animal categories' to go back to the main menu or say stop. "
  } // end if
  
   if (request.arguments[0]=='bugssound')
{
   const ad = "https://s3.amazonaws.com/calendaralexaapp/bugs/bugsaudio.mp3";
     speechText2 = "<audio src='" + ad + "'/>";
   //  const speechText1 = "Do you want to know about an Elephant or Gorilla or Whale or a Cheetah? Say 'Elephant' or 'Gorilla' or 'Whale' or 'Cheetah', or say 'animal categories' to go back to the main menu or say stop. "
   
  } // end if
   if (supportsAPL(handlerInput)) { 
      return handlerInput.responseBuilder
      .speak(speechText2)
     .reprompt("What would you like to say? ")
     // .withSimpleCard('Animal Categories', speechText2)
     
      .getResponse();
    }
 
  },

};


// const FatsIntentHandler = {
//  canHandle(handlerInput) {
//    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
  //    && handlerInput.requestEnvelope.request.intent.name === 'FatsIntent';
  // },
  // handle(handlerInput) {
    // const speechText = 'These foods provide calories, but not much nutrition. These foods include salad dressings, sugars, soft drinks, candies, and desserts.';

  //  return handlerInput.responseBuilder
     //  .speak(speechText)
    //  .reprompt(speechText)
    //  .withSimpleCard('Fats - Food Pyramid', speechText)
      // .addDirective({
        //  type: 'Alexa.Presentation.APL.RenderDocument',
      //    document: require('./fats.json'),
      //    datasources: {}
    //  })
    //  .getResponse();
  // },
// };

const GobackIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GobackIntent';
  },
  handle(handlerInput) {
    const speechText = 'Ok. Going back to the main category list. What other category do you want to know about? Say stop to exit. ';
    if (supportsAPL(handlerInput))
    {
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Gob Back - Animal Categories', speechText)
      .addDirective({
         type: 'Alexa.Presentation.APL.RenderDocument',
          document: require('./homepage.json'),
          datasources: {}
      })
      .getResponse();
    }
    else
    {
     return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Animal Categories', speechText)
      .getResponse(); 
    }
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
 handle(handlerInput) {
    const speechText = 'Animal categories skill provides information about the six basic categories of animals, with examples. You can ask about a particular animal category from the list - Mammals, Reptiles, Amphibians, Fishes, Birds and Bugs. After going through the details of a particular animal, you can either say animal category list to go back to the main menu, select a different category or  say stop to exit the skill. So what do you want to say? ';
     const speechTextAPL = "Animal categories skill has images, sounds, and provides information about the six basic categories of animals, with examples. You can touch or ask about a particular animal category from the list of Mammals, Reptiles, Amphibians, Fishes, birds and Bugs. After going through the details of an animal, you can either say 'animal category list' to go back to the main menu, select a different category, or  say stop to exit the skill. So what do you want to say?";
     if (supportsAPL(handlerInput))
    {
    return handlerInput.responseBuilder
      .speak(speechTextAPL)
      .reprompt("What can I help you with?")
      .withSimpleCard('Help!', speechText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        document: require('./help.json')
      })
      .addDirective({
              type: "Alexa.Presentation.APL.ExecuteCommands",
              token: "VideoPlayerToken",
              commands: [
                {
                  type: "ControlMedia",
                  componentId: "myVideoPlayer",
                  command: "play"
                }
              ]
            })
      .getResponse();
    }
    else
    {
      return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt("What can I help you with? ")
      .withSimpleCard('Help!', speechText)
      .getResponse();
    }
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye! Have a nice day. ';
     if (supportsAPL(handlerInput))
    {
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Goodbye!', speechText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        document: require('./goodbye.json')
      })
      .addDirective({
              type: "Alexa.Presentation.APL.ExecuteCommands",
              token: "VideoPlayerToken",
              commands: [
                {
                  type: "ControlMedia",
                  componentId: "myVideoPlayer",
                  command: "play"
                }
              ]
            })
      .getResponse();
    }
    else
    {
      return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Goodbye!', speechText)
      .getResponse();
    }
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    console.log("Whole Error 1", JSON.stringify(handlerInput.requestEnvelope));
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log("Whole Error", JSON.stringify(handlerInput));
    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};
 function supportsAPL(handlerInput) {
    const supportedInterfaces = handlerInput.requestEnvelope.context.System.device.supportedInterfaces;
    const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
    return aplInterface != null && aplInterface != undefined;
}

// const skillBuilder = Alexa.SkillBuilders.custom();
// exports.handler = skillBuilder

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    MammalIntentHandler,
    BirdsIntentHandler,
    FishIntentHandler,
    BugsIntentHandler,
    AmphibianIntentHandler,
    AnimalmoreIntentHandler,
    ReptileIntentHandler,
    SoundIntentHandler,
    GobackIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
