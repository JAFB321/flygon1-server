const express = require('express');
const { DBalumno } = require('./database');

// -------------- Http Server -------------- 
const app = express();
app.use(express.json());
app.use('/', express.static(__dirname + '/public'));


// Router
app.get('/api/salon/:id', async (req, res) => {
    try {
        const { id: salonID } = req.params;

        const alumno = DBalumno();
        const items = await alumno.find();

        const alumnosSalon = [];

        for (let al of items) {
            
            // const lecturas = al.lecturas;
            const lecturas = al.lecturas.reverse();

            for (const lectura of lecturas) {

                if(lectura.salon === salonID){
                    alumnosSalon.push({
                        expediente: al.expediente,
                        nombre: al.nombre,
                        ultimaLectura: lectura
                    });
                    break;
                }

            }

        }

        res.json({
            nombre: salonID,
            alumnos: alumnosSalon
        });

    } catch (error) {
        console.log(error);
        
    }

});

app.get('/api/salon', async (req, res) => {
    try {
        const alumno = DBalumno();
        const items = await alumno.find();

        const salones = [];

        for (let al of items) {
            
            const lecturas = al.lecturas;
            // const lecturas = al.lecturas.reverse();

            for (const lectura of lecturas) {

                if(!salones.includes(lectura.salon)){
                   salones.push({nombre: lectura.salon, _id: lectura.salon})
                    break;
                }

            }

        }

        res.json(salones);

    } catch (error) {
        console.log(error);
        
    }

});

// Agregar alumno
app.post('/api/alumno', async (req, res) => {
    try {
        const { expediente, nombre } = req.body;

        const data  = {
            nombre,
            expediente,
            lecturas: [],
            ultimaLectura: {}
        }
        
        const alumno = DBalumno();
        const item = await alumno.create(data);

        res.json(item);
    } catch (error) {
        console.log(error);
    }
    
}); 

// app.get('/api/salon/:id', async (req, res) => {
//     try {
//         const {id} = req.params;
        
//         const salon = DBsalon();
//         const item = await salon.findById(id);
        
//         item.alumnos.forEach(al => {
//             al.lecturas = [];
//         });

//         res.json({
//             item: item
//         });
//     } catch (error) {
//         console.log(error);
        
//     }
    
// }); 


app.post('/api/alumno/:id/lectura', async (req, res) => {
    try {
        const { id } = req.params;
        const { temp, ox, bpm } = req.body;
        
        const salon = "EL28";

        const alumno = DBalumno();
        const item = (await alumno.find({expediente: id}))[0];
    
        const data  = {
            temp,
            ox,
            bpm,
            timestamp: Date.now(),
            salon
        }
        
        if(item.lecturas === undefined){
            item.lecturas = [];
        }

        item.ultimaLectura = data;
        item.lecturas.push(data);
        
        const done = await item.save();

        res.json({
            error: !done
        });
    
    } catch (error) {
        console.log(error);
        
    }
    

}); 

app.get('/api/alumno/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const salonID = req.query.salonID;

        const alumno = DBalumno();
        const item = (await alumno.find({expediente: id}))[0];

        res.json(item);

    } catch (error) {
        console.log(error);
        
    }

}); 


// Nayely Desiret Mendivil Ramirez - 123456
// Jose Guillermo Mendoza Gutierrez - 123445
// Isaias Reyes Lara - 12345
// voluntario - 1122

// Listen
app.listen(process.env.PORT || 4000, () => console.log('Http server listening on port ', 4000));