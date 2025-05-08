# DTI-TestePratico

# 📚 Sistema de Notas e Frequência - Professor Carlos

Este projeto fullstack (React + Spring Boot) foi desenvolvido como solução para o problema proposto no **Processo Seletivo - Estágio em Dev** da **dti digital**.


O sistema permite que o professor **Carlos**:

* Cadastre alunos com notas de 5 disciplinas e frequência (%).
* Veja a média individual de cada aluno.
* Visualize a média da turma por disciplina e geral.

---

## 🧠 Premissas Assumidas

* Cada aluno tem exatamente 5 notas (de 0 a 10).
* A frequência é um número entre 0% e 100%.
* O backend armazena os dados em memória (pode ser facilmente adaptado para banco).
* O frontend e backend são executados separadamente, mas organizados no mesmo repositório.

---

## 🚀 Como executar o sistema

### ✅ Pré-requisitos

* Node.js 18+
* Java 24
* Maven
* Npm

---

### 🖥️ Frontend

```bash
cd frontend
npm install
npm install bootstrap
npm run dev
```

Acesse em: [http://localhost:5173](http://localhost:5173) (caso seja outra porta configurada va ate o arquivo `app\src\main\java\com\dti\app\Config\CorsConfig.java` e mude a porta de acordo).


---

### 🔧 Backend

```bash
cd ../app
mvn spring-boot:run
```
>caso nao consiga inciar via terminal, inicie diretamente no arquivo AppApplication.java, localizado dentro do caminho `app\src\main\java\com\dti\app\AppApplication.java`

O backend sobe em: [http://localhost:8080](http://localhost:8080) (ou outra porta configurada).

---

### 🔧 Conexão com o banco

Caso queira usar banco de dados relacional (ex: PostgreSQL), configure no arquivo `application.properties` pelo caminho `app\src\main\java\com\dti\app\AppApplication.java`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/nome_do_banco
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

> Certifique-se de adicionar o driver PostgreSQL ao seu `pom.xml`:

```xml
<dependency>
  <groupId>org.postgresql</groupId>
  <artifactId>postgresql</artifactId>
  <version>42.7.1</version>
</depend> 
```
---

## 🌐 Funcionalidades

### Cadastro de Aluno

* Nome
* Nota Disciplina 1 a 5 (0 a 10)
* Frequência (0% a 100%)

### Listas:

* Todos os alunos com nome, notas, média e frequência.
* Média da turma por disciplina e geral.
* Alunos com:

  * Média acima da turma
  * Frequência abaixo de 75%

---

## 🧠 Decisões de Projeto

* Utilizado Vite + React + TypeScript para rapidez no frontend.
* Bootstrap 5 foi usado para responsividade e layout simples.
* API RESTful com Spring Boot e controle de CORS habilitado.
* Os dados estão sendo mantidos em memória com `AlunoRepository`, mas podem ser persistidos com JPA/H2/PostgreSQL facilmente.

---

## 📷 Interface

![``](/assets/image.png)

---


## 👨‍💻 Autor

> Desenvolvido por **[Gustavo Rodrigo](https://github.com/GUS74V0)** para a vaga de Estágio em Dev na dti digital.
