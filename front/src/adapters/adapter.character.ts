import { IResponsePersonajes, ICharactersModel } from '../models';

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
