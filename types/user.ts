export type User = {
    id: number;
    email?: string;
    username: string;
    password?: string;
    name: {
        firstname: string;
        lastname: string;
    };
    address: {
        city: string;
        street: string;
        number: number;
        zipcode: string;
        geolocation: {
            lat: string;
            long: string;
        };
    };
    phone: string;
    isAdmin: boolean;
};

export interface LoginFrom {
    username: string;
    password: string;
}
