require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const apiRoutes = require('./routes/api');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', apiRoutes);
app.listen(4000, () => console.log('Connected'));
