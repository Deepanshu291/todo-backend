import express,{Express,Request,Response} from 'express'
import cors,{CorsOptions} from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import {config} from 'dotenv'
import { ConnectDB } from './utils/database'
import { errorHandler, notFound } from './middleware/error.middle'
import { todoRouter } from './routes/todo.route'
import swaggerui from 'swagger-ui-express'
import { SwaggerSpecs } from './utils/swaggerdocs'



config()
const app:Express = express()
const corsOption:CorsOptions ={
    origin:"*",
    credentials:true
} 
ConnectDB()
app.use(express.json())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended:true}))
    .use(morgan("dev"))
    .use(cors(corsOption))
    


app.get("/", (req: Request, res: Response) => {
  res.send("Server working build by TypeScript 🔥");
});

app.use("/api-docs", swaggerui.serve, swaggerui.setup(SwaggerSpecs))
app.use("/api", todoRouter)

app.use(notFound)
    .use(errorHandler)

const port = process.env.PORT || 8000



app.listen(port, ()=> console.log(`Server running on port ${port} 🔥`))