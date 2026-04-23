"use client"
import { useEffect, useState } from 'react'
import api from '../api/connect'
import Link from 'next/link'
import "./style.css"

export default function page() {

    const [usuarios, setUsuarios] = useState([])

    async function BuscarUsuarios(e){
        try {
            const buscarTodos = await api.get("/usuarios")
            setUsuarios(buscarTodos.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function DeletarUsuarios(id){
        try {
            const deletarUsuario = await api.delete(`/usuarios/${id}`)

            if(deletarUsuario){
                alert("Usuario deletado com susseco!")
                BuscarUsuarios()
            }if(!deletarUsuario){
                alert("Ocorreu um erro e não foi possivel deletar!")
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        BuscarUsuarios()
        
    }, [])

  return (
    <div>
        <h1>Banco de dados noSql</h1>
        <br />
        <Link className='Voltar' href="/cadastrar"><img src="/arrow_back_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="" />Voltar</Link>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>EM-MAIL</th>
                    <th>SENHA</th>
                    <th>FUNCOES</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.length === 0 ? (<tr><td colSpan="5">Usuarios não encontrados!</td></tr>):
                (usuarios.map((item) =>( 
                    <tr key={item._id}>
                        <td className='Primeiro'>{item._id}</td>
                        <td>{item.nome}</td>
                        <td>{item.email}</td>
                        <td>{item.senha}</td>
                        <td>
                            <button className='Del' onClick={() => DeletarUsuarios(item._id)}>Deletar</button>
                            <button className='Atu'><Link className='At' href={`/atualizar?id=${item._id}&email=${item.email}`}>Atualizar</Link></button>
                        </td>
                    </tr>)
                ))}
            
            </tbody>
        </table>
    </div>
  )
}
