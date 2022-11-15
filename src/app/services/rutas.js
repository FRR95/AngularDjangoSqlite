const router = require('express').Router()
const conexion = require('./config/conexion')
const multer = require("multer");
const cors = require("cors");
router.use(cors());
require('express');











//---------- agregamos rutas--------
//get equipos
router.get('/', (req, res) => {
    let sql = 'select * from tb_equipomedia'
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)
        }
    })

})

//agregar equipo


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


router.post('/', upload.single('myFile'), (req, res) => {
    const { logo } = req.file.filename;
    console.log(logo);
    res.send({ data: "OK", url: `http://localhost:3000/${logo}` });


    /*let sql = `insert into tb_equipomedia(logo) values('${logo}')`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'equipo agregado' });


        }
    })*/
});


//eliminar equipo

router.delete('/:id', (req, res) => {
    const { id } = req.params

    let sql = `delete from tb_equipomedia where id_equipo = '${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'equipo eliminado' })
        }
    })
});



module.exports = router