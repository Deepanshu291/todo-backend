import { Router } from "express";
import { addTodo, deleteTodo, getTodo, getTodoById, updateTodo } from "../controllers/todo.controller";

export const todoRouter = Router()

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Get all todos
 *     description: Retrieve a list of all todos.
 *     responses:
 *       200:
 *         description: A list of todos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo' # Reference to your Todo model schema

 *   post:
 *     summary: Add a new todo
 *     description: Create a new todo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo' # Reference to your Todo model schema
 *     responses:
 *       201:
 *         description: Todo created successfully.

 */
todoRouter.route("/").get(getTodo)
                        .post(addTodo)


/**
 * @swagger
 * /api/{id}:
 *   put:
 *     summary: Update a todo
 *     description: Update a todo by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the todo to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo' # Reference to your Todo model schema
 *     responses:
 *       202:
 *         description: Updated todo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo' # Reference to your Todo model schema

 *   delete:
 *     summary: Delete a todo
 *     description: Delete a todo by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the todo to delete.
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Todo deleted successfully.

 *   patch:
 *     summary: Get a todo by ID and toggle Isdone field
 *     description: Retrieve a todo by its ID and toggle the Isdone field.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the todo to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Updated todo with toggled Isdone field.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo' # Reference to your Todo model schema

 */
todoRouter.route("/:id").put(updateTodo)
                        .delete(deleteTodo)
                        .patch(getTodoById)
