package com.paula.vinilos.ecommerce_vinilos;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.paula.vinilos.ecommerce_vinilos.model.Categoria;
import com.paula.vinilos.ecommerce_vinilos.model.Producto;
import com.paula.vinilos.ecommerce_vinilos.repository.CategoriaRepository;
import com.paula.vinilos.ecommerce_vinilos.repository.ProductoRepository;

@SpringBootApplication
public class EcommerceVinilosApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommerceVinilosApplication.class, args);
	}

	@Bean
	CommandLineRunner initData(CategoriaRepository categoriaRepository, ProductoRepository productoRepository) {
		return args -> {
	
			// verificar si ya existe alguna categoría
			if (categoriaRepository.count() == 0) {
				Categoria rock = new Categoria();
				rock.setNombre("Rock");
				rock.setDescripcion("Vinilos clásicos de rock");
				categoriaRepository.save(rock);
	
				Producto producto1 = new Producto();
				producto1.setNombre("Abbey Road");
				producto1.setDescripcion("Vinilo de The Beatles");
				producto1.setPrecio(29.99);
				producto1.setStock(10);
				producto1.setCategoria(rock);
				productoRepository.save(producto1);
	
				System.out.println(" Datos de prueba insertados con éxito.");
			} else {
				System.out.println(" Datos ya existentes, no se insertó nada.");
			}
		};
	}




}



