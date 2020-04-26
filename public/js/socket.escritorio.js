var socket = io();

var searchParam = new URLSearchParams(window.location.search)
var label = $('small');

if(!searchParam.has('escritorio')){
    window.location = 'index.html'
    throw new Error('El escritorio es necesario')
}

var escritorio = searchParam.get('escritorio')
console.log(escritorio)

$('h1').text('Escritorio ' + escritorio)

$('button').on('click', function(){

    socket.emit('atenderTicket', {escritorio: escritorio}, function(resp) {
        if(resp ==='No hay tickets'){
            label.text(resp)
            alert(resp)
            return
        }
        label.text('Ticket ' + resp.numero)
    })
})