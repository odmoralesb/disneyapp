export interface IRequestRegister {
    username: string;
    firstname: string;
    lastname: string;
    password: string;
}

export interface IRequestCreateCharacter {
    name: string;
    age: string;
    weight: string;
    story: string;
    image: File;
}

export interface IRequestUpdateCharacter {
    name: string;
    age: string;
    weight: string;
    story: string;
}
