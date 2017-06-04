
var replaceLastQuote = document.getElementById('replaceLastQuote');
var deleteQuote = document.getElementById('deleteQuote');

replaceLastQuote.addEventListener('click',() => {
    console.log("submit button was clicked");
    fetch('quotes', {
        method: 'put',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            'new_author': document.getElementById("new_author").value,
            'author': document.getElementById("old_author").value,
            'quote': document.getElementById("new_quote").value
        })
    }).then(res => {
        if (res.ok) return res.json()
   }).then(data => {
       console.log(data)
       window.location.reload(true)
   })
});

deleteQuote.addEventListener('click',() => {
    fetch('quotes',{
        method: 'delete',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            // grab the author's name value from field
            'author': document.getElementById("delete_author").value
        })
     }).then(res => {
         if(res.ok) return res.json()
  }).then(data => {
      console.log(data)
      window.location.reload()
  })
});