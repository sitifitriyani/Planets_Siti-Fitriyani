
import org.springframework.data.jpa.repository.JpaRepository;

import com.planets.server.models.Planets;

public interface PlanetRepository extends JpaRepository<Planets, Long> {
}