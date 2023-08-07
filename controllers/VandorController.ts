import { Request, Response, NextFunction } from "express";
import { EditVandorInput, VandorLoginInput } from "../dto/Vandor.dto";
import { FindVandor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../utility";
import { Food } from '../models';

export const VandorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <VandorLoginInput>req.body;

    const existingVendor = await FindVandor('', email);

    if (existingVendor !== null && existingVendor !== undefined) {
        const validation = await ValidatePassword(password, existingVendor.password, existingVendor.salt);
        if (validation) {
            const signature = await GenerateSignature({
                _id: existingVendor._id,
                email: existingVendor.email,
                name: existingVendor.name,
                foodType: existingVendor.foodType
            });
            return res.json({ message: "Login successful", signature });
        }

    } else {
        return res.json({ message: "Login credential not valid" });
    }
};

export const GetVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {
        const existingVendor = await FindVandor(user._id);
        return res.json(existingVendor);
    }
    return res.json({ "message": "vandor info not found" });
};

export const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { name, ownerName, phone, address, foodType } = <EditVandorInput>req.body;
    const user = req.user;

    if (user) {
        const existingVendor = await FindVandor(user._id);
        if (existingVendor !== null && existingVendor !== undefined) {
            existingVendor.name = name;
            existingVendor.ownerName = ownerName;
            existingVendor.phone = phone;
            existingVendor.address = address;
            existingVendor.foodType = foodType;
            const savedResult = await existingVendor.save();
            return res.json(savedResult);
        }
    }

    return res.json({ "message": "vandor info not found" });

};

export const UpdateVandorCoverImage = async (req: Request, res: Response, next: NextFunction) => {
    
    const user = req.user;

    if (user) {
        const existingVendor = await FindVandor(user._id);
        if (existingVendor !== null && existingVendor !== undefined) {
            const files = req.files as [Express.Multer.File];
            const images = files.map((file: Express.Multer.File) => file.filename);
            existingVendor.coverImages.push(...images);
            const savedResult = await existingVendor.save();
            return res.json(savedResult);
        }
    }
    return res.json({ "message": "Something went wrong" });
};
export const UpdateVandorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {
        const existingVendor = await FindVandor(user._id);
        if (existingVendor !== null && existingVendor !== undefined) {
            existingVendor.serviceAvailable = req.body.serviceAvailable;
            const savedResult = await existingVendor.save();
            return res.json(savedResult);
        }
        return res.json(existingVendor);
    }

    return res.json({ "message": "vandor info not found" });

};

export const addFood = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {
        const { name, description, category, foodType, readyTime, price } = req.body;
        const vendor = await FindVandor(user._id);
        console.log("vendor: ",vendor);
        if (vendor !== null && vendor !== undefined) {

           const files = req.files as [Express.Multer.File]
           const images = files.map((file: Express.Multer.File) => file.filename);

            const food = await Food.create({
                vandorId: vendor._id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                readyTime: readyTime,
                price: price,
                image: images,
                rating: 0,
                food: []
            });            
            vendor.foods.push(food);
            const savedResult = await vendor.save();
            return res.json(savedResult);
        }
    }

    return res.json({ "message": "vandor info not found" });

};

export const getFoods = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {
        const foods = await Food.find({ vandorId: user._id });

        if (foods !== null && foods !== undefined) {
            return res.json(foods);
        }
    }

    return res.json({ "message": "vandor info not found" });
};