import React from "react";

// representa um quadrado no tabuleiro
function Square({ value, onClick }) {
    return (
        // botao que exibe o valor do quadrado e chama função onclick quando clicado
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
}


export default Square;