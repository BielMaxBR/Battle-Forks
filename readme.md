# Battle of memes
### _inspirado no battle cats_

# Elementos da UI

## *Hotbar*
- largura fixa
- altura dinâmica ou fixa
- quantidade de colunas e linhas variável
- escala dos itens como `stretch` ou `fit`
- opcional sistema de camadas de linhas

## *Botão base*
- largura e altura variável
- booleana 'disable' para desativar a interação
- eventos de `pressed` e `released`
- aceita textura ou cores base

## *Botão de Unidade*
- extenção do **Botão base**
- possui um temporizador em forma de **Barra**
- possui um texto no canto indicando o preço da unidade 
- não pode ser pressionado antes do cooldown acabar
- quando pressionado o cooldown ativa novamente

## *Barra*
- altura e largura variável
- possui um valor máximo, minimo, e um valor atual
- depentendo do valor atual, a barra se enche de acordo com a porcentagem
- a barra pode se encher tanto na horizontal quanto vertical
- aceita texturas, uma cor base, ou até um degradê