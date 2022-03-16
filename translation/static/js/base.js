
let translation_area = document.getElementById("translation_area");
var response = [];
let english_word;
let len;
var selected_key;
var dict={};
var words_array =[];


translation_area.addEventListener('keyup',function translate(e) {
    document.getElementById('hindi_words_list').style.display='none';
    if(e.keyCode == 32){

        let text_value = translation_area.value;
//        let trimmed_text_value = text_value.trim();

        var words = text_value.split(' ');
        var lastWord = words[words.length - 2];
        english_word=lastWord;

        let reversed = "";
        let str=english_word;
        let flag=true;
          for (var i = str.length - 1; i >= 0; i--){
              if ((str[i]>='a' && str[i]<='z') || (str[i]>='A' && str[i]<='Z'))
              {
                  reversed+=str[i];
              }else
              {  flag=false;
                 reversed=ReverseString(reversed);
                 break;
              }
          }
          function ReverseString(s) {return s.split("").reverse().join("");}
          if (flag){
          english_word=str;}
          else
          {
              english_word=reversed;
          }

        if (english_word!='')
{
        fetch(`/v1/translate?query=${english_word}`)
        .then(res=> res.json())
        .then(data =>{
        console.log(data.data)
        response = data.data;

        var high_score_word= response[0];

        len=high_score_word.length;

        selected_key=high_score_word;
        words_array=response;
        words_array.unshift(english_word);

        dict[selected_key]=words_array;


        translation_area.value = text_value.substring(0,text_value.length- english_word.length -1) + high_score_word + " " ;

        })
        .catch(error => console.log('ERROR'))
      }
      }

    if(e.keyCode == 8){
        console.log(dict);

        let translation_area = document.getElementById("translation_area");
        let text_value = translation_area.value;
        console.log(text_value);

        var myElement = document.getElementById('translation_area');
        var startPosition = myElement.selectionStart;
        var endPosition = myElement.selectionEnd;
        console.log(startPosition)
        console.log(endPosition)


        const myArray = text_value.split("");
//        if (myArray[myArray.length-1]!=' ' && !(myArray[myArray.length-1]>='a' && myArray[myArray.length-1]<='z') && !(myArray[myArray.length-1]>='A' && myArray[myArray.length-1]<='Z') && text_value!=''){
 if (myArray[myArray.length-1]!=' ' && !(myArray[myArray.length-1]>='!' && myArray[myArray.length-1]<='~') && text_value!=''){
        var myElement = document.getElementById('translation_area');
        var startPosition = myElement.selectionStart;
        var endPosition = myElement.selectionEnd;
        console.log(startPosition)
        console.log(endPosition)

        document.getElementById('hindi_words_list').style.left=startPosition*5.25+400+'px';
        document.getElementById('hindi_words_list').style.top=250+'px';



        document.getElementById('hindi_words_list').style.display='block';
        var str = '<select id="translation_options_dropdown" onclick="change_hindi()" onkeypress="change_hindi()">';
       for (let i = 1; i < response.length; i++)
       { str += '<option>'+ response[i] + '</option>';}
        str += '<option>'+ english_word + '</option>';
        str += '</select>';

        var el=document.getElementById("translation_area");


        document.getElementById("hindi_words_list").innerHTML = str;


        var dropdown = document.getElementById("translation_options_dropdown");
        dropdown.focus();
        dropdown.size = dropdown.options.length;


        }
        }

});


//function change_hindi() {
//
//    var x = document.getElementById("translation_options_dropdown").value;
//    const textarea = document.getElementById('translation_area');
//    s=translation_area.value;
//    textarea.value = textarea.value.replace(/\w+$/, ' ');
//    textarea.value = textarea.value.substring(0, textarea.value.lastIndexOf(' ')) +' '+x+' ';
//    document.getElementById('hindi_words_list').style.display='none';
//
//
//};

function change_hindi() {

    var x = document.getElementById("translation_options_dropdown").value;
    const textarea = document.getElementById('translation_area');
    var s=translation_area.value;
    var sp=s.split(' ');
    if(sp[sp.length-1].startsWith('\n'))
    {
    textarea.value = textarea.value.substring(0, textarea.value.lastIndexOf('')-len) +x+' ';
    window.len=x.length;
    }else
    {
    textarea.value = textarea.value.substring(0, textarea.value.lastIndexOf(' ')) +' '+x+' ';
    }

    document.getElementById('hindi_words_list').style.display='none';


};

