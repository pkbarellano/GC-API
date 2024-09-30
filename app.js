const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const payload = require('./middlewares/payload.middleware');

app.use(cors({
    origin: 'http://localhost:4000'
}));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use(morgan('combined'));

app.use(express.json({ extended: true }));

app.use(payload.body);

require('./models/index');

require('./routes/api')(app);

app.get('/api/', (req, res, next) => {

    res.send({
        message: 'API is online.'
    });
});

const port = process.env.PORT || 4001;

app.listen(port, () => console.log(`Server is running on port ${port}`));