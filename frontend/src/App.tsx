import React, { useEffect, useState } from "react";

interface Aluno {
  id: number;
  nome: string;
  notaDisciplina1: number;
  notaDisciplina2: number;
  notaDisciplina3: number;
  notaDisciplina4: number;
  notaDisciplina5: number;
  frequencia: number;
}

type AlunoForm = Omit<Aluno, 'id'>;

const campos: (keyof AlunoForm)[] = [
  "nome",
  "notaDisciplina1",
  "notaDisciplina2",
  "notaDisciplina3",
  "notaDisciplina4",
  "notaDisciplina5",
  "frequencia",
];

const App: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [form, setForm] = useState<AlunoForm>({
    nome: "",
    notaDisciplina1: 0,
    notaDisciplina2: 0,
    notaDisciplina3: 0,
    notaDisciplina4: 0,
    notaDisciplina5: 0,
    frequencia: 0,
  });
  const [medias, setMedias] = useState<number[]>([]);
  const [acimaMedia, setAcimaMedia] = useState<Aluno[]>([]);
  const [frequenciaBaixa, setFrequenciaBaixa] = useState<Aluno[]>([]);

  const API = "http://localhost:8080/alunos";

  const fetchData = async () => {
    const [alunosRes, mediasRes, acimaRes, baixaRes] = await Promise.all([
      fetch(API).then((res) => res.json()),
      fetch(`${API}/medias-por-disciplina`).then((res) => res.json()),
      fetch(`${API}/acima-da-media`).then((res) => res.json()),
      fetch(`${API}/frequencia-baixa`).then((res) => res.json()),
    ]);
    setAlunos(alunosRes);
    setMedias(mediasRes);
    setAcimaMedia(acimaRes);
    setFrequenciaBaixa(baixaRes);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof AlunoForm
  ) => {
    const value = key === "nome" ? e.target.value : parseFloat(e.target.value);
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({
      nome: "",
      notaDisciplina1: 0,
      notaDisciplina2: 0,
      notaDisciplina3: 0,
      notaDisciplina4: 0,
      notaDisciplina5: 0,
      frequencia: 0,
    });
    fetchData();
  };

  const calcularMedia = (a: Aluno) => (
    (a.notaDisciplina1 + a.notaDisciplina2 + a.notaDisciplina3 + a.notaDisciplina4 + a.notaDisciplina5) / 5
  ).toFixed(2);

  return (
    <div className="container-fluid py-4">
      <h1 className="text-center mb-4">Sistema de Notas e Frequência</h1>

      {/* Formulário como tabela */}
      <div className="table-responsive mb-5">
        <form onSubmit={handleSubmit}>
          <table className="table table-bordered text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>Nome</th>
                <th>Disciplina 1</th>
                <th>Disciplina 2</th>
                <th>Disciplina 3</th>
                <th>Disciplina 4</th>
                <th>Disciplina 5</th>
                <th>Frequência (%)</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={form.nome}
                    onChange={(e) => handleChange(e, "nome")}
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={form.notaDisciplina1}
                    onChange={(e) => handleChange(e, "notaDisciplina1")}
                    required
                    step="any"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={form.notaDisciplina2}
                    onChange={(e) => handleChange(e, "notaDisciplina2")}
                    required
                    step="any"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={form.notaDisciplina3}
                    onChange={(e) => handleChange(e, "notaDisciplina3")}
                    required
                    step="any"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={form.notaDisciplina4}
                    onChange={(e) => handleChange(e, "notaDisciplina4")}
                    required
                    step="any"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={form.notaDisciplina5}
                    onChange={(e) => handleChange(e, "notaDisciplina5")}
                    required
                    step="any"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={form.frequencia}
                    onChange={(e) => handleChange(e, "frequencia")}
                    required
                    step="any"
                  />
                </td>
                <td>
                  <button type="submit" className="btn btn-success">Salvar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>

      {/* Lista de Alunos */}
      <div className="mb-5">
        <h2 className="text-center">Lista de Alunos</h2>
        <div className="table-responsive">
          <table className="table table-bordered text-center align-middle mt-3">
            <thead className="table-light">
              <tr>
                <th>Nome</th>
                <th>Disciplina 1</th>
                <th>Disciplina 2</th>
                <th>Disciplina 3</th>
                <th>Disciplina 4</th>
                <th>Disciplina 5</th>
                <th>Média Geral</th>
                <th>Frequência</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((a) => (
                <tr key={a.id}>
                  <td>{a.nome}</td>
                  <td>{a.notaDisciplina1}</td>
                  <td>{a.notaDisciplina2}</td>
                  <td>{a.notaDisciplina3}</td>
                  <td>{a.notaDisciplina4}</td>
                  <td>{a.notaDisciplina5}</td>
                  <td>{calcularMedia(a)}</td>
                  <td>{a.frequencia}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* Médias por Disciplina */}
      <div className="mb-5">
        <h2 className="text-center">Médias da Turma por Disciplina</h2>
        <div className="table-responsive">
          <table className="table table-bordered text-center align-middle mt-3">
            <thead className="table-light">
              <tr>
                {medias.map((_, i) => (
                  <th key={i}>Disciplina {i + 1}</th>
                ))}
                <th>Média Geral da Turma</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {medias.map((m, i) => (
                  <td key={i}>{m.toFixed(2)}</td>
                ))}
                <td>
                  {medias.length > 0
                    ? (medias.reduce((acc, val) => acc + val, 0) / medias.length).toFixed(2)
                    : "0.00"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


      {/* Alunos acima da média */}
      <div className="mb-5">
        <h2 className="text-center">Alunos Acima da Média da Turma</h2>
        <div className="table-responsive">
          <table className="table table-bordered text-center align-middle mt-3">
            <thead className="table-light">
              <tr>
                <th>Nome</th>
                <th>Média</th>
              </tr>
            </thead>
            <tbody>
              {acimaMedia.length > 0 ? (
                acimaMedia.map((a) => (
                  <tr key={a.id}>
                    <td>{a.nome}</td>
                    <td>{calcularMedia(a)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2}>Nenhum aluno encontrado</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alunos com frequência baixa */}
      <div className="mb-5">
        <h2 className="text-center">Alunos com Frequência Abaixo de 75%</h2>
        <div className="table-responsive">
          <table className="table table-bordered text-center align-items-center mt-3">
            <thead className="table-light">
              <tr>
                <th>Nome</th>
                <th>Frequência</th>
              </tr>
            </thead>
            <tbody>
              {frequenciaBaixa.length > 0 ? (
                frequenciaBaixa.map((a) => (
                  <tr key={a.id}>
                    <td>{a.nome}</td>
                    <td>{a.frequencia}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2}>Nenhum aluno encontrado</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );

};

export default App;
