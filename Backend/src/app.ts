import express from 'express';
import UserRoutes from './routes/UserRoutes';
import { PORT } from './config';

const app = express();

app.use(express.json());


app.use('/user', UserRoutes);
app.get('/', (req, res) => {
    res.send("Hello World");
})
app.listen(PORT , ()=> {
    console.log("listening on port " + PORT)
})