//import React, { useEffect } from 'react';
  export default  class WebSocketServer  {
    ip:string ="";
    port :string="";
    msg:string="ip:port";
    constructor(ip:string="192.168.0.11",port:string="4649"){
      this.ip = ip
      this.port = port
      this.doWebSocket()
    }
    
     
    //var url = "wss://localhost:5963/Echo";
     websocket:any = null;
     isOpen = false;
    // eslint-disable-next-line
     doWebSocket() {
      const url:string = `ws://${this.ip}:${this.port}/Chat`;
      this.websocket = new WebSocket (url);
      this.websocket.onopen =(e:any) =>{ this.onOpen (e)};
      this.websocket.onmessage = (e:any) => {
       // console.log(e);
       this.onMessage (e);
      };
      this.websocket.onerror = (e:any) => {
        this.onError (e);
      };
      this.websocket.onclose = (e:any) => {
       // console.log(e);
       this.onClose (e);
      };
    };
    /*
    isOpen(){
      return new Promise ((resolve, reject) => {
        try{    
          this.isOpen = true;  
            resolve("success");    // 成功
        }
        catch(error){
            reject("fail");        // 失败
        }  
    });

    }
    */
     onOpen (event:any) {
       this.isOpen = true;
      this.writeToScreen ("CONNECTED");
      this.send ("WebSocket rocks");
    }
    setMessageValue () {
 
    //  let cameraData = {room: this.roomValue, name: 'x-art', radius: this.cameraModel.radius, alpha: this.cameraModel.alpha, beta: this.cameraModel.beta, target: this.cameraModel.target, position: this.cameraModel.position}
      //const a ={x:a,y:b,z:c} 
        const cameraData  = {
        room: 'room',
        name: 'x-art',
        radius: 1,
        alpha: 2, 
        beta: 3, 
        target: {x:4,y:5,z:6}, 
        position: {x:7,y:8,z:9},
       }
       const sendMessageStr = {
         buttonName:"scence",
         transData:cameraData,
       }
       console.log(sendMessageStr)
      this.websocket.send( JSON.stringify(sendMessageStr))
    }
     onMessage (event:any) {
      console.log(event);
      
      this.writeToScreen ('<span style="color: blue;">RESPONSE: ' + event.data + '</span>');
      this.websocket.send (event.timeStamp);
      //websocket.close ();
    }
    
    onError (event:any) {
      this.writeToScreen ('<span style="color: red;">ERROR: ' + event.data + '</span>');
    }
    
     onClose (event:any) {
      this.isOpen = false;
      this.writeToScreen ("DISCONNECTED");
    }
    
     send (message:any) {
     // console.log(message);
     this.writeToScreen ("SENT: " + message);
     this.websocket.send (message);
    }
    sendMessage(buttonName:string ,transData:any){
      const sendMessageStr = {
        buttonName:buttonName,
        transData:transData,
      }
     this.websocket.send( JSON.stringify(sendMessageStr))
     this.writeToScreen(sendMessageStr)
    }
     writeToScreen (message:any) {
      this.msg = message;
     console.log(message)
    }

}
