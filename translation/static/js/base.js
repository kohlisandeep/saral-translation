
function myFunction() {

    document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        let text_value = document.getElementById("lan").value;
        text_value=text_value.trim();
        var words = text_value.split(' ');
        var lastWord = words[words.length - 1];
        window.word=lastWord;

        fetch(`http://127.0.0.1:8000/v1/translate?query=${lastWord}`)
        .then(res=> res.json())
        .then(data =>{
        console.log(data.data)

        window.value=data.data;
        const out = Object.keys(data.data).map(key => {
        return { ...data.data[key], key }
        }).sort((a, b) => a.score - b.score);
        const textarea = document.getElementById('lan');
        var high_score_word= out[out.length-1].key;
        textarea.value = textarea.value.substring(0,textarea.value.length- lastWord.length -1) + high_score_word + " " ;

        })
        .catch(error => console.log('ERROR'))
      }
   if(e.keyCode == 8){

       var hindi_words=Object.keys(window.value);
       var str = '<select id="my_dropdown" onchange="dropdown_function()" type="hidden">';
       for (const [key, val] of Object.entries(hindi_words))
       {
        str += '<option>'+ val + '</option>';
        }
        str += '<option>'+ window.word + '</option>';
        str += '</select>';
        document.getElementById("hindi_words_list").innerHTML = str;
        }

}
}

function dropdown_function() {
    var x = document.getElementById("my_dropdown").value;
    const textarea = document.getElementById('lan');
    textarea.value = textarea.value.replace(/\w+$/, ' ');
    textarea.value = textarea.value.substring(0, textarea.value.lastIndexOf(' ')) + ' '+x+' ';


}

