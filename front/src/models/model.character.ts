export interface IImageModel {
    id: number;
    path: string;
}

export interface ICharacterModel {
    id: number;
    name: string;
    age: number;
    weight: string;
    image: IImageModel;
    story: string;
}

export interface ICharactersModel {
    rows: ICharacterModel[];
}
