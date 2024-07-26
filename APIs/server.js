import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express() //criamos uma variavel 'app' e passamos express como função
app.use(express.json())
app.use(cors()) //o cors permite que qualquer front se conecte ao nosso back, mas poderiamos especificar pela url.


app.post('/usuarios', async (req, res) => { //rota para criar um usuário

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body) 

})

app.get('/usuarios', async (req, res) =>  { //rota listando as informaçoes de usuário
    let users = []

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            
            }
        })
    } else {
        users = await prisma.user.findMany()
    }

    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => { //rota para att um usuário | /: indica a criação de uma variavel

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body) 

})

app.delete('/usuarios/:id', async (req,res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

        res.status(200).json({message: "Usuário Deletado com Sucesso!" }) 
})

app.listen(3000)





/*
db :
patricianeves18866
r1AFlEt3bNMAVUKt
*/



/* 
Criar nosso API de usuarios:
1) Criar um usuarios
2) Listar todos os usuarios
3) Editar um usuario
4) Deletar um usuario
*/


/* 
As rotas precisam de:
1) Tipos de rotas / HTTP método
2) Endereço (www.lojadozé.com/produtos ('produtos' seria o nosso endereço))
*/

