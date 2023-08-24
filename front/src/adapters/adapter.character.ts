import { IResponsePersonajes, IResponsePersonaje, ICharactersModel } from '../models';

export const setDataCharacters = (data: IResponsePersonajes): ICharactersModel => ({
    rows: data.records.map((r) => {
        return {
            id: r.id,
            name: r.name,
            age: r.age,
            weight: r.weight,
            image: r.image,
            story: r.story
        };
    })
});

export const setPayloadCharacter = (data: IResponsePersonaje) => ({
    character: {
        id: data.character.id,
        name: data.character.name,
        age: data.character.age,
        weight: data.character.weight,
        image: data.character.image,
        story: data.character.story
    }
});
