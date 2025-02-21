# Pipeline CI/CD

Este repositório contém um exemplo de pipeline CI/CD configurado no GitHub Actions para uma aplicação Python simples. 
A imagem abaixo ilustra o fluxo completo, desde o commit na branch principal até o deploy em um ambiente de teste com aprovação manual.

![Fluxo do Pipeline](./ci_cd.drawio.png)

## Visão Geral

1. **[CI: Build & Test]**  
   - **Checkout do repositório:** O código é obtido da branch *main*.  
   - **Instalar dependências:** As bibliotecas necessárias são instaladas (`pip install -r requirements.txt`).  
   - **Quality Gate:** Uma Action em TypeScript verifica se um arquivo essencial (`requirements.txt`) existe. Se não existir, a pipeline falha.  
   - **Testes unitários:** Utilizei o *pytest* para validar o funcionamento do código.  
   - **Build da aplicação:** Empacotamos a aplicação em um arquivo `.whl`.  
   - **Upload do artefato:** O artefato (diretório `dist`) é armazenado para uso na fase de deploy.

2. **[CD: Release & Deploy]**  
   - **Download do artefato:** Resgatamos o arquivo gerado na fase de CI.  
   - **Criar release:** Uma release é criada no GitHub com a tag correspondente.  
   - **Upload do asset na release:** O arquivo `.whl` é anexado à release.  
   - **Deploy no ambiente de teste:** O pipeline tenta efetuar o deploy (simulado com `echo`).  
   - **Aprovação manual (Environment “teste”):** O deploy só prossegue após aprovação dos usuários configurados nesse ambiente. Se aprovado, o *deploy* é concluído; caso contrário, é cancelado.

## Como Funciona

- O workflow é acionado automaticamente sempre que ocorre um *push* na branch `main`.  
- Se o arquivo essencial não existir, a pipeline falha na etapa de Quality Gate.  
- Se os testes unitários passarem e o build for bem-sucedido, o artefato é empacotado e enviado para a fase de *Release & Deploy*.  
- Na criação da release, o arquivo `.whl` é anexado, permitindo rastrear versões e fazer o deploy para o ambiente de teste.  
- A etapa de deploy está vinculada a um **Environment** chamado `teste`, que exige aprovação manual antes de prosseguir.
