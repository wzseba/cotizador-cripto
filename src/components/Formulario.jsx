import React, {useState, useEffect } from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from './hooks/useSelectMonedas'

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover{
        background-color: #7a7dfe;
        cursor: pointer;
    }

`

const Formulario = () => {

  const [criptos, setCriptos] = useState([])  

  const monedas = [
    {id: 'USD', nombre: 'Dolar de Estados Unidos'},
    {id: 'MXN', nombre: 'Peso Mexicano'},
    {id: 'ARS', nombre: 'Peso Argentino'},
    {id: 'EUR', nombre: 'Euro'}
  ]

  const [moneda, SelectMoneda] = useSelectMonedas('Elige Tu Moneda', monedas);
  
  useEffect(()=>{
    const consultarApi = async()=>{
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        const arrCripto = resultado.Data.map(cripto => {
            const obj = {
                id: cripto.CoinInfo.Name,
                nombre: cripto.CoinInfo.FullName
            }
            return obj;
        })
        setCriptos(arrCripto)
    }
    consultarApi();
  },[])

  return (
    <form action="">
        <SelectMoneda/>
        

        <InputSubmit type="submit" value="cotizar"/>
    </form>
  )
}

export default Formulario