// import { response } from 'express';

// global varible
let canClick = true;

// authenticate user when user clicks on login
const loginButton = document.querySelector('#loginButton');
loginButton.addEventListener('click', () => {
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  axios.post('/login', { email: email.value, password: password.value })
    .then((res) => {
      if (res.data) {
        const createBugButton = document.querySelector('#bugForm');
        createBugButton.style.display = 'block';
      }
    });
});

const form = document.querySelector('.form');
// div to hold all feature buttons
const featureButtonsDiv = document.createElement('div');
// div for bug form
const bugFormDiv = document.createElement('div');
document.body.appendChild(bugFormDiv);
form.appendChild(featureButtonsDiv);

// helper function that creates bug form
function createbugForm() {
  const featureId = this.value;
  if (canClick === true) {
    const feature1 = document.querySelector('#featureButton1');
    const feature2 = document.querySelector('#featureButton2');
    const feature3 = document.querySelector('#featureButton3');
    const feature4 = document.querySelector('#featureButton4');
    feature1.style.backgroundColor = 'transparent';
    feature2.style.backgroundColor = 'transparent';
    feature3.style.backgroundColor = 'transparent';
    feature4.style.backgroundColor = 'transparent';
    this.style.backgroundColor = 'red';
    const problem = document.createElement('input');
    const problemLabel = document.createElement('label');
    const errorText = document.createElement('input');
    const errorLabel = document.createElement('label');
    const commit = document.createElement('input');
    const commitLabel = document.createElement('label');
    const bugButton = document.createElement('button');
    problemLabel.setAttribute('for', 'problem');
    problem.setAttribute('id', 'problem');
    problem.setAttribute('name', 'problem');
    errorLabel.setAttribute('for', 'errorText');
    errorText.setAttribute('id', 'errorText');
    commitLabel.setAttribute('for', 'commit');
    commit.setAttribute('id', 'commit');
    bugButton.innerText = 'Add Bug';
    bugButton.setAttribute('id', 'bugButton');
    problemLabel.innerText = 'problem';
    errorLabel.innerText = 'error';
    commitLabel.innerText = 'commit';
    bugFormDiv.appendChild(problemLabel);
    bugFormDiv.appendChild(problem);
    bugFormDiv.appendChild(errorLabel);
    bugFormDiv.appendChild(errorText);
    bugFormDiv.appendChild(commitLabel);
    bugFormDiv.appendChild(commit);
    bugFormDiv.appendChild(bugButton);
    // add bug to database
    bugButton.addEventListener('click', () => {
      const bugProblem = document.querySelector('#problem').value;
      const bugErrorText = document.querySelector('#errorText').value;
      const bugCommit = document.querySelector('#commit').value;
      problem.remove();
      errorText.remove();
      commit.remove();
      bugButton.remove();
      problemLabel.remove();
      errorLabel.remove();
      commitLabel.remove();
      canClick = true;
      axios.post('/newBug', {
        featureId, bugProblem, bugErrorText, bugCommit,
      });
    });
  }
  canClick = false;
}

const bugFormButton = document.querySelector('#bugForm');
// create a button for each feature
bugFormButton.addEventListener('click', () => {
  axios.get('/features')
    .then((response) => {
      // array of all features
      const features = response.data;
      // create buttons
      for (let i = 0; i < features.length; i += 1) {
        const button = document.createElement('button');
        button.classList.add('featureButton');
        button.setAttribute('id', `featureButton${features[i].id}`);
        button.setAttribute('value', features[i].id);
        button.innerText = features[i].name;

        button.addEventListener('click', createbugForm);
        featureButtonsDiv.appendChild(button);
      }
    });
});
