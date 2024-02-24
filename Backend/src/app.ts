import express, { NextFunction , Request , Response } from 'express';
import UserRoutes from './routes/UserRoutes';
import { PORT } from './config';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());


app.use('/user', UserRoutes);
app.get('/', (req, res) => {
    res.send("Hello World");
})

app.use((err : any, req : Request, res : Response, next : NextFunction) => {
    res.status(500).send(err.message);
});
app.listen(PORT , ()=> {
    console.log("listening on port " + PORT)
})