
var replaceLastQuote = document.getElementById('replaceLastQuote');

replaceLastQuote.addEventListener('click',() => {
    console.log("submit button was clicked");
    fetch('quotes', {
        method: 'put',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            'author': document.getElementById("new_author").value,
            'quote': document.getElementById("new_quote").value
        })
    }).then(res => {
        if (res.ok) return res.json()
   }).then(data => {
       console.log(data)
       window.location.reload(true)
   })
});