const express = require('express')
const db = require('./db')
const cors = require('cors')
const CircularJSON = require('circular-json')

const app = express();
app.use(cors());
app.use(express.json())

//all
app.get('/api/get', (req,res)=>{

    db.query("SELECT * FROM Tabel ", (err,result)=>{
        if(err) {
            console.log(err)
            res.status(500).json({ error: 'Failed to store data' });
            return;
        }   
        res.send(result)
        res.status(200).json({error: 'Data transfer success'})
    });
});

//one
app.get('/api/getwithId/:id', (req,res)=>{
    const id = req.params.id;
    db.query("SELECT b.ID, Name, DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),Date)), '%Y') + 0 AS Age, BloodSugar, Creatinine, HBA1C, Sodium, HDL, LDL FROM userDetails As a, predicted As b WHERE a.ID = ? AND b.ID = ?", [id,id], (err,result)=> {
        if(err) {
            console.log(err)
            res.status(500).json({error: 'Failed to get'});
            return;
        }
        res.send(result)
    });
});

app.get('/api/model/:id', (req,res)=>{
    const id = req.params.id;
    console.log(id)
    db.query("SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),Date)), '%Y') + 0 AS Age FROM userDetails WHERE ID = ?", id, (err,result)=> {
        if(err) {
            console.log(err)
            res.status(500).json({error: 'Failed to get'});
            return;
        }
        res.send(result)
    });
});

//for visualization
app.get('/api/node/:id', (req,res)=>{
    const id = req.params.id;
    db.query("SELECT Name, DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),Date)), '%Y') + 0 AS Age, BloodSugar, Creatinine, HBA1C, Sodium, HDL, LDL FROM userDetails AS a, predicted AS b WHERE a.ID = ? AND b.ID = ?", [id,id], (err,result)=> {
        if(err) {
            console.log(err)
            res.status(500).json({error: 'Failed to get'});
            return;
        }
        console.log(result)
        res.send(result)
    });
});

//login
app.post('/api/login', (req,res)=>{
    const { email, id } = req.body;
    db.query("SELECT UserType FROM userDetails WHERE Email = ? AND ID = ?", [email,id], (err,result)=> {
        if(err) {
            console.log(err)
            res.status(500).json({error: 'Failed to get'});
            return;
        }
        res.send(result)
    });
});

//get data for doctor page
app.get('/api/getpatient/:id', (req,res)=>{
    const id  = req.params.id

    db.query("SELECT ID, Name, Email, Date, Sex, Hospital, Department, UserType, DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),Date)), '%Y') + 0 AS Age FROM userDetails WHERE Doctor = (SELECT Name FROM userDetails WHERE ID = ?) OR ID = ?", [id,id], (err,result)=>{
        if(err) {
            console.log(err)
            res.status(500).json({ error: 'Failed to store data' });
            return;
        }   
        console.log(result[0]);
        res.send(result)
        //res.status(200).json({error: 'Data transfer success'})
    });
});

//get doctor details
app.get('/api/getDoctor/:id', (req,res)=>{
    const id  = req.params.id

    db.query("SELECT Name, Email, ID, Date, Sex, Hospital,Department FROM userDetails WHERE ID = ?", id, (err,result)=>{
        if(err) {
            console.log(err)
            res.status(500).json({ error: 'Failed to store data' });
            return;
        }   
        console.log(result[0]);
        res.send(result)
        //res.status(200).json({error: 'Data transfer success'})
    });
});

//get patient details for patient page
app.get('/api/getpatientdetails/:id', (req,res)=>{
    const id  = req.params.id

    db.query("SELECT ID, Name, Email, Date, Sex, Hospital, Doctor FROM userDetails WHERE ID = ?", id, (err,result)=>{
        if(err) {
            console.log(err)
            res.status(500).json({ error: 'Failed to store data' });
            return;
        }   
        console.log(result[0]);
        res.send(result)
        //res.status(200).json({error: 'Data transfer success'})
    });
});

//get prescription
app.get('/api/getpres/:id', (req,res)=>{
    const id  = req.params.id

    db.query("SELECT a.ID, a.Name, DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),a.Date)), '%Y') + 0 AS Age, Medicine FROM userDetails AS a, prescription AS b WHERE a.ID = ? AND b.ID = ?", [id,id], (err,result)=>{
        if(err) {
            console.log(err)
            res.status(500).json({ error: 'Failed to store data' });
            return;
        }   
        console.log(result[0]);
        res.send(result)
        //res.status(200).json({error: 'Data transfer success'})
    });
});

//insert
app.post('/api/set', (req,res)=>{
    const { name, email, id, date, sex, hospital, department, doctor, usertype } = req.body;

    db.query('INSERT INTO userDetails (ID, Name, Email, Date, Sex, Hospital, Department, Doctor, UserType) VALUES (?,?,?,?,?,?,?,?,?)', [id,name,email,date,sex,hospital,department,doctor,usertype], (err,result)=>{
        if(err) {
            console.log(err)
            res.status(500).json({ error: 'Failed to store data' });
            return;
        }
        console.log(result)
        res.status(200).json({error: 'Data transfer success'})
    });
});

// insert prescription
app.post('/api/pres', (req,res)=>{
    const { id, medicine } = req.body;

    db.query('INSERT INTO prescription (ID, Medicine) VALUES (?,?)', [id,medicine], (err,result)=>{
        if(err) {
            console.log(err)
            res.status(500).json({ error: 'Failed to store data' });
            return;
        }
        console.log(result)
        res.status(200).json({error: 'Data transfer success'})
    });
});

//insert predicted data
app.post('/api/storemodel', (req,res)=>{
    const { id, BloodSugar, Creatinine, HBA1C, Sodium, HDL, LDL } = req.body;
    // console.log(id)
    // db.query('DELETE FROM predicted WHERE ID = ?', id, (err,result)=>{
    //     if(err) {
    //         console.log(err)
    //         res.status(500).json({ error: 'Failed to delete' });
    //         return;
    //     }
    //     console.log(result)
    //     res.status(200).json({error: 'Delete success'})
    // });
    db.query('DELETE FROM predicted WHERE ID = ?', id, (err,result)=>{
        if(err) {
            console.log(err)
            db.rollback(() => {
                res.status(500).json({ error: 'Error deleting record from the database' });
            });
        } else{
            db.query('INSERT INTO predicted (ID, BloodSugar, Creatinine, HBA1C, Sodium, HDL, LDL) VALUES (?,?,?,?,?,?,?)', [id,BloodSugar,Creatinine,HBA1C,Sodium,HDL,LDL], (insertError, insertResult) => {
                if (insertError) {
                    console.error('Error adding new details:', insertError);
                    db.rollback(() => {
                    res.status(500).json({ error: 'Error adding new details to the database' });
                    });
                } else {
                    // Commit the transaction
                    db.commit((commitError) => {
                    if (commitError) {
                        console.error('Error committing transaction:', commitError);
                        db.rollback(() => {
                        res.status(500).json({ error: 'Error committing transaction' });
                        });
                    } else {
                        res.status(200).json({ message: 'Record deleted and new details added successfully' });
                    }
                    });
                }
            });
        }
        // console.log(result)
        // res.status(200).json({error: 'Data transfer success'})
    });
});

//delete
app.delete('api/delete/:id', (req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM Table WHERE id = ?", id, (err,result)=>{
        if(err) {
            console.log(err)
            res.status(500).json({ error: 'Failed to store data' });
            return;
        }
        res.status(200).json({error: 'Data transfer success'})
    });
})

app.listen(5000, ()=>{
    console.log('Server is running on ',5000)
})


//SELECT b.ID, Name, DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),Date)), '%Y') + 0 AS Age, Creatinine, HBA1C, Sodium, HDL, LDL FROM userDetails As a, prediction As b WHERE a.ID = ? AND b.ID = ?