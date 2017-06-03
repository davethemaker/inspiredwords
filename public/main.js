
var replaceLastQuote = document.getElementById('replaceLastQuote');

replaceLastQuote.addEventListener('click',() => {
    console.log("submit button was clicked");
    fetch('quotes', {
        method: 'put',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            'author':'Amanda Palmer',
            'quote':'Take the pain and wear it like a shirt'
        });
    });
});