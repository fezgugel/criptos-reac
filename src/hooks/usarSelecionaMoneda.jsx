import React from 'react'
import styled from '@emotion/styled'
import { useState } from 'react'

const Label = styled.label `
    color: #FFF;
    display: block;
    font-family: "Lato", sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`
const Select = styled.select `
    width: 100%;
    font-size: 18px;
    padding: 14px;
    border-radius: 10px;
    margin-bottom: 20px;
`

const usarSelecionaMoneda = (label,opciones) => {
    const [state,setState] = useState("")
    function Cambiastate (e) {
        setState(e.target.value)
    }
  const SeleccionaMonedas = ( ) =>(
      <>
        <Label>{label}</Label>
        <Select value={state} onChange={Cambiastate}>
        <option value="">Seleccione</option>
        {opciones.map(opcion => (
            <option key={opcion.id} value={opcion.id}>{opcion.nombre}
            </option>
        ))}
        </Select>
      </>
  )
  return [state, SeleccionaMonedas]
}

export default usarSelecionaMoneda
