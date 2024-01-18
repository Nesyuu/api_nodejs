const express = require('express')
const app = express()   
const ambulances = require('./data/ambulances.json')
const fs = require('fs');
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.get('/ambulances/:id', (req , res) => { 
    const id = parseInt(req.params.id)
    const ambulance = ambulances.find(ambulance => ambulance.id === id) 
    if (ambulance) {
        res.status(200).json(ambulance)
    } else {
        res.status(404).json('cannot find')
    }
    })

app.get('/ambulances', (req ,res) =>{
        res.status(200).json(ambulances)
    })

app.post('/ambulances',function(req , res) {
    console.log(req.body)
    ambulances.push(req.body)
    res.status(201).json(ambulances)
})

app.get('/ambulances/:id', (req , res) => { 
    const id = parseInt(req.params.id)
    const ambulance = ambulances.find(ambulance => ambulance.id === id) 
    if (ambulance) {
        res.status(200).json(ambulance)
    } else {
        res.status(404).json('cannot find')
    }
})

app.put('/ambulances/:id', (req , res ) => {
    const id = parseInt(req.params.id)
    let ambulance = ambulances.find(ambulance => ambulance.id === id);
    ambulance.name = req.body.name;
    ambulance.age = req.body.age;
    ambulance.date = req.body.date;
    
    res.status(303).json(ambulance)
})

app.delete('/package/:id',(req,res) => {
    const id = parseInt(req.params.id);
    let ambulance = ambulances.find(ambulance => ambulance.id === id);
    ambulances.splice(ambulances.indexOf(ambulance),1);
    
    res.status(200).json(ambulances)
})

app.delete('/ambulances/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // Read the content of the ambulances.json file
    fs.readFile('ambulances.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        let ambulances = JSON.parse(data);

        // Find the index of the ambulance with the specified ID
        const index = ambulances.findIndex(ambulance => ambulance.id === id);

        if (index !== -1) {
            // Remove the element at the found index
            const deletedAmbulance = ambulances.splice(index, 1)[0];

            // Write the updated ambulances array back to the file
            fs.writeFile('ambulances.json', JSON.stringify(ambulances), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                res.status(200).json(deletedAmbulance);
            });
        } else {
            res.status(404).json({ error: 'Ambulance not found' });
        }
    });
});

app.listen(8080, () => {console.log('Server is on')})

