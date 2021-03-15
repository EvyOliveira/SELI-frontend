import axios from "axios";
import React from "react";

function cabecalho() { 
  return (
    <p>Bem vindo ao sistema</p>
  );
}

class CorpoMedico extends React.Component {
   state = {
     medicoAtual: {
      nome: "",
      crm: "",
      especialidade: ""
     },
     nomeMedico: "João Silva",
     lista: [

  ]
}

inputChange(campo, novoTexto) {
  const novoState = {...this.state};
  novoState.medicoAtual[campo] = novoTexto;
  this.setState(novoState);
}

// adicionar() {
  // const novoState = {...this.state};
  // novoState.lista.push = ({...this.state.medicoAtual});
  // this.setState(novoState);

//}

adicionar(){
  const apiUrl = `http://localhost:8080/tarde-aula1/medico`;
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      Accept: 'text/plain',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(this.state.medicoAtual)
  });
}

  render() {
    const displayLista = [];

    for (let i = 0; i < this.state.lista.length; i++) {
      displayLista.push(
      <p key={i}>{this.state.lista[i].nome} - {this.state.lista[i].especialidade}</p>
      );
    }

    return (
      <div>
        <p>Dados do Médico</p>
        <div className="form-group">
          <label>CRM: </label>
          <input  type="text" 
                  value={this.state.medicoAtual.crm} 
                  placeholder="Digite o CRM do medico"
                  className="form-control"
                  onChange={(novoTexto)=>{this.inputChange('crm', novoTexto.target.value)}}/>
          
        </div>
        <div className="form-group">
          <label>Nome: </label>
          <input  type="text" 
                  value={this.state.medicoAtual.nome} 
                  placeholder="Digite o nome do medico"
                  className="form-control"
                  onChange={(novoTexto)=>{this.inputChange('nome', novoTexto.target.value)}}/>
        </div>
        <div className="form-group">
          <label>Especialidade: </label>
          <input  type="text" 
                  value={this.state.medicoAtual.especialidade} 
                  placeholder="Digite a especialidade do medico"
                  className="form-control"
                  onChange={(novoTexto)=>{this.inputChange('especialidade', novoTexto.target.value)}}/>                           
        </div>
        
        <button onClick={()=>{this.adicionar()}}>Adicionar</button>
        <p>Médicos Cadastrados</p>
        {displayLista}
        {this.botaoAlterar()}
      </div>

    );
  }

  alterarNomesMedicos() {
    // const novoState = {};
    // novoState.lista = this.state.lista;
    // const novoState = Object.assign({}, this.state);

    const novoState = {...this.state};

    novoState.lista[0].nome = "Dr. Dolitle";
    this.setState(novoState);
  }

  botaoAlterar() { 
    return (
      <button onClick={() => {this.carregarMedicos()}}>Carregar</button>
    );
  }

  carregarMedicos() { 
    axios.get(
      `http://localhost:8080/tarde-aula1/medico`,
        {
          responseType: 'json',
        }
      ).then(
      (response) => {
        const novoState = {...this.state};
        novoState.lista = response.data;
        this.setState(novoState);
      }
    );
    console.log("Medico acionado");
  }
}


function retornaPagina() { 
  return (
    <div>
      {cabecalho()}
      <CorpoMedico/>
    </div>
  );
}


export default retornaPagina;
