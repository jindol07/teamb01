package kr.co.teamb.dfsms.vo;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Alias("surveyquestionvo")
public class SurveyQuestionVO {
	private int questionid;
	private int surveyid;
	private String questiontitle;	
	private String questiontype;
	private String questionlist;
	private int sort_order;
}