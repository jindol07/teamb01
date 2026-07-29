package kr.co.teamb.dfsms.vo;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	private List<AnswerItem> answerdata;
//	@JsonIgnore
	private String answerdataJson;
	private String rdate;
	
	@Setter
	@Getter
	public static class AnswerItem {
		private int id;
		private String value;
		private String text;
	}
}
