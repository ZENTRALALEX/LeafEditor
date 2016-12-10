$(document).ready(function(){

    var editor = ace.edit("hans");
    editor.setTheme("ace/theme/clouds_midnight");
    editor.getSession().setMode("ace/mode/html");

    $('.z-editor-save').click(function() {
        var post = $.post( "http://localhost:8080/leaf/save", { "leaf": editor.getValue() } );
        post.done(function( data ) {
            console.log(data);
        });
    });

   
});