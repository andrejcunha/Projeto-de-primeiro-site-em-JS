const endpoint = 'https://raw.githubusercontent.com/guilhermeonrails/api-frontend/main/produtos.json';
let produtos = [];
const elementoParaInserirProdutos = document.getElementById('produtos__lista');
const produtoDetalhe = document.getElementById('produto-detalhe');
const produtoDetalheContent = document.getElementById('produto-detalhe-content');
const botaoVoltar = document.getElementById('voltar');

document.addEventListener('DOMContentLoaded', buscarProdutos);
botaoVoltar.addEventListener('click', () => {
    produtoDetalhe.style.display = 'none';
    elementoParaInserirProdutos.style.display = 'flex';
});

async function buscarProdutos() {
    try {
        const res = await fetch(endpoint);
        produtos = await res.json();
        exibirProdutosNaTela(produtos);
    } catch (error) {
        console.error('Erro ao buscar os produtos:', error);
    }
}

function exibirProdutosNaTela(produtos) {
    const fragment = document.createDocumentFragment();

    produtos.forEach((produto, index) => {
        const li = document.createElement('li');
        li.classList.add('produtos__item');
        li.dataset.index = index;

        const produtoContent = `
            <div class="produtos__content">
                <img src="${produto.img}" alt="Imagem de ${produto.nome}">
                <div class="produtos__informacoes">
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                    <h4>R$${produto.valorComDesconto}<s>R$${produto.valorSemDesconto}</s></h4>
                    <p>${produto.tipoEntrega}</p>
                </div>
            </div>
        `;
        li.innerHTML = produtoContent;
        li.addEventListener('click', () => exibirDetalhesDoProduto(produto));
        fragment.appendChild(li);
    });

    elementoParaInserirProdutos.appendChild(fragment);
}

function exibirDetalhesDoProduto(produto) {
    elementoParaInserirProdutos.style.display = 'none';
    produtoDetalhe.style.display = 'block';

    const produtoContent = `
        <div class="produtos__content">
            <img src="${produto.img}" alt="Imagem de ${produto.nome}">
            <div class="produtos__informacoes">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <h4>R$${produto.valorComDesconto}<s>R$${produto.valorSemDesconto}</s></h4>
                <p>${produto.tipoEntrega}</p>
            </div>
        </div>
    `;
    produtoDetalheContent.innerHTML = produtoContent;
}