class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validardados() {
        for (let i in this) {
            if (this[i] == '' || this[i] == null || this[i] == undefined) {
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoid() {
        let proximoId = localStorage.getItem('id')
        return (parseInt(proximoId) + 1)
    }
    gravar(despesa) {
        let id = this.getProximoid()

        localStorage.setItem(id, JSON.stringify(despesa))
        localStorage.setItem('id', id)

    }

    recuperarDespesa(){
       let id = localStorage.getItem('id')
       let despesas= Array()

       for(let i =1; i<=id; i++){

         let despesa =JSON.parse(localStorage.getItem(i))
         despesas.push(despesa)
         
       if(despesa === null){
        continue
       }

       }

    return despesas 
    }

}
let bd = new Bd()


function cadastarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)



    if (despesa.validardados()) {
        bd.gravar(despesa)

        document.getElementById("titulo_modal").innerHTML = "Despesa inserida"
        document.getElementById("class_modal").className = 'modal-header text-success'
        document.getElementById("class_body").innerHTML = 'Despesa cadastrada com sucesso!'
        document.getElementById("botao_modal").innerHTML = 'Voltar'
        document.getElementById("botao_modal").className = 'btn btn-success'


        $('#modal_dinamico').modal('show')
    } else {
        document.getElementById("titulo_modal").innerHTML = "Erro na Gravação "
        document.getElementById("class_modal").className = 'modal-header text-danger'
        document.getElementById("class_body").innerHTML= 'Existe campos que não foram preenchidos '
        document.getElementById("botao_modal").innerHTML= 'Voltar e Corrigir '
        document.getElementById("botao_modal").className= 'btn btn-danger '
        $('#modal_dinamico').modal('show')
    }

}

function carregaLista(){
   let despesas = Array()
   despesas =bd.recuperarDespesa()

   console.log(despesas)
  }
  