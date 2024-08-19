import { Router } from "express";
import { TodoRoutes } from "./todos/routes";


export class AppRoutes {

    static get routes(): Router{

        const router = Router();

        router.use('/api/todos',TodoRoutes.routes  );// esto es un middleware

        return router;
    }
}