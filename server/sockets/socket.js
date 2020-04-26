const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control')

let ticket = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticket.siguiente()
        console.log(siguiente)
        callback(siguiente)
    })
    
    client.emit('estadoActual', {
        actual: ticket.getUltimoTicket(),
        ultimos4: ticket.getUltimos4()
    })

    client.on('atenderTicket', (data, callback) => {

        if(!data.escritorio){
            return callback({
                err:true,
                mensaje: 'Escritorio es necesario'
            })
        }

        let atenderTicket = ticket.atenderTicket(data.escritorio)

        callback(atenderTicket)

        //actualizar/notificar cambios en los ultimos 4

        client.broadcast.emit('ultimos4', {
            ultimos4: ticket.getUltimos4()
        })
        
    })

});