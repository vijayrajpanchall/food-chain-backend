import { Request, Response, NextFunction } from "express";
import { CreateVandorInput } from "../dto/Vandor.dto";
import { Vandor } from "../models";
import { GenerateSalt, GeneratePassword } from "../utility";

export const FindVandor = async (id: string | undefined, email?: string) => {
    let vandor;
    if (id) {
        vandor = await Vandor.findById(id);
    } else if (email) {
        vandor = await Vandor.findOne({ email: email });
    }
    return vandor;
};

export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => { 
    const { name, ownerName, foodType, pincode, address, phone, email, password } = 
    <CreateVandorInput>req.body;
    console.log(req.body);

    const existingVendor = await FindVandor(undefined, email);
    if (existingVendor) {
        return res.json({ message: "Vendor already exists" });
    }

    const salt = await GenerateSalt();

    const hashedPassword = await GeneratePassword(password, salt);

    const createVandor = await Vandor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType,
        email: email,
        password: hashedPassword,
        salt: salt,
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: [],
        foods: []
    });
    
    return res.json(createVandor);
};

export const GetVandors = async (req: Request, res: Response, next: NextFunction) => { 
    const vandors = await Vandor.find();
    if ( vandors !== null) {
        return res.json(vandors);
    }
    return res.json({ message: "No Vandors Found" });
};

export const GetVandorByID = async (req: Request, res: Response, next: NextFunction) => { 
    const vandorId = req.params.id;
    const vandor = await await FindVandor(vandorId);
    if ( vandor !== null) {
        return res.json(vandor);
    }
    return res.json({ message: "No Vandor Found" });
};