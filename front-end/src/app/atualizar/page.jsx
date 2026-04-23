"use client"
import { useState, useRef, useEffect } from 'react'
import api from '../api/connect'
import { useSearchParams } from 'next/navigation'
import "./style.css"
import Link from 'next/link'

export default function Atalizar() {

    const [msg, setMsg] = useState()
    const [usuarios, setUsuarios] = useState({})
    const usp = useSearchParams()
    const meuId = usp.get("id")
    const nomeInput = useRef()
    const emailInput = useRef()
    const senhaInput = useRef()

    async function BuscarEspecifico(){
        const buscarTodos = await api.get(`/usuarios/`)
        const buscarEspecifico = await buscarTodos.data.find((item) => item._id === meuId)
        setUsuarios(buscarEspecifico)
    }

    async function AtualizarUsuarios(e) {
        e.preventDefault()

        const nomeValue = nomeInput.current.value?.trim()
        const emailValue = emailInput.current.value?.trim()
        const senhaValue = senhaInput.current.value?.trim()

        if (!nomeValue) {
            return setMsg("O campo NOME não pode estar vazio!")
        } else if (!emailValue) {
            return setMsg("O campo E-MAIL não pode estar vazio!")
        } else if (!senhaValue) {
            return setMsg("O campo SENHA não pode estar vazio!")
        }

        if(emailValue === usuarios?.email){
            const atualizar = await api.patch(`/usuarios/${meuId}`, {
                    nome: nomeValue,
                    email: emailValue,
                    senha: senhaValue
                })

                if (atualizar) {
                    setMsg("Susseco ao atualizar!")
                    alert("Usuario atualizado com susseco!")
                } else if (!atualizar) {
                    setMsg("Erro ao atualizar!")
                    alert("Erro ao atualizar!")
                }
        }else if(emailValue !== usuarios?.email){
            const BuscarUsuarios = await api.get(`/usuarios/${emailValue}`)
            if (BuscarUsuarios) {
                if (BuscarUsuarios.data._id !== meuId) {
                    setMsg("Este email já esta em nossa base de dados!")
                }
            }
        }

    }

    useEffect(() => {
        BuscarEspecifico()
    })

    return (
        <div>
            <h1>Atualize seus dados!</h1>
            <br />
            <Link className='Voltar' href="/banco"><img src="/arrow_back_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="" />Voltar</Link>
            <h3>ID: {meuId}</h3>
            <form>
                <label htmlFor="1">Novo nome</label>
                <br />
                <input  ref={nomeInput} placeholder='Nome...' defaultValue={usuarios?.nome} type="text" required id='1' />
                <br /><br />
                <label htmlFor="2">Novo e-mail</label>
                <br />
                <input ref={emailInput} placeholder='E-mail...' defaultValue={usuarios?.email} type="email" required id='2' />
                <br /><br />
                <label htmlFor="3">Nova senha</label>
                <br />
                <input ref={senhaInput} placeholder='Senha...' defaultValue={usuarios?.senha} type="password" required id='3' />
                <p>{msg}</p>
                <div className='Btns'>
                    <button className='BtnEnviar' onClick={AtualizarUsuarios}>Atualizar dados<img src="/call_made_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="" /></button>
                </div>
            </form>

        </div>
    )
}