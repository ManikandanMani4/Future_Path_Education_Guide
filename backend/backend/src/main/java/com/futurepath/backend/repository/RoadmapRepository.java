package com.futurepath.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.futurepath.backend.model.Roadmap;

public interface RoadmapRepository extends JpaRepository<Roadmap, Long> {
}