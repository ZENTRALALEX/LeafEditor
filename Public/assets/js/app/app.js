$(document).ready(function(){

    var editor = ace.edit($(".z-ace-editor")[0]);
    editor.setTheme("ace/theme/clouds_midnight");
    editor.getSession().setMode("ace/mode/html");

    $('.z-editor-save').click(function(event) {

        var waitingStateButton = $ZentralButtons.wait($(this));
        console.log(waitingStateButton);

        var post = $.post( "http://localhost:8080/leaf/save", { "leaf": editor.getValue() } );
        post.done(function( data ) {
            var description = data.description;
            var title = "Success";

            if(data.error) {
                description = data.error;
                title = "Failed";
                alert("error");
            }

            waitingStateButton.succeedAndReset();

        });
        post.fail(function(){
            alert("failed");
        });

        event.preventDefault();
    });
});