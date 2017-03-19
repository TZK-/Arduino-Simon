
    let ws = new WebSocket("ws://localhost:8082");
    ws.onmessage = function(data, flags){
        //console.log("Récupération d'un message du serveur");
        let res = data.data;
        console.log(res);

        if(res == 1) {
            vue.countIterator();
        }
        if(res == 0) {
            vue.countReset();
            vue.failedGame();
        }
    };

    let socket = () => {
        return ws;
    }

