export interface CreateVandorInput{
    name: string;
    ownerName: string;
    foodType: string;
    pincode: number;
    address: string;
    phone: number;
    email: string;
    password: string;
}

export interface EditVandorInput{
    name: string;
    ownerName: string;
    phone: number;
    address: string;
    foodType: [string];
}
export interface VandorLoginInput{
    email: string;
    password: string;
}

export interface VandorPayload{
    _id: string;
    email: string;
    name: string;
    foodType: [string];
}