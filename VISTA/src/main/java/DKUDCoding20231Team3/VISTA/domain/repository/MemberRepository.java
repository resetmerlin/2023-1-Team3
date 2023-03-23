package DKUDCoding20231Team3.VISTA.domain.repository;

import DKUDCoding20231Team3.VISTA.domain.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByMail(String mail);

    Optional<Member> findByMail(String mail);
}
