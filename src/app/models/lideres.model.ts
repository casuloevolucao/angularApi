export class Lideres {
    constructor(
        init?: Partial<Lideres>
    ){
        Object.assign(this, init);
    }

    id:string
    nome:string
    idade:number
    foto:string
    contato:string
    email:string
}
