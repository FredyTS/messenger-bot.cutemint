const express=  require('express');
const bodyParser=require('body-parser');
const { send } = require('process');

const app=express().use(bodyParser.json());

app.post('/webhook',(req,res)=>{
console.log('POST:webhook');

const body=req.body;

if(body.object==='page')
{

     body.array.forEach(entry => {
    
//se reciben y procesan los mensajes

            const webhookEvent=entry.messaging[0];
            console.log(webhookEvent);


    });

    res.sendStatus(200).send('Evento Recibido');

}
else{
    res.sendStatus(404);
}

});


app.get('/webhook',(req,res)=>{
    console.log('GET:webhook');
    const VERIFY_TOKEN = 'estaeslacontraseñafrutitadeuva8059';

    const mode=req.query['hub.mode'];
    const token=req.query['hub.verify_token'];
    const challenge=req.query['hub.challenge'];

    if(mode && token){

        if(mode==='subscribe'&& token===VERIFY_TOKEN){
            console.log('webhook verificado');
            res.status(200).send(challenge);

        }else{

            res.sendStatus(404);
        }
    }else{
        res.sendStatus(404);
    }

});
app.get('/',(req,res)=>{
    res.status(200).send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>Bot de Cute-Mint Studio</h1>
        <h3>Este es la pagina principal del bot</h3>
    </body>
    </html>`);
})

app.listen(8080,()=>
{
console.log('Servidor iniciado');


});