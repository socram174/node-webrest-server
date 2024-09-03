
export class UpdateTodoDto {

    private constructor( // esto es un constructor privado, solo se puede acceder a el desde la clase o metodo estatico
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: string,
    ){

    }

    get values() {

        const returnObj: {[key: string]: any} = {};

        if( this.text) returnObj.text = this.text;
        if( this.completedAt) returnObj.completedAt = this.completedAt;

        return returnObj;
    }

    static create( props: {[key:string]: any}):[string?, UpdateTodoDto?]{ // [string?, CreateTodoDto?] es un array de 2 elementos, el primero es un string opcional (el error) y el segundo es un CreateTodoDto opcional

        const { id, text, completedAt } = props;
        let newCompletedAt = completedAt;

        if( !id || isNaN( Number(id)) ){
            return ['ID must be a valid number'];
        };

        if ( completedAt ){
            newCompletedAt = new Date( completedAt );
            if( newCompletedAt.toString() === 'Invalid Date'){
                return ['CompletedAt must be a valid date'];
            }
        }
        
        return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
    }


}