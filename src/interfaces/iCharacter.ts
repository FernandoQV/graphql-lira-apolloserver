enum Gender{
    MALE='MALE',
    FEMALE='FEMALE'
}
enum Race{
    Hylian="Hylian",
    Garrudo="Garrudo",
    Fairy="Fairy"
}
export interface ICharacter{
    _id:string,
    name:string,
    gender?:Gender,
    race?:Race,
    games?:Array<string>,
    image?:String,
    countGames?:number,
}