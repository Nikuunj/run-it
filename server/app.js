const express = require('express');
const bodyParser = require('body-parser');
const { VM } = require('vm2'); 
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello fucker');
});

app.post('/run', (req, res) => {
    const code = req.body.code;
    let output = [];
    const vm = new VM({
        timeout: 1000,  
        sandbox: {
            console: {
                log: (...args) => output.push(args.join(' '))
            }
        }     
    });
    
    try {
        vm.run(code);
        res.json({ output: output.length > 0 ? output.join('\n') : '' });
    } catch (err) { 
        res.json({ output: 'Error: ' + err.message }); 
    }
});

app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});
