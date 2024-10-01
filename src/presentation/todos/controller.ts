import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, CustomError, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";


export class TodosController {
    
    //* En los controladores se suelen hacer inyecciones de dependencias (repository, services, etc)
    constructor(
        private readonly todoRepository: TodoRepository
    ){
        
    }

    private handleError = (res: Response, error: unknown) =>{ // es unknown porque no sabemos que tipo de error es
        if( error instanceof CustomError ){
            res.status(error.statusCode).json({error: error.message});
            return;
        }

        //guardar el error en un log
        res.status(500).json({error: 'Internal Server Error - check logs'});
    }

    public getTodos = (req: Request, res: Response) => {

        new GetTodos( this.todoRepository)
            .execute()
            .then( todos => res.json(todos) )
            .catch( error => this.handleError(res, error) );

    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id; // el + convierte el string a number

        new GetTodo( this.todoRepository)
            .execute(id)
            .then( todo => res.json(todo) )
            .catch( error => this.handleError(res, error) );

    }

    public createTodo = (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if ( error ) return res.status(400).json({error});

        new CreateTodo( this.todoRepository)
            .execute( createTodoDto! )
            .then( todo => res.status(201).json(todo) )
            .catch( error => this.handleError(res, error) );

    };

    public updateTodo = (req: Request, res: Response) => {

        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body, id
        }); 

        if( error ) return res.status(400).json({error});

        new UpdateTodo( this.todoRepository)
            .execute( updateTodoDto! )
            .then( todo => res.json(todo) )
            .catch( error => this.handleError(res, error) );

        
        //if( !text ) return res.status(400).json({error: 'Text property is required'});
    

        // todo.text = text || todo.text;// si text es undefined, se queda con el valor anterior
        // ( completedAt === 'null')
        //     ? todo.completedAt = null
        //     : todo.completedAt = new Date( completedAt || todo.completedAt );




        // OJO, el todo se esta pasando por referencia
        // todos.forEach( (todo, index) => {
        //     if( todo.id === id ) todos[index] = todo;
        // });


    };

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        new DeleteTodo( this.todoRepository)
            .execute(id)
            .then( todo => res.json(todo) )
            .catch( error => this.handleError(res, error) );
        

        //if( isNaN(id) ) return res.status(400).json({error: 'ID argument is not a number'});

        //const todo = todos.find( todo => todo.id === id );


        

        //todos.splice( todos.indexOf(todo), 1 );
     
    };
}