package DKUDCoding20231Team3.VISTA.domain.entity;

import DKUDCoding20231Team3.VISTA.domain.enumerations.Gender;
import DKUDCoding20231Team3.VISTA.dto.request.MemberRequest;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;


@Entity
@Getter
@Builder
@AllArgsConstructor @NoArgsConstructor
@Table(name = "MEMBER_TABLE")
public class Member {

    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long memberId;

    private String mail;

    private String password;

    private String name;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private LocalDate birth;

    private String school;

    private String region;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private List<Like> likes;

    public static Member of(MemberRequest memberRequest) {
        return Member.builder()
                .mail(memberRequest.getMail())
                .password(memberRequest.getPassword())
                .name(memberRequest.getName())
                .gender(memberRequest.getGender())
                .birth(memberRequest.getBirth())
                .school(memberRequest.getSchool())
                .region(memberRequest.getRegion())
                .build();
    }

    public void updateMember(MemberRequest memberRequest) {
        this.mail = memberRequest.getMail();
        this.password = memberRequest.getPassword();
        this.name = memberRequest.getName();
        this.gender = memberRequest.getGender();
        this.birth = memberRequest.getBirth();
        this.school = memberRequest.getSchool();
        this.region = memberRequest.getRegion();
    }

}
