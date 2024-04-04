import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
    // armazenar estado atual dos quadrados do tabuleiro
    const [squares, setSquares] = useState(Array(9).fill(null));

    // determina quem joga agora
    const [ xIsNext, setXIsNext] = useState(true);

    // calcular o vencedor base nos quadrados preenchidos
    const winner = calculateWinner(squares);

    // função que lida com um clique no quadrado
    const handleClick = (i) => {
        // verifica se o quadrado ta preenchido ou se tem um vencedor
        if (squares[i] || winner) return;

        // cria cópia do array de quadrados para evitar mutações diretas
        const newSquares = squares.slice();

        // preenche quadrado com X ou O na vez do jogador
        newSquares[i] = xIsNext ? "❌" : "⭕";

        // atualiza o estado dos quadrados e passa a vez para o próximo jogador
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    };

    // função para reiniciar o jogo
    const restartGame = () => {
        // reinicia o estado dos quadrados e define a vez do jogador como "X"
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    };

    // renderização do componente
    return (
        <div>
            <div className="status">
                Status:{" "}
                {winner ? (
                    // exibe o vencedor se houve um
                    <p className="winner">O vencedor é: <span className="WinnerClass">{winner}</span>!</p>
                ) : (
                    // exibe o próximo jogador se não houver vencedor
                    `Próximo a jogar: ${xIsNext ? "❌" : "⭕"}`
                )}
            </div>
            {/* Renderização das linhas do tabuleiro com componentes Square */}
            <div className="board-row board-superior">
                <Square value={squares[0]} onClick={() => handleClick(0)} />
                <Square value={squares[1]} onClick={() => handleClick(1)} />
                <Square value={squares[2]} onClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onClick={() => handleClick(3)} />
                <Square value={squares[4]} onClick={() => handleClick(4)} />
                <Square value={squares[5]} onClick={() => handleClick(5)} />
            </div>
            <div className="board-row board-inferior">
                <Square value={squares[6]} onClick={() => handleClick(6)} />
                <Square value={squares[7]} onClick={() => handleClick(7)} />
                <Square value={squares[8]} onClick={() => handleClick(8)} />
            </div>
            {/* Botão para reiniciar o jogo */}
            <button className="reset-button" onClick={restartGame}>
                Reiniciar jogo
            </button>
        </div>
    );
};

// calcular o vencedor com base nos quadrados preenchidos
const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // verifica todas as linhas para determinar se há um vencedor
    for (let i = 0; i< lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    // retorna null se não houver um vencedor
    return null;
};

export default Board;