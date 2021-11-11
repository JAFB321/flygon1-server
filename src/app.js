const express = require('express');
const { DBsalon } = require('./database');

// -------------- Http Server -------------- 
const app = express();
app.use(express.json());
app.use('/', express.static(__dirname + '/public'));


// Router
app.get('/api/salon', async (req, res) => {

    const salon = DBsalon();
    const items = await salon.find({}, 'nombre');
    
    res.json(items);
}); 


app.post('/api/salon', async (req, res) => {
    const { nombre } = req.body;

    const data  = {
        nombre,
        alumnos: []
    }
    
    const salon = DBsalon();
    const item = await salon.create(data);
    
    res.json(item);
}); 


app.post('/api/salon/:id/alumno', async (req, res) => {
    const {id} = req.params;
    const { expediente, nombre } = req.body;

    const data  = {
        nombre,
        expediente,
        lecturas: []
    }
    
    const salon = DBsalon();
    const item = await salon.findById(id);

    if(item.alumnos === undefined){
        item.alumnos = [];
    }

    item.alumnos.push(data);
    const done = await item.save();
    
    res.json({
        item: done
    });
}); 

app.get('/api/salon/:id', async (req, res) => {
    const {id} = req.params;
    
    const salon = DBsalon();
    const item = await salon.findById(id);
     
    item.alumnos.forEach(al => {
        al.lecturas = [];
    });

    res.json({
        item: item
    });
}); 


app.post('/api/alumno/:id/lectura', async (req, res) => {
    const { id } = req.params;
    const { temp, ox, bpm } = req.body;


    const data  = {
        temp,
        ox,
        bpm,
        timestamp: Date.now()
    }
    
    const salon = DBsalon();
    
    const items = await salon.find({});

    // const item = items.find(({_doc: item}) => item.alumnos.includes(({_doc: al}) => {
    //     return al.expediente === id;
    // }));
    
    // const item3 = items.forEach(({_doc: item}) => console.log(item));

    const item = items.find(({_doc: item}) => {
        const al = item.alumnos.find(({_doc: al}) => al.expediente === id);

        return al !== undefined;
    });



    if(item){
        item.alumnos.forEach((al) => {
            if(al.expediente === id){
                if(al.lecturas === undefined){
                    al.lecturas = [];
                }
                
                al.ultimaLectura = data;s
                al.lecturas.push(data);
            }
        });
        const done = await item.save();
        
        res.json({
            error: !done
        });
    }
    else{
        res.json({
            error: true
        });
    }

}); 

app.get('/api/alumno/:id', async (req, res) => {
    const { id } = req.params;
    
    const salon = DBsalon();
    const items = await salon.find({});

    const item = items.find(({_doc: item}) => {
        const al = item.alumnos.find(({_doc: al}) => al.expediente === id);

        return al !== undefined;
    });



    if(item){
        const alumno = item.alumnos.find(al => {
            return al.expediente === id;
        });
        
        res.json({
            item: alumno,
            error: !alumno
        });
    }
    else{
        res.json({
            error: true
        });
    }

}); 

// Listen
app.listen(process.env.PORT, () => console.log('Http server listening on port ', 4000));