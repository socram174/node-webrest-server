import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";


export class TodosController {
    
    //* En los controladores se suelen hacer inyecciones de dependencias (repository, services, etc)
    constructor(
        private readonly todoRepository: TodoRepository
    ){
        
    }

    public getTodos = async (req: Request, res: Response) => {

        const todos = await this.todoRepository.getAll();

        return res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id; // el + convierte el string a number

        try {
            const todo = await this.todoRepository.findById(id);
            res.json(todo);
        } catch (error) {
            res.status(400).json({error});
        }
    }

    public createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if ( error ) return res.status(400).json({error});

        const todo = await this.todoRepository.create( createTodoDto! );
        res.json(todo);

    };

    public updateTodo = async (req: Request, res: Response) => {

        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body, id
        }); 

        if( error ) return res.status(400).json({error});

        const updatedTodo = await this.todoRepository.updateById( updateTodoDto! );

        return res.json(updatedTodo);

        
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

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const deletedTodo = await this.todoRepository.deleteById(id);
        res.json(deletedTodo);
        

        //if( isNaN(id) ) return res.status(400).json({error: 'ID argument is not a number'});

        //const todo = todos.find( todo => todo.id === id );


        

        //todos.splice( todos.indexOf(todo), 1 );
     
    };
}