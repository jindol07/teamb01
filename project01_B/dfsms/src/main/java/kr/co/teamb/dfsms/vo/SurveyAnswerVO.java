package kr.co.teamb.dfsms.vo;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Alias("surveyanswervo")
public class SurveyAnswerVO {
	private int answerid;
	private int userid;
	private int surveyid;
	private int questionid;
	private String answerdata;
	private String rdate;
}
