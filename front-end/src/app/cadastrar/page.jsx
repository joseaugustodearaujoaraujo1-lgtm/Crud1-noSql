"use client"
import { useState, useRef } from 'react'
import api from '../api/connect'
import Link from 'next/link'
import "./style.css"

export default function Cadastrar() {

    const [msg, setMsg] = useState()

    const nome = useRef()
    const email = useRef()
    const senha = useRef()

    async function CriarUsuarios(e) {
        e.preventDefault()
        try {
            const nomeValue = nome.current.value?.trim()
            const emailValue = email.current.value?.trim()
            const senhaValue = senha.current.value?.trim()

            if (!nomeValue) {
                return setMsg("O campo NOME não pode estar vazio!")
            } else if (!emailValue) {
                return setMsg("O campo email não pode estar vazio!")
            } else if (!senhaValue) {
                return setMsg("O campo SENHA não pode estar vazio!")
            }

            try {
                await api.get(`/usuarios/${emailValue}`)
                return setMsg(`O email: ${emailValue} já está em nossa base de dados!`)
            } catch (error) {
                console.log("Usuario não encontrado!")
            }

            try {
                await api.post("/usuarios", {
                    nome: nomeValue,
                    email: emailValue,
                    senha: senhaValue
                })
                setMsg("Susseco ao cadastrar!")
                alert("Susseco ao cadastrar!")
            } catch (error) {
                alert("Erro ao cadastrar")
            }

        } catch (error) {
            console.log("Erro ao criar")
        }
    }

    return (
        <div>
            <h1>Faca seu cadastro!</h1>
            <form>
                <label htmlFor="1">Nome</label>
                <br />
                <input ref={nome} placeholder='Nome...' type="text" required id='1' />
                <br /><br />
                <label htmlFor="2">E-mail</label>
                <br />
                <input ref={email} placeholder='E-mail...' type="email" required id='2' />
                <br /><br />
                <label htmlFor="3">Senha</label>
                <br />
                <input ref={senha} placeholder='Senha...' type="password" required id='3' />
                <p>{msg}</p>
                <div className='Btns'>
                    <button className='BtnEnviar' onClick={CriarUsuarios}><img src="/call_made_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="" />Enviar dados</button>
                    <br />
                    <button className='BtnBD'> <Link className='Link' href="/banco"><img src="/database_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="" />Ver banco</Link></button>
                </div>
            </form>

        </div>
    )
}
