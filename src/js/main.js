

/*
 * Third party
 */

// !!!!! Важно писать именно "//="       не // =....

//= ../../bower_components/jquery/dist/jquery.js
//= ../../node_modules/bootstrap/dist/js/bootstrap.js


/*
 * Custom
 */

//!= ./partials/part.js


// document.addEventListener('DOMContentLoaded', function() {
//     var prod = document.querySelector("#qqq");
//     console.log(prod);
//     prod.classList.add('red-color');
//     console.log(prod);
//     $("#msgid").html("This is Hello World by JQuery");
//  }, false);

 $(document).ready(function(){ 
    var prod = document.querySelector("#qqq");
    console.log(prod);
    prod.classList.add('red-color');
    console.log(prod);
    $("#qqq").hide();
  });

var fefe = 1;
console.log(fefe);
// // Но когда добавляем класс, точки нет!
// prod.classList.add('red-color');

// alert(prod);

