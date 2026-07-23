package kr.co.teamb.dfsms.vo;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Alias("/UserVO")
public class UserVO {
private int usrno;
private String usrid;
private String pwd;
private String usrnm;
private char role;
private char delyn;
private int birth;
private char gender;
private String addr;
private String rdate;
private String email;
private String tel;

private List<CommunityVO> communityList;
//private List<SurveyVO> surveyList;
//private List<OderVO> oderList;
//private List<HistoryVO> historyList;
//private List<CartVO> cartList;
}