package kr.co.teamb.dfsms.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.teamb.dfsms.vo.SurveyAnswerVO;
import kr.co.teamb.dfsms.vo.SurveyQuestionVO;
import kr.co.teamb.dfsms.vo.SurveyVO;


@Mapper
public interface SurveyDao {
	void saveSurvey(SurveyVO vo);
	void saveSurveyQuestionList(SurveyQuestionVO vo);
//	void insertSurveyAnswers(List<SurveyAnswerVO> list);
	void insertSurveyAnswers(SurveyAnswerVO vo);
	void updateSurveyAnswers(SurveyAnswerVO vo);
	Long getSurveyCount();
	SurveyVO getSurvey(Long num);
	SurveyVO getSurveyQuestions(Long num);
	List<SurveyAnswerVO> getUserSurveyAnswers(Map<String, Object> map);
}
