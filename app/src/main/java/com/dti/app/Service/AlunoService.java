package com.dti.app.Service;

import com.dti.app.Model.Aluno;
import com.dti.app.Repository.AlunoRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.OptionalDouble;
import java.util.stream.Collectors;

@Service
public class AlunoService {

    private final AlunoRepository alunoRepository;

    public AlunoService(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    public Aluno salvarAluno(Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    public List<Aluno> listarAlunos() {
        return alunoRepository.findAll();
    }

    public List<Double> mediaTurmaPorDisciplina() {
        List<Aluno> alunos = alunoRepository.findAll();
        int total = alunos.size();
        List<Double> medias = new ArrayList<>();

        if (total == 0) {
            for (int i = 0; i < 5; i++) {
                medias.add(0.0);
            }
            return medias;
        }

        double media1 = alunos.stream().mapToDouble(Aluno::getNotaDisciplina1).average().orElse(0.0);
        double media2 = alunos.stream().mapToDouble(Aluno::getNotaDisciplina2).average().orElse(0.0);
        double media3 = alunos.stream().mapToDouble(Aluno::getNotaDisciplina3).average().orElse(0.0);
        double media4 = alunos.stream().mapToDouble(Aluno::getNotaDisciplina4).average().orElse(0.0);
        double media5 = alunos.stream().mapToDouble(Aluno::getNotaDisciplina5).average().orElse(0.0);

        medias.add(media1);
        medias.add(media2);
        medias.add(media3);
        medias.add(media4);
        medias.add(media5);

        return medias;
    }

    public List<Aluno> alunosComMediaAcimaDaTurma() {
        List<Aluno> alunos = alunoRepository.findAll();

        OptionalDouble mediaTurma = alunos.stream()
                .mapToDouble(Aluno::getMediaNotas)
                .average();

        if (mediaTurma.isEmpty()) return new ArrayList<>();

        return alunos.stream()
                .filter(a -> a.getMediaNotas() > mediaTurma.getAsDouble())
                .collect(Collectors.toList());
    }

    public List<Aluno> alunosComFrequenciaBaixa() {
        return alunoRepository.findAll().stream()
                .filter(a -> a.getFrequencia() != null && a.getFrequencia() < 75)
                .collect(Collectors.toList());
    }
}
