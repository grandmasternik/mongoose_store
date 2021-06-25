// $("buy").click(function(){
//     alert("The paragraph was clicked.");
// });
  
let buy = 1;
let buyEl = document.getElementById("buy");
function buy(){
    if (qty > 0) {
        qty--;
        qtyEl.value = qty;
    }
}

