const fs = require('fs');
const path = require('path');

const storiesPath = path.join(__dirname, 'src', 'components', 'Stories', 'stories.json');
let stories = JSON.parse(fs.readFileSync(storiesPath, 'utf8'));

const qs = {
  "indus-valley": [
    { question: "Which river was central to this civilization?", options: ["Nile", "Indus", "Yellow River", "Tigris"], correctAnswer: "Indus" },
    { question: "What is a major characteristic of Indus cities?", options: ["Pyramids", "Advanced drainage", "Colosseums", "Castles"], correctAnswer: "Advanced drainage" },
    { question: "Which was a major city in the Indus Valley?", options: ["Mohenjo-Daro", "Athens", "Rome", "Sparta"], correctAnswer: "Mohenjo-Daro" },
    { question: "What material were many Indus seals made of?", options: ["Gold", "Steatite", "Iron", "Wood"], correctAnswer: "Steatite" },
    { question: "Has the Indus script been fully deciphered?", options: ["Yes", "No", "Partially", "It was never written"], correctAnswer: "No" },
    { question: "What did the uniform weights suggest?", options: ["Chaos", "No trade", "Organized administration", "Nomads"], correctAnswer: "Organized administration" },
    { question: "When did the civilization peak?", options: ["2600 BCE", "1000 CE", "1900 AD", "500 BCE"], correctAnswer: "2600 BCE" },
    { question: "What was a likely cause of its decline?", options: ["Alien invasion", "Climate change", "Roman conquest", "Industrialization"], correctAnswer: "Climate change" },
    { question: "What animals were commonly depicted on seals?", options: ["Dinosaurs", "Dragons", "Bulls and unicorns", "Penguins"], correctAnswer: "Bulls and unicorns" },
    { question: "What material was heavily used for building houses?", options: ["Marble", "Baked bricks", "Glass", "Steel"], correctAnswer: "Baked bricks" }
  ],
  "ancient-rome": [
    { question: "Who was the first Emperor of Rome?", options: ["Julius Caesar", "Nero", "Augustus Caesar", "Constantine"], correctAnswer: "Augustus Caesar" },
    { question: "Which river flows through the city of Rome?", options: ["Tiber", "Nile", "Rhine", "Thames"], correctAnswer: "Tiber" },
    { question: "What was the large amphitheater built for gladiatorial contests?", options: ["Pantheon", "Colosseum", "Parthenon", "Circus Maximus"], correctAnswer: "Colosseum" },
    { question: "Which Roman general conquered Gaul and crossed the Rubicon?", options: ["Scipio", "Pompey", "Julius Caesar", "Marc Antony"], correctAnswer: "Julius Caesar" },
    { question: "What language did the ancient Romans speak?", options: ["Greek", "Latin", "Aramaic", "Hebrew"], correctAnswer: "Latin" },
    { question: "In what year did the Western Roman Empire fall?", options: ["476 CE", "1453 CE", "27 BCE", "44 BCE"], correctAnswer: "476 CE" },
    { question: "What was the Pax Romana?", options: ["A brutal war", "A period of peace", "A religious cult", "A type of sword"], correctAnswer: "A period of peace" },
    { question: "Which engineering feat supplied Rome with water?", options: ["Windmills", "Aqueducts", "Dams", "Wells"], correctAnswer: "Aqueducts" },
    { question: "Who was the legendary founder of Rome?", options: ["Romulus", "Remus", "Aeneas", "Hercules"], correctAnswer: "Romulus" },
    { question: "What volcano destroyed the city of Pompeii?", options: ["Mount Etna", "Mount Vesuvius", "Mount Olympus", "Mount Sinai"], correctAnswer: "Mount Vesuvius" }
  ],
  "magna-carta": [
    { question: "Where was the Magna Carta sealed?", options: ["Westminster", "Windsor Castle", "Runnymede", "Canterbury"], correctAnswer: "Runnymede" },
    { question: "Which king sealed the Magna Carta?", options: ["King Arthur", "King Richard", "King John", "King Henry VIII"], correctAnswer: "King John" },
    { question: "In what year was it signed?", options: ["1066", "1215", "1492", "1776"], correctAnswer: "1215" },
    { question: "What was the main purpose of the Magna Carta?", options: ["Declare independence", "Limit the king's power", "Start a war", "Establish a new religion"], correctAnswer: "Limit the king's power" },
    { question: "Who forced the king to sign it?", options: ["The peasants", "The Pope", "The rebel barons", "The French"], correctAnswer: "The rebel barons" },
    { question: "What language was it originally written in?", options: ["English", "French", "Latin", "German"], correctAnswer: "Latin" },
    { question: "Did the Pope support the Magna Carta?", options: ["Yes", "No, he annulled it", "He was neutral", "He wrote it"], correctAnswer: "No, he annulled it" },
    { question: "What modern document did it heavily influence?", options: ["Communist Manifesto", "U.S. Constitution", "Treaty of Versailles", "Hammurabi's Code"], correctAnswer: "U.S. Constitution" },
    { question: "What right did it guarantee to free men?", options: ["Free housing", "Right to a fair trial", "Right to bear arms", "Free education"], correctAnswer: "Right to a fair trial" },
    { question: "How many clauses remain in English law today?", options: ["All of them", "About half", "Only three", "None"], correctAnswer: "Only three" }
  ],
  "american-revolution": [
    { question: "When was the Declaration of Independence adopted?", options: ["July 4, 1775", "July 4, 1776", "July 4, 1783", "July 4, 1787"], correctAnswer: "July 4, 1776" },
    { question: "Who was the primary author of the Declaration?", options: ["George Washington", "John Adams", "Thomas Jefferson", "Benjamin Franklin"], correctAnswer: "Thomas Jefferson" },
    { question: "Which European country allied with the Americans?", options: ["Spain", "France", "Germany", "Russia"], correctAnswer: "France" },
    { question: "What was the rallying cry against British taxes?", options: ["Give me liberty or give me death", "No taxation without representation", "Remember the Alamo", "Liberty, Equality, Fraternity"], correctAnswer: "No taxation without representation" },
    { question: "Which event involved dumping tea into the harbor?", options: ["Boston Massacre", "Boston Tea Party", "Stamp Act Protest", "Battle of Bunker Hill"], correctAnswer: "Boston Tea Party" },
    { question: "Who commanded the Continental Army?", options: ["Thomas Jefferson", "Alexander Hamilton", "George Washington", "Benedict Arnold"], correctAnswer: "George Washington" },
    { question: "Where did the British finally surrender?", options: ["Saratoga", "Yorktown", "Lexington", "Valley Forge"], correctAnswer: "Yorktown" },
    { question: "What treaty ended the war in 1783?", options: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Ghent", "Treaty of London"], correctAnswer: "Treaty of Paris" },
    { question: "What document replaced the Articles of Confederation?", options: ["Bill of Rights", "U.S. Constitution", "Magna Carta", "Emancipation Proclamation"], correctAnswer: "U.S. Constitution" },
    { question: "Which king ruled Britain during the revolution?", options: ["King George III", "King Henry VIII", "King Edward VII", "King James II"], correctAnswer: "King George III" }
  ],
  "french-revolution": [
    { question: "What event is considered the symbolic start of the revolution?", options: ["Tennis Court Oath", "March on Versailles", "Storming of the Bastille", "Execution of Louis XVI"], correctAnswer: "Storming of the Bastille" },
    { question: "Who was the King of France during the revolution?", options: ["Louis XIV", "Louis XV", "Louis XVI", "Napoleon"], correctAnswer: "Louis XVI" },
    { question: "What was the socio-economic structure called?", options: ["The Three Estates", "The Feudal System", "The Monarchy", "The Republic"], correctAnswer: "The Three Estates" },
    { question: "Which estate represented the commoners?", options: ["First Estate", "Second Estate", "Third Estate", "Fourth Estate"], correctAnswer: "Third Estate" },
    { question: "What was the motto of the revolution?", options: ["No taxation without representation", "Liberty, Equality, Fraternity", "God and my right", "Peace, Land, Bread"], correctAnswer: "Liberty, Equality, Fraternity" },
    { question: "Who was a key leader during the Reign of Terror?", options: ["Lafayette", "Robespierre", "Danton", "Marat"], correctAnswer: "Robespierre" },
    { question: "What device was famously used for executions?", options: ["The Noose", "The Guillotine", "The Axe", "The Firing Squad"], correctAnswer: "The Guillotine" },
    { question: "Which famous document was drafted in 1789?", options: ["Magna Carta", "Declaration of the Rights of Man", "Bill of Rights", "Code Napoleon"], correctAnswer: "Declaration of the Rights of Man" },
    { question: "Who rose to power at the end of the revolution?", options: ["Louis XVIII", "Maximilien Robespierre", "Napoleon Bonaparte", "Charles de Gaulle"], correctAnswer: "Napoleon Bonaparte" },
    { question: "Which famous palace did the women of Paris march to in 1789?", options: ["Louvre", "Versailles", "Tuileries", "Bastille"], correctAnswer: "Versailles" }
  ],
  "industrial-revolution": [
    { question: "Whose improved steam engine was central to the revolution?", options: ["Richard Arkwright", "George Stephenson", "James Watt", "Isambard Kingdom Brunel"], correctAnswer: "James Watt" },
    { question: "Where did the Industrial Revolution begin?", options: ["France", "Germany", "United States", "Britain"], correctAnswer: "Britain" },
    { question: "Which industry was the first to be mechanized?", options: ["Agriculture", "Textiles", "Mining", "Transportation"], correctAnswer: "Textiles" },
    { question: "What new form of transportation revolutionized travel?", options: ["Airplanes", "Automobiles", "Steam Railways", "Bicycles"], correctAnswer: "Steam Railways" },
    { question: "What social class grew significantly during this time?", options: ["The Nobility", "The Peasantry", "The Middle Class", "The Clergy"], correctAnswer: "The Middle Class" },
    { question: "What fuel powered most of the early steam engines?", options: ["Wood", "Oil", "Coal", "Solar"], correctAnswer: "Coal" },
    { question: "What were the protesters who smashed machines called?", options: ["Jacobins", "Luddites", "Chartists", "Bolsheviks"], correctAnswer: "Luddites" },
    { question: "What was a major negative consequence in early cities?", options: ["Too much free time", "Severe pollution and disease", "Lack of food", "Empty factories"], correctAnswer: "Severe pollution and disease" },
    { question: "Which invention revolutionized communication?", options: ["Telephone", "Telegraph", "Radio", "Television"], correctAnswer: "Telegraph" },
    { question: "What system replaced the domestic/putting-out system?", options: ["The Factory System", "The Feudal System", "The Guild System", "The Barter System"], correctAnswer: "The Factory System" }
  ],
  "world-war-one": [
    { question: "Whose assassination triggered WWI?", options: ["Kaiser Wilhelm II", "Archduke Franz Ferdinand", "Tsar Nicholas II", "King Edward VII"], correctAnswer: "Archduke Franz Ferdinand" },
    { question: "In what year did WWI begin?", options: ["1912", "1914", "1917", "1939"], correctAnswer: "1914" },
    { question: "Which type of warfare characterized the Western Front?", options: ["Naval battles", "Trench warfare", "Guerilla warfare", "Aerial dogfights"], correctAnswer: "Trench warfare" },
    { question: "Which major power exited the war early due to revolution?", options: ["France", "Britain", "Russia", "Italy"], correctAnswer: "Russia" },
    { question: "When did the United States enter the war?", options: ["1914", "1915", "1917", "1918"], correctAnswer: "1917" },
    { question: "What new weapon caused horrific casualties in the trenches?", options: ["Atomic bombs", "Poison gas", "Crossbows", "Drones"], correctAnswer: "Poison gas" },
    { question: "What treaty officially ended the war with Germany?", options: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Tordesillas", "Treaty of Vienna"], correctAnswer: "Treaty of Versailles" },
    { question: "What international organization was formed after WWI?", options: ["United Nations", "NATO", "League of Nations", "European Union"], correctAnswer: "League of Nations" },
    { question: "Which empire collapsed as a result of the war?", options: ["British Empire", "French Empire", "Ottoman Empire", "Spanish Empire"], correctAnswer: "Ottoman Empire" },
    { question: "What was the spontaneous ceasefire in 1914 called?", options: ["Easter Rising", "Christmas Truce", "Armistice Day", "Summer of Love"], correctAnswer: "Christmas Truce" }
  ]
};

stories = stories.map(story => {
  if (qs[story.id]) {
    story.questions = qs[story.id];
  }
  // ensure exactly 10 questions
  if (!story.questions) story.questions = [];
  while(story.questions.length < 10) {
    story.questions.push({
      question: "Sample Question " + (story.questions.length + 1),
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option A"
    });
  }
  // remove old quiz field if it exists
  delete story.quiz;
  return story;
});

fs.writeFileSync(storiesPath, JSON.stringify(stories, null, 2), 'utf8');
console.log('stories.json updated successfully');
