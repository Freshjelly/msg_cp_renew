$(function() {
    // スタートボタンで切り替え
    $("#start_button").click(function(){
        document.getElementById("start").classList.add("hidden");
        document.getElementById("q1").classList.remove("hidden");
    })
    // var i =1;
    // var selector = "#q"+ i +" button";
    // $(selector).click(function(){
    //     document.getElementById("q1").classList.add("hidden");
    //     document.getElementById("q2").classList.remove("hidden");
    // })

    // for (let i=1; i < 10; i++){
    //     var selector = "#q" + i + " button";
    //     var id = "q" + i;
    //     var id2 = "q2";
    //     document.getElementById("q1").classList.add(id);
    //     $(selector).click(function(){
    //         document.getElementById(id).classList.add("hidden");
    //         document.getElementById(id2).classList.remove("hidden");
    //     })    
    // }

})

function next_q(button){
    var selector = button.id.substr(0,2);
    document.getElementById(selector).classList.add("hidden");
    var num = selector.substr(1,1);
    var num = 
    document.getElementById("q"+num).classList.add("hidden");
}