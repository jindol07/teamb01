package kr.co.teamb.dfsms.vo;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	@JsonIgnore
	private List<QuestionListItem> questionlist;
	private String questionlistJson;
	private int sort_order;
	
    @Setter
    @Getter
    public static class QuestionListItem {
        private int id;
        private String value;
        private boolean hasTextInput;
    }
}