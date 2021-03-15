import axios from "axios";
import React from "react";

function botao() { 
  return (
    <button onClick={carregarMedicos}>Salvar</button>
  );
}

function cabecalho() { 
  return (
    <p>Bem vindo ao sistema</p>
  );
}

class CorpoMedico extends React.Component {
   state = {
     lista: [
    {id: 0, crm: "0001", nome: "Dr. Takagima", especialidade:"Cardiologista"},
    {id: 0, crm: "0002", nome:"Dr. Pimentel", especialidade: "Ginecologista"},
    {id: 0, crm: "0003", nome: "Dr. Ronaldo", especialidade: "Clínico Geral"}
  ]
}

  render() {
    return (
      <div>
        <p>Nome dos médicos</p>
        <p>{this.state.lista[0].nome}</p>
        <p>{this.state.lista[1].nome}</p>
        <p>{this.state.lista[2].nome}</p>
        {this.botaoAlterar()}
    </div>
    );
  }

  alterarNomesMedicos() {
    console.log(this.state.lista[0].nome);
    this.state.lista[0].nome = "Dr. Dolitle";
    this.setState(this.state);
    console.log(this.state.lista[0].nome);
  }

  botaoAlterar() { 
    return (
      <button onClick={() => {this.alterarNomesMedicos()}}>Alterar</button>
    );
  }
}


function carregarMedicos() { 
  axios.get(
    `http://localhost:8080/SELI-backend/medico`,
      {
        responseType: 'json',
      }
    ).then(
    (response) => {
      console.log(response.data);
    }
  );
  console.log("Medico acionado");
}


function retornaPagina() { 
  return (
    <div>
      {cabecalho()}
      <CorpoMedico/>
      {botao()}
    </div>
  );
}


export default retornaPagina;
