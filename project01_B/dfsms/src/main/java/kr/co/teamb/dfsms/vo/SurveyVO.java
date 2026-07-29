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
	private String surveytitle;
	private String status;
	private String rdate;
	private String startdate;
	private String enddate;
	private List<SurveyQuestionVO> questionList;
}