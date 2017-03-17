
    let ws = new WebSocket("ws://localhost:8082");
    ws.onmessage = function(data, flags){
        //console.log("Récupération d'un message du serveur");
        console.log(data.data);
        
    };

    let socket = () => {
        return ws;
    }

