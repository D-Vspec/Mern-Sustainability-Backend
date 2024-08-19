import express, { Application, Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Business from './models/Business';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req: Request, res: Response) => {                 //routes
    res.send('MERN Sustainability Project Backend');
});


app.post('/api/become-a-creator', async (req: Request, res: Response) => {
    try {
        const newBusiness = new Business(req.body);
        const savedBusiness = await newBusiness.save();
        res.status(201).json(savedBusiness);
    } catch (error) {
        res.status(500).json({ message: 'Error creating business', error });
    }
});


app.get('/api/businesses', async (req: Request, res: Response) => {
    try {
        const businesses = await Business.find();
        res.status(200).json(businesses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving businesses', error });
    }
});

app.get('/api/businesses/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Validate the ID
        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: `${id} is not valid?`});
        }

        const business = await Business.findById(id);

        if (business) {
            res.status(200).json(business);
        } else {
            res.status(404).json({ message: 'Business not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving business', error });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

