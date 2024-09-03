import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";


export class TodosController {
    
    //* En los controladores se suelen hacer inyecciones de dependencias (repository, services, etc)
    constructor(){
        
    }

    public getTodos = async (req: Request, res: Response) => {

        const todos = await prisma.todo.findMany();
            
        return res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id; // el + convierte el string a number
        if( isNaN(id) ) return res.status(400).json({error: 'ID argument is not a number'});

        //const todo = todos.find( todo => todo.id === id );

        const todo = await prisma.todo.findFirst({
            where:{
                id: id
            }
        });

        ( todo ) 
            ? res.json(todo)
            : res.status(404).json({error: `TODO with id ${id} not found`});
    }

    public createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if ( error ) return res.status(400).json({error});

        const todo = await prisma.todo.create({
            data: createTodoDto!// el ! es para decirle a typescript que no puede ser null
        });


        res.json(todo);
    };

    public updateTodo = async (req: Request, res: Response) => {

        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body, id
        }); 

        if( error ) return res.status(400).json({error});


        const todo = await prisma.todo.findFirst({
            where:{
                id: id
            }
        });

        if( !todo ) return res.status(404).json({error: `TODO with id ${id} not found`});

        //if( !text ) return res.status(400).json({error: 'Text property is required'});
    

        // todo.text = text || todo.text;// si text es undefined, se queda con el valor anterior
        // ( completedAt === 'null')
        //     ? todo.completedAt = null
        //     : todo.completedAt = new Date( completedAt || todo.completedAt );

        const updatedTodo = await prisma.todo.update({
            where:{ id },
            data: updateTodoDto!.values
        });



        // OJO, el todo se esta pasando por referencia
        // todos.forEach( (todo, index) => {
        //     if( todo.id === id ) todos[index] = todo;
        // });


        res.json(updatedTodo);

    };

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        const todo = await prisma.todo.findFirst({
            where:{
                id: id
            }
        });

        //if( isNaN(id) ) return res.status(400).json({error: 'ID argument is not a number'});

        //const todo = todos.find( todo => todo.id === id );


        if( !todo) return res.status(404).json({error: `TODO with id ${id} not found`});

        const deleted = await prisma.todo.delete({
            where: {
                id: id
            }
        });

        ( deleted)
            ? res.json(deleted)
            : res.status(400).json({error: `Todo with id ${id} not found`});

        //todos.splice( todos.indexOf(todo), 1 );
        res.json({todo, deleted});
    };
}