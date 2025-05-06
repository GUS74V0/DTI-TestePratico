package com.dti.app.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dti.app.Model.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {

    
}