package lt.swedforms.repositories;

import lt.swedforms.Entities.ContactUs;
import lt.swedforms.Entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Created by Super on 2/19/2016.
 */
public interface ContactUsRepository extends MongoRepository<ContactUs, String> {
    public List<ContactUs> findByUser(User user);
}
