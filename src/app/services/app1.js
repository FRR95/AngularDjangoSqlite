require('./config/conexion');
const conexion = require('./config/conexion')
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var urlencodedParser = bodyParser.urlencoded({ extended: false })





app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("./public"));


const port = process.env.PORT || 3000;

//---------- agregamos rutas--------








const storage = multer.diskStorage({
    filename: function(res, file, cb) {
        const ext = file.originalname.split(".").pop(); //TODO pdf / jpeg / mp3
        const fileName = Date.now(); //TODO 12312321321
        cb(null, `${fileName}.${ext}`); //TODO 123123213232.pdf
    },
    destination: function(res, file, cb) {
        cb(null, `./public`);
    },
});

const upload = multer({ storage });



//agregar equipo
app.post('/api', (req, res) => {
    const { nombre, logo } = req.body;

    let sql = `insert into tb_equipo(nombre,logo,img) values('${nombre}','${logo}','http://localhost:3000/1666610687613.PNG')`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'equipo agregado' });
        }
    })
});


app.get('/apimedia', (req, res) => {
        let sql = 'select * from tb_equipo1'
        conexion.query(sql, (err, rows, fields) => {
            if (err) throw err;
            else {
                res.json(rows)
            }
        })

    })
    //get equipos
app.get('/api', (req, res) => {
    let sql = 'select * from tb_equipo'
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)
        }
    })

})




//eliminar equipo

app.delete('/api/:id', (req, res) => {
    const { id } = req.params;
    //fs.unlinkAsync(req.file.path)



    let sql = `delete from tb_equipo where id_equipo = '${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'equipo eliminado:' })
        }
    })
});

// get un equipo
app.get('/api/:id', (req, res) => {
    const { id } = req.params
    let sql = 'select * from tb_equipo where id_equipo = ?'
    conexion.query(sql, [id], (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)
        }
    })
})

//modificar
app.put('/api/:id', upload.single("myFile"), (req, res) => {
        const { id } = req.params
        const file = req.file.filename;


        let sql = `update tb_equipo set 
                img='http://localhost:3000/${file}'
                where id_equipo = '${id}'`

        conexion.query(sql, (err, rows, fields) => {
            if (err) throw err
            else {
                res.json({ status: 'equipo modificado' })
            }
        })

    })
    //----------------------------------



    //------LOGIN AND SIGN IN--------------

    //registro de usuario




  
app.post('/registro', (req, res) => {
    const {name,email,password} = req.body;
  


    let sql = `insert into usuarios (nombre,email,contraseña,passwordHash,biography,profile_photo) values ('${name}','${email}','${password}','${password}','Hola! Soy ${name} y esta es mi biografía','http://localhost:3000/1666610687613.PNG')`
    
    conexion.query(sql, (err, result) => {
        if (err){ 
            res.json({ correoDuplicado: true });
        console.log(err); 
        }
           if(result){
            console.log('Usuario registrado con éxito');
            res.status(200).json({ message: 'Usuario registrado con éxito' });
        }
        
    });
});
    //inicio de sesion del usuario

    app.post('/login', (req, res) => {

    const {username}=req.body;   
    const {password}=req.body;     
        
        
        let sql = `SELECT * FROM usuarios WHERE nombre="${username}" and contraseña="${password}";`;
      
      
        conexion.query(`SELECT * FROM usuarios WHERE nombre='${username}' and contraseña=?;`,[password] , (err, result,rows) => {

        
       
     if(result.length===0){
    return res.json({ noresult: true });
     }
      

        
    if (err) {
            console.error('Error:', err);
          }
       
    
        
          
         const user = result[0];
           
            
          
      if (bcrypt.compare(password, user.passwordHash)) {
           const token = jwt.sign({ userId: user.id, username: user.nombre }, secretKey='18Noviembre95', {  expiresIn: '1h' });
           return res.json( {token} );
          
            
          
          } else {
            return res.status(401).json({ message: 'Invalid password' });
            }
        });
      });
//--------------------------------------------

app.listen(port, () => {
    console.log("Listo por el puerto", port);
});