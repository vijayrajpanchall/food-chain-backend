import { Request, Response, NextFunction } from "express";
import { CreateVandorInput } from "../dto/Vandor.dto";
import { Vandor } from "../models";
import { GenerateSalt, GeneratePassword } from "../utility";

export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => { 
    const { name, ownerName, foodType, pincode, address, phone, email, password } = 
    <CreateVandorInput>req.body;
    console.log(req.body);

    const existingVendor = await Vandor.findOne({ email: email });
    if (existingVendor) {
        return res.json({ message: "Vendor already exists" });
    }

    const salt = await GenerateSalt();

    const hashedPassword = await GeneratePassword(password, salt);

    const createVandor = await Vandor.create({
        name: name,
        ownerName: ownerName,
        foodType: foodType,
        pincode: pincode,
        address: address,
        phone: phone,
        email: email,
        password: hashedPassword,
        rating: 0,
        salt: salt,
        serviceAvailable: "lsjldkfjlk",
        coverImages: []

    });
    
    return res.json(createVandor);
};

export const GetVandors = async (req: Request, res: Response, next: NextFunction) => { };

export const GetVandorByID = async (req: Request, res: Response, next: NextFunction) => { };