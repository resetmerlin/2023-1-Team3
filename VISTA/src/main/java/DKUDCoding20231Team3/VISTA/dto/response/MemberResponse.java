package DKUDCoding20231Team3.VISTA.dto.response;

import DKUDCoding20231Team3.VISTA.domain.entity.Member;
import DKUDCoding20231Team3.VISTA.domain.enumerations.Gender;
import DKUDCoding20231Team3.VISTA.dto.request.MemberRequest;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;

import java.time.LocalDate;

@Getter
@Builder
@NonNull
@AllArgsConstructor
public class MemberResponse {

    private Long memberId;

    private String mail;

    private String name;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private LocalDate birth;

    private String school;

    private String region;

    public static MemberResponse of(Member member) {
        return MemberResponse.builder()
                .memberId(member.getMemberId())
                .mail(member.getMail())
                .name(member.getName())
                .gender(member.getGender())
                .birth(member.getBirth())
                .school(member.getSchool())
                .region(member.getRegion())
                .build();
    }

}
