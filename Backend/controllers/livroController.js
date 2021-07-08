'use strict';

const firebase = require('../db');
const Livro = require('../models/livro');
const firestore = firebase.firestore();

const addLivro = async(req, res, next) => {
	try {
		const data = req.body;
		await firestore.collection('livros').doc().set(data);
		res.send('Record saved sucessfuly');
	} catch (error) {
		res.status(400).send(error.message);
	}
}

const getAllLivros = async(req, res, next) => {
	try {
		const livros = await firestore.collection('livros');
		const data = await livros.get();
		const livrosArray = [];
		if(data.empty) {
			res.status(404).send('Nenhum livro foi cadastrado.');
		} else {
			data.forEach(doc => {
				const livro = new Livro (
					doc.id,
					doc.data().nome_livro,
					doc.data().autor,
					doc.data().ano_lancamento,
					doc.data().paginas,
					doc.data().preco
				);
				livrosArray.push(livro) 
			});
			res.send(livrosArray);	
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
}

const getLivro = async (req, res, next) => {
	try{
		const id = req.params.id;
		const livro = await firestore.collection('livros').doc(id);
		const data = await livro.get();
		if(!data.exists) {
			res.status(404).send("Nenhum livro com esse ID foi encontrado.");
		}else {
			res.send(data.data());
		}

	} catch (error){
		res.status(400).send(error.message);
	}
}

const updateLivro = async (req, res, next) => {
	try{
		const id = req.params.id;
		const data = req.body;
		const livro = await firestore.collection('livros').doc(id);
		await livro.update(data);
		res.send('Cadastro de livro atualizado com sucesso.')

	} catch (error) {
		res.status(400).send(error.message)
	}
}

const deleteLivro = async (req, res, next) => {
	try{
		const id = req.params.id;
		const data = req.body;
		const livro = await firestore.collection('livros').doc(id);
		await livro.delete(data);
		res.send('Cadastro de livro deletado com sucesso.')

	} catch (error) {
		res.status(400).send(error.message)
	}
}

module.exports = {
	addLivro,
	getAllLivros,
	getLivro,
	updateLivro,
	deleteLivro
}