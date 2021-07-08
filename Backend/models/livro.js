class Livro {
	constructor(id, nome_livro, autor, ano_lancamento, paginas, preco){
		this.id = id;
		this.nome_livro = nome_livro;
		this.autor = autor;
		this.ano_lancamento = ano_lancamento;
		this.paginas = paginas;
		this.preco = preco
	}
}

module.exports = Livro;