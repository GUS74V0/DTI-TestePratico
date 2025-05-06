
package com.dti.app.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "aluno")
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer  id;

    @Column(name = "nome", nullable = false, length = 100)
    private String nome;

    private Double notaDisciplina1;

    private Double notaDisciplina2;

    private Double notaDisciplina3;

    private Double notaDisciplina4;

    private Double notaDisciplina5;

    private Double frequencia;

    //#region Getters e Setters
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public Double getNotaDisciplina1() {
        return notaDisciplina1;
    }
    public void setNotaDisciplina1(Double notaDisciplina1) {
        this.notaDisciplina1 = notaDisciplina1;
    }
    public Double getNotaDisciplina2() {
        return notaDisciplina2;
    }
    public void setNotaDisciplina2(Double notaDisciplina2) {
        this.notaDisciplina2 = notaDisciplina2;
    }
    public Double getNotaDisciplina3() {
        return notaDisciplina3;
    }
    public void setNotaDisciplina3(Double notaDisciplina3) {
        this.notaDisciplina3 = notaDisciplina3;
    }
    public Double getNotaDisciplina4() {
        return notaDisciplina4;
    }
    public void setNotaDisciplina4(Double notaDisciplina4) {
        this.notaDisciplina4 = notaDisciplina4;
    }
    public Double getNotaDisciplina5() {
        return notaDisciplina5;
    }
    public void setNotaDisciplina5(Double notaDisciplina5) {
        this.notaDisciplina5 = notaDisciplina5;
    }
    public Double getFrequencia() {
        return frequencia;
    }
    public void setFrequencia(Double frequencia) {
        this.frequencia = frequencia;
    }
    //#endregion

    public Double getMediaNotas() {
        return (notaDisciplina1 + notaDisciplina2 + notaDisciplina3 + notaDisciplina4 + notaDisciplina5) / 5;
    }
}