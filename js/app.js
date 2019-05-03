// Formats response 
const renderResponse = (response) => {
    if(!response){
        console.log(response.status);
    }
    if(!response.length){
        responseField.innerHTML = "<p>Try again!</p><p>There were no suggestions found!</p>";
        return;
    }

    let wordList = [];
    for(let i = 0; i < Math.min(response.length, 10); i++){
        wordList.push(`<li>${response[i].word}</li>`);
    }

    wordList = wordList.join("");

    responseField.innerHTML = `<p>You might be interested in:</p><ol>${wordList}</ol>`;

    return
}

//Reaching API
const url = 'https://api.datamuse.com/words?';
const queryParams = 'rel_rhy='; // it is the start of a parameter for the query string. This parameter will narrow the search to words that rhyme

//select page elements
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');

//AJAX function
const getSuggestions = () => {
    const wordQuery = inputField.value; // it grabs what is in the inputField and assigns it to the variable wordQuery
    const endpoint = url + queryParams + wordQuery;

    //XHR Object
    const xhr = new XMLHttpRequest();
    //Response handling:
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        //the following condition checkS to see if the request has finished
        if(xhr.readyState === XMLHttpRequest.DONE) {
            renderResponse(xhr.response)
        }
    };

    //opening request and sending the object:
    xhr.open('GET', endpoint); //'GET' sets the method and url sets the destination
    xhr.send(); // send the request to the server
}

//clearing previous results and displaying new results to the page
const displaySuggestions = (event) => {
    event.preventDefault();
    while(responseField.firstChild){
        responseField.removeChild(responseField.firstChild);
    };
    getSuggestions();
}

submit.addEventListener('click', displaySuggestions);
