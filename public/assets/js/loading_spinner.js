const loadingSpinnerId = '#spinner-container';

$('body').append('<div id="spinner-container" style="display: block;position: fixed;z-index: 1031;top: 50%;right: 50%;"><span class="spinner-grow" role="status"></span></div>'); 

function loadingSpinnerOn() {
    $(loadingSpinnerId).show().fadeIn(1000);
}

function loadingSpinnerOff() {
    $(loadingSpinnerId).hide().fadeOut(1000);
}

$( document ).ready(// Ready to go turn off loading spinner
    loadingSpinnerOff()
);
