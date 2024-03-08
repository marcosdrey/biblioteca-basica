const abrirForm = document.querySelector('#abrir_formulario');
const containerForm = document.querySelector('.form-container');
const nomeDoLivro = document.querySelector('#nome');
const nomeDoAutor = document.querySelector('#autor');
const nDePaginas = document.querySelector('#paginas');
const descricao = document.querySelector('#descricao');
const gridDeLivros = document.querySelector('.grid-de-livros')
const form = document.querySelector('#form');
let colecaoDeLivros = JSON.parse(localStorage.getItem('colecao')) || [];



if(colecaoDeLivros) {
    colecaoDeLivros.forEach(livro => {
        colocarNaLivraria(livro.Título, livro.Autor, livro.Páginas, livro.Descrição)
    })
}

abrirForm.addEventListener('click', () => {
    form.classList.toggle('hidden');
    if(abrirForm.textContent === 'Abrir formulário') {
        abrirForm.textContent = 'Fechar formulário';
    } else {
        abrirForm.textContent = 'Abrir formulário';
    }
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(todasInfosPreenchidas) {
        colocarNaLivraria(nomeDoLivro.value, nomeDoAutor.value, nDePaginas.value, descricao.value);
        recolherInformacoes();
        

        nomeDoLivro.value = "";
        nomeDoLivro.focus();
        nomeDoAutor.value = "";
        nDePaginas.value = null;
        descricao.value = "";
    }
})

function recolherInformacoes() {
    const livro = {
        Título: nomeDoLivro.value,
        Autor: nomeDoAutor.value,
        Páginas: nDePaginas.value,
        Descrição: descricao.value
    }
    colecaoDeLivros.push(livro);
    localStorage.setItem("colecao", JSON.stringify(colecaoDeLivros))
}

function colocarNaLivraria(nomelivro, nomeautor, paginas, descricao) {
    const itensDeInteracao = document.createElement('div');
    const botaoRemover = document.createElement('i');
    const botaoEditar = document.createElement('i');
    const btnDescricao = document.createElement('button')

    itensDeInteracao.className = "itens-de-interacao"
    botaoRemover.className = "fa-solid fa-circle-xmark excluir-item"
    botaoEditar.className = "fa-solid fa-pen-to-square editar-item"
    btnDescricao.className = "btnDescricao"
    btnDescricao.textContent = "Descrição"

    const cardLivro = document.createElement('div')
    cardLivro.className = "card-livro"
    cardLivro.innerHTML = `<h4>${nomelivro}</h4>
        <h5>${nomeautor}</h5>
        <p class="numDePaginas">${paginas} páginas</p>`

        btnDescricao.addEventListener('click', ()=>{
            alert('Descrição:\n' + descricao)
        })
    
        botaoRemover.addEventListener('click', ()=>{
            let divcardlivro = document.querySelectorAll('.card-livro')

            divcardlivro.forEach(card => {
                const h4card = card.querySelector('h4')
                const p = card.querySelector(`.numDePaginas`)
                if (h4card.textContent === nomelivro && p.textContent === `${paginas} páginas`) {
                    card.remove();
                }
            })

            colecaoDeLivros.forEach((livro, index) => {
                if(nomelivro === livro.Título && nomeautor === livro.Autor && paginas === livro.Páginas && descricao === livro.Descrição) {
                    colecaoDeLivros.splice(index, 1)
                }
                localStorage.setItem("colecao", JSON.stringify(colecaoDeLivros))  
                })        
            })

            botaoEditar.addEventListener('click', ()=> {
                let resposta = "";
                let nmrEditar = null;
                do {
                const editarOque = prompt('Digite o número do que deseja editar: \n[1] - Título do Livro \n [2] - Nome do Autor\n [3] - Número de Páginas\n [4] - Descrição \n [5] - Cancelar.');
                switch (Number(editarOque)) {
                    case 1: resposta = prompt('Digite o novo título do livro:'); nmrEditar = editarOque; break;
                    case 2: resposta = prompt('Digite o novo nome do autor:'); nmrEditar = editarOque; break;
                    case 3: resposta = prompt('Digite o novo número de páginas:'); nmrEditar = editarOque; break;
                    case 4: resposta = prompt('Digite a nova descrição do livro:'); nmrEditar = editarOque; break;
                    case 5: resposta = true; break;
                    default: alert("Digite um número válido!");
                }} while (!resposta)
                
                if(typeof resposta === 'boolean') {
                    alert('Edição cancelada!')
                } else {
                    let divcardlivro = document.querySelectorAll('.card-livro')

                    divcardlivro.forEach(card => {
                        const h4card = card.querySelector('h4')
                        const h5card = card.querySelector('h5')
                        const p = card.querySelector(`.numDePaginas`)
        
                            if (h4card.textContent === nomelivro && h5card.textContent === nomeautor && p.textContent === `${paginas} páginas`) {
                                switch(Number(nmrEditar)) {
                                    case 1: h4card.textContent = resposta; break;
                                    case 2: h5card.textContent = resposta; break;
                                    case 3: p.textContent = `${resposta} páginas`; break;
                                    case 4: break;
                                }
                            }
                    })

                    colecaoDeLivros.forEach(livro => {

                        if(nomelivro === livro.Título && nomeautor === livro.Autor && paginas === livro.Páginas && descricao === livro.Descrição) {
                            switch(Number(nmrEditar)) {
                                case 1: livro.Título = resposta; nomelivro = livro.Título; break;
                                case 2: livro.Autor = resposta; nomeautor = livro.Autor; break;
                                case 3: livro.Páginas = resposta; paginas = livro.Páginas; break;
                                case 4: livro.Descrição = resposta; descricao = livro.Descrição; break;
                            }
                        }
                        localStorage.setItem("colecao", JSON.stringify(colecaoDeLivros))  
                        })
                      
                    
                }
            })

    cardLivro.append(btnDescricao)
    itensDeInteracao.append(botaoRemover)
    itensDeInteracao.append(botaoEditar)
    cardLivro.append(itensDeInteracao)

    gridDeLivros.append(cardLivro);

}

function todasInfosPreenchidas() {
    if(!nomeDoLivro.value || !nomeDoAutor.value || !nDePaginas.value || !descricao.value) {
        alert("Todos os campos devem estar preenchidos!");
        return false;
    }
    return true;
}



