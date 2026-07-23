package kr.co.teamb.dfsms.vo;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Alias("SurveyVO")
public class SurveyVO {
	private int surveyid;
	private int usrno;
	private int code;
	private String rdate;
	private String sub;

	// 1 대 N 관계
	private List<SurveyContVO> conList;
}