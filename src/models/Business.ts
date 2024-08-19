import mongoose, { Document, Schema } from 'mongoose';

interface IBusiness extends Document {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    website: string;
    category: string;
    tags: string[];
}

const BusinessSchema: Schema = new Schema({
    name: { 
        type: String,
        required: true,
    },
    description: { 
        type: String, 
        required: true, 
    },
    contactEmail: { 
        type: String,
        required: true,
    },
    contactPhone: { 
        type: String,
        required: true,
    },
    address: { 
        type: String,
        required: true,
    },
    website: { 
        type: String, 
    },
    category: { 
        type: String,
        required: true 
    },
    products: { type: [String] }
});

const Business = mongoose.model<IBusiness>('Business', BusinessSchema);

export default Business;
