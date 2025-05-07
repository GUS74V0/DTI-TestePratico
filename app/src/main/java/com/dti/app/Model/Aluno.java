package com.dti.app.Model;

import jakarta.persistence.*;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "aluno")
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome", nullable = false, length = 100)
    private String nome;

    private Double notaDisciplina1;

    private Double notaDisciplina2;

    private Double notaDisciplina3;

    private Double notaDisciplina4;

    private Double notaDisciplina5;

    private Double frequencia;

    // #region Getters e Setter

    public Double getMediaNotas() {
        return (notaDisciplina1 + notaDisciplina2 + notaDisciplina3 + notaDisciplina4 + notaDisciplina5) / 5;
    }
}