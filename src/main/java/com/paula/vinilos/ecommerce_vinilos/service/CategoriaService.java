package com.paula.vinilos.ecommerce_vinilos.service;

import com.paula.vinilos.ecommerce_vinilos.dto.CategoriaRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.CategoriaResponseDTO;
import com.paula.vinilos.ecommerce_vinilos.exception.CategoriaNotFoundException;
import com.paula.vinilos.ecommerce_vinilos.mapper.CategoriaMapper;
import com.paula.vinilos.ecommerce_vinilos.model.Categoria;
import com.paula.vinilos.ecommerce_vinilos.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaService implements ICategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private CategoriaMapper categoriaMapper;

    @Override
    public List<CategoriaResponseDTO> getAllCategorias() {
        return categoriaRepository.findAll().stream()
                .map(categoriaMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CategoriaResponseDTO getCategoriaById(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new CategoriaNotFoundException(id));
        return categoriaMapper.toDto(categoria);
    }

    @Override
    public CategoriaResponseDTO crearCategoria(CategoriaRequestDTO dto) {
        Categoria categoria = categoriaMapper.toEntity(dto);
        Categoria nuevaCategoria = categoriaRepository.save(categoria);
        return categoriaMapper.toDto(nuevaCategoria);
    }

    @Override
    public CategoriaResponseDTO actualizarCategoria(Long id, CategoriaRequestDTO dto) {
        Categoria categoriaExistente = categoriaRepository.findById(id)
                .orElseThrow(() -> new CategoriaNotFoundException(id));
        categoriaMapper.updateEntityFromDto(dto, categoriaExistente);
        Categoria categoriaActualizada = categoriaRepository.save(categoriaExistente);
        return categoriaMapper.toDto(categoriaActualizada);
    }

    @Override
    public void eliminarCategoria(Long id) {
        if (!categoriaRepository.existsById(id)) {
            throw new CategoriaNotFoundException(id);
        }
        categoriaRepository.deleteById(id);
    }

    @Override
    public Page<CategoriaResponseDTO> getCategoriasPaginadas(Pageable pageable) {
        return categoriaRepository.findAll(pageable)
                .map(categoriaMapper::toDto);
    }
}
