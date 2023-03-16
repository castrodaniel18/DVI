window.onload = function () {
    var button = document.getElementById('summon');
    button.addEventListener('click', function () {
        var parrafo = document.getElementById('kittens');
        parrafo.innerHTML += '<img class="fit-picture" src="https://placekitten.com/g/200/200/">';
    });
};