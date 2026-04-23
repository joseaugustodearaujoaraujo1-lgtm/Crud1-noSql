import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import dns from "dns"
import cors from "cors"
import usuario from "./models/usuario.js"

dotenv.config()
dns.setServers(["8.8.8.8", "8.8.4.4"])

const PORTA = 3001
const app = express()
async function verificarConexao() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Conectado com susseco!")
    } catch (error) {
        console.log("Deu erro!", error)
    }
}

verificarConexao()

app.use(express.json())
app.use(cors())

app.post("/usuarios", async (req, res) => {
    try {
        const nome = req.body.nome?.trim()
        const email = req.body.email?.trim()
        const senha = req.body.senha?.trim()

        if (!nome) {
            return res.status(409).json({ "Informacao": "O campo NOME não pode estar vazio!" })
        } else if (!email) {
            return res.status(409).json({ "Informacao": "O campo E-MAIL não pode estar vazio!" })
        } else if (!senha) {
            return res.status(409).json({ "Informacao": "O campo SENHA não pode estar vazio!" })
        }

        const verificarDuplicidade = await usuario.findOne({ email })

        if (verificarDuplicidade) {
            return res.status(422).json({ "Informação": "Houve um erro de duplicidade!" })
        }

        const criarUsuario = await usuario.create({
            nome: nome,
            email: email,
            senha: senha
        })
        res.status(201).json(criarUsuario)
    } catch (error) {
        res.status(500).json({ "informação": error })
    }
})

app.get("/usuarios", async (req, res) => {
    try {
        const buscarUm = await usuario.find()
        res.json(buscarUm)
    } catch (error) {
        res.status(500).json({ "informação": error })
    }
})


app.get("/usuarios/:email", async (req, res) => {
    try {
        const buscarPorEmail = await usuario.findOne({email:req.params.email})
        
        if(buscarPorEmail){
            res.status(200).json(buscarPorEmail)
        }else if(!buscarPorEmail){
                res.status(404).json({"informcao": "Uusario não encontrado!"})
            console.log("erro")
        }

    } catch (error) {
        res.status(500).json({ "informação": error })
    }
})

app.patch("/usuarios/:id", async (req, res) => {
    try {
        const nome = req.body.nome?.trim()
        const email = req.body.email?.trim()
        const senha = req.body.senha?.trim()

        if(!nome){
            res.status(409).json({"Informação": "O campo NOME não pode estar vazio!"})
        }else if(!email){
            res.status(409).json({"Informação": "O campo E-MAIL não pode estar vazio!"})
        }else if(!senha){
            res.status(409).json({"Informação": "O campo SENHA não pode estar vazio!"})
        }else if(nome && senha && email){
            const buscarPorEmail = await usuario.findOne({email})

            if(buscarPorEmail){
                if(buscarPorEmail._id.toString() !== req.params.id){
                    res.status(409).json({"Informaçã": `Este email: ${email} ja esta em noessa base de dados!`})
                }
            }

            const atualizararPorId = await usuario.findByIdAndUpdate(req.params.id , req.body , {new: true})
            if(!atualizararPorId){
                res.status(404).json({"Informação": "Não foi possiver atualizar este usuario!"})
                console.log("Não foi possivel atualizar!")
            }

            res.status(200).json(atualizararPorId)
        }
    } catch (error) {
        res.status(500).json({ "informação": error })
    }
})

app.delete("/usuarios/:id", async (req, res) => {
    try {
        const buscarId = await usuario.findByIdAndDelete(req.params.id)

        if (buscarId) {
            res.status(200).json(buscarId)
        } else if (!buscarId) {
            res.status(400).json({ "informação": "Erro ao excluir!" })
        }
    } catch (error) {
        res.status(500).json({ "informação": error })
    }
})

app.listen(PORTA, () => {
    console.log(`http://localhost:${PORTA}`)
})