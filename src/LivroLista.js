import React, {useState, useEffect} from 'react';
import {ControleLivros} from './controle/ControleLivros';
import {ControleEditora} from './controle/ControleEditora';

const LivroLista = () => {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);
    const controleLivro = new ControleLivros();
    const controleEditora  = new ControleEditora();

    useEffect(() => {
        if (!carregado){
            setLivros(controleLivro.obterLivros());
            setCarregado(true);
        }
    }, [carregado, controleLivro]);

    const excluir = (codigo) => {
        controleLivro.excluir(codigo);
        setCarregado(false);
    };

    const LinhaLivro = (props) =>{
        let {livro} = props;
        const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);
        return(
            <tr>                           
                <td>{livro.titulo}
                <button class="btn btn-danger d-block btn-sm" onClick={() => excluir(livro.codigo)}>Excluir</button></td>
                <td>{livro.resumo}</td>
                <td>{nomeEditora}</td>                
                <td>
                    <ul>
                        {livro.autores.map((autor, indice) => (
                        <li key={indice}>{autor}</li>))}
                    </ul>
                </td>
            </tr>
        );
    };

    return(
        <main>
            <h1>Catálogo de Livros</h1>
            <div>
                <table class="table table-striped">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">Título</th>                            
                            <th scope="col">Resumo</th>
                            <th scope="col">Editora</th>
                            <th scope="col">Autores</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro) => <LinhaLivro key={livro.codigo} livro={livro} excluir={excluir} />)}
                    </tbody>
                </table>
            </div>
        </main>
        
    );
};

export default LivroLista;