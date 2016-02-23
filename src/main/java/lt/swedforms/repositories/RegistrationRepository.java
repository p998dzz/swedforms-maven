package lt.swedforms.repositories;

import lt.swedforms.Entities.Registration;
import lt.swedforms.Entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Created by Super on 2/19/2016.
 */
public interface RegistrationRepository extends MongoRepository<Registration, String> {
    public List<lt.swedforms.Entities.Registration> findByDate(String date);
    public List<lt.swedforms.Entities.Registration> findByUser(User user);
    public List<lt.swedforms.Entities.Registration> findByEmail(String email);
}
