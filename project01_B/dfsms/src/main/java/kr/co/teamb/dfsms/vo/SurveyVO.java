package kr.co.teamb.dfsms.vo;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Alias("surveyvo")
public class SurveyVO {
	private int surveyid;
	private int usrno;
	private int code;
	private String rdate;
	private String sub;
	// 1 �� N 愿�怨�
	private List<SurveyContVO> contList;
}