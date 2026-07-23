package kr.co.teamb.dfsms.vo;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Alias("SurveyContVO")
public class SurveyContVO {
	private int surveyid;
	private int surveycnt;
	private String surveytitle;	
	private String surveytype;
}