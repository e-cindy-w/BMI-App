const express = require('express');
const app = express();
// const port = process.env.PORT || 3000;
const port = 3000;
const bodyParser = require('body-parser');
const { response, raw } = require('express');
const urlEncodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();
const fileName = "bmiFile.json";
const fs = require('fs');

let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', (request, response)=>{
    response.render('bmiCalc');
});

app.post('/calculateBMI', urlEncodedParser, (request, response)=>{
    var height = parseFloat(request.body.height);
    var weight = parseFloat(request.body.weight);
    var bmi = (weight/Math.pow(height, 2)).toFixed(3);
    var status = "";

    if(bmi <= 18.5){
        status = "Underweight";
    }else if(bmi > 18.5 && bmi <= 24.9){
        status = "Normal weight";
    }else if(bmi >= 25 && bmi <= 29.9){
        status = "Overweight";
    }else if(bmi >= 30 && bmi <= 34.9){
        status = "Obesity (Class I)";
    }else if(bmi >= 35 && bmi <= 39.9){
        status = "Obesity (Class II)";
    }else if(bmi >= 40){
        status = "Obesity (Class III)";
    }

    const bmiVal = request.body;
    const bmiObject = {Height: height, Weight: weight, BMI: bmi, Status: status}

    data.push(bmiObject);
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));

    return response.render('bmiResults', {bmiObject});
});

app.get('/reports', (request, response) => {
    response.render('bmiReports', {data});

})

app.listen(port);
// console.log(`Server is listening on port ${port}`);
console.log('Server is listening on port 3000');