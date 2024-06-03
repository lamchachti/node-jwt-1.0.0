// Call express library to create a server
const express=require('express')
// get instance of body-parser to parse incoming request' body to the our server
const bodyParser=require('body-parser')
// JWT
const jwt=require('jsonwebtoken')
const authenticateJWT=require('./middleware/AuthenticateJWT')
// Create the server 
const app=express();
const port=3000
//La clave de 32 Bytes
const secretKey=process.env.SECRET_KEY

app.use(bodyParser.json())

// La autenticación

app.post('/login',(req,res)=>{
    const {username,password}=req.body // Extraer los credenciales desde la petición
    if(username==='admin' && password==='password'){
        //Generación de Token 
        const token=jwt.sign({username},secretKey,{expiresIn:'1h'})
        res.json({token})
    }else{
        res.status(404).send('Your are not autorized')
    }
})
//Ruta protegida vía el middleware(JWT)

app.get('/protected', authenticateJWT, (req, res) => {
    res.send('Este es un contenido protegido');
});

// Poner en marcha el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
