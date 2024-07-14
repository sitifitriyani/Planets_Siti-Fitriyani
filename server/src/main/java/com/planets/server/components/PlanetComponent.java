package com.planets.server.components;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.planets.server.models.Planets;
import com.planets.server.repository.PlanetRepository;


@CrossOrigin (origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/planets")
public class PlanetComponent {
    @Autowired
    private PlanetRepository planetRepository;

    @GetMapping
    public List<Planets> getAll(){
        return planetRepository.findAll();
    }

        @PostMapping
    public Planets create(@RequestBody Planets planets){
       return planetRepository.save(planets);
    }

    

    @PutMapping()
    public String editById(@RequestBody Planets planets){
        planetRepository.save(planets);
        return "planets berhasil di perbarui";
    }
    
    @DeleteMapping("{id}")
    public String deleteById(@PathVariable Long id){
        planetRepository.deleteById(id);
        return "planets berhasil di hapus";
    }

}
