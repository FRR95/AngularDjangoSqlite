require('./config/conexion');
const conexion = require('./config/conexion')
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const bodyParser = require('body-parser');


app.use(cors());
app.use(express.json());

app.use(express.static("./public"));
app.use(require('./rutas'))

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

    // En el servidor Node.js
app.get('/verificar-correo', (req, res) => {
    const email = req.query.email;
    let sql = `SELECT * FROM users_ WHERE email = ?`
    // Realiza una consulta en la base de datos para verificar si el correo existe
    conexion.query(sql,[email], (err, result) => {
      if (err) {
        console.error('Error al verificar el correo:', err);
        res.status(500).json({ mensaje: 'Error al verificar el correo' });
      } else {
        if (result.length > 0) {
          // El correo ya existe
          res.json({ correoDuplicado: true });
        } else {
          // El correo no existe
          res.json({ correoDuplicado: false });
        }
      }
    });
  });
  
app.post('/registro', (req, res) => {
    const {name,email,password} = req.body;
  


    let sql = `insert into users_ (nombre,email,contraseña,biography,photo) values ('${name}','${email}','${password}','Hola!,soy ${name} y esta es mi biografia','http://localhost:3000/1666610687613.PNG')`
    
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error('Error al registrar el usuario:', err);
            res.status(500).json({ message: 'Error al registrar el usuario' });
        } else {
            console.log('Usuario registrado con éxito');
            res.status(200).json({ message: 'Usuario registrado con éxito' });
        }
    });
});

//--------------------------------------------

app.listen(port, () => {
    console.log("Listo por el puert", port);
});