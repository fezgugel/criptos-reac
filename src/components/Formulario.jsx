import React, { useState } from "react";
import styled from "@emotion/styled";
import usarSelecionaMoneda from "../hooks/usarSelecionaMoneda";
import { monedas } from "../data/monedas";
import { useEffect } from "react";
import Error from "./Error";

const InputSubmit = styled.input `
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;

    &:hover {
        background-color: #7A7DFE;
    }

`

const Formulario =({setMonedas}) => {
    const [criptos,setCriptos] = useState([])
    const [error,setError] = useState(false)
    const [moneda,SeleccionarMonedas] = usarSelecionaMoneda('Selecciona Moneda',monedas)
    const [criptomoneda,Seleccionarcriptomoneda] = usarSelecionaMoneda('Selecciona Criptomoneda',criptos)
    
    useEffect(() => {
        const consultarApi = async() => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            const arrayCripto =resultado.Data.map(cripto =>{
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            })
            setCriptos(arrayCripto)
        }    
        consultarApi()    
    },[])
    const manejadorSubmit = (e) => {
        e.preventDefault()
        if([moneda,criptomoneda].includes("")) {
            setError(true)
            return
        }
        setError(false)
        setMonedas({moneda,criptomoneda})
    }
    return ( 
        <>
        {error && <Error>Todos los campos son obligatorios</Error>}
        <form onSubmit={manejadorSubmit}>
                <SeleccionarMonedas />
                <Seleccionarcriptomoneda />
                <InputSubmit type="submit" value="Cotizar" />
        </form>
        </>
    )
}

export default Formulario