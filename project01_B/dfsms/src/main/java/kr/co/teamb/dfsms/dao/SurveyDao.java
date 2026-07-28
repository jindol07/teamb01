package kr.co.teamb.dfsms.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.teamb.dfsms.vo.SurveyQuestionVO;
import kr.co.teamb.dfsms.vo.SurveyVO;


@Mapper
public interface SurveyDao {
	void saveSurvey(SurveyVO vo);
	void saveSurveyQuestionList(List<SurveyQuestionVO> list);
	void incrementSurveyQuestion(@Param("subcode") int subcode, @Param("surveytype") String surveytype);
	Long getSurveyCount();
	SurveyVO getSurveyQuestions(Long num);
}
