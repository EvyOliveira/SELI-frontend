import axios from "axios";
import React from "react";

function cabecalho() { 
  return (
    <p>Bem-vindo ao Sistema de Pets!</p>
  );
}

class CorpoAnimal extends React.Component {
   state = {
     petAtual: {
      nome: "",
      idPet: "",
      especie: "",
      raca: ""
     },
     lista: [] 
}

inputChange(campo, novoTexto) {
  const novoState = {...this.state};
  novoState.petAtual[campo] = novoTexto;
  this.setState(novoState);
}

// adicionar() {
  // const novoState = {...this.state};
  // novoState.lista.push = ({...this.state.petAtual});
  // this.setState(novoState);

//}

adicionar() { 
  const apiUrl = `http://localhost:8080/tarde-aula1/medico`;
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.petAtual)
      }).then(
        (response)=> {
          console.log(response.body);
          this.carregarAnimais();
        }
      );
}

  render() {
    const displayLista = [];

    for (let i = 0; i < this.state.lista.length; i++) {
      displayLista.push(
        <tr key={i}>
          <td>{this.state.lista[i].idPet}</td>
          <td>{this.state.lista[i].nome}</td>
          <td>{this.state.lista[i].especie}</td>
          <td>{this.state.lista[i].raca}</td>
        </tr>);
    } 

    return (
      <div>
        <p>Dados do Animal</p>
        <div className="form-group">
          <label>Id:</label>
          <input  type="text" 
                  value={this.state.petAtual.idPet} 
                  placeholder="Digite o idPet do animal"
                  className="form-control"
                  onChange={(novoTexto)=>{this.inputChange('idPet', novoTexto.target.value)}}/>
          
        </div>
        <div className="form-group">
          <label>Nome:</label>
          <input  type="text" 
                  value={this.state.petAtual.nome} 
                  placeholder="Digite o nome do animal"
                  className="form-control"
                  onChange={(novoTexto)=>{this.inputChange('nome', novoTexto.target.value)}}/>
        </div>
        <div className="form-group">
          <label>Espécie:</label>
          <input  type="text" 
                  value={this.state.petAtual.especie} 
                  placeholder="Digite a espécie do animal"
                  className="form-control"
                  onChange={(novoTexto)=>{this.inputChange('especie', novoTexto.target.value)}}/>                           
        </div>
        <div className="form-group">
          <label>Raça:</label>
          <input  type="text" 
                  value={this.state.petAtual.raca} 
                  placeholder="Digite a raça do animal"
                  className="form-control"
                  onChange={(novoTexto)=>{this.inputChange('raca', novoTexto.target.value)}}/>                           
        </div>
        <button className="btn btn-primary" onClick={()=>{this.adicionar()}}>Adicionar</button>
        <p>Animais Cadastrados</p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Espécie</th>
              <th>Raça</th>
            </tr>
          </thead>
          <tbody>
            {displayLista}
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={() => {this.carregarAnimais()}}>Recarregar Animais</button>
      </div>
    );
  }

  alterarNomesAnimais() {
    // const novoState = {};
    // novoState.lista = this.state.lista;
    // const novoState = Object.assign({}, this.state);

    const novoState = {...this.state};
    novoState.lista[0].nome = "Alex George";
    this.setState(novoState);
  }

  // botaoAlterar() { 
    // return (
      // <button onClick={() => {this.carregarAnimais()}}>Recarregar Médicos</button>
   // );
  // }

  carregarAnimais() { 
    axios.get(
      `http://localhost:8080/tarde-aula1/pets`,
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
    console.log("Animal acionado.");
  }
}


function renderizarComponentes() { 
  return (
    <div className="container">
      {cabecalho()}
      <CorpoAnimal/>
    </div>
  );
}


export default renderizarComponentes;
