
export class CreateTodoDto {

    private constructor( // esto es un constructor privado, solo se puede acceder a el desde la clase o metodo estatico
        public readonly text: string
    ){

    }

    static create( props: {[key:string]: any}):[string?, CreateTodoDto?]{ // [string?, CreateTodoDto?] es un array de 2 elementos, el primero es un string opcional (el error) y el segundo es un CreateTodoDto opcional

        const { text } = props;

        if( !text || text.length === 0 ) return ['Text property is required', undefined];
        
        
        return [undefined, new CreateTodoDto(text)];
    }


}