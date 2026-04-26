const fs = require('fs');
const path = require('path');

const storiesPath = path.join(__dirname, 'src', 'components', 'Stories', 'stories.json');
let stories = JSON.parse(fs.readFileSync(storiesPath, 'utf8'));

stories = stories.map(story => {
  if (story.questions) {
    story.questions = story.questions.map(q => {
      if (q.question === "What event is considered the symbolic start of the revolution?") {
        q.explanation = "The Storming of the Bastille on July 14, 1789 is considered the symbolic beginning of the French Revolution because it represented the uprising against royal authority.";
      } else {
        q.explanation = "The correct answer is " + q.correctAnswer + ". This key historical point had lasting consequences during the " + story.title + " period.";
      }
      return q;
    });
  }
  return story;
});

fs.writeFileSync(storiesPath, JSON.stringify(stories, null, 2), 'utf8');
console.log('stories.json updated with explanations successfully');
