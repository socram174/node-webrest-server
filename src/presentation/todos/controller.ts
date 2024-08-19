import { Request, Response } from "express";

const todos = [
    {id: 1, text: 'Hello', completedAt: new Date()},
    {id: 2, text: 'World', completedAt: null},
    {id: 3, text: 'Bye', completedAt: new Date()}
]

export class TodosController {
    
    //* En los controladores se suelen hacer inyecciones de dependencias (repository, services, etc)
    constructor(){
        
    }

    public getTodos = (req: Request, res: Response) => {
            
        return res.json(todos);
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id; // el + convierte el string a number
        if( isNaN(id) ) return res.status(400).json({error: 'ID argument is not a number'});

        const todo = todos.find( todo => todo.id === id );

        ( todo ) 
            ? res.json(todo)
            : res.status(404).json({error: `TODO with id ${id} not found`});
    }

    public createTodo = (req: Request, res: Response) => {

        const  { text } = req.body;
        if( !text ) return res.status(400).json({error: 'Text property is required'});

        const newTodo = {
            id: todos.length + 1,
            text,
            completedAt: null
        }

        todos.push(newTodo);

        res.json(newTodo);
    };

    public updateTodo = (req: Request, res: Response) => {

        const id = +req.params.id;
        if( isNaN(id) ) return res.status(400).json({error: 'ID argument is not a number'});

        const todo = todos.find( todo => todo.id === id );
        if( !todo ) return res.status(404).json({error: `TODO with id ${id} not found`});

        const { text, completedAt } = req.body;
        //if( !text ) return res.status(400).json({error: 'Text property is required'});
    

        todo.text = text || todo.text;// si text es undefined, se queda con el valor anterior
        ( completedAt === 'null')
            ? todo.completedAt = null
            : todo.completedAt = new Date( completedAt || todo.completedAt );



        // OJO, el todo se esta pasando por referencia
        // todos.forEach( (todo, index) => {
        //     if( todo.id === id ) todos[index] = todo;
        // });


        res.json(todo);

    };

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        if( isNaN(id) ) return res.status(400).json({error: 'ID argument is not a number'});

        const todo = todos.find( todo => todo.id === id );

        if( !todo) return res.status(404).json({error: `TODO with id ${id} not found`});

        todos.splice( todos.indexOf(todo), 1 );
        res.json(todo);
    };
}