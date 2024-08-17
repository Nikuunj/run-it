const express = require('express');
const bodyParser = require('body-parser');
const { VM } = require('vm2'); 
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello there!');
});

app.post('/run', (req, res) => {
    const code = req.body.code;
    let output = [];
    const vm = new VM({
        timeout: 1000,  
        sandbox: {
            console: {
                log: (...args) => {
                    args = args.map(arg => {
                        if (Array.isArray(arg)) {
                            return '[' + arg.map(item => JSON.stringify(item)).join(', ') + ']';
                        } else if (typeof arg === 'object') {
                            return JSON.stringify(arg, null, 2);
                        } else {
                            return arg;
                        }
                    });
                    output.push(args.join(' '));
                }
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
