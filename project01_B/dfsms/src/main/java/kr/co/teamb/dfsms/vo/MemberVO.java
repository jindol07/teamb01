package kr.co.teamb.dfsms.vo;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Alias("memberVO")
public class MemberVO {
    private int num;
    private String usrid;
    private String usrnm;
    private String loginDate;
}