package com.dti.app.Controller;

import com.dti.app.Model.Aluno;
import com.dti.app.Service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alunos")
public class AlunoController {

    @Autowired
    private final AlunoService alunoService;

    public AlunoController(AlunoService alunoService) {
        this.alunoService = alunoService;
    }

    // Cadastrar um novo aluno
    @PostMapping
    public Aluno cadastrarAluno(@RequestBody Aluno aluno) {
        return alunoService.salvarAluno(aluno);
    }

    // Listar todos os alunos
    @GetMapping
    public List<Aluno> listarAlunos() {
        return alunoService.listarAlunos();
    }

    // Média da turma por disciplina
    @GetMapping("/medias-por-disciplina")
    public List<Double> mediasPorDisciplina() {
        return alunoService.mediaTurmaPorDisciplina();
    }

    // Alunos com média acima da média da turma
    @GetMapping("/acima-da-media")
    public List<Aluno> alunosComMediaAcimaDaTurma() {
        return alunoService.alunosComMediaAcimaDaTurma();
    }

    // Alunos com frequência abaixo de 75%
    @GetMapping("/frequencia-baixa")
    public List<Aluno> alunosComFrequenciaBaixa() {
        return alunoService.alunosComFrequenciaBaixa();
    }
}
