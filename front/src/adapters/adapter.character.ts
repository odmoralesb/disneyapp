import { IResponsePersonajes, ICharactersModel } from '../models';

export const setDataCharacters = (data: IResponsePersonajes): ICharactersModel => ({
    rows: data.records.map((r) => {
        return {
            id: r.id,
            name: r.nombre,
            age: r.edad,
            weight: r.peso,
            image: r.imagen,
            story: r.historia
        };
    })
});
