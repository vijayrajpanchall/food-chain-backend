import mongoose, { Schema, Document, Model } from "mongoose";

interface VandorDoc extends Document {
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: number;
    address: string;
    phone: number;
    email: string;
    password: string;
    salt: string;
    serviceAvailable: string;
    coverImages: [string];
    rating: number;
    foods: any;
}

const VandorSchema: Schema = new Schema({
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: { type: [String], required: true },
    pincode: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean, required: true },
    coverImages: { type: [String], required: true },
    rating: { type: Number, required: true },
    foods: [{ type: Schema.Types.ObjectId, ref: 'Food' }]
},
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
                delete ret.salt;
                delete ret.__v;
                delete ret.createdAt;
                delete ret.updatedAt;
            },
        },
        timestamps: true,
    }
);

const Vandor = mongoose.model<VandorDoc>("Vandor", VandorSchema);

export { Vandor }