ZentralUtils = function() {
    this.stateClasses = [
        "btn-primary",
        "btn-secondary",
        "btn-success",
        "btn-info",
        "btn-warning",
        "btn-danger",
        "btn-link",
    ];
    this.removeButtonStateClass = function(button) {
        this.stateClasses.forEach(function(classEntry) {
            if(button.hasClass(classEntry)) {
                button.removeClass(classEntry);
            }
        }, this);
        return button;
    }
    this.getButtonStateClass = function(button) {
        this.stateClasses.forEach(function(classEntry) {
            if(button.hasClass(classEntry)) {
                return classEntry;
            }
        }, this);
        return undefined;
    }
}
jQuery.fn.extend({
    removeButtonStateClass: function() {
        return this.each(function() {
            if($(this).hasClass("btn")) {
                $ZentralUtils.removeButtonStateClass($(this));
            }
        });
    }
});
$ZentralUtils = new ZentralUtils();

ZentralModal = function() {
    this.show = function() {
        
    }
}
$ZentralModal = new ZentralModal();

ZentralButtonState = function(params) {
    this.button = params.button
    this.originalHtml = params.originalHtml
    this.originalWidth = params.originalWidth
    this.originalButtonStateClass = params.originalButtonStateClass

    this.failAndReset = function() {
        this.reset();
    }
    this.succeedAndReset = function() {
        this.reset();
    }
    this.reset = function() {
        this.button.removeClass("disabled");
        this.button.css("width", this.originalWidth);
        this.button.fadeOut(200)
        this.button.wait(200).removeButtonStateClass().addClass("btn-success")
        .html(this.originalHtml)
        .css("width", this.originalWidth)
        .fadeIn(400);
    }
}

ZentralButtons = function() {
    this.wait = function(button) {

        var state = new ZentralButtonState({
            button: button,
            originalHtml: button.html(),
            originalWidth: button.css("width"),
            originalButtonStateClass: $ZentralUtils.getButtonStateClass(button)
        });
        
        button.width(button.width());
        button.addClass("disabled");
        button.html("");

        $('<i class="z-spin fa-spin fa fa-spinner fa-pulse fa-md"></i>').appendTo(button);
        return state;
    }
}
$ZentralButtons = new ZentralButtons();